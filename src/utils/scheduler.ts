import cron from 'node-cron';
import cryptoService from '../services/cryptoService';

export const initializeScheduler = (): void => {
  // Schedule job to run every 2 hours
  cron.schedule('0 */2 * * *', async () => {
    console.log('Running scheduled price update...');
    try {
      await cryptoService.fetchPrices();
    } catch (error) {
      console.error('Scheduled price update failed:', error);
    }
  });

  // Fetch initial prices when the application starts
  cryptoService.fetchPrices()
    .catch(error => console.error('Initial price fetch failed:', error));
};