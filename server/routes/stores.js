// server/routes/stores.js
import express from "express";
import Store from "../models/Store.js";
import { getStoreSuggestions } from "../geminiClient.js";

const router = express.Router();

// --- DB-based route: GET /api/stores?decade=&styles=tag1,tag2 ---
router.get("/", async (req, res) => {
  try {
    const { decade, styles } = req.query;

    const styleArray =
      typeof styles === "string" && styles.length
        ? styles.split(",").map((s) => s.trim().toLowerCase())
        : [];

    const filter = {};
    if (decade) filter.decades = decade;
    if (styleArray.length) filter.styleTags = { $in: styleArray };

    const MIN_RESULTS = 5;

    // Start with DB results, highest rating first
    let stores = await Store.find(filter).sort({ rating: -1 }).limit(20);

    // If not enough matches AND we have a decade, broaden within that decade
    if (stores.length < MIN_RESULTS && decade) {
      const existingIds = stores.map((s) => s._id);

      const broaderFilter = {
        decades: decade,
        _id: { $nin: existingIds },
      };

      const extra = await Store.find(broaderFilter)
        .sort({ rating: -1 })
        .limit(MIN_RESULTS - stores.length);

      stores = [...stores, ...extra];
    }

    res.json(stores);
  } catch (err) {
    console.error("Error fetching stores:", err);
    res.status(500).json({ error: "Failed to fetch stores" });
  }
});

// --- Gemini-powered ranking route: POST /api/stores/gemini ---
router.post("/gemini", async (req, res) => {
  try {
    const { decade, styles } = req.body;

    if (!decade) {
      return res.status(400).json({ error: "decade is required" });
    }

    const styleArray = Array.isArray(styles)
      ? styles
      : typeof styles === "string" && styles.length
      ? styles.split(",").map((s) => s.trim())
      : [];

    // 1) Get a pool of candidates from DB for that decade
    const dbStores = await Store.find({ decades: decade })
      .sort({ rating: -1 })
      .limit(50)
      .lean();

    // 2) Ask Gemini to rank & suggest (you’ll define this in geminiClient.js)
    const aiResult = await getStoreSuggestions({
      decade,
      styles: styleArray,
      existingStores: dbStores,
    });

    const rankedExisting = (aiResult.rankedExisting || []).map((item) => {
      const found = dbStores.find((s) => s.name === item.name);
      return {
        ...(found || { name: item.name, url: "#", description: "" }),
        aiScore: item.score,
        aiReason: item.reason,
      };
    });

    const extraSuggestions = aiResult.extraSuggestions || [];

    // 3) Make sure we send at most 5 main stores
    const MIN_RESULTS = 5;
    let combined = [...rankedExisting];

    if (combined.length < MIN_RESULTS) {
      const usedNames = new Set(combined.map((s) => s.name));
      const extrasFromDb = dbStores.filter((s) => !usedNames.has(s.name));
      combined = [...combined, ...extrasFromDb.slice(0, MIN_RESULTS - combined.length)];
    }

    res.json({
      decade,
      styles: styleArray,
      stores: combined.slice(0, MIN_RESULTS),
      aiExtraSuggestions: extraSuggestions,
    });
  } catch (err) {
    console.error("Error in Gemini store suggestions:", err);
    res
      .status(500)
      .json({ error: "Failed to get AI store suggestions. Please try again." });
  }
});

export default router;