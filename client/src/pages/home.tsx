import GlassmorphicNav from "@/components/glassmorphic-nav";
import HeroSection from "@/components/hero-section";
import LiveStats from "@/components/live-stats";
import CollectionsBrowser from "@/components/collections-browser";
import FaqSection from "@/components/faq-section";

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
                Creator fees set at <strong className="text-foreground">5-10%</strong> in metadata, 
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
                Each slice includes its own page with <strong className="text-foreground">CPI data, interest rates</strong>, 
                curated headlines, and historical notes for that period.
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
                Bitcoin will host <strong className="text-foreground">100 Trillion Slices</strong> (1 per $1T). 
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

      {/* Footer */}
      <footer className="py-12 px-4 sm:px-6 lg:px-8 border-t border-white/10">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div className="md:col-span-2">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center font-display font-bold text-lg">
                  NT
                </div>
                <div className="font-display font-bold text-xl gradient-text">NFTrillions</div>
              </div>
              <p className="text-muted-foreground leading-relaxed mb-4">
                A satirical, educational NFT project chronicling U.S. debt on-chain. 
                1,000 $100B slices on Solana, each with historical context and economic data.
              </p>
              <div className="flex items-center gap-3">
                <a href="#" className="w-10 h-10 rounded-lg glass border border-white/10 flex items-center justify-center hover:border-primary transition-colors" aria-label="Twitter">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
                  </svg>
                </a>
                <a href="#" className="w-10 h-10 rounded-lg glass border border-white/10 flex items-center justify-center hover:border-primary transition-colors" aria-label="Discord">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.317 4.37a19.791 19.791 0 00-4.885-1.515.074.074 0 00-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 00-5.487 0 12.64 12.64 0 00-.617-1.25.077.077 0 00-.079-.037A19.736 19.736 0 003.677 4.37a.07.07 0 00-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 00.031.057 19.9 19.9 0 005.993 3.03.078.078 0 00.084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 00-.041-.106 13.107 13.107 0 01-1.872-.892.077.077 0 01-.008-.128 10.2 10.2 0 00.372-.292.074.074 0 01.077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 01.078.01c.12.098.246.198.373.292a.077.077 0 01-.006.127 12.299 12.299 0 01-1.873.892.077.077 0 00-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 00.084.028 19.839 19.839 0 006.002-3.03.077.077 0 00.032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 00-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"></path>
                  </svg>
                </a>
                <a href="#" className="w-10 h-10 rounded-lg glass border border-white/10 flex items-center justify-center hover:border-primary transition-colors" aria-label="GitHub">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"></path>
                  </svg>
                </a>
              </div>
            </div>

            <div>
              <h4 className="font-display font-bold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li><a href="#how" className="hover:text-foreground transition-colors">How It Works</a></li>
                <li><a href="#collections" className="hover:text-foreground transition-colors">Collections</a></li>
                <li><a href="#faq" className="hover:text-foreground transition-colors">FAQ</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-display font-bold mb-4">Resources</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li><a href="#" className="hover:text-foreground transition-colors">Whitepaper</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Smart Contract</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Documentation</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Roadmap</a></li>
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm text-muted-foreground">
              © 2024 NFTrillions. All rights reserved. | Built on Solana
            </p>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <a href="#" className="hover:text-foreground transition-colors">Terms</a>
              <span>•</span>
              <a href="#" className="hover:text-foreground transition-colors">Privacy</a>
              <span>•</span>
              <a href="#" className="hover:text-foreground transition-colors">Contact</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
