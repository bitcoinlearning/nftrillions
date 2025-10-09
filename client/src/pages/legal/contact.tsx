import { Link } from 'wouter';
import { ArrowLeft, Mail, MessageCircle } from 'lucide-react';

export default function Contact() {
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
              <MessageCircle className="w-6 h-6" />
            </div>
            <h1 className="text-3xl md:text-4xl font-display font-bold gradient-text" data-testid="text-page-title">Contact Us</h1>
          </div>

          <div className="prose prose-invert max-w-none space-y-6">
            <div className="glass rounded-xl p-6 border border-primary/20 bg-primary/5">
              <p className="text-sm leading-relaxed" data-testid="text-disclaimer">
                <strong>Important Disclaimer:</strong> NFTrillions is a satirical, educational digital art project. It is not a financial product, investment, or security. NFTs sold or displayed on this website have no expectation of profit and do not represent ownership in any asset, entity, or government instrument. Data is sourced from public information such as U.S. Treasury APIs and is provided "as is" for educational and artistic purposes only. By using this website, you acknowledge that NFTrillions and its creators are not affiliated with any government agency, financial institution, or investment entity.
              </p>
            </div>

            <section>
              <h2 className="text-2xl font-display font-bold mb-4">Get in Touch</h2>
              <p className="text-muted-foreground leading-relaxed">
                We welcome questions, feedback, and educational inquiries about the NFTrillions project. Please note that we cannot provide financial or investment advice.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-display font-bold mb-4">Email</h2>
              <div className="glass rounded-xl p-6 border border-white/10">
                <div className="flex items-center gap-3 mb-2">
                  <Mail className="w-5 h-5 text-primary" />
                  <span className="font-medium">General Inquiries</span>
                </div>
                <a 
                  href="mailto:contact@nftrillions.xyz" 
                  className="text-primary hover:underline text-lg"
                  data-testid="link-email-contact"
                >
                  contact@nftrillions.xyz
                </a>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-display font-bold mb-4">What We Can Help With</h2>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                <li>Educational questions about the project concept and design</li>
                <li>Technical inquiries about data sources and blockchain implementation</li>
                <li>Media and press inquiries</li>
                <li>Bug reports and website feedback</li>
                <li>Partnership opportunities (educational institutions, civic organizations)</li>
                <li>General feedback and suggestions</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-display font-bold mb-4">What We Cannot Help With</h2>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                <li>Financial or investment advice (this is not a financial service)</li>
                <li>Tax guidance related to NFT ownership</li>
                <li>Legal advice about securities or government debt</li>
                <li>Guaranteed responses to price or value speculation</li>
                <li>Requests to modify blockchain records (technically impossible)</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-display font-bold mb-4">Response Time</h2>
              <p className="text-muted-foreground leading-relaxed">
                We strive to respond to all inquiries within 3-5 business days. Please note that NFTrillions is a small independent art project, and response times may vary during periods of high volume.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-display font-bold mb-4">Report an Issue</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                If you've encountered a technical issue or bug, please include:
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                <li>Description of the problem</li>
                <li>Steps to reproduce the issue</li>
                <li>Device and browser information</li>
                <li>Screenshots (if applicable)</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-display font-bold mb-4">Educational Partnerships</h2>
              <p className="text-muted-foreground leading-relaxed">
                We're open to collaborating with educational institutions, economics departments, and civic engagement organizations. If you're interested in using NFTrillions as a teaching tool or case study, please reach out with details about your program.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-display font-bold mb-4">Media & Press</h2>
              <p className="text-muted-foreground leading-relaxed">
                Journalists and media professionals: we're happy to provide background information, quotes, and technical details about the project. Please specify your publication and deadline in your inquiry.
              </p>
            </section>

            <div className="glass rounded-xl p-6 border border-primary/20 bg-primary/5 mt-8">
              <p className="text-sm text-muted-foreground italic">
                <strong>Reminder:</strong> NFTrillions is an independent satirical art project. We are not affiliated with any government agency, financial institution, or investment entity. All inquiries seeking official government information should be directed to the U.S. Treasury Department at fiscalservice.treasury.gov.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
