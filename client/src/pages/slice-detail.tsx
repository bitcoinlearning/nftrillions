import { useParams } from "wouter";
import { useQuery } from "@tanstack/react-query";
import GlassmorphicNav from "@/components/glassmorphic-nav";
import Footer from "@/components/footer";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ExternalLink, DollarSign, Calendar, TrendingUp, Users, Info } from "lucide-react";
import type { Slice } from "@shared/schema";

function numberToWords(num: number): string {
  if (num === 0) return "zero";
  
  const ones = ["", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine"];
  const teens = ["ten", "eleven", "twelve", "thirteen", "fourteen", "fifteen", "sixteen", "seventeen", "eighteen", "nineteen"];
  const tens = ["", "", "twenty", "thirty", "forty", "fifty", "sixty", "seventy", "eighty", "ninety"];
  
  function convertHundreds(n: number): string {
    let result = "";
    
    if (n >= 100) {
      result += ones[Math.floor(n / 100)] + " hundred";
      n %= 100;
      if (n > 0) result += " ";
    }
    
    if (n >= 10 && n < 20) {
      result += teens[n - 10];
    } else {
      if (n >= 20) {
        result += tens[Math.floor(n / 10)];
        n %= 10;
        if (n > 0) result += "-";
      }
      if (n > 0 && n < 10) {
        result += ones[n];
      }
    }
    
    return result;
  }
  
  const trillion = Math.floor(num / 1000000000000);
  const billion = Math.floor((num % 1000000000000) / 1000000000);
  const million = Math.floor((num % 1000000000) / 1000000);
  
  let result = "";
  
  if (trillion > 0) {
    result += convertHundreds(trillion) + " trillion";
  }
  
  if (billion > 0) {
    if (result) result += " ";
    result += convertHundreds(billion) + " billion";
  }
  
  if (million > 0) {
    if (result) result += " ";
    result += convertHundreds(million) + " million";
  }
  
  return result + " dollars";
}

export default function SliceDetail() {
  const { number } = useParams();
  
  const { data: slice, isLoading, error } = useQuery<Slice>({
    queryKey: [`/api/slices/${number}`],
    enabled: !!number,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen">
        <GlassmorphicNav />
        <div className="pt-32 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="skeleton h-8 w-32 mb-6"></div>
            <div className="skeleton h-12 w-3/4 mb-4"></div>
            <div className="skeleton h-96 w-full mb-8"></div>
            <div className="grid grid-cols-2 gap-4">
              <div className="skeleton h-24 w-full"></div>
              <div className="skeleton h-24 w-full"></div>
              <div className="skeleton h-24 w-full"></div>
              <div className="skeleton h-24 w-full"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !slice) {
    return (
      <div className="min-h-screen">
        <GlassmorphicNav />
        <div className="pt-32 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="font-display text-3xl font-bold mb-4">NFT Not Found</h1>
            <p className="text-muted-foreground mb-8">
              The NFT you're looking for doesn't exist or hasn't been released yet.
            </p>
            <Button asChild>
              <a href="/">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Home
              </a>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const headlines = slice.headlines ? JSON.parse(slice.headlines) : [];
  
  // Calculate debt amount in dollars (slice number * $100 billion)
  const debtInDollars = slice.number * 100000000000;
  const debtInWords = numberToWords(debtInDollars);

  return (
    <div className="min-h-screen">
      <GlassmorphicNav />
      
      <div className="pt-32 px-4 sm:px-6 lg:px-8 pb-20">
        <div className="max-w-4xl mx-auto">
          {/* Back Button */}
          <Button 
            variant="ghost" 
            asChild 
            className="mb-6 glass hover:glass-strong"
            data-testid="button-back-home"
          >
            <a href="/#collections">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Collections
            </a>
          </Button>

          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="font-display text-4xl md:text-6xl font-bold mb-4">
              NFT <span className="gradient-text">#{slice.number.toString().padStart(3, '0')}</span>
            </h1>
            <p className="text-xl text-muted-foreground">
              {slice.debtAmount} • {slice.dateReached}
            </p>
          </div>

          {/* NFT Preview */}
          <div className="mb-12">
            <div className="aspect-square max-w-md mx-auto rounded-2xl bg-gradient-to-br from-primary/20 to-secondary/20 border border-white/10 flex items-center justify-center">
              <div className="text-center">
                <div className="font-mono text-6xl md:text-8xl font-bold gradient-text mb-4">
                  #{slice.number.toString().padStart(3, '0')}
                </div>
                <div className="text-muted-foreground text-lg">{slice.debtAmount}</div>
              </div>
            </div>
          </div>

          {/* Key Stats */}
          <div className="space-y-4 mb-12">
            {/* Debt Level - Full Width */}
            <div className="glass rounded-xl p-6 text-center" data-testid="stat-debt-level">
              <div className="flex items-center justify-center mb-2">
                <DollarSign className="w-5 h-5 text-primary" />
              </div>
              <div className="text-sm text-muted-foreground mb-2">Debt Level</div>
              <div className="font-mono text-2xl md:text-3xl font-bold break-all mb-3">{slice.debtAmount}</div>
              <div className="text-sm text-muted-foreground italic capitalize">{debtInWords}</div>
            </div>
            
            {/* Date Reached - Full Width */}
            <div className="glass rounded-xl p-6 text-center" data-testid="stat-date-reached">
              <div className="flex items-center justify-center mb-2">
                <Calendar className="w-5 h-5 text-secondary" />
              </div>
              <div className="text-sm text-muted-foreground mb-2">Date Reached</div>
              <div className="font-mono text-xl font-bold">{slice.dateReached}</div>
            </div>
          </div>

          {/* President & Context */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {slice.president && (
              <div className="glass rounded-xl p-6" data-testid="section-president">
                <div className="flex items-center mb-3">
                  <Users className="w-5 h-5 text-primary mr-2" />
                  <h3 className="font-display text-lg font-bold">President</h3>
                </div>
                <p className="text-foreground font-semibold">{slice.president}</p>
              </div>
            )}
            
            <div className="glass rounded-xl p-6" data-testid="section-tier-info">
              <h3 className="font-display text-lg font-bold mb-3">Tier Information</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Tier:</span>
                  <span className="font-mono font-bold">{slice.tier}00</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Minted Value:</span>
                  <span className="font-mono font-bold">${slice.mintPrice}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Status:</span>
                  <span className={`font-semibold ${slice.isUnlocked ? 'text-primary' : 'text-muted-foreground'}`}>
                    {slice.isUnlocked ? 'Released' : 'Locked'}
                  </span>
                </div>
              </div>
              {!slice.isUnlocked && (
                <p className="text-xs text-muted-foreground mt-3 pt-3 border-t border-white/10" data-testid="locked-message">
                  This NFT hasn't been released yet. It will be automatically released when U.S. debt reaches this milestone.
                </p>
              )}
            </div>
          </div>

          {/* Minted Value Disclaimer */}
          <div className="glass rounded-xl p-5 mb-12 border border-primary/20 bg-primary/5" data-testid="section-minted-value-info">
            <div className="flex items-start gap-3">
              <Info className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
              <p className="text-sm text-muted-foreground leading-relaxed">
                <strong className="text-foreground">'Minted Value'</strong> refers to the symbolic release value assigned by the creator at the time of minting. All NFTs are creator-minted and may trade at different market prices based on collector demand.
              </p>
            </div>
          </div>

          {/* Historical Context */}
          {slice.historicalContext && (
            <div className="glass rounded-xl p-6 mb-8" data-testid="section-historical-context">
              <h3 className="font-display text-xl font-bold mb-4">Historical Context</h3>
              <p className="text-muted-foreground leading-relaxed text-lg">
                {slice.historicalContext}
              </p>
            </div>
          )}

          {/* Headlines */}
          {headlines.length > 0 && (
            <div className="glass rounded-xl p-6 mb-8" data-testid="section-headlines">
              <h3 className="font-display text-xl font-bold mb-4">Headlines from This Period</h3>
              <ul className="space-y-2">
                {headlines.map((headline: string, index: number) => (
                  <li 
                    key={index} 
                    className="flex items-start gap-3 text-muted-foreground"
                    data-testid={`headline-${index}`}
                  >
                    <span className="text-primary mt-2">•</span>
                    <span>{headline}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Action Buttons */}
          {slice.solanaAddress && (
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                variant="outline" 
                className="glass border-white/20 hover:glass-strong w-full"
                asChild
                data-testid="button-view-explorer"
              >
                <a href={`https://explorer.solana.com/address/${slice.solanaAddress}`} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  View on Solana Explorer
                </a>
              </Button>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}
