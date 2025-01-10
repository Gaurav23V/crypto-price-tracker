# Cryptocurrency Price Tracker

A real-time cryptocurrency price tracking API that fetches and stores price data for Bitcoin, Ethereum, and Polygon (MATIC) using the CoinGecko API. The system provides statistical analysis including price deviations over custom timeframes.

## Features

- Real-time cryptocurrency price tracking
- Historical price data storage
- Price statistics and deviation analysis
- RESTful API endpoints
- Automated price updates every 2 hours

## Tech Stack

- Node.js
- TypeScript
- Express.js
- MongoDB
- Mongoose
- Axios
- Node-cron

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (v4.4 or higher)
- npm or pnpm

## Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/crypto-price-tracker.git
cd crypto-price-tracker
```

2. Install dependencies:
```bash
npm install
# or if using pnpm
pnpm install
```

3. Create a `.env` file in the root directory:
```env
PORT=3000
MONGODB_URI=mongodb://localhost:27017/crypto_tracker
COINGECKO_API_KEY=your_api_key_if_available
```

4. Start the development server:
```bash
npm run dev
```

## API Endpoints

### Get Latest Cryptocurrency Stats
```
GET /api/stats
```
Returns the latest price data for all tracked cryptocurrencies.

Response:
```json
{
  "success": true,
  "data": [
    {
      "id": "bitcoin",
      "name": "Bitcoin",
      "currentPrice": 95288,
      "marketCap": 1886793169560.91,
      "change24h": 2.02
    },
    // ... other cryptocurrencies
  ]
}
```

### Get Price Deviation
```
GET /api/deviation?cryptoId=bitcoin&timeframe=24
```
Calculates price standard deviation for a specific cryptocurrency over a given timeframe.

Parameters:
- `cryptoId` (required): Cryptocurrency identifier (bitcoin, ethereum, or matic-network)
- `timeframe` (optional): Number of hours to analyze (default: 24)

Response:
```json
{
  "success": true,
  "data": {
    "cryptoId": "bitcoin",
    "timeframe": 24,
    "standardDeviation": 523.45,
    "sampleSize": 12
  }
}
```

## Data Update Schedule

The system automatically fetches new price data:
- Every 2 hours for regular updates
- Initial fetch on application startup
- Data is stored in MongoDB for historical analysis

## Error Handling

The API includes comprehensive error handling for:
- Invalid cryptocurrency IDs
- Missing parameters
- API timeout issues
- Database connection errors

## Development

To run the project in development mode:
```bash
npm run dev
```

For TypeScript compilation:
```bash
npm run build
```

## Testing

To test the API endpoints:
```bash
# Get latest stats
curl http://localhost:3000/api/stats

# Get deviation for Bitcoin over 24 hours
curl "http://localhost:3000/api/deviation?cryptoId=bitcoin&timeframe=24"
```

## Project Structure

```
src/
├── app.ts              # Application entry point
├── config/             # Configuration files
├── controllers/        # Request handlers
├── models/             # Database models
├── routes/             # API routes
├── services/           # Business logic
├── types/              # TypeScript type definitions
└── utils/              # Utility functions
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- CoinGecko API for cryptocurrency data
- MongoDB for database services
