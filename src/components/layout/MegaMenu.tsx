import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { mockCategories } from '@/data/mockProducts';

interface MegaMenuProps {
  isOpen: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}

const MegaMenu = ({ onMouseEnter, onMouseLeave }: MegaMenuProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.2 }}
      className="absolute left-0 right-0 bg-white shadow-xl border-t"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div className="section-container py-8">
        <div className="grid grid-cols-5 gap-8">
          {mockCategories.map((category) => (
            <div key={category.id} className="group">
              <Link
                to={`/catalogue?category=${encodeURIComponent(category.name)}`}
                className="flex items-center gap-2 font-heading font-semibold text-foreground hover:text-primary transition-colors mb-4"
              >
                {category.name}
                <ArrowRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
              </Link>
              <ul className="space-y-2">
                {category.subcategories.map((sub) => (
                  <li key={sub.id}>
                    <Link
                      to={`/catalogue?category=${encodeURIComponent(category.name)}&subcategory=${encodeURIComponent(sub.name)}`}
                      className="text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      {sub.name}
                    </Link>
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-xs text-muted-foreground">
                {category.productCount} produits
              </p>
            </div>
          ))}
        </div>
        <div className="mt-8 pt-6 border-t flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            Explorez notre catalogue de plus de <span className="font-semibold text-primary">10 000</span> produits textiles algériens
          </p>
          <Link
            to="/catalogue"
            className="flex items-center gap-2 text-sm font-medium text-primary hover:underline"
          >
            Voir toutes les catégories
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default MegaMenu;
