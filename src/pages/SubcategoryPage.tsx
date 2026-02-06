import { useState, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, Search, SlidersHorizontal, Heart, ShoppingCart, X } from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { mockCategories, mockProducts, mockDesigners, formatPrice } from '@/data/mockProducts';

const SubcategoryPage = () => {
  const { slug, subcategory: subcategorySlug } = useParams<{ slug: string; subcategory: string }>();
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('popularity');
  const [priceRange, setPriceRange] = useState([0, 20000]);
  const [selectedDesigners, setSelectedDesigners] = useState<string[]>([]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const category = useMemo(() => {
    return mockCategories.find(c => c.slug === slug);
  }, [slug]);

  const subcategory = useMemo(() => {
    return category?.subcategories.find(s => s.slug === subcategorySlug);
  }, [category, subcategorySlug]);

  const products = useMemo(() => {
    let filtered = mockProducts.filter(p => 
      p.category.toLowerCase() === category?.name.toLowerCase() ||
      p.subcategory.toLowerCase() === subcategory?.name.toLowerCase()
    );

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(p =>
        p.name.toLowerCase().includes(query) ||
        p.supplier.name.toLowerCase().includes(query)
      );
    }

    // Price filter
    filtered = filtered.filter(p => p.price >= priceRange[0] && p.price <= priceRange[1]);

    // Designer filter
    if (selectedDesigners.length > 0) {
      // In real app, products would have designer IDs
      filtered = filtered.filter(() => Math.random() > 0.5);
    }

    // Sort
    switch (sortBy) {
      case 'price-asc':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'newest':
        filtered.reverse();
        break;
    }

    return filtered;
  }, [category, subcategory, searchQuery, priceRange, selectedDesigners, sortBy]);

  if (!category || !subcategory) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="section-container py-32 text-center">
          <h1 className="text-3xl font-heading font-bold text-foreground mb-4">
            Sous-catégorie non trouvée
          </h1>
          <Link to="/catalogue" className="text-primary hover:underline">
            Retour au catalogue
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const toggleDesigner = (designerId: string) => {
    if (selectedDesigners.includes(designerId)) {
      setSelectedDesigners(selectedDesigners.filter(d => d !== designerId));
    } else {
      setSelectedDesigners([...selectedDesigners, designerId]);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Header */}
      <section className="pt-24 pb-8 bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5">
        <div className="section-container">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
            <Link to="/" className="hover:text-primary transition-colors">Accueil</Link>
            <ChevronRight className="w-4 h-4" />
            <Link to="/catalogue" className="hover:text-primary transition-colors">Catalogue</Link>
            <ChevronRight className="w-4 h-4" />
            <Link to={`/categorie/${slug}`} className="hover:text-primary transition-colors">
              {category.name}
            </Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-foreground">{subcategory.name}</span>
          </nav>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-3">
              {subcategory.name}
            </h1>
            <p className="text-muted-foreground">
              {products.length} produit{products.length > 1 ? 's' : ''} dans {category.name} › {subcategory.name}
            </p>
          </motion.div>
        </div>
      </section>

      <div className="section-container py-8">
        {/* Search and Controls */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              placeholder="Rechercher dans cette catégorie..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 h-12 rounded-xl"
            />
          </div>

          <div className="flex items-center gap-3">
            <Sheet open={isFilterOpen} onOpenChange={setIsFilterOpen}>
              <SheetTrigger asChild>
                <Button variant="outline" className="h-12 px-4 rounded-xl">
                  <SlidersHorizontal className="w-5 h-5 mr-2" />
                  Filtres
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-80">
                <SheetHeader>
                  <SheetTitle>Filtres</SheetTitle>
                </SheetHeader>
                <div className="mt-6 space-y-6">
                  {/* Price Range */}
                  <div>
                    <h4 className="font-medium text-sm mb-4">Prix</h4>
                    <Slider
                      value={priceRange}
                      onValueChange={setPriceRange}
                      max={20000}
                      step={500}
                      className="mb-4"
                    />
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <span>{formatPrice(priceRange[0])}</span>
                      <span>{formatPrice(priceRange[1])}</span>
                    </div>
                  </div>

                  {/* Designer */}
                  <div>
                    <h4 className="font-medium text-sm mb-4">Designer</h4>
                    <div className="space-y-3">
                      {mockDesigners.map(designer => (
                        <label key={designer.id} className="flex items-center gap-3 cursor-pointer">
                          <Checkbox
                            checked={selectedDesigners.includes(designer.id)}
                            onCheckedChange={() => toggleDesigner(designer.id)}
                          />
                          <span className="text-sm text-muted-foreground">
                            {designer.name}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              </SheetContent>
            </Sheet>

            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-48 h-12 rounded-xl">
                <SelectValue placeholder="Trier par" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="popularity">Popularité</SelectItem>
                <SelectItem value="price-asc">Prix croissant</SelectItem>
                <SelectItem value="price-desc">Prix décroissant</SelectItem>
                <SelectItem value="newest">Nouveautés</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Products Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={sortBy}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            {products.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Link
                  to={`/produit/${product.id}`}
                  className="group block bg-card rounded-2xl overflow-hidden border border-border hover:border-primary/20 card-hover"
                >
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      loading="lazy"
                    />
                    <div className="absolute top-4 left-4 flex flex-col gap-2">
                      {product.featured && (
                        <span className="badge-featured">Vedette</span>
                      )}
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="absolute bottom-4 right-4 flex gap-2">
                        <button 
                          onClick={(e) => { e.preventDefault(); }}
                          className="w-10 h-10 rounded-xl bg-white/90 backdrop-blur-sm flex items-center justify-center hover:bg-white transition-colors"
                        >
                          <Heart className="w-5 h-5 text-foreground" />
                        </button>
                        <button 
                          onClick={(e) => { e.preventDefault(); }}
                          className="w-10 h-10 rounded-xl bg-white/90 backdrop-blur-sm flex items-center justify-center hover:bg-white transition-colors"
                        >
                          <ShoppingCart className="w-5 h-5 text-foreground" />
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="p-5">
                    <p className="text-xs text-muted-foreground mb-1">{product.supplier.name}</p>
                    <h3 className="font-heading font-semibold text-lg text-card-foreground mb-2 line-clamp-1">
                      {product.name}
                    </h3>
                    <div className="flex items-center justify-between">
                      <p className="font-heading font-bold text-lg text-primary">
                        {formatPrice(product.price)}
                      </p>
                      <Badge variant="outline" className="text-xs">
                        Local
                      </Badge>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {products.length === 0 && (
          <div className="text-center py-16">
            <p className="text-muted-foreground text-lg mb-4">Aucun produit trouvé</p>
            <Button variant="outline" onClick={() => {
              setSearchQuery('');
              setPriceRange([0, 20000]);
              setSelectedDesigners([]);
            }}>
              Réinitialiser les filtres
            </Button>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default SubcategoryPage;
