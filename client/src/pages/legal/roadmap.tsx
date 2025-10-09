import { Link } from 'wouter';
import { ArrowLeft, Map } from 'lucide-react';

export default function Roadmap() {
  return (
    <div className="min-h-screen pt-24 pb-16 px-4">
      <div className="max-w-4xl mx-auto">
        <Link href="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8" data-testid="link-back-home">
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>

        <div className="glass-strong rounded-3xl p-8 md:p-12 border border-white/20">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
              <Map className="w-6 h-6" />
            </div>
            <h1 className="text-3xl md:text-4xl font-display font-bold gradient-text" data-testid="text-page-title">Roadmap</h1>
          </div>

          <div className="prose prose-invert max-w-none space-y-6">
            <div className="glass rounded-xl p-6 border border-primary/20 bg-primary/5">
              <p className="text-sm leading-relaxed" data-testid="text-disclaimer">
                <strong>Important Disclaimer:</strong> NFTrillions is a satirical, educational digital art project. It is not a financial product, investment, or security. NFTs sold or displayed on this website have no expectation of profit and do not represent ownership in any asset, entity, or government instrument. Data is sourced from public information such as U.S. Treasury APIs and is provided "as is" for educational and artistic purposes only. By using this website, you acknowledge that NFTrillions and its creators are not affiliated with any government agency, financial institution, or investment entity.
              </p>
            </div>

            <section>
              <h2 className="text-2xl font-display font-bold mb-4">Project Vision</h2>
              <p className="text-muted-foreground leading-relaxed">
                NFTrillions is a long-term educational art project that evolves with U.S. fiscal policy. This roadmap outlines planned features and milestones, all focused on educational value and artistic expression.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-display font-bold mb-4">Phase 1: Foundation (Completed)</h2>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">✓</span>
                  <span>Website launch with animated debt counter</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">✓</span>
                  <span>Integration with U.S. Treasury FiscalData API (live in dev; cached for static hosting)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">✓</span>
                  <span>NFT metadata structure and tiered collection design</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">✓</span>
                  <span>Historical context and economic data integration</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">✓</span>
                  <span>Glassmorphic UI with mobile optimization</span>
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-display font-bold mb-4">Phase 2: Blockchain Integration (In Progress)</h2>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">◐</span>
                  <span>Solana smart contract deployment (Metaplex standard)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">◐</span>
                  <span>NFT minting as real debt milestones are reached</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">◐</span>
                  <span>On-chain metadata storage (immutable records)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">◐</span>
                  <span>Treasury wallet setup for controlled releases</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">◐</span>
                  <span>Multi-chain expansion: BNB Smart Chain, Bitcoin, and others (TBD)</span>
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-display font-bold mb-4">Phase 3: Community Features (Planned)</h2>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-muted-foreground/50 mt-1">○</span>
                  <span>Educational blog: fiscal policy deep-dives</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-muted-foreground/50 mt-1">○</span>
                  <span>Interactive debt timeline visualization</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-muted-foreground/50 mt-1">○</span>
                  <span>Historical comparison tools (debt across decades)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-muted-foreground/50 mt-1">○</span>
                  <span>Educational resources: economics 101, blockchain basics</span>
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-display font-bold mb-4">Phase 4: Expansion (Future)</h2>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-muted-foreground/50 mt-1">○</span>
                  <span>Multi-country debt tracking (global perspective)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-muted-foreground/50 mt-1">○</span>
                  <span>Open-source toolkit for civic data visualization</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-muted-foreground/50 mt-1">○</span>
                  <span>Partnership with educational institutions</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-muted-foreground/50 mt-1">○</span>
                  <span>Archive mode: historical snapshot preservation</span>
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-display font-bold mb-4">Long-Term Vision</h2>
              <p className="text-muted-foreground leading-relaxed">
                NFTrillions aims to become a permanent educational archive documenting fiscal history through blockchain technology. As the debt continues to grow (or potentially shrinks), each minted NFT serves as an immutable timestamp of economic policy and national priorities. This is art, satire, and education—never investment.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-display font-bold mb-4">No Promises</h2>
              <p className="text-muted-foreground leading-relaxed">
                This roadmap represents artistic and educational goals, not financial commitments. Features may change, be delayed, or cancelled based on project resources and creative direction. NFT holders gain no rights to demand feature implementation.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
