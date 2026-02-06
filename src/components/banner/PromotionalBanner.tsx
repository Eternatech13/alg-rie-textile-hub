import { motion } from 'framer-motion';

const PromotionalBanner = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-gradient-to-r from-accent via-premium to-accent text-accent-foreground py-2 relative overflow-hidden"
    >
      <div className="section-container">
        <div className="flex items-center justify-center gap-4 text-sm font-medium">
          <span className="hidden sm:inline">🎉</span>
          <p className="text-center">
            <span className="font-semibold">Offre de lancement !</span>{' '}
            -15% sur votre première commande avec le code{' '}
            <span className="font-bold bg-white/20 px-2 py-0.5 rounded">BIENVENUE15</span>
          </p>
          <span className="hidden sm:inline">🎉</span>
        </div>
      </div>
      
      {/* Animated shimmer effect */}
      <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-white/10 to-transparent" />
    </motion.div>
  );
};

export default PromotionalBanner;
