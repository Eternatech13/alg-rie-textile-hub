import { motion } from 'framer-motion';
import { Heart, Eye, ShoppingCart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Product, formatPrice } from '@/data/mockProducts';
import { useCart } from '@/contexts/CartContext';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';

interface ProductCardProps {
  product: Product;
  index?: number;
}

const ProductCard = ({ product, index = 0 }: ProductCardProps) => {
  const { addItem } = useCart();
  const { toast } = useToast();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    addItem({
      productId: product.id,
      product,
      quantity: 1,
      size: 'M', // Default size
      color: 'Noir', // Default color
    });

    toast({
      title: "Ajouté au panier",
      description: `${product.name} a été ajouté à votre panier.`,
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="group bg-card rounded-2xl overflow-hidden border border-border hover:border-primary/20 card-hover"
    >
      {/* Image */}
      <Link to={`/produit/${product.id}`}>
        <div className="relative aspect-[3/2] overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            loading="lazy"
          />
          
          {/* Badges */}
          <div className="absolute top-4 left-4 flex flex-col gap-2">
            {product.featured && (
              <span className="badge-featured">
                Vedette
              </span>
            )}
            <span className="badge-category">
              {product.category}
            </span>
          </div>

          {/* Hover Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="absolute bottom-4 right-4 flex gap-2">
              <button className="w-10 h-10 rounded-xl bg-white/90 backdrop-blur-sm flex items-center justify-center hover:bg-white transition-colors focus-ring">
                <Heart className="w-5 h-5 text-foreground" />
              </button>
              <Link to={`/produit/${product.id}`} className="w-10 h-10 rounded-xl bg-white/90 backdrop-blur-sm flex items-center justify-center hover:bg-white transition-colors focus-ring">
                <Eye className="w-5 h-5 text-foreground" />
              </Link>
            </div>
          </div>
        </div>
      </Link>

      {/* Content */}
      <div className="p-4">
        <p className="text-xs text-muted-foreground mb-1">
          {product.supplier.name}
        </p>
        <Link to={`/produit/${product.id}`}>
          <h3 className="font-heading font-semibold text-lg text-card-foreground mb-2 line-clamp-1 hover:text-primary transition-colors">
            {product.name}
          </h3>
        </Link>
        <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
          {product.description}
        </p>
        
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs text-muted-foreground">À partir de</p>
            <p className="font-heading font-bold text-lg text-primary">
              {formatPrice(product.price)}
            </p>
          </div>
          <div className="flex gap-2">
            <Button 
              variant="outline"
              size="icon"
              onClick={handleAddToCart}
              className="h-10 w-10 rounded-xl hover:bg-primary hover:text-primary-foreground transition-colors focus-ring"
            >
              <ShoppingCart className="w-4 h-4" />
            </Button>
            <Link to={`/produit/${product.id}`}>
              <Button 
                variant="default"
                size="sm"
                className="rounded-xl px-4"
              >
                Voir détails
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
