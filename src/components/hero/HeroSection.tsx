import { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Sparkles, Building2, Package, MapPin, Clock, ChevronDown, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { mockProducts } from '@/data/mockProducts';

const HeroSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const smoothX = useSpring(mouseX, { stiffness: 100, damping: 30 });
  const smoothY = useSpring(mouseY, { stiffness: 100, damping: 30 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (rect) {
      mouseX.set(e.clientX - rect.left);
      mouseY.set(e.clientY - rect.top);
    }
  };

  const stats = [
    { icon: Building2, value: '500+', label: 'Fournisseurs' },
    { icon: Package, value: '10K+', label: 'Produits' },
    { icon: MapPin, value: '48', label: 'Wilayas' },
    { icon: Clock, value: '24h', label: 'Réponse' },
  ];

  // Get featured products for background - need more for full coverage
  const featuredProducts = mockProducts.filter(p => p.featured);
  const allProducts = [...featuredProducts, ...featuredProducts, ...featuredProducts].slice(0, 24);

  return (
    <section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative min-h-screen flex items-center overflow-hidden bg-primary"
    >
      {/* Layer 1: Grid Pattern */}
      <div className="absolute inset-0 opacity-10">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="80" height="80" patternUnits="userSpaceOnUse">
              <path d="M 80 0 L 0 0 0 80" fill="none" stroke="white" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      {/* Layer 2: Full Background Products Grid */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-3 p-4">
          {allProducts.map((product, i) => (
            <motion.div
              key={`${product.id}-${i}`}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.03 }}
              className="aspect-[3/4] rounded-xl overflow-hidden"
            >
              <img
                src={product.image}
                alt=""
                className="w-full h-full object-cover"
              />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Layer 3: Flashlight Overlay - Reveals products on mouse move */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: useTransform(
            [smoothX, smoothY],
            ([x, y]) =>
              `radial-gradient(circle 300px at ${x}px ${y}px, transparent 0%, transparent 20%, hsl(var(--primary) / 0.5) 40%, hsl(var(--primary) / 0.8) 60%, hsl(var(--primary) / 0.95) 80%)`
          ),
        }}
      />

      {/* Layer 4: Content - Okadoo style layout (left aligned) */}
      <div className="relative z-20 section-container py-24 md:py-32">
        <div className="max-w-2xl">
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
            de confiance en Algérie
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-lg md:text-xl text-white/80 mb-10 leading-relaxed"
          >
            Des fournisseurs vérifiés, une qualité garantie et une livraison nationale — 
            Salaate Bladi simplifie les achats textiles pour les entreprises de toutes tailles.
          </motion.p>

          {/* CTAs Row */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex flex-col sm:flex-row items-start gap-6 mb-12"
          >
            <Button
              size="lg"
              className="bg-white text-primary hover:bg-white/90 rounded-full px-8 py-6 text-base font-semibold shadow-lg"
            >
              <FileText className="mr-2 w-5 h-5" />
              Demander un produit
            </Button>
            
            <div className="flex items-center gap-3 text-white/70 text-sm max-w-xs leading-relaxed">
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
            className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-8 border-t border-white/10"
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
          className="text-white hover:bg-white/10 rounded-full px-6 py-6 text-base font-medium"
        >
          <ChevronDown className="mr-2 w-5 h-5 animate-bounce" />
          Découvrez nos secteurs
        </Button>
      </motion.div>

      {/* Gradient fade at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent z-10" />
    </section>
  );
};

export default HeroSection;
