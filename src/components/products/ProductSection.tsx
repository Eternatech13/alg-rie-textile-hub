import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import ProductCard from './ProductCard';
import { mockProducts } from '@/data/mockProducts';

const ProductSection = () => {
  const featuredProducts = mockProducts.filter(p => p.featured).slice(0, 6);

  return (
    <section className="section-padding bg-muted/30">
      <div className="section-container">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12"
        >
          <div>
            <h2 className="text-section text-foreground">
              Produits en vedette
            </h2>
          </div>
          <a
            href="/produits"
            className="inline-flex items-center gap-2 text-primary font-medium hover:gap-3 transition-all"
          >
            Voir tous les produits
            <ArrowRight className="w-5 h-5" />
          </a>
        </motion.div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredProducts.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductSection;
