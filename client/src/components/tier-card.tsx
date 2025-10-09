import { useState } from "react";
import { Slice } from "@shared/schema";
import { ChevronDown, Lock, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

interface TierCardProps {
  tier: number;
  slices: Slice[];
  price: number;
  range: string;
}

export default function TierCard({ tier, slices, price, range }: TierCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const unlockedSlices = slices.filter(slice => slice.isUnlocked);
  const lockedSlices = slices.filter(slice => !slice.isUnlocked);

  const getGradientClass = (tierNum: number) => {
    switch (tierNum) {
      case 1: return "from-primary to-secondary";
      case 2: return "from-secondary to-accent";
      case 3: return "from-accent to-primary";
      default: return "from-primary/50 to-accent/50";
    }
  };

  const getBorderClass = (tierNum: number) => {
    switch (tierNum) {
      case 1: return "border-primary/30 hover:border-primary";
      case 2: return "border-secondary/30 hover:border-secondary";
      case 3: return "border-accent/30 hover:border-accent";
      default: return "border-white/30 hover:border-white/50";
    }
  };

  return (
    <div className="tier-card glass-strong rounded-3xl overflow-hidden border border-white/10" data-testid={`tier-card-${tier}`}>
      <button 
        className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-white/5 transition-colors"
        onClick={() => setIsExpanded(!isExpanded)}
        aria-expanded={isExpanded}
        aria-label={`Toggle ${price} tier details`}
        data-testid={`tier-toggle-${tier}`}
      >
        <div className="flex items-center gap-4">
          <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${getGradientClass(tier)} flex items-center justify-center font-bold text-lg`}>
            {tier}
          </div>
          <div>
            <h3 className="font-display text-xl font-bold">{price} Tier</h3>
            <p className="text-sm text-muted-foreground">{range}</p>
          </div>
        </div>
        <div className="flex items-center gap-6">
          <div className="text-right hidden sm:block">
            <div className="font-mono text-2xl font-bold gradient-text" data-testid={`tier-price-${tier}`}>
              ${price}
            </div>
            <div className="text-xs text-muted-foreground">Minted Value</div>
          </div>
          <ChevronDown 
            className={`w-6 h-6 text-muted-foreground transition-transform ${
              isExpanded ? 'rotate-180' : ''
            }`} 
          />
        </div>
      </button>

      {isExpanded && (
        <div className="px-6 pb-6 pt-2 border-t border-white/10" data-testid={`tier-content-${tier}`}>
          {unlockedSlices.length > 0 || lockedSlices.length > 0 ? (
            <>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 mb-4">
                {/* Unlocked slices */}
                {unlockedSlices.map((slice) => (
                  <a 
                    key={slice.id}
                    href={`/nft/${slice.number}`} 
                    className={`slice-chip glass rounded-xl p-4 border ${getBorderClass(tier)} transition-all text-center group`}
                    data-testid={`slice-chip-${slice.number}`}
                  >
                    <div className="font-mono font-bold text-lg mb-1">
                      #{slice.number.toString().padStart(3, '0')}
                    </div>
                    <div className="text-xs text-muted-foreground">{slice.debtAmount}</div>
                    <div className="mt-2 text-xs text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                      View →
                    </div>
                  </a>
                ))}
                
                {/* Locked slices */}
                {lockedSlices.map((slice) => (
                  <div 
                    key={slice.id}
                    className="slice-chip locked glass rounded-xl p-4 border border-white/10 opacity-50 text-center cursor-not-allowed"
                    data-testid={`slice-chip-locked-${slice.number}`}
                  >
                    <div className="font-mono font-bold text-lg mb-1">
                      #{slice.number.toString().padStart(3, '0')}
                    </div>
                    <div className="text-xs text-muted-foreground">Locked</div>
                    <Lock className="w-4 h-4 mx-auto mt-2 text-muted-foreground" />
                  </div>
                ))}
              </div>
              <p className="text-xs text-muted-foreground">
                {lockedSlices.length > 0 
                  ? "Additional NFTs will be revealed as debt milestones are reached"
                  : "All NFTs in this tier are currently released"
                }
              </p>
            </>
          ) : (
            <div className="text-center py-8">
              <Lock className="w-16 h-16 mx-auto mb-4 text-muted-foreground opacity-50" />
              <p className="text-muted-foreground">This tier will unlock as U.S. debt reaches new milestones</p>
              <p className="text-sm text-muted-foreground mt-2">Check back soon for updates</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
