# ml/generate_retro_predictions.py

import json
import os
from datetime import datetime

import numpy as np
import pandas as pd
from prophet import Prophet
from pytrends.request import TrendReq


# --- 1. What queries represent each style? ---

STYLE_QUERIES = {
    "1970s": ["70s fashion", "disco fashion", "boho fashion 70s"],
    "1980s": ["80s fashion", "power suits 80s", "neon 80s fashion"],
    "1990s": ["90s fashion", "grunge fashion", "baggy jeans 90s"],
    "2000s": ["y2k fashion", "velour tracksuit", "low rise jeans 2000s"],
}


def fetch_series_for_decade(pytrends, decade, queries):
    """
    Use Google Trends to build a combined popularity time series
    for a given decade (0-100 weekly popularity index).
    """
    pytrends.build_payload(queries, timeframe="2004-01-01 2024-12-31", geo="")
    df = pytrends.interest_over_time()

    # Drop the "isPartial" column if present
    if "isPartial" in df.columns:
        df = df.drop(columns=["isPartial"])

    # Combine all queries into a single index (mean across columns)
    df["y"] = df.mean(axis=1)
    df["ds"] = df.index

    return df[["ds", "y"]].reset_index(drop=True)


def train_and_forecast(df, years_ahead=10):
    """
    Train a Prophet model and forecast years_ahead into the future.
    Returns a monthly forecast dataframe with columns ds, yhat.
    """
    m = Prophet(
        yearly_seasonality=True,
        weekly_seasonality=False,
        daily_seasonality=False,
    )
    m.fit(df)

    future = m.make_future_dataframe(periods=365 * years_ahead, freq="D")
    forecast = m.predict(future)

    # Downsample to monthly so the JSON stays small
    forecast_monthly = (
        forecast[["ds", "yhat"]]
        .set_index("ds")
        .resample("M")
        .mean()
        .reset_index()
    )
    return forecast_monthly


def find_next_peak_year(history_df, forecast_monthly):
    """
    Very simple 'next revival' heuristic:
    - Look only at dates after the last point in the historical data
    - Take the top 20% of predicted values
    - Return the earliest year among those high points
    """
    last_hist_date = pd.to_datetime(history_df["ds"]).max()
    future = forecast_monthly[forecast_monthly["ds"] > last_hist_date].copy()
    if future.empty:
        return None

    threshold = np.percentile(future["yhat"], 80)  # top 20%
    high_points = future[future["yhat"] >= threshold]
    if high_points.empty:
        return None

    year = high_points["ds"].dt.year.min()
    return int(year)


def main():
    pytrends = TrendReq(hl="en-US", tz=360)
    predictions = {}

    for decade, queries in STYLE_QUERIES.items():
        print(f"Processing {decade}...")
        hist = fetch_series_for_decade(pytrends, decade, queries)
        forecast = train_and_forecast(hist, years_ahead=10)
        year = find_next_peak_year(hist, forecast)

        predictions[decade] = {
            "nextRevivalYear": year,
            # Optional: you could also add the highest predicted value, etc.
        }

    # Path to your React data folder
    output_path = os.path.join(
        os.path.dirname(os.path.dirname(__file__)),
        "src",
        "data",
        "retroPredictions.json",
    )

    os.makedirs(os.path.dirname(output_path), exist_ok=True)

    with open(output_path, "w") as f:
        json.dump(predictions, f, indent=2)

    print("Saved predictions to:", output_path)
    print(json.dumps(predictions, indent=2))


if __name__ == "__main__":
    main()