# 🚂 Rail Board

A real-time train departure board display for UK railway stations, styled to look like classic station departure boards with yellow text on black background.

![Train Board Preview](https://img.shields.io/badge/Railway-Departures-yellow?style=for-the-badge)

## Features

- 🚄 **Live departure times** - Real-time train data from the Realtime Trains API
- 🔄 **Auto-rotating display** - Cycles through multiple stations every 10 seconds
- ⏱️ **Live clock** - Updates every second
- 📱 **Responsive design** - Works on desktop and mobile
- 🎨 **Classic UI** - Authentic yellow-on-black station board styling
- ♻️ **Auto-refresh** - Updates train data every 60 seconds
- 🚦 **Status tracking** - Shows "On time", delays, or cancellations

## Demo

The board displays:

- **Scheduled departure times**
- **Destination stations**
- **Platform numbers**
- **Expected departure times** (with delays or cancellations)

Currently configured for three South East London stations:

- Brockley (BCY)
- Crofton Park (CFT)
- Nunhead (NHD)

## Prerequisites

- Node.js (v14 or higher)
- A Realtime Trains API account (free registration)

## Getting Started

### 1. Register for API Access

1. Visit [api.rtt.io](https://api.rtt.io/)
2. Create a free account
3. Note your username and password

### 2. Set Up Environment Variables

Create a `.env` file in the project root:

```bash
RTT_USERNAME=your_username_here
RTT_PASSWORD=your_password_here
PORT=3000
```

### 3. Start the Proxy Server

The proxy server handles API authentication and CORS:

```bash
node train-proxy-server.js
```

You should see:

```
Train API proxy running on http://localhost:3000
Access stations at: http://localhost:3000/api/BCY
```

### 4. Open the Web Interface

Open `index.html` in your web browser. You can either:

- Double-click the file
- Use a local web server:
  ```bash
  python -m http.server 8080
  # Then visit http://localhost:8080
  ```

## Customization

### Change Stations

Edit the `stations` array in `index.html` (around line 40):

```javascript
const stations = [
  { name: "Your Station Name", crs: "ABC" },
  { name: "Another Station", crs: "XYZ" },
  // Add more stations...
];
```

Find UK station codes (CRS codes) at [National Rail](https://www.nationalrail.co.uk/).

### Adjust Timing

- **Station rotation**: Change `10000` on line 88 (milliseconds)
- **Data refresh**: Change `60000` on line 80 (milliseconds)
- **Max trains displayed**: Change `slice(0, 7)` on line 99

### Customize Colors

The board uses Tailwind CSS. Main color classes:

- `text-yellow-500` - Primary text color
- `bg-black` - Background color
- `border-yellow-600/30` - Border colors

## Project Structure

```
rail-board/
├── index.html              # Frontend React application
├── train-proxy-server.js   # Node.js proxy server
├── .env                    # API credentials (not in repo)
├── .gitignore             # Git ignore rules
├── LICENSE                # MIT License
└── README.md              # This file
```

## API Endpoints

The proxy server exposes:

```
GET /api/{CRS_CODE}
```

Example:

```
GET /api/BCY  # Get departures for Brockley station
```

Response includes:

- Service details
- Destinations
- Platform numbers
- Scheduled and real-time departure times
- Cancellation status

## Technologies Used

- **Frontend**: React 18, Tailwind CSS
- **Backend**: Node.js (built-in `http` and `https` modules)
- **API**: [Realtime Trains API](https://api.rtt.io/)
- **Styling**: Classic monospace font with yellow-on-black theme

## Troubleshooting

### "Loading train data..." stays on screen

- Ensure the proxy server is running on port 3000
- Check that your `.env` file contains valid credentials

### "Failed to fetch data" error

- Verify your Realtime Trains API credentials
- Check your internet connection
- Ensure the station CRS codes are valid

### No trains showing

- Station may not have scheduled departures at the current time
- Try a different station or check during peak hours

## Security Notes

- **Never commit your `.env` file** to version control
- The proxy server is required to keep API credentials secure
- Don't expose your credentials in the frontend code

## Contributing

Feel free to fork this project and customize it for your needs!

## License

MIT License - see [LICENSE](LICENSE) file for details

## Acknowledgments

- Data provided by [Realtime Trains API](https://api.rtt.io/)
- Inspired by classic UK railway station departure boards

---

**Made with ❤️ for train enthusiasts**
