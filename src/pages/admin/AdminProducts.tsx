import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Eye, Ban, CheckCircle } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { mockProducts, formatPrice } from '@/data/mockProducts';

interface AdminProduct {
  id: string;
  name: string;
  category: string;
  supplier: string;
  price: number;
  status: 'active' | 'suspended' | 'pending';
  image: string;
}

const initialProducts: AdminProduct[] = mockProducts.slice(0, 15).map(p => ({
  id: p.id, name: p.name, category: p.category, supplier: p.supplier.name,
  price: p.price, status: 'active' as const, image: p.image,
}));

export default function AdminProducts() {
  const { toast } = useToast();
  const [products, setProducts] = useState(initialProducts);
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');

  const categories = [...new Set(products.map(p => p.category))];

  const filtered = products.filter(p => {
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase()) || p.supplier.toLowerCase().includes(search.toLowerCase());
    const matchCat = categoryFilter === 'all' || p.category === categoryFilter;
    return matchSearch && matchCat;
  });

  const toggleStatus = (id: string) => {
    setProducts(prev => prev.map(p => p.id === id ? { ...p, status: p.status === 'active' ? 'suspended' as const : 'active' as const } : p));
    toast({ title: 'Statut produit mis à jour' });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-heading font-bold text-foreground">Gestion des Produits</h1>
        <p className="text-muted-foreground text-sm">{products.length} produits</p>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Rechercher..." value={search} onChange={e => setSearch(e.target.value)} className="pl-10" />
        </div>
        <Select value={categoryFilter} onValueChange={setCategoryFilter}>
          <SelectTrigger className="w-full sm:w-48"><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Toutes catégories</SelectItem>
            {categories.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-3">
        {filtered.map((product, i) => (
          <motion.div key={product.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.02 }}>
            <Card className={product.status === 'suspended' ? 'opacity-60' : ''}>
              <CardContent className="p-4 flex items-center gap-4">
                <img src={product.image} alt={product.name} className="w-14 h-14 rounded-lg object-cover shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="font-medium text-foreground truncate">{product.name}</p>
                    <Badge variant="outline">{product.category}</Badge>
                    {product.status === 'suspended' && <Badge variant="destructive">Suspendu</Badge>}
                  </div>
                  <p className="text-xs text-muted-foreground">{product.supplier} • {formatPrice(product.price)}</p>
                </div>
                <Button size="sm" variant="outline" onClick={() => toggleStatus(product.id)}>
                  {product.status === 'active' ? <><Ban className="mr-1 h-4 w-4" /> Suspendre</> : <><CheckCircle className="mr-1 h-4 w-4" /> Activer</>}
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
