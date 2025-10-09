import { Link } from 'wouter';
import { ArrowLeft, BookOpen } from 'lucide-react';

export default function Documentation() {
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
              <BookOpen className="w-6 h-6" />
            </div>
            <h1 className="text-3xl md:text-4xl font-display font-bold gradient-text" data-testid="text-page-title">Documentation</h1>
          </div>

          <div className="prose prose-invert max-w-none space-y-6">
            <div className="glass rounded-xl p-6 border border-primary/20 bg-primary/5">
              <p className="text-sm leading-relaxed" data-testid="text-disclaimer">
                <strong>Important Disclaimer:</strong> NFTrillions is a satirical, educational digital art project. It is not a financial product, investment, or security. NFTs sold or displayed on this website have no expectation of profit and do not represent ownership in any asset, entity, or government instrument. Data is sourced from public information such as U.S. Treasury APIs and is provided "as is" for educational and artistic purposes only. By using this website, you acknowledge that NFTrillions and its creators are not affiliated with any government agency, financial institution, or investment entity.
              </p>
            </div>

            <section>
              <h2 className="text-2xl font-display font-bold mb-4">How NFTrillions Works</h2>
              <p className="text-muted-foreground leading-relaxed">
                NFTrillions creates a permanent, blockchain-based chronicle of U.S. national debt growth through 1,000 unique NFTs. This documentation explains the technical and conceptual framework.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-display font-bold mb-4">Data Sources</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                All debt data is sourced from official U.S. government APIs and cached for optimal performance:
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                <li><strong>Primary Source:</strong> U.S. Treasury FiscalData API (api.fiscaldata.treasury.gov)</li>
                <li><strong>Fallback Source:</strong> TreasuryDirect API (treasurydirect.gov)</li>
                <li><strong>Data Method:</strong> Live APIs (dev mode); cached exports (static hosting)</li>
                <li><strong>Update Frequency:</strong> Automated workflow runs every 12 hours to fetch fresh data</li>
                <li><strong>Historical Data:</strong> Interpolated from verified Treasury milestones</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-display font-bold mb-4">NFT Tier System</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                The collection is organized into 10 tiers, each containing 100 NFTs:
              </p>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="glass rounded-lg p-3">
                  <div className="font-medium">Tier 1</div>
                  <div className="text-muted-foreground">NFTs 1-100 • $100 minted value</div>
                </div>
                <div className="glass rounded-lg p-3">
                  <div className="font-medium">Tier 2</div>
                  <div className="text-muted-foreground">NFTs 101-200 • $200 minted value</div>
                </div>
                <div className="glass rounded-lg p-3">
                  <div className="font-medium">Tier 3</div>
                  <div className="text-muted-foreground">NFTs 201-300 • $300 minted value</div>
                </div>
                <div className="glass rounded-lg p-3">
                  <div className="font-medium">Tier 4</div>
                  <div className="text-muted-foreground">NFTs 301-400 • $400 minted value</div>
                </div>
                <div className="glass rounded-lg p-3">
                  <div className="font-medium">Tier 5</div>
                  <div className="text-muted-foreground">NFTs 401-500 • $500 minted value</div>
                </div>
                <div className="glass rounded-lg p-3">
                  <div className="font-medium">Tier 6</div>
                  <div className="text-muted-foreground">NFTs 501-600 • $600 minted value</div>
                </div>
                <div className="glass rounded-lg p-3">
                  <div className="font-medium">Tier 7</div>
                  <div className="text-muted-foreground">NFTs 601-700 • $700 minted value</div>
                </div>
                <div className="glass rounded-lg p-3">
                  <div className="font-medium">Tier 8</div>
                  <div className="text-muted-foreground">NFTs 701-800 • $800 minted value</div>
                </div>
                <div className="glass rounded-lg p-3">
                  <div className="font-medium">Tier 9</div>
                  <div className="text-muted-foreground">NFTs 801-900 • $900 minted value</div>
                </div>
                <div className="glass rounded-lg p-3">
                  <div className="font-medium">Tier 10</div>
                  <div className="text-muted-foreground">NFTs 901-1000 • $1000 minted value</div>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-display font-bold mb-4">Release Mechanism</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                NFTs are progressively "released" as real debt milestones are reached:
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                <li><strong>NFTs 1-389:</strong> Already released (historical debt has reached $38.9T)</li>
                <li><strong>NFTs 390-1000:</strong> Auto-release as debt crosses each $100B milestone</li>
                <li><strong>Current Debt:</strong> ~$37.8T (live from Treasury APIs)</li>
                <li><strong>Next Release:</strong> NFT #390 when debt reaches $39.0T</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-display font-bold mb-4">NFT Metadata</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Each NFT contains rich historical and economic data:
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                <li><strong>Debt Amount:</strong> Exact $100B increment (e.g., $15.0 Trillion)</li>
                <li><strong>Date Reached:</strong> When this milestone was historically achieved</li>
                <li><strong>Political Context:</strong> U.S. President during that period</li>
                <li><strong>Historical Events:</strong> Major headlines and context</li>
                <li><strong>Blockchain Data:</strong> On-chain address and minting timestamp</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-display font-bold mb-4">Technical Stack</h2>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                <li><strong>Blockchain:</strong> Initial launch on Solana; potential multi-chain support (BNB Smart Chain, Bitcoin, others TBD)</li>
                <li><strong>Frontend:</strong> React + TypeScript + Vite</li>
                <li><strong>API Integration:</strong> U.S. Treasury FiscalData API with automated 12-hour updates</li>
                <li><strong>Smart Contracts:</strong> Chain-specific standards (Metaplex for Solana, BEP-721/1155 for BSC, etc.)</li>
                <li><strong>Hosting:</strong> Static deployment (GitHub Pages, SiteGround)</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-display font-bold mb-4">Educational Use</h2>
              <p className="text-muted-foreground leading-relaxed">
                This project is designed for educational purposes: to visualize fiscal policy, encourage civic engagement, and demonstrate blockchain technology. It has no financial function and creates no expectation of profit.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
