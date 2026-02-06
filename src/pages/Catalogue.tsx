import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, SlidersHorizontal, X, ChevronDown,
  Grid3X3, List, Heart, Eye, ShoppingCart, Star
} from 'lucide-react';
import { Link } from 'react-router-dom';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { mockProducts, mockCategories, mockSuppliers, mockDesigners, formatPrice } from '@/data/mockProducts';

const genders = ['Homme', 'Femme', 'Enfant', 'Mixte'];
const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'Taille personnalisée'];
const colors = [
  { name: 'Noir', value: '#000000' },
  { name: 'Blanc', value: '#FFFFFF' },
  { name: 'Bleu', value: '#3B82F6' },
  { name: 'Rouge', value: '#EF4444' },
  { name: 'Vert', value: '#22C55E' },
  { name: 'Jaune', value: '#EAB308' },
  { name: 'Rose', value: '#EC4899' },
  { name: 'Violet', value: '#8B5CF6' },
  { name: 'Orange', value: '#F97316' },
  { name: 'Gris', value: '#6B7280' },
];
const textileTypes = ['Coton', 'Lin', 'Soie', 'Polyester', 'Textile traditionnel', 'Textile médical', 'Textile industriel'];

const Catalogue = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGenders, setSelectedGenders] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [selectedDesigners, setSelectedDesigners] = useState<string[]>([]);
  const [selectedSuppliers, setSelectedSuppliers] = useState<string[]>([]);
  const [selectedTextileTypes, setSelectedTextileTypes] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState([0, 20000]);
  const [sortBy, setSortBy] = useState('popularity');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Filter products
  const filteredProducts = useMemo(() => {
    let products = [...mockProducts];

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      products = products.filter(p =>
        p.name.toLowerCase().includes(query) ||
        p.category.toLowerCase().includes(query) ||
        p.supplier.name.toLowerCase().includes(query) ||
        p.tags.some(t => t.toLowerCase().includes(query))
      );
    }

    // Category filter
    if (selectedCategories.length > 0) {
      products = products.filter(p => selectedCategories.includes(p.category));
    }

    // Price filter
    products = products.filter(p => p.price >= priceRange[0] && p.price <= priceRange[1]);

    // Supplier filter
    if (selectedSuppliers.length > 0) {
      products = products.filter(p => selectedSuppliers.includes(p.supplier.id));
    }

    // Sort
    switch (sortBy) {
      case 'price-asc':
        products.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        products.sort((a, b) => b.price - a.price);
        break;
      case 'newest':
        products.reverse();
        break;
      case 'featured':
        products.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
        break;
    }

    return products;
  }, [searchQuery, selectedCategories, priceRange, selectedSuppliers, sortBy]);

  const toggleFilter = (value: string, array: string[], setter: (arr: string[]) => void) => {
    if (array.includes(value)) {
      setter(array.filter(v => v !== value));
    } else {
      setter([...array, value]);
    }
  };

  const clearAllFilters = () => {
    setSelectedGenders([]);
    setSelectedCategories([]);
    setSelectedSizes([]);
    setSelectedColors([]);
    setSelectedDesigners([]);
    setSelectedSuppliers([]);
    setSelectedTextileTypes([]);
    setPriceRange([0, 20000]);
    setSearchQuery('');
  };

  const activeFiltersCount = selectedGenders.length + selectedCategories.length + 
    selectedSizes.length + selectedColors.length + selectedDesigners.length + 
    selectedSuppliers.length + selectedTextileTypes.length + 
    (priceRange[0] > 0 || priceRange[1] < 20000 ? 1 : 0);

  const FilterSection = ({ title, children }: { title: string; children: React.ReactNode }) => (
    <Collapsible defaultOpen className="border-b border-border pb-4">
      <CollapsibleTrigger className="flex items-center justify-between w-full py-2 text-sm font-medium text-foreground hover:text-primary transition-colors">
        {title}
        <ChevronDown className="w-4 h-4 transition-transform duration-200 [[data-state=open]>&]:rotate-180" />
      </CollapsibleTrigger>
      <CollapsibleContent className="pt-3 space-y-2">
        {children}
      </CollapsibleContent>
    </Collapsible>
  );

  const FiltersContent = () => (
    <div className="space-y-4">
      {/* Clear Filters */}
      {activeFiltersCount > 0 && (
        <Button variant="outline" size="sm" onClick={clearAllFilters} className="w-full">
          <X className="w-4 h-4 mr-2" />
          Effacer les filtres ({activeFiltersCount})
        </Button>
      )}

      {/* Genre */}
      <FilterSection title="Genre">
        {genders.map(gender => (
          <label key={gender} className="flex items-center gap-3 cursor-pointer group">
            <Checkbox
              checked={selectedGenders.includes(gender)}
              onCheckedChange={() => toggleFilter(gender, selectedGenders, setSelectedGenders)}
            />
            <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
              {gender}
            </span>
          </label>
        ))}
      </FilterSection>

      {/* Catégorie */}
      <FilterSection title="Catégorie">
        {mockCategories.map(category => (
          <label key={category.id} className="flex items-center gap-3 cursor-pointer group">
            <Checkbox
              checked={selectedCategories.includes(category.name)}
              onCheckedChange={() => toggleFilter(category.name, selectedCategories, setSelectedCategories)}
            />
            <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
              {category.name} ({category.productCount})
            </span>
          </label>
        ))}
      </FilterSection>

      {/* Prix */}
      <FilterSection title="Prix">
        <div className="px-2 pt-2">
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
      </FilterSection>

      {/* Taille */}
      <FilterSection title="Taille">
        <div className="flex flex-wrap gap-2">
          {sizes.map(size => (
            <button
              key={size}
              onClick={() => toggleFilter(size, selectedSizes, setSelectedSizes)}
              className={`px-3 py-1.5 text-xs rounded-lg border transition-all ${
                selectedSizes.includes(size)
                  ? 'bg-primary text-primary-foreground border-primary'
                  : 'border-border text-muted-foreground hover:border-primary hover:text-primary'
              }`}
            >
              {size}
            </button>
          ))}
        </div>
      </FilterSection>

      {/* Couleur */}
      <FilterSection title="Couleur">
        <div className="flex flex-wrap gap-2">
          {colors.map(color => (
            <button
              key={color.name}
              onClick={() => toggleFilter(color.name, selectedColors, setSelectedColors)}
              className={`w-8 h-8 rounded-full border-2 transition-all hover:scale-110 ${
                selectedColors.includes(color.name)
                  ? 'ring-2 ring-primary ring-offset-2'
                  : 'border-border'
              }`}
              style={{ backgroundColor: color.value }}
              title={color.name}
            />
          ))}
        </div>
      </FilterSection>

      {/* Designer */}
      <FilterSection title="Designer">
        {mockDesigners.map(designer => (
          <label key={designer.id} className="flex items-center gap-3 cursor-pointer group">
            <Checkbox
              checked={selectedDesigners.includes(designer.id)}
              onCheckedChange={() => toggleFilter(designer.id, selectedDesigners, setSelectedDesigners)}
            />
            <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
              {designer.name}
            </span>
          </label>
        ))}
      </FilterSection>

      {/* Société Textile */}
      <FilterSection title="Société Textile">
        {mockSuppliers.map(supplier => (
          <label key={supplier.id} className="flex items-center gap-3 cursor-pointer group">
            <Checkbox
              checked={selectedSuppliers.includes(supplier.id)}
              onCheckedChange={() => toggleFilter(supplier.id, selectedSuppliers, setSelectedSuppliers)}
            />
            <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
              {supplier.name}
            </span>
          </label>
        ))}
      </FilterSection>

      {/* Type Textile */}
      <FilterSection title="Type Textile">
        {textileTypes.map(type => (
          <label key={type} className="flex items-center gap-3 cursor-pointer group">
            <Checkbox
              checked={selectedTextileTypes.includes(type)}
              onCheckedChange={() => toggleFilter(type, selectedTextileTypes, setSelectedTextileTypes)}
            />
            <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
              {type}
            </span>
          </label>
        ))}
      </FilterSection>
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Banner */}
      <section className="pt-24 pb-8 bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5">
        <div className="section-container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h1 className="text-section text-foreground mb-4">
              Catalogue Produits
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Découvrez notre sélection de produits textiles algériens de qualité
            </p>
          </motion.div>
        </div>
      </section>

      <div className="section-container py-8">
        {/* Search and Controls */}
        <div className="flex flex-col lg:flex-row gap-4 mb-8">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              placeholder="Rechercher produit, catégorie, designer, société..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 h-12 rounded-xl"
            />
          </div>

          <div className="flex items-center gap-3">
            {/* Mobile Filter Button */}
            <Sheet open={isFilterOpen} onOpenChange={setIsFilterOpen}>
              <SheetTrigger asChild>
                <Button variant="outline" className="lg:hidden h-12 px-4 rounded-xl">
                  <SlidersHorizontal className="w-5 h-5 mr-2" />
                  Filtres
                  {activeFiltersCount > 0 && (
                    <Badge className="ml-2 bg-primary text-primary-foreground">
                      {activeFiltersCount}
                    </Badge>
                  )}
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-80 overflow-y-auto">
                <SheetHeader>
                  <SheetTitle>Filtres</SheetTitle>
                </SheetHeader>
                <div className="mt-6">
                  <FiltersContent />
                </div>
              </SheetContent>
            </Sheet>

            {/* Sort */}
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-48 h-12 rounded-xl">
                <SelectValue placeholder="Trier par" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="popularity">Popularité</SelectItem>
                <SelectItem value="price-asc">Prix croissant</SelectItem>
                <SelectItem value="price-desc">Prix décroissant</SelectItem>
                <SelectItem value="newest">Nouveautés</SelectItem>
                <SelectItem value="featured">Recommandés</SelectItem>
              </SelectContent>
            </Select>

            {/* View Toggle */}
            <div className="hidden sm:flex items-center gap-1 p-1 bg-muted/30 rounded-xl">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2.5 rounded-lg transition-colors ${
                  viewMode === 'grid' ? 'bg-background shadow-sm text-primary' : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                <Grid3X3 className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2.5 rounded-lg transition-colors ${
                  viewMode === 'list' ? 'bg-background shadow-sm text-primary' : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                <List className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Active Filters Tags */}
        {activeFiltersCount > 0 && (
          <div className="flex flex-wrap gap-2 mb-6">
            {selectedCategories.map(cat => (
              <Badge
                key={cat}
                variant="secondary"
                className="px-3 py-1 cursor-pointer hover:bg-destructive hover:text-destructive-foreground"
                onClick={() => toggleFilter(cat, selectedCategories, setSelectedCategories)}
              >
                {cat} <X className="w-3 h-3 ml-1" />
              </Badge>
            ))}
            {selectedGenders.map(gender => (
              <Badge
                key={gender}
                variant="secondary"
                className="px-3 py-1 cursor-pointer hover:bg-destructive hover:text-destructive-foreground"
                onClick={() => toggleFilter(gender, selectedGenders, setSelectedGenders)}
              >
                {gender} <X className="w-3 h-3 ml-1" />
              </Badge>
            ))}
            {selectedColors.map(color => (
              <Badge
                key={color}
                variant="secondary"
                className="px-3 py-1 cursor-pointer hover:bg-destructive hover:text-destructive-foreground"
                onClick={() => toggleFilter(color, selectedColors, setSelectedColors)}
              >
                {color} <X className="w-3 h-3 ml-1" />
              </Badge>
            ))}
          </div>
        )}

        <div className="flex gap-8">
          {/* Desktop Sidebar Filters */}
          <aside className="hidden lg:block w-72 flex-shrink-0">
            <div className="sticky top-24 bg-card border border-border rounded-2xl p-6 max-h-[calc(100vh-120px)] overflow-y-auto scrollbar-hide">
              <h3 className="font-heading font-semibold text-lg mb-4">Filtres</h3>
              <FiltersContent />
            </div>
          </aside>

          {/* Products Grid */}
          <div className="flex-1">
            <div className="flex items-center justify-between mb-6">
              <p className="text-muted-foreground">
                {filteredProducts.length} produit{filteredProducts.length > 1 ? 's' : ''} trouvé{filteredProducts.length > 1 ? 's' : ''}
              </p>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={viewMode + sortBy}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className={viewMode === 'grid' 
                  ? 'grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6'
                  : 'flex flex-col gap-4'
                }
              >
                {filteredProducts.map((product, index) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    {viewMode === 'grid' ? (
                      <Link to={`/produit/${product.id}`}>
                        <div className="group bg-card rounded-2xl overflow-hidden border border-border hover:border-primary/20 card-hover">
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
                              <span className="badge-category">{product.category}</span>
                            </div>
                            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                              <div className="absolute bottom-4 right-4 flex gap-2">
                                <button className="w-10 h-10 rounded-xl bg-white/90 backdrop-blur-sm flex items-center justify-center hover:bg-white transition-colors">
                                  <Heart className="w-5 h-5 text-foreground" />
                                </button>
                                <button className="w-10 h-10 rounded-xl bg-white/90 backdrop-blur-sm flex items-center justify-center hover:bg-white transition-colors">
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
                              <Badge variant="outline" className="text-xs">
                                Fabrication locale
                              </Badge>
                            </div>
                          </div>
                        </div>
                      </Link>
                    ) : (
                      <Link to={`/produit/${product.id}`}>
                        <div className="flex gap-6 bg-card rounded-2xl overflow-hidden border border-border hover:border-primary/20 p-4 card-hover">
                          <div className="relative w-48 h-36 rounded-xl overflow-hidden flex-shrink-0">
                            <img
                              src={product.image}
                              alt={product.name}
                              className="w-full h-full object-cover"
                              loading="lazy"
                            />
                          </div>
                          <div className="flex-1 flex flex-col justify-between py-1">
                            <div>
                              <div className="flex items-center gap-2 mb-2">
                                <span className="badge-category">{product.category}</span>
                                {product.featured && <span className="badge-featured">Vedette</span>}
                              </div>
                              <h3 className="font-heading font-semibold text-xl text-card-foreground mb-1">
                                {product.name}
                              </h3>
                              <p className="text-sm text-muted-foreground mb-2">{product.supplier.name}</p>
                              <p className="text-sm text-muted-foreground line-clamp-2">
                                {product.description}
                              </p>
                            </div>
                            <div className="flex items-center justify-between mt-4">
                              <p className="font-heading font-bold text-xl text-primary">
                                {formatPrice(product.price)}
                              </p>
                              <div className="flex gap-2">
                                <Button variant="outline" size="sm">
                                  <Heart className="w-4 h-4" />
                                </Button>
                                <Button size="sm">
                                  <ShoppingCart className="w-4 h-4 mr-2" />
                                  Ajouter
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </Link>
                    )}
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>

            {filteredProducts.length === 0 && (
              <div className="text-center py-16">
                <p className="text-muted-foreground text-lg mb-4">Aucun produit trouvé</p>
                <Button variant="outline" onClick={clearAllFilters}>
                  Réinitialiser les filtres
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Catalogue;
