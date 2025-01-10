import express, { Express } from 'express';
import dotenv from 'dotenv';
import connectDB from './config/database';
import routes from './routes/api';
import { initializeScheduler } from './utils/scheduler';

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

// Connect to MongoDB
connectDB();

// Initialize the price update scheduler
initializeScheduler();

app.use(express.json());
app.use('/api', routes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
