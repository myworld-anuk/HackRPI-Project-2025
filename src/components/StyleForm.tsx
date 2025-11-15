import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Card } from "@/components/ui/card";

interface StylePreferences {
  categories: string[];
  colors: string[];
  aesthetics: string[];
}

interface StyleFormProps {
  onSubmit: (preferences: StylePreferences) => void;
}

const CATEGORIES = ["Casual", "Formal", "Athleisure", "Streetwear", "Vintage", "Minimalist"];
const COLORS = ["Black", "White", "Neutrals", "Earth Tones", "Pastels", "Bold Colors"];
const AESTHETICS = ["Modern", "Classic", "Edgy", "Romantic", "Sporty", "Bohemian"];

export const StyleForm = ({ onSubmit }: StyleFormProps) => {
  const [preferences, setPreferences] = useState<StylePreferences>({
    categories: [],
    colors: [],
    aesthetics: [],
  });

  const handleCheckboxChange = (type: keyof StylePreferences, value: string) => {
    setPreferences((prev) => {
      const currentValues = prev[type];
      const newValues = currentValues.includes(value)
        ? currentValues.filter((v) => v !== value)
        : [...currentValues, value];
      return { ...prev, [type]: newValues };
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(preferences);
  };

  const isValid = 
    preferences.categories.length > 0 || 
    preferences.colors.length > 0 || 
    preferences.aesthetics.length > 0;

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-semibold mb-4 text-foreground">Style Categories</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {CATEGORIES.map((category) => (
              <Card key={category} className="p-4 hover:shadow-lg transition-shadow cursor-pointer">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id={`category-${category}`}
                    checked={preferences.categories.includes(category)}
                    onCheckedChange={() => handleCheckboxChange("categories", category)}
                  />
                  <Label
                    htmlFor={`category-${category}`}
                    className="cursor-pointer text-sm font-medium"
                  >
                    {category}
                  </Label>
                </div>
              </Card>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4 text-foreground">Color Preferences</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {COLORS.map((color) => (
              <Card key={color} className="p-4 hover:shadow-lg transition-shadow cursor-pointer">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id={`color-${color}`}
                    checked={preferences.colors.includes(color)}
                    onCheckedChange={() => handleCheckboxChange("colors", color)}
                  />
                  <Label
                    htmlFor={`color-${color}`}
                    className="cursor-pointer text-sm font-medium"
                  >
                    {color}
                  </Label>
                </div>
              </Card>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4 text-foreground">Aesthetic</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {AESTHETICS.map((aesthetic) => (
              <Card key={aesthetic} className="p-4 hover:shadow-lg transition-shadow cursor-pointer">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id={`aesthetic-${aesthetic}`}
                    checked={preferences.aesthetics.includes(aesthetic)}
                    onCheckedChange={() => handleCheckboxChange("aesthetics", aesthetic)}
                  />
                  <Label
                    htmlFor={`aesthetic-${aesthetic}`}
                    className="cursor-pointer text-sm font-medium"
                  >
                    {aesthetic}
                  </Label>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>

      <Button
        type="submit"
        disabled={!isValid}
        className="w-full md:w-auto px-8 py-6 text-lg bg-accent hover:bg-accent/90 text-accent-foreground"
      >
        Discover Shopping Sites
      </Button>
    </form>
  );
};
