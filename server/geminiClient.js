import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";

dotenv.config({ path: "../.env" });

if (!process.env.GEMINI_API_KEY) {
  throw new Error("GEMINI_API_KEY is not defined in .env");
}

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// You can tweak model name later if you want
const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

/**
 * Ask Gemini for store suggestions or rankings.
 * input: { decade: string, styles: string[], existingStores: Array<store> }
 */
export async function getStoreSuggestions({ decade, styles, existingStores }) {
  const prompt = `
You are a fashion shopping assistant.

User is interested in styles from the ${decade}, with these signature elements:
${styles.length ? styles.join(", ") : "no specific elements selected"}.

You also have this list of existing online stores (from my database):

${JSON.stringify(
  existingStores.map((s) => ({
    name: s.name,
    url: s.url,
    description: s.description,
    rating: s.rating,
    decades: s.decades,
    styleTags: s.styleTags,
  })),
  null,
  2
)}

1. Rank the existing stores from best to worst match for this user.
2. Optionally, suggest up to 3 additional online stores that are known for these styles.
3. Return ONLY JSON in the following structure (no extra commentary):

{
  "rankedExisting": [
    { "name": "...", "reason": "...", "score": 0-100 }
  ],
  "extraSuggestions": [
    { "name": "...", "url": "...", "description": "..." }
  ]
}
`;

  const result = await model.generateContent(prompt);
  const text = result.response.text();

  // Try to parse JSON from the response
  try {
    const json = JSON.parse(text);
    return json;
  } catch (err) {
    console.error("Failed to parse Gemini JSON:", text);
    throw new Error("Gemini returned invalid JSON");
  }
}