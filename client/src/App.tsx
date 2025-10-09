import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Home from "@/pages/home";
import SliceDetail from "@/pages/slice-detail";
import Whitepaper from "@/pages/legal/whitepaper";
import SmartContract from "@/pages/legal/smart-contract";
import Documentation from "@/pages/legal/documentation";
import Roadmap from "@/pages/legal/roadmap";
import Terms from "@/pages/legal/terms";
import Privacy from "@/pages/legal/privacy";
import Contact from "@/pages/legal/contact";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/nft/:number" component={SliceDetail} />
      <Route path="/whitepaper" component={Whitepaper} />
      <Route path="/smart-contract" component={SmartContract} />
      <Route path="/documentation" component={Documentation} />
      <Route path="/roadmap" component={Roadmap} />
      <Route path="/terms" component={Terms} />
      <Route path="/privacy" component={Privacy} />
      <Route path="/contact" component={Contact} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <div className="relative min-h-screen">
          {/* Background Orbs */}
          <div className="bg-orb bg-orb-1 animate-float"></div>
          <div className="bg-orb bg-orb-2 animate-float" style={{ animationDelay: '-2s' }}></div>
          <div className="bg-orb bg-orb-3 animate-float" style={{ animationDelay: '-4s' }}></div>
          
          <Router />
        </div>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
