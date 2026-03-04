import { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search as SearchIcon, SlidersHorizontal, X } from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ProductCard from '@/components/products/ProductCard';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { mockProducts } from '@/data/mockProducts';

const categories = [...new Set(mockProducts.map(p => p.category))];
const suppliers = [...new Set(mockProducts.map(p => p.supplier.name))];

export default function SearchPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialQ = searchParams.get('q') || '';

  const [query, setQuery] = useState(initialQ);
  const [category, setCategory] = useState('all');
  const [supplier, setSupplier] = useState('all');
  const [sortBy, setSortBy] = useState('relevance');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 50000]);
  const [showFilters, setShowFilters] = useState(false);

  const results = useMemo(() => {
    let filtered = mockProducts;

    if (query.trim()) {
      const q = query.toLowerCase();
      filtered = filtered.filter(p =>
        p.name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.tags.some(t => t.toLowerCase().includes(q)) ||
        p.supplier.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q)
      );
    }

    if (category !== 'all') filtered = filtered.filter(p => p.category === category);
    if (supplier !== 'all') filtered = filtered.filter(p => p.supplier.name === supplier);
    filtered = filtered.filter(p => p.price >= priceRange[0] && p.price <= priceRange[1]);

    switch (sortBy) {
      case 'price-asc': return [...filtered].sort((a, b) => a.price - b.price);
      case 'price-desc': return [...filtered].sort((a, b) => b.price - a.price);
      case 'name': return [...filtered].sort((a, b) => a.name.localeCompare(b.name));
      default: return filtered;
    }
  }, [query, category, supplier, sortBy, priceRange]);

  const activeFilters = [category !== 'all' && category, supplier !== 'all' && supplier].filter(Boolean);

  const clearFilters = () => {
    setCategory('all');
    setSupplier('all');
    setSortBy('relevance');
    setPriceRange([0, 50000]);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="pt-24">
        <section className="section-container py-8">
          <div className="max-w-2xl mx-auto mb-8">
            <div className="relative">
              <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Rechercher un produit, designer, catégorie..."
                value={query}
                onChange={e => setQuery(e.target.value)}
                className="pl-12 h-14 text-lg rounded-2xl border-2 border-border focus:border-primary"
                autoFocus
              />
              {query && (
                <button onClick={() => setQuery('')} className="absolute right-4 top-1/2 -translate-y-1/2">
                  <X className="h-5 w-5 text-muted-foreground hover:text-foreground" />
                </button>
              )}
            </div>
          </div>

          {/* Filters bar */}
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <Button variant="outline" size="sm" onClick={() => setShowFilters(!showFilters)} className="rounded-xl">
              <SlidersHorizontal className="w-4 h-4 mr-2" /> Filtres
            </Button>

            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-44 h-9 rounded-xl">
                <SelectValue placeholder="Trier par" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="relevance">Pertinence</SelectItem>
                <SelectItem value="price-asc">Prix croissant</SelectItem>
                <SelectItem value="price-desc">Prix décroissant</SelectItem>
                <SelectItem value="name">Nom A-Z</SelectItem>
              </SelectContent>
            </Select>

            {activeFilters.length > 0 && (
              <>
                {activeFilters.map(f => (
                  <Badge key={f as string} variant="secondary" className="rounded-full">{f as string}</Badge>
                ))}
                <button onClick={clearFilters} className="text-xs text-primary hover:underline">Effacer</button>
              </>
            )}

            <span className="ml-auto text-sm text-muted-foreground">
              {results.length} résultat{results.length > 1 ? 's' : ''}
            </span>
          </div>

          {/* Expanded filters */}
          {showFilters && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-4 mb-6 rounded-2xl bg-card border border-border"
            >
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">Catégorie</label>
                <Select value={category} onValueChange={setCategory}>
                  <SelectTrigger className="rounded-xl"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Toutes</SelectItem>
                    {categories.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">Société textile</label>
                <Select value={supplier} onValueChange={setSupplier}>
                  <SelectTrigger className="rounded-xl"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Toutes</SelectItem>
                    {suppliers.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">Prix max</label>
                <Input
                  type="number"
                  value={priceRange[1]}
                  onChange={e => setPriceRange([0, Number(e.target.value) || 50000])}
                  className="rounded-xl"
                  placeholder="50000"
                />
              </div>
            </motion.div>
          )}

          {/* Results */}
          {results.length === 0 ? (
            <div className="text-center py-20">
              <SearchIcon className="w-16 h-16 mx-auto text-muted-foreground/30 mb-4" />
              <h2 className="text-xl font-heading font-semibold text-foreground mb-2">Aucun résultat</h2>
              <p className="text-muted-foreground">Essayez d'autres mots-clés ou modifiez vos filtres</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {results.map((product, i) => (
                <ProductCard key={product.id} product={product} index={i} />
              ))}
            </div>
          )}
        </section>
      </div>
      <Footer />
    </div>
  );
}
