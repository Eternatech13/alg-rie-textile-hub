import { motion } from 'framer-motion';
import { Heart, ShoppingCart, Trash2, ExternalLink } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { useFavorites } from '@/contexts/FavoritesContext';
import { useCart } from '@/contexts/CartContext';
import { mockProducts, formatPrice } from '@/data/mockProducts';

export default function ClientFavorites() {
  const { toast } = useToast();
  const { favorites, toggleFavorite } = useFavorites();
  const { addItem } = useCart();

  const favoriteProducts = favorites
    .map(id => mockProducts.find(p => p.id === id))
    .filter(Boolean) as typeof mockProducts;

  const handleAddToCart = (product: typeof mockProducts[0]) => {
    addItem({ productId: product.id, product, quantity: 1, size: 'M', color: 'Noir' });
    toast({ title: 'Ajouté au panier', description: product.name });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-heading font-bold text-foreground">Mes Favoris</h1>
        <p className="text-muted-foreground text-sm">{favoriteProducts.length} produit{favoriteProducts.length > 1 ? 's' : ''} sauvegardé{favoriteProducts.length > 1 ? 's' : ''}</p>
      </div>

      {favoriteProducts.length === 0 ? (
        <div className="text-center py-16">
          <Heart className="h-12 w-12 mx-auto text-muted-foreground mb-3" />
          <p className="text-lg font-medium text-foreground mb-2">Aucun favori</p>
          <p className="text-muted-foreground mb-6">Explorez notre catalogue et ajoutez des produits à vos favoris</p>
          <Link to="/catalogue"><Button>Découvrir les produits</Button></Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {favoriteProducts.map((product, i) => (
            <motion.div key={product.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
              <Card className="card-hover overflow-hidden group">
                <div className="relative aspect-[4/3] bg-muted/10">
                  <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                  <button
                    onClick={() => { toggleFavorite(product.id); toast({ title: 'Retiré des favoris' }); }}
                    className="absolute top-3 right-3 w-8 h-8 rounded-full bg-destructive/90 text-destructive-foreground flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
                <CardContent className="p-4">
                  <p className="text-xs text-muted-foreground">{product.category} &gt; {product.subcategory}</p>
                  <h3 className="font-medium text-foreground mt-1">{product.name}</h3>
                  <p className="text-xs text-accent mt-1">🏭 {product.supplier.name}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="font-bold text-primary">{formatPrice(product.price)}</span>
                  </div>
                  <div className="flex gap-2 mt-3">
                    <Button size="sm" className="flex-1" onClick={() => handleAddToCart(product)}>
                      <ShoppingCart className="mr-1 h-4 w-4" /> Ajouter
                    </Button>
                    <Link to={`/produit/${product.id}`}>
                      <Button size="sm" variant="outline"><ExternalLink className="h-4 w-4" /></Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
