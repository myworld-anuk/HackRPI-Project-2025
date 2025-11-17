// server/index.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectToDb } from "./db.js";
import storesRouter from "./routes/stores.js";

dotenv.config({ path: "../.env" });

const app = express();
const port = process.env.PORT || 5001;

// connect to Mongo
connectToDb();

app.use(cors());
app.use(express.json());

// Basic health check
app.get("/api/health", (req, res) => {
  res.json({ status: "ok" });
});

// Stores routes (everything under /api/stores)
app.use("/api/stores", storesRouter);

app.listen(port, () => {
  console.log(`✅ Store API running at http://localhost:${port}`);
});