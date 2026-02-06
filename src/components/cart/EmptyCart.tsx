import { motion } from 'framer-motion';
import { ShoppingBag, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const EmptyCart = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center py-16 px-4"
    >
      {/* Illustration */}
      <div className="relative mb-8">
        <div className="w-32 h-32 rounded-full bg-muted/50 flex items-center justify-center">
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
          >
            <ShoppingBag className="w-16 h-16 text-muted-foreground" />
          </motion.div>
        </div>
        {/* Decorative circles */}
        <motion.div
          className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-primary/20"
          animate={{ y: [0, -5, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        />
        <motion.div
          className="absolute -bottom-1 -left-1 w-4 h-4 rounded-full bg-accent/30"
          animate={{ y: [0, 5, 0] }}
          transition={{ repeat: Infinity, duration: 2.5 }}
        />
      </div>

      {/* Message */}
      <h2 className="text-2xl font-heading font-bold text-foreground mb-2 text-center">
        Votre panier est vide
      </h2>
      <p className="text-muted-foreground text-center max-w-md mb-8">
        Découvrez notre sélection de produits textiles algériens de qualité et ajoutez-les à votre panier.
      </p>

      {/* CTA */}
      <Link to="/catalogue">
        <Button size="lg" className="rounded-xl h-12 px-8">
          Découvrir les produits
          <ArrowRight className="w-5 h-5 ml-2" />
        </Button>
      </Link>
    </motion.div>
  );
};

export default EmptyCart;
