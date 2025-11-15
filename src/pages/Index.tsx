import { useState } from "react";
import { StyleForm } from "@/components/StyleForm";
import { ShoppingSites } from "@/components/ShoppingSites";
import heroImage from "@/assets/hero-fashion.jpg";

interface StylePreferences {
  categories: string[];
  colors: string[];
  aesthetics: string[];
}

const Index = () => {
  const [preferences, setPreferences] = useState<StylePreferences | null>(null);
  const [showResults, setShowResults] = useState(false);

  const handleStyleSubmit = (prefs: StylePreferences) => {
    setPreferences(prefs);
    setShowResults(true);
  };

  const handleReset = () => {
    setPreferences(null);
    setShowResults(false);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative h-[70vh] min-h-[500px] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${heroImage})`,
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-background" />
        </div>
        
        <div className="relative z-10 text-center space-y-6 px-4 max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold text-white tracking-tight">
            Discover Your Style
          </h1>
          <p className="text-xl md:text-2xl text-white/90 max-w-2xl mx-auto">
            Tell us what you love, and we'll connect you with the perfect shopping destinations
          </p>
        </div>
      </section>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-16 space-y-16">
        {!showResults ? (
          <section className="space-y-8">
            <div className="text-center space-y-4">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                What's Your Style?
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Select your preferences to get personalized shopping site recommendations
              </p>
            </div>
            <div className="max-w-4xl mx-auto">
              <StyleForm onSubmit={handleStyleSubmit} />
            </div>
          </section>
        ) : (
          <section className="space-y-8">
            {preferences && <ShoppingSites preferences={preferences} />}
            <div className="text-center">
              <button
                onClick={handleReset}
                className="text-muted-foreground hover:text-foreground underline transition-colors"
              >
                Update Your Preferences
              </button>
            </div>
          </section>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-border mt-24 py-8">
        <div className="max-w-7xl mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>Discover your perfect shopping destinations based on your unique style</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
