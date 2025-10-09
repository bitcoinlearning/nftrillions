import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export default function FaqSection() {
  const faqs = [
    {
      id: "what-is-nftrillions",
      question: "What is NFTrillions?",
      answer: "NFTrillions is a satirical, educational NFT project that chronicles the rise of U.S. national debt on the blockchain. We release one unique NFT for every $100 billion increase in debt, capped at 1,000 total NFTs. Each NFT includes historical context, economic data, and timestamps of that moment in financial history."
    },
    {
      id: "unlock-mechanism",
      question: "How does the unlock mechanism work?",
      answer: "New NFTs are automatically released from the treasury wallet when official U.S. debt reaches each $100B milestone. All releases are verified on-chain and announced through our official channels with proof of the debt level at that moment."
    },
    {
      id: "tiered-pricing",
      question: "Why are prices tiered?",
      answer: "Pricing reflects historical significance and scarcity. Earlier NFTs (lower numbers) represent historic debt levels and are priced lower for accessibility. Later NFTs represent more recent debt accumulation and carry higher prices as they approach the 1,000 cap. This tiered model rewards early collectors while acknowledging growing significance."
    },
    {
      id: "included-data",
      question: "What data is included with each NFT?",
      answer: "Each NFT comes with its own dedicated page featuring: exact debt amount at that milestone, curated news headlines from that period, historical context notes, and information about who was in office. All data is sourced from official government sources."
    },
    {
      id: "other-blockchains",
      question: "Will there be other blockchain versions?",
      answer: "Yes! Bitcoin will host 100 \"Trillion Slices\" (1 NFT per $1 trillion), perfect for long-term hodlers. BNB Smart Chain will mirror Solana's $100B model. Each blockchain will have its own dedicated page and collection, allowing collectors to choose their preferred ecosystem while supporting the same educational mission."
    },
    {
      id: "royalties",
      question: "How are royalties handled?",
      answer: "Creator royalties are set at 5% in the NFT metadata. These royalties are automatically routed to the creator wallet whenever a secondary sale occurs on marketplaces that enforce royalty payments.\n\nAll creator fees are paid directly to the creator wallet and may be used entirely at the creator's discretion. This can include—but is not limited to—funding new art or development, covering infrastructure costs, producing educational content, supporting community events, or simply personal use by the creator. There are no guarantees that royalties will be used for any specific purpose.\n\nWe include this transparency because we believe creators should be fairly compensated for their work, and buyers should understand exactly how royalties are handled. These payments are not investments, they do not entitle holders to revenue or profits, and they do not create any financial relationship between the creator and collectors."
    }
  ];

  return (
    <section id="faq" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="font-display text-3xl md:text-5xl font-bold mb-4" data-testid="faq-title">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-muted-foreground">Everything you need to know about NFTrillions</p>
        </div>

        <Accordion type="single" collapsible className="space-y-4" data-testid="faq-accordion">
          {faqs.map((faq) => (
            <AccordionItem 
              key={faq.id} 
              value={faq.id}
              className="glass-strong rounded-2xl overflow-hidden border border-white/10 px-6"
              data-testid={`faq-item-${faq.id}`}
            >
              <AccordionTrigger className="py-5 hover:no-underline hover:bg-white/5 text-left text-lg font-semibold">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="pb-5 pt-2 text-muted-foreground leading-relaxed border-t border-white/10">
                {faq.answer.split('\n\n').map((paragraph, index) => (
                  <p key={index} className={index > 0 ? 'mt-4' : ''}>
                    {paragraph}
                  </p>
                ))}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
