// src/data/revivalHistory.ts

// Popularity is on a 0–100 scale, roughly indicating
// how “hot” that decade’s style was in that year.
// You can tweak these numbers to tell the story you want.

export const revivalHistory: Record<
  string,
  { year: number; popularity: number }[]
> = {
  "1970s": [
    { year: 1900, popularity: 5 },
    { year: 1920, popularity: 8 },
    { year: 1940, popularity: 10 },
    { year: 1960, popularity: 25 },
    { year: 1975, popularity: 95 }, // original peak
    { year: 1990, popularity: 40 },
    { year: 2000, popularity: 30 },
    { year: 2010, popularity: 55 },
    { year: 2020, popularity: 70 },
    { year: 2025, popularity: 72 },
  ],
  "1980s": [
    { year: 1900, popularity: 5 },
    { year: 1940, popularity: 6 },
    { year: 1960, popularity: 12 },
    { year: 1985, popularity: 98 }, // original peak
    { year: 1995, popularity: 35 },
    { year: 2005, popularity: 45 },
    { year: 2015, popularity: 70 },
    { year: 2023, popularity: 80 },
    { year: 2025, popularity: 82 },
  ],
  "1990s": [
    { year: 1900, popularity: 5 },
    { year: 1950, popularity: 6 },
    { year: 1970, popularity: 12 },
    { year: 1995, popularity: 95 }, // original peak
    { year: 2005, popularity: 50 },
    { year: 2015, popularity: 75 },
    { year: 2023, popularity: 90 },
    { year: 2025, popularity: 92 },
  ],
  "2000s": [
    { year: 1900, popularity: 5 },
    { year: 1960, popularity: 6 },
    { year: 1980, popularity: 12 },
    { year: 2005, popularity: 95 }, // original peak
    { year: 2012, popularity: 60 },
    { year: 2018, popularity: 70 },
    { year: 2024, popularity: 92 },
    { year: 2025, popularity: 94 },
  ],
};