import { Link } from 'wouter';
import { ArrowLeft, FileCheck } from 'lucide-react';

export default function Terms() {
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
              <FileCheck className="w-6 h-6" />
            </div>
            <h1 className="text-3xl md:text-4xl font-display font-bold gradient-text" data-testid="text-page-title">Terms of Service</h1>
          </div>

          <div className="prose prose-invert max-w-none space-y-6">
            <div className="glass rounded-xl p-6 border border-primary/20 bg-primary/5">
              <p className="text-sm leading-relaxed" data-testid="text-disclaimer">
                <strong>Important Disclaimer:</strong> NFTrillions is a satirical, educational digital art project. It is not a financial product, investment, or security. NFTs sold or displayed on this website have no expectation of profit and do not represent ownership in any asset, entity, or government instrument. Data is sourced from public information such as U.S. Treasury APIs and is provided "as is" for educational and artistic purposes only. By using this website, you acknowledge that NFTrillions and its creators are not affiliated with any government agency, financial institution, or investment entity.
              </p>
            </div>

            <section>
              <h2 className="text-2xl font-display font-bold mb-4">1. Acceptance of Terms</h2>
              <p className="text-muted-foreground leading-relaxed">
                By accessing or using NFTrillions.xyz, you agree to these Terms of Service. If you do not agree, please do not use this website. These terms apply to all visitors, users, and others who access the service.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-display font-bold mb-4">2. Nature of the Project</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                NFTrillions is a satirical, educational digital art project. You acknowledge and agree that:
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                <li>This is NOT a financial product, investment, or security</li>
                <li>NFTs have no expectation of profit or financial return</li>
                <li>NFTs do not represent ownership in any asset, entity, or government instrument</li>
                <li>The project is for educational and artistic purposes only</li>
                <li>All content is provided for informational and satirical commentary</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-display font-bold mb-4">3. No Financial Advice</h2>
              <p className="text-muted-foreground leading-relaxed">
                Nothing on this website constitutes financial, investment, legal, or tax advice. You should consult with appropriate professionals before making any financial decisions. NFTrillions creators are not financial advisors and provide no recommendations regarding investments.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-display font-bold mb-4">4. Data Sources</h2>
              <p className="text-muted-foreground leading-relaxed">
                Debt data is sourced from public U.S. Treasury APIs and provided "as is" without warranty. While we strive for accuracy, we make no guarantees about the completeness, reliability, or timeliness of information. Historical context and economic data are compiled from publicly available sources for educational purposes.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-display font-bold mb-4">5. NFT Ownership</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                If you acquire an NFT from this project:
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                <li>You own only the NFT token itself (digital artwork)</li>
                <li>You gain no rights to underlying data, government instruments, or financial assets</li>
                <li>You may display and trade the NFT for personal collection purposes</li>
                <li>You acknowledge it is a collectible art piece with no inherent financial value</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-display font-bold mb-4">6. No Warranties</h2>
              <p className="text-muted-foreground leading-relaxed">
                The website and NFTs are provided "as is" without warranties of any kind, express or implied. We do not warrant that the service will be uninterrupted, error-free, or secure. Use at your own risk.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-display font-bold mb-4">7. Limitation of Liability</h2>
              <p className="text-muted-foreground leading-relaxed">
                NFTrillions and its creators shall not be liable for any direct, indirect, incidental, consequential, or punitive damages arising from your use of this website or NFTs. This includes any financial losses, data loss, or other damages.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-display font-bold mb-4">8. No Affiliation</h2>
              <p className="text-muted-foreground leading-relaxed">
                NFTrillions is not affiliated with, endorsed by, or connected to any government agency, the U.S. Treasury, financial institutions, or investment entities. This is an independent art project using public data.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-display font-bold mb-4">9. Prohibited Uses</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                You may not use this website to:
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                <li>Promote financial schemes or fraudulent investment opportunities</li>
                <li>Misrepresent the nature of the project as a financial product</li>
                <li>Violate any applicable laws or regulations</li>
                <li>Infringe on intellectual property rights</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-display font-bold mb-4">10. Changes to Terms</h2>
              <p className="text-muted-foreground leading-relaxed">
                We reserve the right to modify these terms at any time. Continued use of the website after changes constitutes acceptance of modified terms. Check this page regularly for updates.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-display font-bold mb-4">11. Governing Law</h2>
              <p className="text-muted-foreground leading-relaxed">
                These terms are governed by the laws of the United States. Any disputes shall be resolved in accordance with U.S. law.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-display font-bold mb-4">12. Contact</h2>
              <p className="text-muted-foreground leading-relaxed">
                Questions about these terms? Contact us at: <a href="mailto:contact@nftrillions.xyz" className="text-primary hover:underline">contact@nftrillions.xyz</a>
              </p>
            </section>

            <p className="text-sm text-muted-foreground italic pt-4">
              Last Updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
