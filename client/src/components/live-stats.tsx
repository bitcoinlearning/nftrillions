import { useQuery } from "@tanstack/react-query";
import { useDebtCounter } from "@/hooks/use-debt-counter";
import { TrendingUp, Lock, Clock } from "lucide-react";
import type { DebtStats } from "@shared/schema";

export default function LiveStats() {
  const { data: debtStats, isLoading } = useQuery<DebtStats>({
    queryKey: ["/api/debt-stats"],
    refetchInterval: 60000, // Refetch every minute
  });

  const animatedDebt = useDebtCounter(debtStats?.currentDebt || "$37,000,000,000,000");

  if (isLoading || !debtStats) {
    return (
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="glass-strong rounded-3xl p-8 md:p-12 border border-white/10">
            <div className="text-center mb-10">
              <div className="skeleton h-8 w-64 mx-auto mb-2"></div>
              <div className="skeleton h-4 w-32 mx-auto"></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="skeleton h-32 rounded-2xl"></div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="glass-strong rounded-3xl p-8 md:p-12 border border-white/10">
          <div className="text-center mb-10">
            <h2 className="font-display text-2xl md:text-3xl font-bold mb-2" data-testid="live-stats-title">
              Real-Time Debt Tracker
            </h2>
            <p className="text-muted-foreground">Live data from official sources</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Current Debt */}
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary rounded-2xl opacity-0 group-hover:opacity-20 blur transition-opacity duration-300"></div>
              <div className="relative glass rounded-2xl p-6 border border-white/10 transition-all-300 group-hover:border-primary/50" data-testid="stat-current-debt">
                <div className="text-muted-foreground text-sm font-medium mb-2 flex items-center gap-2">
                  <TrendingUp className="w-5 h-5" />
                  Current U.S. Debt
                </div>
                <div 
                  className="font-mono text-3xl md:text-4xl font-bold gradient-text mb-2" 
                  data-testid="debt-counter"
                >
                  {animatedDebt}
                </div>
                <div className="text-xs text-muted-foreground">Updated every 60 seconds</div>
              </div>
            </div>

            {/* Unlocked Slices */}
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-secondary to-accent rounded-2xl opacity-0 group-hover:opacity-20 blur transition-opacity duration-300"></div>
              <div className="relative glass rounded-2xl p-6 border border-white/10 transition-all-300 group-hover:border-secondary/50" data-testid="stat-unlocked-slices">
                <div className="text-muted-foreground text-sm font-medium mb-2 flex items-center gap-2">
                  <Lock className="w-5 h-5" />
                  Unlocked on Solana
                </div>
                <div className="font-mono text-3xl md:text-4xl font-bold gradient-text-alt mb-2">
                  {debtStats.unlockedSlices} / 1,000
                </div>
                <div className="text-xs text-muted-foreground">1 NFT per +$100B</div>
              </div>
            </div>

            {/* Next Unlock */}
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-accent to-primary rounded-2xl opacity-0 group-hover:opacity-20 blur transition-opacity duration-300"></div>
              <div className="relative glass rounded-2xl p-6 border border-white/10 transition-all-300 group-hover:border-accent/50" data-testid="stat-next-unlock">
                <div className="text-muted-foreground text-sm font-medium mb-2 flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  Next Unlock At
                </div>
                <div className="font-mono text-3xl md:text-4xl font-bold gradient-text mb-2">
                  {debtStats.nextUnlockAt}
                </div>
                <div className="text-xs text-muted-foreground">
                  Releases Slice #{debtStats.unlockedSlices + 1}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
