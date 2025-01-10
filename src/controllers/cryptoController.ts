import { Request, Response } from 'express';
import CryptoPrice from '../models/CryptoPrice';
import cryptoService from '../services/cryptoService';
import { calculateStandardDeviation } from '../utils/calculations';

export class CryptoController {
  async getStats(req: Request, res: Response): Promise<void> {
    try {
      const latestPrices = await cryptoService.getLatestPrices();

      res.json({
        success: true,
        data: latestPrices.map(crypto => ({
          id: crypto.cryptoId,
          name: crypto.name,
          currentPrice: crypto.price,
          marketCap: crypto.marketCap,
          change24h: crypto.change24h
        }))
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: 'Failed to fetch cryptocurrency stats'
      });
    }
  }

  async getDeviation(req: Request, res: Response): Promise<void> {
    try {
      const { cryptoId } = req.query;
      const timeframe = parseInt(req.query.timeframe as string) || 24; // Default 24 hours

      if (!cryptoId) {
        res.status(400).json({
          success: false,
          error: 'cryptoId is required'
        });
        return;
      }

      const endTime = new Date();
      const startTime = new Date(endTime.getTime() - (timeframe * 60 * 60 * 1000));

      const priceData = await CryptoPrice.find({
        cryptoId: cryptoId,
        timestamp: { $gte: startTime, $lte: endTime }
      }).select('price');

      if (priceData.length === 0) {
        res.status(404).json({
          success: false,
          error: 'No price data found for the specified timeframe'
        });
        return;
      }

      const prices = priceData.map(data => data.price);
      const standardDeviation = calculateStandardDeviation(prices);

      res.json({
        success: true,
        data: {
          cryptoId: cryptoId,
          timeframe: timeframe,
          standardDeviation: standardDeviation,
          sampleSize: prices.length
        }
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: 'Failed to calculate price deviation'
      });
    }
  }
}

export default new CryptoController();
