import { Button } from "@/components/ui/button";

export default function HeroSection() {
  const handleAnchorClick = (href: string) => {
    if (href.startsWith('#')) {
      const element = document.querySelector(href);
      if (element) {
        const navHeight = 80;
        const targetPosition = element.getBoundingClientRect().top + window.scrollY - navHeight;
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    }
  };

  return (
    <section id="home" className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 animate-slide-up">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-primary/20 mb-6" data-testid="status-badge">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            <span className="text-sm font-medium">Live on Solana</span>
          </div>
          
          <h1 className="font-display text-4xl sm:text-5xl md:text-7xl font-bold mb-6 leading-tight" data-testid="hero-title">
            Own a Slice of the
            <br />
            <span className="gradient-text">$100 Trillion</span> Journey
          </h1>
          
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-8 leading-relaxed" data-testid="hero-description">
            NFTrillions is a satirical, educational NFT collection chronicling U.S. debt on-chain. 
            <strong className="text-foreground">1,000 unique slices</strong> — one for every $100B milestone — with historical context, data, and timestamps.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 mb-8">
            <Button 
              onClick={() => handleAnchorClick('#collections')}
              className="px-8 py-4 rounded-xl bg-gradient-to-r from-primary to-secondary text-primary-foreground font-bold text-lg hover:shadow-2xl hover:shadow-primary/50 transition-all-300 hover:scale-105"
              data-testid="button-explore-collections"
            >
              Explore Collections
            </Button>
            <Button 
              variant="outline"
              onClick={() => handleAnchorClick('#how')}
              className="px-8 py-4 rounded-xl glass border border-white/20 font-bold text-lg hover:glass-strong transition-all-300"
              data-testid="button-learn-more"
            >
              Learn More
            </Button>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 text-sm" data-testid="hero-stats">
            <div className="px-4 py-2 rounded-full glass border border-white/10" data-testid="stat-circulating">
              <span className="text-muted-foreground">Minted:</span>
              <span className="font-bold ml-2">378 / 1,000</span>
            </div>
            <div className="px-4 py-2 rounded-full glass border border-white/10" data-testid="stat-royalties">
              <span className="text-muted-foreground">Royalties:</span>
              <span className="font-bold ml-2">5-10%</span>
            </div>
            <div className="px-4 py-2 rounded-full glass border border-white/10" data-testid="stat-chain">
              <span className="text-muted-foreground">Chain:</span>
              <span className="font-bold ml-2">Solana</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
