import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ShoppingCart, User, Menu, X, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import MegaMenu from './MegaMenu';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [cartCount] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Accueil', href: '/' },
    { label: 'Sociétés textiles', href: '/societes-textiles' },
    { label: 'Toutes catégories', href: '#', hasMegaMenu: true },
    { label: 'À propos', href: '/a-propos' }
  ];

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled 
            ? 'bg-white/95 backdrop-blur-xl shadow-lg border-b border-border/50' 
            : 'bg-gradient-to-b from-black/30 to-transparent'
        }`}
      >
        <div className="section-container">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <a href="/" className="flex items-center gap-3 group">
              <motion.div 
                whileHover={{ scale: 1.05, rotate: 5 }}
                transition={{ type: "spring", stiffness: 400 }}
                className={`w-11 h-11 rounded-xl flex items-center justify-center transition-all duration-300 ${
                  isScrolled 
                    ? 'bg-primary shadow-md' 
                    : 'bg-white/20 backdrop-blur-sm border border-white/30'
                }`}
              >
                <span className={`font-heading font-bold text-xl ${
                  isScrolled ? 'text-primary-foreground' : 'text-white'
                }`}>S</span>
              </motion.div>
              <span className={`font-heading font-bold text-xl hidden sm:block transition-colors duration-300 ${
                isScrolled ? 'text-primary' : 'text-white'
              }`}>
                Salaate Bladi
              </span>
            </a>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <div
                  key={link.label}
                  className="relative"
                  onMouseEnter={() => link.hasMegaMenu && setIsMegaMenuOpen(true)}
                  onMouseLeave={() => link.hasMegaMenu && setIsMegaMenuOpen(false)}
                >
                  <a
                    href={link.href}
                    className={`px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 flex items-center gap-1.5 ${
                      isScrolled 
                        ? 'text-foreground hover:text-primary hover:bg-primary/5' 
                        : 'text-white/90 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    {link.label}
                    {link.hasMegaMenu && <ChevronDown className="w-4 h-4" />}
                  </a>
                </div>
              ))}
            </nav>

            {/* Right Actions */}
            <div className="flex items-center gap-2">
              {/* Search */}
              <AnimatePresence>
                {isSearchOpen && (
                  <motion.div
                    initial={{ width: 0, opacity: 0 }}
                    animate={{ width: 'auto', opacity: 1 }}
                    exit={{ width: 0, opacity: 0 }}
                    className="hidden md:block overflow-hidden"
                  >
                    <Input
                      type="text"
                      placeholder="Rechercher..."
                      className={`w-64 h-10 transition-all ${
                        isScrolled 
                          ? 'bg-secondary/20 border-border' 
                          : 'bg-white/10 border-white/20 text-white placeholder:text-white/60'
                      }`}
                      autoFocus
                    />
                  </motion.div>
                )}
              </AnimatePresence>
              
              <Button
                variant="ghost"
                size="icon"
                className={`h-10 w-10 rounded-xl transition-all duration-300 ${
                  isScrolled 
                    ? 'hover:bg-primary/5 text-foreground' 
                    : 'hover:bg-white/10 text-white'
                }`}
                onClick={() => setIsSearchOpen(!isSearchOpen)}
              >
                <Search className="h-5 w-5" />
              </Button>

              {/* Partner Button - Desktop */}
              <Button
                className={`hidden md:flex transition-all duration-300 font-semibold rounded-xl ${
                  isScrolled
                    ? 'bg-primary text-primary-foreground hover:bg-primary/90'
                    : 'bg-white/20 backdrop-blur-sm border border-white/30 text-white hover:bg-white/30'
                }`}
              >
                Devenir partenaire
              </Button>

              {/* User */}
              <Button
                variant="ghost"
                size="icon"
                className={`h-10 w-10 rounded-xl transition-all duration-300 ${
                  isScrolled 
                    ? 'hover:bg-primary/5 text-foreground' 
                    : 'hover:bg-white/10 text-white'
                }`}
              >
                <User className="h-5 w-5" />
              </Button>

              {/* Cart */}
              <Button
                variant="ghost"
                size="icon"
                className={`h-10 w-10 rounded-xl relative transition-all duration-300 ${
                  isScrolled 
                    ? 'hover:bg-primary/5 text-foreground' 
                    : 'hover:bg-white/10 text-white'
                }`}
              >
                <ShoppingCart className="h-5 w-5" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-accent text-accent-foreground text-xs flex items-center justify-center font-medium">
                    {cartCount}
                  </span>
                )}
              </Button>

              {/* Mobile Menu Toggle */}
              <Button
                variant="ghost"
                size="icon"
                className={`h-10 w-10 rounded-xl lg:hidden transition-all duration-300 ${
                  isScrolled 
                    ? 'hover:bg-primary/5 text-foreground' 
                    : 'hover:bg-white/10 text-white'
                }`}
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
            </div>
          </div>
        </div>

        {/* Mega Menu */}
        <AnimatePresence>
          {isMegaMenuOpen && (
            <MegaMenu
              isOpen={isMegaMenuOpen}
              onMouseEnter={() => setIsMegaMenuOpen(true)}
              onMouseLeave={() => setIsMegaMenuOpen(false)}
            />
          )}
        </AnimatePresence>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 lg:hidden"
          >
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsMobileMenuOpen(false)} />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25 }}
              className="absolute right-0 top-0 bottom-0 w-80 bg-white shadow-2xl"
            >
              <div className="p-6 pt-24">
                <nav className="flex flex-col gap-2">
                  {navLinks.map((link) => (
                    <a
                      key={link.label}
                      href={link.href}
                      className="px-4 py-3.5 rounded-xl text-foreground hover:bg-primary/5 hover:text-primary font-medium transition-all duration-200"
                    >
                      {link.label}
                    </a>
                  ))}
                </nav>
                <div className="mt-8 pt-6 border-t border-border">
                  <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90 rounded-xl h-12 font-semibold">
                    Devenir partenaire
                  </Button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;