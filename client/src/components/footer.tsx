import { Link } from 'wouter';

export default function Footer() {
  return (
    <footer className="relative border-t border-white/10 bg-background/50 backdrop-blur-sm mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center font-display font-bold text-lg">
                NT
              </div>
              <div>
                <div className="font-display font-bold text-lg gradient-text">NFTrillions</div>
                <div className="text-xs text-muted-foreground">Satirical Debt Art</div>
              </div>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              A satirical, educational digital art project chronicling U.S. national debt milestones.
            </p>
          </div>

          {/* About */}
          <div>
            <h3 className="font-display font-semibold mb-4">About</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/whitepaper" className="text-sm text-muted-foreground hover:text-foreground transition-colors" data-testid="link-footer-whitepaper">
                  Whitepaper
                </Link>
              </li>
              <li>
                <Link href="/smart-contract" className="text-sm text-muted-foreground hover:text-foreground transition-colors" data-testid="link-footer-smart-contract">
                  Smart Contract
                </Link>
              </li>
              <li>
                <Link href="/documentation" className="text-sm text-muted-foreground hover:text-foreground transition-colors" data-testid="link-footer-documentation">
                  Documentation
                </Link>
              </li>
              <li>
                <Link href="/roadmap" className="text-sm text-muted-foreground hover:text-foreground transition-colors" data-testid="link-footer-roadmap">
                  Roadmap
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-display font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/terms" className="text-sm text-muted-foreground hover:text-foreground transition-colors" data-testid="link-footer-terms">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-sm text-muted-foreground hover:text-foreground transition-colors" data-testid="link-footer-privacy">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-display font-semibold mb-4">Contact</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/contact" className="text-sm text-muted-foreground hover:text-foreground transition-colors" data-testid="link-footer-contact">
                  Get in Touch
                </Link>
              </li>
              <li>
                <a href="mailto:contact@nftrillions.xyz" className="text-sm text-muted-foreground hover:text-foreground transition-colors" data-testid="link-footer-email">
                  contact@nftrillions.xyz
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="mt-8 pt-8 border-t border-white/10">
          <p className="text-xs text-muted-foreground leading-relaxed max-w-4xl" data-testid="text-footer-disclaimer">
            <strong>Important:</strong> NFTrillions is a satirical, educational digital art project. It is not a financial product, investment, or security. NFTs sold or displayed on this website have no expectation of profit and do not represent ownership in any asset, entity, or government instrument. Data is sourced from public information such as U.S. Treasury APIs and is provided "as is" for educational and artistic purposes only. By using this website, you acknowledge that NFTrillions and its creators are not affiliated with any government agency, financial institution, or investment entity.
          </p>
        </div>

        {/* Copyright */}
        <div className="mt-8 text-center text-sm text-muted-foreground">
          <p data-testid="text-footer-copyright">© {new Date().getFullYear()} NFTrillions. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
