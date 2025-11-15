import { Card } from "@/components/ui/card";
import { ExternalLink } from "lucide-react";

interface ShoppingSite {
  name: string;
  description: string;
  url: string;
  match: string[];
}

interface ShoppingSitesProps {
  preferences: {
    categories: string[];
    colors: string[];
    aesthetics: string[];
  };
}

const SHOPPING_SITES: ShoppingSite[] = [
  {
    name: "ASOS",
    description: "Trendy fashion for every style with thousands of brands",
    url: "https://www.asos.com",
    match: ["Casual", "Streetwear", "Modern", "Edgy"],
  },
  {
    name: "Nordstrom",
    description: "High-quality fashion from designer to contemporary",
    url: "https://www.nordstrom.com",
    match: ["Formal", "Classic", "Minimalist"],
  },
  {
    name: "Zara",
    description: "Fast fashion with European sophistication",
    url: "https://www.zara.com",
    match: ["Modern", "Minimalist", "Casual"],
  },
  {
    name: "Urban Outfitters",
    description: "Unique vintage and bohemian styles",
    url: "https://www.urbanoutfitters.com",
    match: ["Vintage", "Bohemian", "Edgy"],
  },
  {
    name: "Nike",
    description: "Premium athletic and streetwear",
    url: "https://www.nike.com",
    match: ["Athleisure", "Sporty", "Streetwear"],
  },
  {
    name: "Everlane",
    description: "Ethical minimalist fashion with transparent pricing",
    url: "https://www.everlane.com",
    match: ["Minimalist", "Modern", "Casual"],
  },
  {
    name: "Free People",
    description: "Bohemian clothing with romantic details",
    url: "https://www.freepeople.com",
    match: ["Bohemian", "Romantic", "Vintage"],
  },
  {
    name: "COS",
    description: "Contemporary minimalist fashion",
    url: "https://www.cosstores.com",
    match: ["Minimalist", "Modern", "Classic"],
  },
];

export const ShoppingSites = ({ preferences }: ShoppingSitesProps) => {
  const allPreferences = [
    ...preferences.categories,
    ...preferences.colors,
    ...preferences.aesthetics,
  ];

  const rankedSites = SHOPPING_SITES.map((site) => {
    const matchCount = site.match.filter((tag) =>
      allPreferences.some((pref) => pref.toLowerCase().includes(tag.toLowerCase()))
    ).length;
    return { ...site, matchCount };
  })
    .filter((site) => site.matchCount > 0)
    .sort((a, b) => b.matchCount - a.matchCount);

  const recommendedSites = rankedSites.length > 0 ? rankedSites : SHOPPING_SITES.slice(0, 6);

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold text-foreground">
          Your Personalized Shopping Destinations
        </h2>
        <p className="text-muted-foreground">
          Based on your style preferences, we recommend these sites
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {recommendedSites.slice(0, 6).map((site) => (
          <Card
            key={site.name}
            className="p-6 hover:shadow-xl transition-all duration-300 cursor-pointer group"
          >
            <div className="space-y-4">
              <div className="flex items-start justify-between">
                <h3 className="text-xl font-bold text-foreground group-hover:text-accent transition-colors">
                  {site.name}
                </h3>
                <ExternalLink className="h-5 w-5 text-muted-foreground group-hover:text-accent transition-colors" />
              </div>
              <p className="text-sm text-muted-foreground">{site.description}</p>
              <a
                href={site.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-sm font-medium text-accent hover:underline"
              >
                Visit Site
              </a>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
