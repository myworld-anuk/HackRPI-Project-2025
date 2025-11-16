import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, ExternalLink } from "lucide-react";
import heroImage from "@/assets/hero-fashion.jpg";
import predictions from "@/data/retroPredictions.json";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { revivalHistory } from "@/data/revivalHistory";

interface StyleData {
  decade: string;
  title: string;
  fullDescription: string;
  timeline: {
    year: string;
    event: string;
  }[];
  styleElements: {
    name: string;
    description: string;
  }[];
  shoppingSites: {
    name: string;
    url: string;
    description: string;
    priceRange: string;
  }[];
}

const styleData: Record<string, StyleData> = {
  "1970s": {
    decade: "1970s",
    title: "Disco & Bohemian Revolution",
    fullDescription: "The 1970s witnessed a fashion revolution that celebrated individuality and freedom. From the glittering dance floors of disco clubs to the laid-back bohemian movement, this decade embraced both glamour and natural aesthetics. Fashion became a form of self-expression, breaking away from the structured styles of previous decades.",
    timeline: [
      { year: "Early 1970s", event: "Bohemian and hippie styles continue from the 60s, featuring flowing fabrics and natural materials" },
      { year: "Mid 1970s", event: "Disco fashion emerges with platform shoes, bell-bottoms, and metallic fabrics" },
      { year: "Late 1970s", event: "Punk fashion begins to influence mainstream style with DIY aesthetics" }
    ],
    styleElements: [
      { name: "Bell-Bottom Pants", description: "Wide-legged pants that flared from the knee down, perfect for dancing" },
      { name: "Platform Shoes", description: "Chunky elevated shoes that added height and drama to any outfit" },
      { name: "Peasant Blouses", description: "Loose-fitting tops with embroidery and flowing sleeves" },
      { name: "Maxi Dresses", description: "Floor-length dresses in bold patterns and earthy tones" }
    ],
    shoppingSites: [
      { name: "ASOS Vintage", url: "https://www.asos.com", description: "Curated vintage-inspired 70s pieces", priceRange: "$30-$150" },
      { name: "ModCloth", url: "https://www.modcloth.com", description: "Retro bohemian and disco styles", priceRange: "$40-$200" },
      { name: "Urban Outfitters", url: "https://www.urbanoutfitters.com", description: "Modern takes on 70s classics", priceRange: "$50-$250" },
      { name: "Etsy Vintage", url: "https://www.etsy.com/c/vintage/clothing", description: "Authentic vintage 1970s pieces", priceRange: "$25-$300" }
    ]
  },
  "1980s": {
    decade: "1980s",
    title: "Power & Pop Culture",
    fullDescription: "The 1980s was an era of bold statements and unapologetic excess. Power dressing dominated corporate culture while MTV revolutionized fashion through music videos. Athletic wear became everyday fashion, and bright neon colors symbolized the optimism and energy of the decade. Fashion was about making an impact.",
    timeline: [
      { year: "Early 1980s", event: "Power dressing emerges with structured shoulder pads and bold silhouettes" },
      { year: "Mid 1980s", event: "MTV launches, making music video fashion highly influential" },
      { year: "Late 1980s", event: "Athletic wear and neon colors dominate street fashion" }
    ],
    styleElements: [
      { name: "Power Suits", description: "Structured blazers with dramatic shoulder pads for professional women" },
      { name: "Neon Everything", description: "Bright, fluorescent colors in clothing and accessories" },
      { name: "Leg Warmers", description: "Dance-inspired accessories that became everyday fashion" },
      { name: "Members Only Jackets", description: "Iconic zip-up jackets with distinctive collar and pockets" }
    ],
    shoppingSites: [
      { name: "Nasty Gal", url: "https://www.nastygal.com", description: "Bold 80s-inspired power pieces", priceRange: "$40-$180" },
      { name: "Revolve", url: "https://www.revolve.com", description: "Contemporary 80s glamour styles", priceRange: "$60-$300" },
      { name: "Boohoo", url: "https://www.boohoo.com", description: "Affordable 80s trend pieces", priceRange: "$20-$100" },
      { name: "ThredUp", url: "https://www.thredup.com", description: "Secondhand authentic 80s fashion", priceRange: "$15-$150" }
    ]
  },
  "1990s": {
    decade: "1990s",
    title: "Grunge & Minimalist Cool",
    fullDescription: "The 1990s rejected the excess of the 80s in favor of understated cool and authentic self-expression. Grunge brought flannel shirts and combat boots from Seattle to the mainstream, while minimalism offered a clean, sophisticated alternative. This decade valued comfort, individuality, and a more relaxed approach to fashion.",
    timeline: [
      { year: "Early 1990s", event: "Grunge style emerges from Seattle music scene with flannel and doc martens" },
      { year: "Mid 1990s", event: "Minimalism takes hold with slip dresses and simple silhouettes" },
      { year: "Late 1990s", event: "Hip-hop fashion and sportswear influence mainstream style" }
    ],
    styleElements: [
      { name: "Flannel Shirts", description: "Oversized plaid button-ups, often worn tied around the waist" },
      { name: "Combat Boots", description: "Chunky boots like Doc Martens that added edge to any outfit" },
      { name: "Slip Dresses", description: "Simple, silky dresses often layered over t-shirts" },
      { name: "Baggy Jeans", description: "Loose-fitting denim in light washes and relaxed cuts" }
    ],
    shoppingSites: [
      { name: "Zara", url: "https://www.zara.com", description: "Minimalist 90s-inspired pieces", priceRange: "$30-$200" },
      { name: "H&M", url: "https://www.hm.com", description: "Affordable grunge and 90s trends", priceRange: "$15-$100" },
      { name: "Reformation", url: "https://www.thereformation.com", description: "Sustainable 90s slip dresses and basics", priceRange: "$80-$300" },
      { name: "Depop", url: "https://www.depop.com", description: "Vintage 90s fashion marketplace", priceRange: "$10-$200" }
    ]
  },
  "2000s": {
    decade: "2000s",
    title: "Y2K & Hip-Hop Influence",
    fullDescription: "The 2000s embraced futuristic optimism mixed with hip-hop glamour and pop culture influences. Low-rise jeans, velour tracksuits, and bling accessories defined the era. Technology and celebrity culture heavily influenced fashion, creating a unique aesthetic that celebrated both casual comfort and red-carpet glamour.",
    timeline: [
      { year: "Early 2000s", event: "Y2K aesthetic brings metallic fabrics and futuristic styles" },
      { year: "Mid 2000s", event: "Celebrity fashion dominates with Paris Hilton and hip-hop influences" },
      { year: "Late 2000s", event: "Skinny jeans and indie fashion begin to emerge" }
    ],
    styleElements: [
      { name: "Low-Rise Jeans", description: "Ultra-low waisted denim that defined 2000s silhouettes" },
      { name: "Velour Tracksuits", description: "Matching zip-up sets in velour, often branded" },
      { name: "Bling Accessories", description: "Oversized jewelry, rhinestones, and logo-heavy pieces" },
      { name: "Babydoll Tops", description: "Empire waist tops with ruffles and embellishments" }
    ],
    shoppingSites: [
      { name: "Fashion Nova", url: "https://www.fashionnova.com", description: "Modern Y2K and hip-hop styles", priceRange: "$20-$120" },
      { name: "PrettyLittleThing", url: "https://www.prettylittlething.com", description: "Trendy 2000s-inspired pieces", priceRange: "$25-$150" },
      { name: "Dolls Kill", url: "https://www.dollskill.com", description: "Edgy Y2K and rave fashion", priceRange: "$30-$200" },
      { name: "Poshmark", url: "https://www.poshmark.com", description: "Secondhand 2000s authentic pieces", priceRange: "$10-$250" }
    ]
  }
};

const StyleDetail = () => {
  const { period } = useParams<{ period: string }>();
  const navigate = useNavigate();
  
  const data = period ? styleData[period] : null;
  
  if (!data) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="text-center space-y-4">
      <h1 className="text-3xl font-bold text-foreground">Style Not Found</h1>
      <Button onClick={() => navigate("/")}>
      <ArrowLeft className="mr-2" /> Back to Timeline
      </Button>
      </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-background">
    {/* Header */}
    <header className="relative overflow-hidden">
    <div
    className="absolute inset-0 bg-cover bg-center"
    style={{ backgroundImage: `url(${heroImage})` }}
    >
    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#441634]/40 to-[#441634]" />
    </div>
    
    <div className="relative max-w-7xl mx-auto px-4 py-10">
    <Button
    variant="ghost"
    onClick={() => navigate("/")}
    className="mb-4"
    >
    <ArrowLeft className="mr-2" /> Back to Timeline
    </Button>
    <div className="space-y-2">
    <div className="text-5xl font-bold text-primary">{data.decade}</div>
    <h1 className="text-3xl md:text-4xl font-bold text-[#717744]">
    {data.title}
    </h1>
    </div>
    </div>
    </header>
    
    <main className="max-w-7xl mx-auto px-4 py-12 space-y-16">
    {/* Overview */}
    <section className="space-y-6">
    <h2 className="text-2xl font-bold text-[#717744]">About This Era</h2>
    <p className="text-lg text-[#717744] leading-relaxed">
    {data.fullDescription}
    </p>
    </section>
    
    {/* Timeline */}
    <section className="space-y-6">
    <h2 className="text-2xl font-bold text-[#717744]">Fashion Timeline</h2>
    <div className="space-y-4">
    {data.timeline.map((item, index) => (
      <Card key={index} className="p-6 bg-[#FFF3AE]">
      <div className="flex items-start gap-4">
      <div className="flex-shrink-0 w-32 font-bold text-primary">
      {item.year}
      </div>
      <p className="text-[#717744]">{item.event}</p>
      </div>
      </Card>
    ))}
    </div>
    </section>

    {/* Revival Prediction */}
    <section className="space-y-6 mt-10">
      <h2 className="text-2xl font-bold text-[#717744]">Revival Prediction</h2>
      <div className="bg-[#FFF3AE] rounded-2xl p-6 shadow-md space-y-6">
        <div className="w-full h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={revivalHistory[data.decade] ?? []}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5d6a8" />
              <XAxis dataKey="year" stroke="#717744" />
              <YAxis stroke="#717744" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#FFF3AE",
                  borderRadius: "0.75rem",
                  border: "1px solid #A5668B",
                }}
                labelStyle={{ color: "#717744" }}
              />
              <Line
                type="monotone"
                dataKey="popularity"
                stroke="#A5668B"
                strokeWidth={3}
                dot={{ r: 4, stroke: "#441634", strokeWidth: 1, fill: "#A5668B" }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
        {predictions[data.decade] ? (
          <p className="text-[#717744]">
            Based on historical trend patterns and our forecasting model, we estimate
            the next major revival of {data.decade} style around
            <span className="font-semibold text-[#A5668B]">
              {" "}
              {predictions[data.decade].nextRevivalYear}
            </span>.
          </p>
        ) : (
          <p className="text-sm text-[#717744]">
            Prediction data for this era isn&apos;t available yet.
          </p>
        )}
        <p className="text-xs text-[#717744]">
          This visualization uses stylized historical trend data for educational and exploratory purposes.
        </p>
      </div>
    </section>
    
    {/* Style Elements */}
    <section className="space-y-6">
    <h2 className="text-2xl font-bold text-[#717744]">Signature Style Elements</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    {data.styleElements.map((element, index) => (
      <Card key={index} className="p-6 space-y-3 bg-[#FFF3AE]">
      <h3 className="text-lg font-semibold text-[#717744]">
      {element.name}
      </h3>
      <p className="text-[#717744]">{element.description}</p>
      </Card>
    ))}
    </div>
    </section>
    
    {/* Shopping Sites */}
    <section className="space-y-6">
    <div className="space-y-2">
    <h2 className="text-2xl font-bold text-[#717744]">Where to Shop</h2>
    <p className="text-[#717744]">
    Find authentic {data.decade} pieces and modern interpretations at these retailers
    </p>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    {data.shoppingSites.map((site, index) => (
      <Card key={index} className="p-6 space-y-4 bg-[#FFF3AE]">
      <div className="flex items-start justify-between">
      <div className="space-y-1">
      <h3 className="text-xl font-semibold text-[#717744]">
      {site.name}
      </h3>
      <p className="text-sm text-primary font-medium">
      {site.priceRange}
      </p>
      </div>
      <ExternalLink className="text-[#717744]" size={20} />
      </div>
      <p className="text-[#717744]">{site.description}</p>
      <Button
      className="w-full bg-[#A5668B] text-white hover:bg-[#8c4f73] border-none"
      onClick={() => window.open(site.url, "_blank")}
      >
      Visit Store
      </Button>
      </Card>
    ))}
    </div>
    </section>
    </main>
    
    {/* Footer */}
    <footer className="mt-24 py-8 bg-gradient-to-t from-[#FFF3AE] via-[#FFF3AE]/40 to-[#441634]">
    <div className="max-w-7xl mx-auto px-4 text-center text-sm text-[#717744]">
    <p>Discover fashion through the decades</p>
    </div>
    </footer>
    </div>
  );
};

export default StyleDetail;
