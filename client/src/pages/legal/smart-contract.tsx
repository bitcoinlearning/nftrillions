import { Link } from 'wouter';
import { ArrowLeft, Code2 } from 'lucide-react';

export default function SmartContract() {
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
              <Code2 className="w-6 h-6" />
            </div>
            <h1 className="text-3xl md:text-4xl font-display font-bold gradient-text" data-testid="text-page-title">Smart Contract</h1>
          </div>

          <div className="prose prose-invert max-w-none space-y-6">
            <div className="glass rounded-xl p-6 border border-primary/20 bg-primary/5">
              <p className="text-sm leading-relaxed" data-testid="text-disclaimer">
                <strong>Important Disclaimer:</strong> NFTrillions is a satirical, educational digital art project. It is not a financial product, investment, or security. NFTs sold or displayed on this website have no expectation of profit and do not represent ownership in any asset, entity, or government instrument. Data is sourced from public information such as U.S. Treasury APIs and is provided "as is" for educational and artistic purposes only. By using this website, you acknowledge that NFTrillions and its creators are not affiliated with any government agency, financial institution, or investment entity.
              </p>
            </div>

            <section>
              <h2 className="text-2xl font-display font-bold mb-4">Smart Contract Overview</h2>
              <p className="text-muted-foreground leading-relaxed">
                NFTrillions NFTs are minted on the Solana blockchain using standard Metaplex protocols. The smart contracts are designed for transparency, security, and immutability.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-display font-bold mb-4">Contract Architecture</h2>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                <li><strong>Blockchain:</strong> Solana (mainnet-beta)</li>
                <li><strong>Token Standard:</strong> Metaplex NFT Standard</li>
                <li><strong>Minting Protocol:</strong> Controlled treasury wallet minting</li>
                <li><strong>Update Authority:</strong> Revoked after minting (immutable metadata)</li>
                <li><strong>Royalties:</strong> None (this is an art/educational project)</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-display font-bold mb-4">Metadata Structure</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Each NFT contains on-chain metadata including:
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                <li>Slice Number (1-1000)</li>
                <li>Debt Amount ($100B increments)</li>
                <li>Date Reached (historical or projected)</li>
                <li>Tier Classification (1-10)</li>
                <li>Economic Data (CPI, interest rates)</li>
                <li>Historical Context (presidency, major events)</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-display font-bold mb-4">Minting Process</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                NFTs are minted by the project creator as historical milestones are reached:
              </p>
              <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
                <li>Real-time debt data is fetched from U.S. Treasury APIs</li>
                <li>When a new $100B threshold is crossed, the corresponding NFT becomes eligible for minting</li>
                <li>Project creator mints the NFT with verified historical data</li>
                <li>NFT metadata is permanently stored on-chain</li>
                <li>Update authority is revoked (making it truly immutable)</li>
              </ol>
            </section>

            <section>
              <h2 className="text-2xl font-display font-bold mb-4">Security & Verification</h2>
              <p className="text-muted-foreground leading-relaxed">
                All smart contract interactions are transparent and verifiable on the Solana blockchain. The contract code follows Solana best practices and uses audited Metaplex libraries. No smart contract can modify economic data or create financial obligations.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-display font-bold mb-4">No Financial Function</h2>
              <p className="text-muted-foreground leading-relaxed">
                The smart contracts contain no financial logic, staking mechanisms, or profit-sharing features. They exist solely to create immutable digital art pieces with educational metadata. Ownership of an NFT grants no rights beyond personal collection and display.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-display font-bold mb-4">Open Source</h2>
              <p className="text-muted-foreground leading-relaxed">
                Contract code and minting logic will be made available for public review and educational purposes. This ensures complete transparency in how NFTs are created and managed.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
