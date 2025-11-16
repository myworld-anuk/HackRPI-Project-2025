import json
import os

import pandas as pd
from pytrends.request import TrendReq

# Same idea as before: pick queries that represent each style
STYLE_QUERIES = {
    "1970s": ["70s fashion", "disco fashion", "boho fashion 70s"],
    "1980s": ["80s fashion", "power suits 80s", "neon 80s fashion"],
    "1990s": ["90s fashion", "grunge fashion", "baggy jeans 90s"],
    "2000s": ["y2k fashion", "velour tracksuit", "low rise jeans 2000s"],
}

def build_revival_history():
    pytrends = TrendReq(hl="en-US", tz=360)
    all_data = {}

    for decade, queries in STYLE_QUERIES.items():
        print(f"Fetching Google Trends for {decade}...")
        pytrends.build_payload(queries, timeframe="2004-01-01 2025-12-31", geo="")

        df = pytrends.interest_over_time()

        # Drop the isPartial flag if present
        if "isPartial" in df.columns:
            df = df.drop(columns=["isPartial"])

        # Combine all queries into one popularity index
        df["popularity"] = df.mean(axis=1)

        # Aggregate by year to keep things small and simple
        df["year"] = df.index.year
        yearly = df.groupby("year")["popularity"].mean().round(1)

        all_data[decade] = [
            {"year": int(year), "popularity": float(value)}
            for year, value in yearly.items()
        ]

    # Save into your React src/data folder as JSON
    project_root = os.path.dirname(os.path.dirname(__file__))
    output_path = os.path.join(project_root, "src", "data", "revivalHistory.json")
    os.makedirs(os.path.dirname(output_path), exist_ok=True)

    with open(output_path, "w") as f:
        json.dump(all_data, f, indent=2)

    print("Saved revival history to", output_path)


if __name__ == "__main__":
    build_revival_history()