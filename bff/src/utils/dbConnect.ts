import mongoose from 'mongoose';
import { myConfig } from '../../myConfig';

type DB = typeof mongoose | null;

let cachedDB: DB = null;

export default async function dbConnect() {
  try {
    if (cachedDB) return cachedDB;
    const db = await mongoose.connect(myConfig.MONGO_URL);
    cachedDB = db;
    console.log('Connected to DB');
    return db;
  } catch (err) {
    console.log('Failed to connect to DB', err);
    cachedDB = null;
    return null;
  }
}
