import { Timeline } from "@/components/Timeline";
import heroImage from "@/assets/hero-fashion.jpg";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center hero-animate"
          style={{
            backgroundImage: `url(${heroImage})`,
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-background" />
        </div>

        <div className="relative z-10 text-center space-y-6 px-4 max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold text-white tracking-tight">
            Fashion Through the Decades
          </h1>
          <p className="text-xl md:text-2xl text-white/90 max-w-2xl mx-auto">
            Explore iconic styles from the 1970s to 2000s and discover where to shop for your favorite era
          </p>
        </div>
      </section>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-16">
        <Timeline />
      </main>

      {/* Footer */}
      <footer className="mt-24 py-8 bg-gradient-to-t from-[#FFF3AE] via-[#FFF3AE]/40 to-[#441634]">
        <div className="max-w-7xl mx-auto px-4 text-center text-sm text-[#441634]">
          <p>Discover your perfect shopping destinations based on your unique style</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
