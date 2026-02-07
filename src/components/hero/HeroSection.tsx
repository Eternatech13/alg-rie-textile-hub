import { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Building2, Package, MapPin, Clock, ChevronDown } from 'lucide-react';
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
      <div className="relative z-20 w-full px-4 sm:px-6 md:px-8 lg:px-12 py-24 md:py-32">
        <div className="max-w-2xl">
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

          {/* Enhanced Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="grid grid-cols-2 lg:grid-cols-4 gap-6 pt-12"
          >
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ 
                  delay: 0.7 + i * 0.1,
                  type: "spring",
                  stiffness: 100
                }}
                whileHover={{ 
                  scale: 1.05, 
                  y: -8,
                  transition: { duration: 0.2 }
                }}
                className="group relative bg-white/[0.08] backdrop-blur-md border border-white/[0.15] rounded-xl p-4 cursor-default overflow-hidden"
              >
                {/* Gradient background on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-accent/10 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                {/* Animated border */}
                <div className="absolute inset-0 rounded-xl border border-transparent group-hover:border-accent/20 transition-colors duration-300" />
                
                <div className="relative text-center">
                  <div className="flex flex-col items-center gap-3 mb-3">
                    <div className="w-12 h-12 rounded-xl bg-accent/20 flex items-center justify-center group-hover:bg-accent/30 transition-colors shadow-lg">
                      <stat.icon className="w-6 h-6 text-accent" />
                    </div>
                    <span className="text-2xl md:text-3xl font-heading font-bold text-white tabular-nums leading-none">
                      {stat.value}
                    </span>
                  </div>
                  <span className="text-sm text-white/70 font-medium uppercase tracking-wider">
                    {stat.label}
                  </span>
                </div>
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
