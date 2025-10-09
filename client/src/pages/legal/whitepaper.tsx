import { Link } from 'wouter';
import { ArrowLeft, FileText } from 'lucide-react';

export default function Whitepaper() {
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
              <FileText className="w-6 h-6" />
            </div>
            <h1 className="text-3xl md:text-4xl font-display font-bold gradient-text" data-testid="text-page-title">Whitepaper</h1>
          </div>

          <div className="prose prose-invert max-w-none space-y-6">
            <div className="glass rounded-xl p-6 border border-primary/20 bg-primary/5">
              <p className="text-sm leading-relaxed" data-testid="text-disclaimer">
                <strong>Important Disclaimer:</strong> NFTrillions is a satirical, educational digital art project. It is not a financial product, investment, or security. NFTs sold or displayed on this website have no expectation of profit and do not represent ownership in any asset, entity, or government instrument. Data is sourced from public information such as U.S. Treasury APIs and is provided "as is" for educational and artistic purposes only. By using this website, you acknowledge that NFTrillions and its creators are not affiliated with any government agency, financial institution, or investment entity.
              </p>
            </div>

            <section>
              <h2 className="text-2xl font-display font-bold mb-4">Project Overview</h2>
              <p className="text-muted-foreground leading-relaxed">
                NFTrillions is a satirical digital art project that chronicles the growth of U.S. national debt through 1,000 unique NFTs on blockchain technology. Each NFT represents a $100 billion milestone in the debt's history, creating a permanent, immutable record of fiscal policy. The project may deploy on multiple blockchains including Solana, BNB Smart Chain, Bitcoin, and others (TBD).
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-display font-bold mb-4">Artistic Concept</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                This project transforms abstract economic data into tangible digital artifacts. By minting NFTs at each $100 billion increment, we create a visual timeline that makes the scale of national debt comprehensible and thought-provoking.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Each NFT includes historical context, economic indicators (CPI, interest rates), political context (presidency), and major headlines from when that debt milestone was reached.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-display font-bold mb-4">Collection Structure</h2>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                <li>Total Supply: 1,000 NFTs (representing $0.1T to $100T)</li>
                <li>10 Tiers: 100 NFTs per tier with increasing minted values</li>
                <li>Progressive Unlocking: NFTs are "released" as real debt milestones are reached</li>
                <li>Blockchain: Initial launch on Solana, with potential expansion to BNB Smart Chain, Bitcoin, and other chains (TBD)</li>
                <li>Data Source: U.S. Treasury FiscalData API (official government data)</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-display font-bold mb-4">Educational Purpose</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                NFTrillions serves as an educational tool to:
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                <li>Visualize the scale and growth of national debt over time</li>
                <li>Provide historical context for major fiscal policy decisions</li>
                <li>Demonstrate blockchain technology's capability for immutable record-keeping</li>
                <li>Encourage civic engagement and economic literacy</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-display font-bold mb-4">No Financial Value</h2>
              <p className="text-muted-foreground leading-relaxed">
                These NFTs are digital art pieces with educational value only. They carry no financial rights, no expectation of profit, and no connection to actual government debt instruments. This is a meme project created for artistic expression and educational commentary.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-display font-bold mb-4">Open Source Ethos</h2>
              <p className="text-muted-foreground leading-relaxed">
                All data, smart contracts, and methodologies are transparent and verifiable. The project uses publicly available government data and open blockchain technology to ensure authenticity and educational integrity.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
