// server/db.js
import { MongoClient } from "mongodb";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config({ path: "../.env" });

const uri = process.env.MONGODB_URI;
const dbName = process.env.MONGODB_DB || "HackRPI-2025";

if (!uri) {
  throw new Error("MONGODB_URI is not defined in .env");
}

let client;
let db;

/**
 * Connects BOTH:
 * 1. Native MongoDB client (used by seedStores.js via getDb)
 * 2. Mongoose (used by models/Store.js via Store.find)
 */
export async function connectToDb() {
  // If already connected, reuse the same db
  if (db && client) {
    return db;
  }

  // 1) Native driver connection (for getDb / seedScripts)
  client = new MongoClient(uri);
  await client.connect();
  db = client.db(dbName);
  console.log(`✅ Connected to MongoDB: ${dbName}`);

  // 2) Mongoose connection (for Store.js, etc.)
  if (mongoose.connection.readyState === 0) {
    await mongoose.connect(uri, { dbName });
    console.log("✅ Mongoose connected to", dbName);
  }

  return db;
}

export function getDb() {
  if (!db) {
    throw new Error("Database not initialized. Call connectToDb() first.");
  }
  return db;
}