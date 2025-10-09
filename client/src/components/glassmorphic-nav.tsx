import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

const BASE_PATH = import.meta.env.BASE_URL || '/';

export default function GlassmorphicNav() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const getBasePath = () => {
    return BASE_PATH.endsWith('/') ? BASE_PATH.slice(0, -1) : BASE_PATH;
  };

  const isHomePage = () => {
    const basePath = getBasePath();
    return window.location.pathname === basePath || window.location.pathname === basePath + '/';
  };

  const handleAnchorClick = (href: string) => {
    setIsMenuOpen(false);
    if (href.startsWith('#')) {
      // Check if we're on the home page
      if (isHomePage()) {
        const element = document.querySelector(href);
        if (element) {
          const navHeight = 80;
          const targetPosition = element.getBoundingClientRect().top + window.scrollY - navHeight;
          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });
        }
      } else {
        // Navigate to home page with hash
        const basePath = getBasePath();
        window.location.href = `${basePath}/${href}`;
      }
    }
  };

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all-300 ${
        isScrolled ? 'glass-strong border-b border-white/10' : 'glass-strong border-b border-white/5'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            <div className="flex items-center gap-3" data-testid="brand-logo">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center font-display font-bold text-lg">
                NT
              </div>
              <div>
                <div className="font-display font-bold text-lg md:text-xl gradient-text">NFTrillions</div>
                <div className="text-xs text-muted-foreground hidden sm:block">Solana Debt Slices</div>
              </div>
            </div>
            
            <div className="hidden md:flex items-center gap-6" data-testid="nav-desktop-links">
              <a 
                href={getBasePath() || '/'} 
                onClick={(e) => { 
                  e.preventDefault(); 
                  if (isHomePage()) {
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  } else {
                    window.location.href = getBasePath() || '/';
                  }
                }}
                className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors"
                data-testid="nav-link-home"
              >
                Home
              </a>
              <a 
                href="#how" 
                onClick={(e) => { e.preventDefault(); handleAnchorClick('#how'); }}
                className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors"
                data-testid="nav-link-how"
              >
                How It Works
              </a>
              <a 
                href="#collections" 
                onClick={(e) => { e.preventDefault(); handleAnchorClick('#collections'); }}
                className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors"
                data-testid="nav-link-collections"
              >
                Collections
              </a>
              <a 
                href="#faq" 
                onClick={(e) => { e.preventDefault(); handleAnchorClick('#faq'); }}
                className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors"
                data-testid="nav-link-faq"
              >
                FAQ
              </a>
            </div>

            <div className="flex items-center gap-3">
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden glass hover:glass-strong transition-all-300"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                aria-label="Menu"
                data-testid="button-mobile-menu"
              >
                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          <div 
            className="fixed inset-0 bg-background/80 backdrop-blur-sm"
            onClick={() => setIsMenuOpen(false)}
          />
          <div className="fixed top-20 left-4 right-4 glass-strong rounded-2xl border border-white/20 p-6">
            <div className="space-y-4" data-testid="nav-mobile-links">
              <a 
                href={getBasePath() || '/'} 
                onClick={(e) => { 
                  e.preventDefault(); 
                  setIsMenuOpen(false); 
                  if (isHomePage()) {
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  } else {
                    window.location.href = getBasePath() || '/';
                  }
                }}
                className="block text-lg font-medium text-foreground hover:text-primary transition-colors"
                data-testid="nav-mobile-link-home"
              >
                Home
              </a>
              <a 
                href="#how" 
                onClick={(e) => { e.preventDefault(); handleAnchorClick('#how'); }}
                className="block text-lg font-medium text-foreground hover:text-primary transition-colors"
                data-testid="nav-mobile-link-how"
              >
                How It Works
              </a>
              <a 
                href="#collections" 
                onClick={(e) => { e.preventDefault(); handleAnchorClick('#collections'); }}
                className="block text-lg font-medium text-foreground hover:text-primary transition-colors"
                data-testid="nav-mobile-link-collections"
              >
                Collections
              </a>
              <a 
                href="#faq" 
                onClick={(e) => { e.preventDefault(); handleAnchorClick('#faq'); }}
                className="block text-lg font-medium text-foreground hover:text-primary transition-colors"
                data-testid="nav-mobile-link-faq"
              >
                FAQ
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
