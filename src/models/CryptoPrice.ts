import mongoose, { Schema, Document } from 'mongoose';

export interface ICryptoPrice extends Document {
  cryptoId: string;
  name: string;
  price: number;
  marketCap: number;
  change24h: number;
  timestamp: Date;
}

const CryptoPriceSchema: Schema = new Schema({
  cryptoId: {
    type: String,
    required: true,
    index: true
  },
  name: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true,
    default: 0
  },
  marketCap: {
    type: Number,
    required: true,
    default: 0
  },
  change24h: {
    type: Number,
    required: true,
    default: 0
  },
  timestamp: {
    type: Date,
    default: Date.now,
    index: true
  }
});

// Create compound index for efficient querying
CryptoPriceSchema.index({ cryptoId: 1, timestamp: -1 });

export default mongoose.model<ICryptoPrice>('CryptoPrice', CryptoPriceSchema);
