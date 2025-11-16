import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface Period {
  decade: string;
  route: string;
  title: string;
  description: string;
  keyStyles: string[];
}

const periods: Period[] = [
  {
    decade: "1970s",
    route: "1970s",
    title: "Disco & Bohemian",
    description: "Bold patterns, bell-bottoms, platform shoes, and free-spirited bohemian vibes defined this era of self-expression.",
    keyStyles: ["Bell-bottoms", "Platform shoes", "Disco fashion", "Bohemian style"]
  },
  {
    decade: "1980s",
    route: "1980s",
    title: "Power & Pop",
    description: "Bold colors, power suits, athletic wear, and MTV-inspired fashion created an era of excess and confidence.",
    keyStyles: ["Power suits", "Neon colors", "Athletic wear", "Big hair accessories"]
  },
  {
    decade: "1990s",
    route: "1990s",
    title: "Grunge & Minimalism",
    description: "Flannel shirts, baggy jeans, slip dresses, and minimalist aesthetics reflected a more relaxed, anti-fashion attitude.",
    keyStyles: ["Grunge fashion", "Slip dresses", "Baggy jeans", "Minimalist style"]
  },
  {
    decade: "2000s",
    route: "2000s",
    title: "Y2K & Hip-Hop",
    description: "Low-rise jeans, velour tracksuits, bling culture, and futuristic aesthetics marked the turn of the millennium.",
    keyStyles: ["Low-rise jeans", "Velour tracksuits", "Bling accessories", "Pop punk style"]
  }
];

export const Timeline = () => {
  const navigate = useNavigate();

  return (
    <div className="space-y-12">
      <div className="text-center space-y-4">
        <h2 className="text-3xl md:text-4xl font-bold text-[#717744]">
          Explore Fashion Through Time
        </h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Journey through decades of iconic style. Click on any era to discover its fashion, shopping destinations, and cultural impact.
        </p>
      </div>

      <div className="relative">
        {/* Timeline line */}
        <div className="hidden md:block absolute left-0 right-0 top-1/2 h-1 bg-border -translate-y-1/2" />
        
        {/* Timeline periods */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative z-10">
          {periods.map((period) => (
            <Card
              key={period.decade}
              className="p-6 space-y-4 hover:shadow-lg transition-all duration-300 cursor-pointer bg-[#FFF3AE] border-2 hover:border-primary"
              onClick={() => navigate(`/style/${period.route}`)}
            >
              <div className="space-y-2">
                <div className="text-4xl font-bold text-primary">{period.decade}</div>
                <h3 className="text-xl font-semibold text-foreground">{period.title}</h3>
              </div>
              
              <p className="text-sm text-muted-foreground leading-relaxed">
                {period.description}
              </p>

              <div className="space-y-2">
                <p className="text-xs font-semibold text-foreground uppercase tracking-wide">Key Styles:</p>
                <div className="flex flex-wrap gap-2">
                  {period.keyStyles.map((style) => (
                    <span
                      key={style}
                      className="text-xs px-2 py-1 rounded-full bg-secondary text-secondary-foreground"
                    >
                      {style}
                    </span>
                  ))}
                </div>
              </div>

              <Button className="w-full bg-[#373D20] text-white hover:bg-[#2c3119] border-none">
                Explore {period.decade}
              </Button>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};
