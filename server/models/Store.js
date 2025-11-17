// server/models/Store.js
import mongoose from "mongoose";

const storeSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    url: { type: String, required: true },
    description: { type: String, default: "" },

    // decades this store is good for, e.g. ["1970s","1980s"]
    decades: [{ type: String }],

    // tags like "bell-bottoms", "low-rise jeans", etc.
    styleTags: [{ type: String }],

    isSmallBusiness: { type: Boolean, default: false },

    // simple 1–5 rating we use for sorting
    rating: { type: Number, default: 4.0 },
  },
  {
    timestamps: true,
  }
);

const Store = mongoose.model("Store", storeSchema);

export default Store;