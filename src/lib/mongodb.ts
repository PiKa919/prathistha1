import mongoose, { Connection } from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI as string;

if (!MONGODB_URI) {
  throw new Error("Please define the MONGODB_URI environment variable in .env.local");
}

// Define a cache to store the database connection
interface MongooseCache {
  cached: typeof mongoose;
  conn: Connection | null;
  promise: Promise<typeof mongoose> | null;
}

const globalWithMongoose = global as typeof global & { mongoose: MongooseCache };

if (!globalWithMongoose.mongoose) {
  globalWithMongoose.mongoose = { cached: mongoose, conn: null, promise: null };
}
const cached = globalWithMongoose.mongoose;

export async function connectDB(): Promise<Connection> {
  if (cached.conn) return cached.conn; // Return cached connection if available

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI).then((mongoose) => mongoose);
  }

  await cached.promise;
  cached.conn = mongoose.connection;
  if (!cached.conn) throw new Error('Failed to connect to MongoDB');
  
  console.log('Connected to MongoDB');
  return cached.conn;
}