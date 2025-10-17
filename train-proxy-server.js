const http = require("http");
const https = require("https");

// Load environment variables
const RTT_USERNAME = process.env.RTT_USERNAME;
const RTT_PASSWORD = process.env.RTT_PASSWORD;

const server = http.createServer((req, res) => {
  // Enable CORS
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    res.writeHead(200);
    res.end();
    return;
  }

  // Extract station code from URL like /api/BCY
  const match = req.url.match(/^\/api\/([A-Z]{3})$/);

  if (!match) {
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ error: "Invalid endpoint" }));
    return;
  }

  const stationCode = match[1];
  const auth = Buffer.from(`${RTT_USERNAME}:${RTT_PASSWORD}`).toString(
    "base64"
  );

  // Proxy request to Realtime Trains API
  const options = {
    hostname: "api.rtt.io",
    path: `/api/v1/json/search/${stationCode}`,
    method: "GET",
    headers: {
      Authorization: `Basic ${auth}`,
    },
  };

  const apiReq = https.request(options, (apiRes) => {
    let data = "";

    apiRes.on("data", (chunk) => {
      data += chunk;
    });

    apiRes.on("end", () => {
      res.writeHead(apiRes.statusCode, { "Content-Type": "application/json" });
      res.end(data);
    });
  });

  apiReq.on("error", (error) => {
    res.writeHead(500, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ error: error.message }));
  });

  apiReq.end();
});

const PORT = process.env.PORT || 3000;

// Validate required environment variables
if (!RTT_USERNAME || !RTT_PASSWORD) {
  console.error(
    "Error: RTT_USERNAME and RTT_PASSWORD environment variables are required"
  );
  process.exit(1);
}

server.listen(PORT, () => {
  console.log(`Train API proxy running on http://localhost:${PORT}`);
  console.log(`Access stations at: http://localhost:${PORT}/api/BCY`);
});
