import axios from "axios";
import { CoinGeckoPrice } from "../types/coingecko";
import CryptoPrice, { ICryptoPrice } from "../models/CryptoPrice";

const instance = axios.create({
  timeout: 10000, // Timeout set to 10 seconds
});

class CryptoService {
  private readonly baseUrl = "https://api.coingecko.com/api/v3";
  private readonly cryptoIds = ["bitcoin", "ethereum", "matic-network"];

  async fetchPrices(): Promise<void> {
    try {
      const response = await instance.get<CoinGeckoPrice>(
        `${this.baseUrl}/simple/price`,
        {
          params: {
            ids: this.cryptoIds.join(","),
            vs_currencies: "usd",
            include_market_cap: true,
            include_24hr_change: true,
          },
        }
      );

      const priceData = response.data;

      // Process and store each cryptocurrency's data
      const priceEntries = this.cryptoIds.map((cryptoId) => {
        const cryptoData = priceData[cryptoId];
        return {
          cryptoId,
          name: this.getCryptoName(cryptoId),
          price: cryptoData?.usd || 0,
          marketCap: cryptoData?.usd_market_cap || 0,
          change24h: cryptoData?.usd_24h_change || 0, // Provide default value of 0
          timestamp: new Date(),
        };
      });

      // Log the data before insertion for debugging
      console.log("Price entries to be inserted:", priceEntries);

      await CryptoPrice.insertMany(priceEntries);
      console.log("Price data updated successfully");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("API Error:", error.response?.data);
      }
      console.error("Error fetching price data:", error);
      throw error;
    }
  }

  private getCryptoName(cryptoId: string): string {
    const names: { [key: string]: string } = {
      bitcoin: "Bitcoin",
      ethereum: "Ethereum",
      "matic-network": "Polygon (MATIC)",
    };
    return names[cryptoId] || cryptoId;
  }
  async getLatestPrices(): Promise<ICryptoPrice[]> {
    try {
      const latestPrices = await CryptoPrice.aggregate([
        {
          $sort: { timestamp: -1 },
        },
        {
          $group: {
            _id: "$cryptoId",
            latestPrice: { $first: "$$ROOT" },
          },
        },
        {
          $replaceRoot: { newRoot: "$latestPrice" },
        },
      ]);

      return latestPrices;
    } catch (error) {
      console.error("Error fetching latest prices:", error);
      throw error;
    }
  }
}

export default new CryptoService();
