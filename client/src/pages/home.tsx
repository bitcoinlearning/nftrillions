import GlassmorphicNav from "@/components/glassmorphic-nav";
import HeroSection from "@/components/hero-section";
import LiveStats from "@/components/live-stats";
import CollectionsBrowser from "@/components/collections-browser";
import FaqSection from "@/components/faq-section";
import Footer from "@/components/footer";

export default function Home() {
  return (
    <div className="min-h-screen">
      <GlassmorphicNav />
      <HeroSection />
      <LiveStats />
      
      {/* How It Works */}
      <section id="how" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-display text-3xl md:text-5xl font-bold mb-4">How It Works</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Simple rules, transparent supply, immortalized on-chain
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="group glass-strong rounded-2xl p-8 border border-white/10 hover:border-primary/50 transition-all-300 hover:scale-105">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
              </div>
              <h3 className="font-display text-xl font-bold mb-3">Solana Launch</h3>
              <p className="text-muted-foreground leading-relaxed">
                We're launching on Solana with a hard cap of <strong className="text-foreground">1,000 NFTs</strong>. 
                Each represents a <strong className="text-foreground">$100B</strong> debt milestone in U.S. history.
              </p>
            </div>

            <div className="group glass-strong rounded-2xl p-8 border border-white/10 hover:border-secondary/50 transition-all-300 hover:scale-105">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-secondary to-accent flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="font-display text-xl font-bold mb-3">Smart Unlock Logic</h3>
              <p className="text-muted-foreground leading-relaxed">
                As official U.S. debt increases, the next slice is released from the treasury wallet. 
                All drops are announced with <strong className="text-foreground">on-chain proofs</strong>.
              </p>
            </div>

            <div className="group glass-strong rounded-2xl p-8 border border-white/10 hover:border-accent/50 transition-all-300 hover:scale-105">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-accent to-primary flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="font-display text-xl font-bold mb-3">Creator Royalties</h3>
              <p className="text-muted-foreground leading-relaxed">
                Creator fees set at <strong className="text-foreground">5%</strong> in metadata, 
                honored where marketplaces enforce royalties for sustainable development.
              </p>
            </div>

            <div className="group glass-strong rounded-2xl p-8 border border-white/10 hover:border-primary/50 transition-all-300 hover:scale-105">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary/80 to-secondary/80 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="font-display text-xl font-bold mb-3">Historical Context</h3>
              <p className="text-muted-foreground leading-relaxed">
                Each slice includes its own page with <strong className="text-foreground">curated headlines</strong> 
                and historical notes for that period.
              </p>
            </div>

            <div className="group glass-strong rounded-2xl p-8 border border-white/10 hover:border-secondary/50 transition-all-300 hover:scale-105">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-secondary/80 to-accent/80 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="font-display text-xl font-bold mb-3">Multi-Chain Future</h3>
              <p className="text-muted-foreground leading-relaxed">
                Bitcoin will host <strong className="text-foreground">100 NFTs</strong>, (1 for every $1T of debt). 
                BNB mirrors Solana's model. All on dedicated pages.
              </p>
            </div>

            <div className="group glass-strong rounded-2xl p-8 border border-white/10 hover:border-accent/50 transition-all-300 hover:scale-105">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-accent/80 to-primary/80 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                </svg>
              </div>
              <h3 className="font-display text-xl font-bold mb-3">Transparent Supply</h3>
              <p className="text-muted-foreground leading-relaxed">
                All mint logic is <strong className="text-foreground">verifiable on-chain</strong>. 
                Track releases in real-time and verify authenticity through smart contracts.
              </p>
            </div>
          </div>
        </div>
      </section>

      <CollectionsBrowser />
      <FaqSection />
      
      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-primary via-secondary to-accent opacity-10 blur-3xl"></div>
            <div className="relative glass-strong rounded-3xl p-8 md:p-12 border border-white/10 text-center">
              <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
                Start Your Collection Today
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
                Own a piece of economic history. Each slice tells a story of fiscal policy, 
                political decisions, and the relentless march toward $100 trillion.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-4">
                <a 
                  href="#collections" 
                  className="px-8 py-4 rounded-xl bg-gradient-to-r from-primary to-secondary text-primary-foreground font-bold text-lg hover:shadow-2xl hover:shadow-primary/50 transition-all-300 hover:scale-105"
                  data-testid="button-browse-slices"
                >
                  Browse All Slices
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
