import { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, ShoppingCart, Trash2, ExternalLink } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { mockFavorites, FavoriteItem } from '@/data/mockClientData';
import { mockProducts } from '@/data/mockProducts';

export default function ClientFavorites() {
  const { toast } = useToast();
  const [favorites, setFavorites] = useState<FavoriteItem[]>(mockFavorites);

  const removeFavorite = (id: string) => {
    setFavorites(prev => prev.filter(f => f.id !== id));
    toast({ title: 'Retiré des favoris' });
  };

  const addToCart = (item: FavoriteItem) => {
    toast({ title: 'Ajouté au panier', description: item.productName });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-heading font-bold text-foreground">Mes Favoris</h1>
        <p className="text-muted-foreground text-sm">{favorites.length} produit{favorites.length > 1 ? 's' : ''} sauvegardé{favorites.length > 1 ? 's' : ''}</p>
      </div>

      {favorites.length === 0 ? (
        <div className="text-center py-16">
          <Heart className="h-12 w-12 mx-auto text-muted-foreground mb-3" />
          <p className="text-lg font-medium text-foreground mb-2">Aucun favori</p>
          <p className="text-muted-foreground mb-6">Explorez notre catalogue et ajoutez des produits à vos favoris</p>
          <Link to="/catalogue"><Button className="bg-primary hover:bg-primary/90">Découvrir les produits</Button></Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {favorites.map((item, i) => (
            <motion.div key={item.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
              <Card className="card-hover overflow-hidden group">
                <div className="relative aspect-[4/3] bg-muted/10">
                  <img src={item.productImage} alt={item.productName} className="w-full h-full object-cover" />
                  {!item.inStock && (
                    <div className="absolute inset-0 bg-foreground/50 flex items-center justify-center">
                      <Badge className="bg-destructive text-destructive-foreground">Rupture de stock</Badge>
                    </div>
                  )}
                  <button onClick={() => removeFavorite(item.id)} className="absolute top-3 right-3 w-8 h-8 rounded-full bg-destructive/90 text-destructive-foreground flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
                <CardContent className="p-4">
                  <p className="text-xs text-muted-foreground">{item.category}</p>
                  <h3 className="font-medium text-foreground mt-1">{item.productName}</h3>
                  <p className="text-xs text-accent mt-1">🎨 {item.designer}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="font-bold text-primary">{item.price.toLocaleString('fr-DZ')} DA</span>
                    {item.originalPrice && (
                      <span className="text-xs text-muted-foreground line-through">{item.originalPrice.toLocaleString('fr-DZ')} DA</span>
                    )}
                  </div>
                  <div className="flex gap-2 mt-3">
                    <Button size="sm" className="flex-1 bg-primary hover:bg-primary/90" disabled={!item.inStock} onClick={() => addToCart(item)}>
                      <ShoppingCart className="mr-1 h-4 w-4" /> Ajouter
                    </Button>
                    <Link to={`/produit/${item.productId}`}>
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
