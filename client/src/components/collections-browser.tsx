import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Search, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import TierCard from "./tier-card";
import type { Slice } from "@shared/schema";

export default function CollectionsBrowser() {
  const [searchQuery, setSearchQuery] = useState("");
  const [tierFilter, setTierFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  const { data: allSlices = [], isLoading } = useQuery<Slice[]>({
    queryKey: ["/api/slices"],
  });

  const { data: searchResults } = useQuery<Slice[]>({
    queryKey: ["/api/slices/search", { q: searchQuery }],
    enabled: searchQuery.length > 0,
  });

  const { data: filteredResults } = useQuery<Slice[]>({
    queryKey: ["/api/slices/filter", { 
      tier: tierFilter !== "all" ? parseInt(tierFilter) : undefined, 
      unlocked: statusFilter !== "all" ? statusFilter === "true" : undefined 
    }],
    enabled: tierFilter !== "all" || statusFilter !== "all",
  });

  // Determine which data to show
  const displaySlices = searchQuery 
    ? searchResults || []
    : (tierFilter !== "all" || statusFilter !== "all") 
      ? filteredResults || []
      : allSlices;

  // Group slices by tier
  const slicesByTier = displaySlices.reduce((acc: Record<number, Slice[]>, slice: Slice) => {
    if (!acc[slice.tier]) {
      acc[slice.tier] = [];
    }
    acc[slice.tier].push(slice);
    return acc;
  }, {});

  const tiers = [
    { tier: 1, price: 100, range: "Slices #001 — #100" },
    { tier: 2, price: 200, range: "Slices #101 — #200" },
    { tier: 3, price: 300, range: "Slices #201 — #300" },
    { tier: 4, price: 400, range: "Slices #301 — #400" },
    { tier: 5, price: 500, range: "Slices #401 — #500" },
    { tier: 6, price: 600, range: "Slices #501 — #600" },
    { tier: 7, price: 700, range: "Slices #601 — #700" },
    { tier: 8, price: 800, range: "Slices #701 — #800" },
    { tier: 9, price: 900, range: "Slices #801 — #900" },
    { tier: 10, price: 1000, range: "Slices #901 — #1,000" },
  ];

  const clearFilters = () => {
    setSearchQuery("");
    setTierFilter("all");
    setStatusFilter("all");
  };

  return (
    <section id="collections" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="font-display text-3xl md:text-5xl font-bold mb-4" data-testid="collections-title">
            Explore Collections
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
            Browse all debt slices by tier. Prices increase with historical significance.
          </p>

          {/* Search & Filter Bar */}
          <div className="max-w-2xl mx-auto">
            <div className="glass-strong rounded-2xl p-4 border border-white/10">
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="flex-1 relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input 
                    type="text" 
                    placeholder="Search by slice number or range..." 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-12 pr-4 py-3 bg-background/80 border border-white/10 rounded-xl text-white placeholder:text-muted-foreground focus:border-primary transition-colors"
                    data-testid="search-input"
                  />
                </div>
                
                <Select value={tierFilter} onValueChange={setTierFilter}>
                  <SelectTrigger 
                    className="w-full sm:w-32 bg-background/50 border border-white/10 rounded-xl text-foreground focus:border-primary"
                    data-testid="tier-filter"
                  >
                    <SelectValue placeholder="All Tiers" />
                  </SelectTrigger>
                  <SelectContent className="glass-strong border border-white/20">
                    <SelectItem value="all">All Tiers</SelectItem>
                    <SelectItem value="1">$100 Tier</SelectItem>
                    <SelectItem value="2">$200 Tier</SelectItem>
                    <SelectItem value="3">$300 Tier</SelectItem>
                    <SelectItem value="4">$400 Tier</SelectItem>
                    <SelectItem value="5">$500 Tier</SelectItem>
                    <SelectItem value="6">$600 Tier</SelectItem>
                    <SelectItem value="7">$700 Tier</SelectItem>
                    <SelectItem value="8">$800 Tier</SelectItem>
                    <SelectItem value="9">$900 Tier</SelectItem>
                    <SelectItem value="10">$1000 Tier</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger 
                    className="w-full sm:w-32 bg-background/50 border border-white/10 rounded-xl text-foreground focus:border-primary"
                    data-testid="status-filter"
                  >
                    <SelectValue placeholder="All Status" />
                  </SelectTrigger>
                  <SelectContent className="glass-strong border border-white/20">
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="true">Unlocked</SelectItem>
                    <SelectItem value="false">Locked</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              {(searchQuery || tierFilter !== "all" || statusFilter !== "all") && (
                <div className="mt-3 flex items-center justify-between">
                  <span className="text-sm text-muted-foreground" data-testid="results-count">
                    {displaySlices.length} slices found
                  </span>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={clearFilters}
                    className="text-primary hover:text-primary/80"
                    data-testid="clear-filters"
                  >
                    Clear filters
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="space-y-6">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="skeleton h-24 rounded-3xl"></div>
            ))}
          </div>
        )}

        {/* Tier Cards */}
        {!isLoading && (
          <div className="space-y-6" data-testid="tier-cards-container">
            {tiers.map(({ tier, price, range }) => {
              const tierSlices = slicesByTier[tier] || [];
              
              // Only show tier if it has slices or no filters are applied
              if (tierSlices.length === 0 && (searchQuery || tierFilter !== "all" || statusFilter !== "all")) {
                return null;
              }

              return (
                <TierCard 
                  key={tier}
                  tier={tier}
                  slices={tierSlices}
                  price={price}
                  range={range}
                />
              );
            })}
          </div>
        )}

        {/* No Results */}
        {!isLoading && displaySlices.length === 0 && (searchQuery || tierFilter !== "all" || statusFilter !== "all") && (
          <div className="text-center py-12">
            <Filter className="w-16 h-16 mx-auto mb-4 text-muted-foreground opacity-50" />
            <h3 className="font-display text-xl font-bold mb-2">No slices found</h3>
            <p className="text-muted-foreground mb-4">
              Try adjusting your search or filter criteria
            </p>
            <Button onClick={clearFilters} data-testid="clear-filters-cta">
              Clear all filters
            </Button>
          </div>
        )}

      </div>
    </section>
  );
}
