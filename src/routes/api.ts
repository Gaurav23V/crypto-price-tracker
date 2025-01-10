import express from 'express';
import { Router } from 'express';
import cryptoController from '../controllers/cryptoController';

const router: Router = express.Router();

// Health check endpoint
router.get('/health', (req, res) => {
  res.json({ status: 'OK' });
});

// Stats endpoint - returns latest cryptocurrency data
router.get('/stats', cryptoController.getStats);

// Deviation endpoint - calculates standard deviation of prices
router.get('/deviation', cryptoController.getDeviation);

export default router;
