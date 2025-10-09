import { Link } from 'wouter';
import { ArrowLeft, Shield } from 'lucide-react';

export default function Privacy() {
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
              <Shield className="w-6 h-6" />
            </div>
            <h1 className="text-3xl md:text-4xl font-display font-bold gradient-text" data-testid="text-page-title">Privacy Policy</h1>
          </div>

          <div className="prose prose-invert max-w-none space-y-6">
            <div className="glass rounded-xl p-6 border border-primary/20 bg-primary/5">
              <p className="text-sm leading-relaxed" data-testid="text-disclaimer">
                <strong>Important Disclaimer:</strong> NFTrillions is a satirical, educational digital art project. It is not a financial product, investment, or security. NFTs sold or displayed on this website have no expectation of profit and do not represent ownership in any asset, entity, or government instrument. Data is sourced from public information such as U.S. Treasury APIs and is provided "as is" for educational and artistic purposes only. By using this website, you acknowledge that NFTrillions and its creators are not affiliated with any government agency, financial institution, or investment entity.
              </p>
            </div>

            <section>
              <h2 className="text-2xl font-display font-bold mb-4">1. Information We Collect</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                NFTrillions is designed to minimize data collection. We collect:
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                <li><strong>Website Analytics:</strong> Basic usage statistics (page views, device types, general location) via standard web analytics</li>
                <li><strong>Blockchain Data:</strong> Publicly visible Solana wallet addresses and transaction data (inherent to blockchain technology)</li>
                <li><strong>No Personal Information:</strong> We do not collect names, emails, phone numbers, or other personal identifiers</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-display font-bold mb-4">2. How We Use Information</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                The limited data we collect is used only to:
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                <li>Improve website performance and user experience</li>
                <li>Understand which features are most popular (analytics)</li>
                <li>Display NFT ownership on the blockchain (public by design)</li>
                <li>Provide real-time debt statistics from U.S. Treasury APIs</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-display font-bold mb-4">3. Cookies and Tracking</h2>
              <p className="text-muted-foreground leading-relaxed">
                We may use cookies for basic functionality (e.g., remembering your preferences like dark mode). No third-party advertising or tracking cookies are used. You can disable cookies in your browser settings.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-display font-bold mb-4">4. Third-Party Services</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                We integrate with the following third-party services:
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                <li><strong>U.S. Treasury APIs:</strong> We fetch public debt data from official government APIs</li>
                <li><strong>Solana Blockchain:</strong> NFT transactions are recorded on the public Solana blockchain</li>
                <li><strong>Hosting Provider:</strong> Website hosted on standard web infrastructure (Replit, SiteGround, etc.)</li>
              </ul>
              <p className="text-muted-foreground leading-relaxed mt-4">
                These services have their own privacy policies and we do not control their data practices.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-display font-bold mb-4">5. Blockchain Privacy</h2>
              <p className="text-muted-foreground leading-relaxed">
                NFT ownership and transactions are recorded on the Solana blockchain, which is public and permanent. Wallet addresses and transaction history are visible to anyone. This is an inherent feature of blockchain technology, not a privacy choice.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-display font-bold mb-4">6. Data Security</h2>
              <p className="text-muted-foreground leading-relaxed">
                We implement reasonable security measures to protect the minimal data we collect. However, no internet transmission is 100% secure. We cannot guarantee absolute security.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-display font-bold mb-4">7. Your Rights</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                You have the right to:
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                <li>Access any personal data we hold about you (though we collect minimal data)</li>
                <li>Request deletion of data (where technically feasible)</li>
                <li>Opt-out of analytics tracking using browser tools or ad blockers</li>
                <li>Contact us with privacy concerns at contact@nftrillions.xyz</li>
              </ul>
              <p className="text-muted-foreground leading-relaxed mt-4">
                Note: Blockchain data cannot be deleted due to the immutable nature of blockchain technology.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-display font-bold mb-4">8. Children's Privacy</h2>
              <p className="text-muted-foreground leading-relaxed">
                This website is not directed at children under 13. We do not knowingly collect data from children. If you believe a child has provided us with personal information, please contact us immediately.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-display font-bold mb-4">9. International Users</h2>
              <p className="text-muted-foreground leading-relaxed">
                This website is operated from the United States. If you access from other countries, your data may be transferred to and processed in the U.S. By using this site, you consent to such transfers.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-display font-bold mb-4">10. Changes to Privacy Policy</h2>
              <p className="text-muted-foreground leading-relaxed">
                We may update this privacy policy periodically. Changes will be posted on this page with an updated "Last Modified" date. Continued use of the website after changes constitutes acceptance.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-display font-bold mb-4">11. Contact Us</h2>
              <p className="text-muted-foreground leading-relaxed">
                Questions about privacy? Contact us at: <a href="mailto:contact@nftrillions.xyz" className="text-primary hover:underline">contact@nftrillions.xyz</a>
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
