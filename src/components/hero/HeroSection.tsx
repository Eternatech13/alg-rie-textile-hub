import { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight, Building2, Package, MapPin, Clock, ChevronDown, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { mockProducts } from '@/data/mockProducts';

const HeroSection = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const stats = [
    { icon: Building2, value: '500+', label: 'Fournisseurs' },
    { icon: Package, value: '10K+', label: 'Produits' },
    { icon: MapPin, value: '48', label: 'Wilayas' },
    { icon: Clock, value: '24h', label: 'Réponse' },
  ];

  // Get featured products for the grid
  const featuredProducts = mockProducts.filter(p => p.featured).slice(0, 9);

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-primary">
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 opacity-10">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="hero-grid" width="80" height="80" patternUnits="userSpaceOnUse">
              <path d="M 80 0 L 0 0 0 80" fill="none" stroke="white" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#hero-grid)" />
        </svg>
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary to-primary/80" />

      {/* Content Container */}
      <div className="relative z-10 section-container py-24 md:py-32">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          {/* Left Column - Text Content */}
          <div className="text-left">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 mb-6"
            >
              <Sparkles className="w-4 h-4 text-accent" />
              <span className="text-sm font-medium text-white/90">
                La marketplace textile #1 en Algérie
              </span>
            </motion.div>

            {/* Title */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-white mb-6 leading-tight"
            >
              Votre partenaire de{' '}
              <span className="text-secondary">sourcing textile</span>{' '}
              de confiance
            </motion.h1>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-lg md:text-xl text-white/80 mb-8 max-w-xl leading-relaxed"
            >
              Des fournisseurs vérifiés, une qualité garantie et une livraison nationale — 
              Salaate Bladi simplifie les achats textiles pour les entreprises de toutes tailles.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex flex-col sm:flex-row items-start gap-4 mb-8"
            >
              <Button
                size="lg"
                className="bg-white text-primary hover:bg-white/90 rounded-full px-8 py-6 text-base font-semibold shadow-lg group"
              >
                <FileText className="mr-2 w-5 h-5" />
                Demander un produit
              </Button>
              
              <div className="flex items-center gap-3 text-white/80 text-sm max-w-xs">
                <span>
                  Pas de navigation interminable. Dites-nous simplement ce dont vous avez besoin, nous nous occupons du sourcing.
                </span>
              </div>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-8 border-t border-white/10"
            >
              {stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.7 + i * 0.1 }}
                  className="flex flex-col items-start gap-1"
                >
                  <div className="flex items-center gap-2">
                    <stat.icon className="w-4 h-4 text-accent" />
                    <span className="text-2xl font-heading font-bold text-white">
                      {stat.value}
                    </span>
                  </div>
                  <span className="text-xs text-white/60">{stat.label}</span>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Right Column - Product Grid with 3D Perspective */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="relative hidden lg:block"
          >
            <div 
              className="relative"
              style={{
                perspective: '1000px',
              }}
            >
              <div 
                className="grid grid-cols-3 gap-4"
                style={{
                  transform: 'rotateY(-8deg) rotateX(5deg)',
                  transformStyle: 'preserve-3d',
                }}
              >
                {featuredProducts.map((product, i) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 30, z: -50 }}
                    animate={{ opacity: 1, y: 0, z: 0 }}
                    transition={{ delay: 0.5 + i * 0.08 }}
                    className="relative aspect-square rounded-2xl overflow-hidden bg-white/10 backdrop-blur-sm border border-white/20 group hover:border-accent/50 transition-all duration-300"
                    style={{
                      transformStyle: 'preserve-3d',
                      transform: `translateZ(${(i % 3) * 10}px)`,
                    }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent" />
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500"
                    />
                    {/* Shine effect on hover */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </motion.div>
                ))}
              </div>

              {/* Decorative floating elements */}
              <motion.div
                animate={{ y: [-10, 10, -10] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-8 -right-8 w-24 h-24 rounded-full bg-accent/20 blur-2xl"
              />
              <motion.div
                animate={{ y: [10, -10, 10] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -bottom-8 -left-8 w-32 h-32 rounded-full bg-secondary/20 blur-2xl"
              />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom CTA - Découvrez nos secteurs */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="absolute bottom-8 right-8 z-20"
      >
        <Button
          size="lg"
          variant="ghost"
          className="text-white hover:bg-white/10 rounded-full px-6 py-6 text-base font-medium group"
        >
          <ChevronDown className="mr-2 w-5 h-5 animate-bounce" />
          Découvrez nos secteurs
        </Button>
      </motion.div>

      {/* Gradient fade at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
};

export default HeroSection;
