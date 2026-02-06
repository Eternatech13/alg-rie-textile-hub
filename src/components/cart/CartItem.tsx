import { motion } from 'framer-motion';
import { Minus, Plus, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { CartItem as CartItemType, useCart } from '@/contexts/CartContext';
import { formatPrice } from '@/data/mockProducts';

interface CartItemProps {
  item: CartItemType;
  index: number;
}

const CartItem = ({ item, index }: CartItemProps) => {
  const { updateQuantity, removeItem } = useCart();
  const totalPrice = item.product.price * item.quantity;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -100 }}
      transition={{ delay: index * 0.1 }}
      className="flex gap-4 p-4 bg-card rounded-2xl border border-border"
    >
      {/* Product Image */}
      <Link to={`/produit/${item.productId}`} className="shrink-0">
        <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-xl overflow-hidden bg-muted">
          <img
            src={item.product.image}
            alt={item.product.name}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
          />
        </div>
      </Link>

      {/* Product Info */}
      <div className="flex-1 min-w-0">
        <div className="flex flex-col sm:flex-row sm:justify-between gap-2">
          <div>
            {/* Category Path */}
            <p className="text-xs text-muted-foreground mb-1">
              {item.product.category} {'>'} {item.product.subcategory}
            </p>
            
            {/* Product Name */}
            <Link to={`/produit/${item.productId}`}>
              <h3 className="font-heading font-semibold text-foreground hover:text-primary transition-colors line-clamp-1">
                {item.product.name}
              </h3>
            </Link>
            
            {/* Designer & Supplier */}
            <p className="text-sm text-muted-foreground mt-1">
              {item.designerName && <span>{item.designerName} • </span>}
              {item.product.supplier.name}
            </p>
          </div>
          
          {/* Price on Desktop */}
          <div className="hidden sm:block text-right">
            <p className="font-heading font-bold text-primary text-lg">
              {formatPrice(totalPrice)}
            </p>
            {item.quantity > 1 && (
              <p className="text-xs text-muted-foreground">
                {formatPrice(item.product.price)} / unité
              </p>
            )}
          </div>
        </div>

        {/* Variants */}
        <div className="flex flex-wrap gap-2 mt-3">
          <span className="px-2 py-1 text-xs rounded-lg bg-muted text-muted-foreground">
            Taille: {item.size}
          </span>
          <span className="px-2 py-1 text-xs rounded-lg bg-muted text-muted-foreground">
            Couleur: {item.color}
          </span>
        </div>

        {/* Quantity & Actions */}
        <div className="flex items-center justify-between mt-4">
          <div className="flex items-center gap-2">
            {/* Quantity Selector */}
            <div className="flex items-center border border-border rounded-xl overflow-hidden">
              <button
                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                disabled={item.quantity <= 1}
                className="w-9 h-9 flex items-center justify-center hover:bg-muted transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="w-10 text-center font-medium text-sm">{item.quantity}</span>
              <button
                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                className="w-9 h-9 flex items-center justify-center hover:bg-muted transition-colors"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
            
            {/* Remove Button */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => removeItem(item.id)}
              className="h-9 w-9 text-muted-foreground hover:text-destructive hover:bg-destructive/10"
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>

          {/* Price on Mobile */}
          <div className="sm:hidden">
            <p className="font-heading font-bold text-primary">
              {formatPrice(totalPrice)}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default CartItem;
