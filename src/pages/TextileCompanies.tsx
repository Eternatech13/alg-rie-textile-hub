import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Search, 
  Filter, 
  Building2, 
  MapPin, 
  CheckCircle2, 
  Star, 
  ArrowRight,
  Package,
  X,
  ChevronDown,
  Factory,
  Sparkles
} from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import {
  mockTextileCompanies,
  textileDomains,
  productTypes,
  wilayas,
  filterCompanies,
  type TextileCompany,
} from '@/data/mockTextileCompanies';

const CompanyCard = ({ company }: { company: TextileCompany }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="group bg-card rounded-2xl border border-border overflow-hidden hover:border-primary/30 hover:shadow-xl transition-all duration-300"
    >
      {/* Cover Image */}
      <div className="relative h-32 overflow-hidden">
        <img
          src={company.coverImage}
          alt={company.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        
        {/* Logo */}
        <div className="absolute -bottom-8 left-4">
          <div className="w-16 h-16 rounded-xl border-4 border-card overflow-hidden bg-card shadow-lg">
            <img
              src={company.logo}
              alt={company.name}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
        
        {/* Type Badge */}
        <div className="absolute top-3 right-3">
          <Badge 
            className={company.type === 'public' 
              ? 'bg-primary/90 hover:bg-primary text-primary-foreground' 
              : 'bg-accent/90 hover:bg-accent text-accent-foreground'
            }
          >
            {company.type === 'public' ? 'Publique' : 'Privée'}
          </Badge>
        </div>
      </div>
      
      {/* Content */}
      <div className="pt-10 p-5">
        {/* Header */}
        <div className="flex items-start justify-between mb-3">
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-heading font-semibold text-lg text-card-foreground">
                {company.name}
              </h3>
              {company.verified && (
                <CheckCircle2 className="w-4 h-4 text-accent" />
              )}
            </div>
            <div className="flex items-center gap-1.5 text-sm text-muted-foreground mt-1">
              <MapPin className="w-3.5 h-3.5" />
              {company.wilaya}
            </div>
          </div>
          
          {/* Rating */}
          <div className="flex items-center gap-1 px-2 py-1 bg-accent/10 rounded-lg">
            <Star className="w-4 h-4 text-accent fill-accent" />
            <span className="text-sm font-medium text-accent">{company.qualityRating}</span>
          </div>
        </div>
        
        {/* Description */}
        <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
          {company.description}
        </p>
        
        {/* Domains */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {company.textileDomains.slice(0, 3).map((domain) => (
            <Badge key={domain} variant="secondary" className="text-xs font-normal">
              {domain}
            </Badge>
          ))}
          {company.textileDomains.length > 3 && (
            <Badge variant="outline" className="text-xs">
              +{company.textileDomains.length - 3}
            </Badge>
          )}
        </div>
        
        {/* Stats */}
        <div className="grid grid-cols-3 gap-3 py-3 border-t border-border">
          <div className="text-center">
            <p className="text-lg font-semibold text-foreground">{company.productCount}</p>
            <p className="text-xs text-muted-foreground">Produits</p>
          </div>
          <div className="text-center border-x border-border">
            <p className="text-lg font-semibold text-foreground">{company.totalProductionUnits}</p>
            <p className="text-xs text-muted-foreground">Unités</p>
          </div>
          <div className="text-center">
            <p className="text-lg font-semibold text-foreground">{company.designerPartnerCount}</p>
            <p className="text-xs text-muted-foreground">Designers</p>
          </div>
        </div>
        
        {/* CTA */}
        <Link to={`/societe-textile/${company.id}`}>
          <Button 
            variant="ghost" 
            className="w-full mt-3 text-primary hover:text-primary hover:bg-primary/10"
          >
            Voir les détails
            <ArrowRight className="ml-2 w-4 h-4" />
          </Button>
        </Link>
      </div>
    </motion.div>
  );
};

const FilterSection = ({
  title,
  children,
  defaultOpen = false,
}: {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  
  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen} className="border-b border-border pb-4">
      <CollapsibleTrigger className="flex items-center justify-between w-full py-2 text-sm font-medium hover:text-primary transition-colors">
        {title}
        <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </CollapsibleTrigger>
      <CollapsibleContent className="pt-2 space-y-2">
        {children}
      </CollapsibleContent>
    </Collapsible>
  );
};

const TextileCompanies = () => {
  const [search, setSearch] = useState('');
  const [selectedType, setSelectedType] = useState<'all' | 'public' | 'private'>('all');
  const [selectedDomains, setSelectedDomains] = useState<string[]>([]);
  const [selectedWilayas, setSelectedWilayas] = useState<string[]>([]);
  const [selectedProductTypes, setSelectedProductTypes] = useState<string[]>([]);
  const [structureFilter, setStructureFilter] = useState<boolean | null>(null);
  
  const filteredCompanies = useMemo(() => {
    return filterCompanies(mockTextileCompanies, {
      search,
      type: selectedType,
      domains: selectedDomains,
      wilayas: selectedWilayas,
      productTypes: selectedProductTypes,
      isMotherCompany: structureFilter,
    });
  }, [search, selectedType, selectedDomains, selectedWilayas, selectedProductTypes, structureFilter]);
  
  const toggleDomain = (domain: string) => {
    setSelectedDomains(prev => 
      prev.includes(domain) 
        ? prev.filter(d => d !== domain)
        : [...prev, domain]
    );
  };
  
  const toggleWilaya = (wilaya: string) => {
    setSelectedWilayas(prev => 
      prev.includes(wilaya) 
        ? prev.filter(w => w !== wilaya)
        : [...prev, wilaya]
    );
  };
  
  const toggleProductType = (type: string) => {
    setSelectedProductTypes(prev => 
      prev.includes(type) 
        ? prev.filter(t => t !== type)
        : [...prev, type]
    );
  };
  
  const clearFilters = () => {
    setSearch('');
    setSelectedType('all');
    setSelectedDomains([]);
    setSelectedWilayas([]);
    setSelectedProductTypes([]);
    setStructureFilter(null);
  };
  
  const hasActiveFilters = search || selectedType !== 'all' || selectedDomains.length > 0 || 
    selectedWilayas.length > 0 || selectedProductTypes.length > 0 || structureFilter !== null;
  
  const FilterContent = () => (
    <div className="space-y-4">
      {/* Type de société */}
      <FilterSection title="Type de société">
        <div className="space-y-2">
          {[
            { value: 'all', label: 'Toutes' },
            { value: 'public', label: 'Société publique' },
            { value: 'private', label: 'Société privée' },
          ].map((type) => (
            <label key={type.value} className="flex items-center gap-2 cursor-pointer">
              <Checkbox 
                checked={selectedType === type.value}
                onCheckedChange={() => setSelectedType(type.value as any)}
              />
              <span className="text-sm">{type.label}</span>
            </label>
          ))}
        </div>
      </FilterSection>
      
      {/* Domaine textile */}
      <FilterSection title="Domaine textile">
        <div className="space-y-2 max-h-48 overflow-y-auto">
          {textileDomains.map((domain) => (
            <label key={domain} className="flex items-center gap-2 cursor-pointer">
              <Checkbox 
                checked={selectedDomains.includes(domain)}
                onCheckedChange={() => toggleDomain(domain)}
              />
              <span className="text-sm">{domain}</span>
            </label>
          ))}
        </div>
      </FilterSection>
      
      {/* Structure industrielle */}
      <FilterSection title="Structure industrielle">
        <div className="space-y-2">
          <label className="flex items-center gap-2 cursor-pointer">
            <Checkbox 
              checked={structureFilter === null}
              onCheckedChange={() => setStructureFilter(null)}
            />
            <span className="text-sm">Toutes structures</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <Checkbox 
              checked={structureFilter === true}
              onCheckedChange={() => setStructureFilter(true)}
            />
            <span className="text-sm">Société mère uniquement</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <Checkbox 
              checked={structureFilter === false}
              onCheckedChange={() => setStructureFilter(false)}
            />
            <span className="text-sm">Société indépendante</span>
          </label>
        </div>
      </FilterSection>
      
      {/* Localisation */}
      <FilterSection title="Localisation (Wilaya)">
        <div className="space-y-2 max-h-48 overflow-y-auto">
          {wilayas.map((wilaya) => (
            <label key={wilaya} className="flex items-center gap-2 cursor-pointer">
              <Checkbox 
                checked={selectedWilayas.includes(wilaya)}
                onCheckedChange={() => toggleWilaya(wilaya)}
              />
              <span className="text-sm">{wilaya}</span>
            </label>
          ))}
        </div>
      </FilterSection>
      
      {/* Types produits */}
      <FilterSection title="Types de produits">
        <div className="space-y-2 max-h-48 overflow-y-auto">
          {productTypes.map((type) => (
            <label key={type} className="flex items-center gap-2 cursor-pointer">
              <Checkbox 
                checked={selectedProductTypes.includes(type)}
                onCheckedChange={() => toggleProductType(type)}
              />
              <span className="text-sm">{type}</span>
            </label>
          ))}
        </div>
      </FilterSection>
      
      {hasActiveFilters && (
        <Button 
          variant="outline" 
          className="w-full"
          onClick={clearFilters}
        >
          <X className="w-4 h-4 mr-2" />
          Effacer les filtres
        </Button>
      )}
    </div>
  );
  
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="relative pt-24 pb-12 bg-gradient-to-b from-primary/5 to-background">
        <div className="section-container">
          {/* Breadcrumb */}
          <Breadcrumb className="mb-6">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/">Accueil</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Sociétés textiles</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto"
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
              <Building2 className="w-4 h-4" />
              Partenaires certifiés
            </span>
            <h1 className="text-4xl md:text-5xl font-heading font-bold text-foreground mb-4">
              Nos Sociétés Textiles
            </h1>
            <p className="text-lg text-muted-foreground">
              Découvrez les entreprises textiles algériennes de confiance, vérifiées et conventionnées avec Sallate Bladi
            </p>
          </motion.div>
          
          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="max-w-2xl mx-auto mt-8"
          >
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Rechercher par nom, domaine, wilaya, produit..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-12 pr-4 h-14 text-base rounded-xl border-border bg-card shadow-sm"
              />
            </div>
          </motion.div>
          
          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-wrap justify-center gap-8 mt-10"
          >
            {[
              { icon: Building2, value: mockTextileCompanies.length, label: 'Sociétés' },
              { icon: Factory, value: mockTextileCompanies.reduce((acc, c) => acc + c.totalProductionUnits, 0), label: 'Unités de production' },
              { icon: Package, value: mockTextileCompanies.reduce((acc, c) => acc + c.productCount, 0), label: 'Produits' },
              { icon: Sparkles, value: mockTextileCompanies.reduce((acc, c) => acc + c.designerPartnerCount, 0), label: 'Designers' },
            ].map((stat) => (
              <div key={stat.label} className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                  <stat.icon className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>
      
      {/* Main Content */}
      <section className="section-padding">
        <div className="section-container">
          <div className="flex gap-8">
            {/* Desktop Filters */}
            <aside className="hidden lg:block w-72 shrink-0">
              <div className="sticky top-24 bg-card rounded-2xl border border-border p-5">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-heading font-semibold flex items-center gap-2">
                    <Filter className="w-4 h-4" />
                    Filtres
                  </h3>
                  {hasActiveFilters && (
                    <Button variant="ghost" size="sm" onClick={clearFilters}>
                      Effacer
                    </Button>
                  )}
                </div>
                <FilterContent />
              </div>
            </aside>
            
            {/* Content */}
            <div className="flex-1">
              {/* Mobile Filter Button + Results Count */}
              <div className="flex items-center justify-between mb-6">
                <p className="text-muted-foreground">
                  <span className="font-semibold text-foreground">{filteredCompanies.length}</span> société{filteredCompanies.length > 1 ? 's' : ''} trouvée{filteredCompanies.length > 1 ? 's' : ''}
                </p>
                
                {/* Mobile Filter */}
                <Sheet>
                  <SheetTrigger asChild>
                    <Button variant="outline" className="lg:hidden">
                      <Filter className="w-4 h-4 mr-2" />
                      Filtres
                      {hasActiveFilters && (
                        <Badge className="ml-2 bg-primary text-primary-foreground">
                          {[selectedDomains.length, selectedWilayas.length, selectedProductTypes.length, selectedType !== 'all' ? 1 : 0, structureFilter !== null ? 1 : 0].reduce((a, b) => a + b, 0)}
                        </Badge>
                      )}
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="left" className="w-80">
                    <SheetHeader>
                      <SheetTitle className="flex items-center gap-2">
                        <Filter className="w-4 h-4" />
                        Filtres
                      </SheetTitle>
                    </SheetHeader>
                    <div className="mt-6">
                      <FilterContent />
                    </div>
                  </SheetContent>
                </Sheet>
              </div>
              
              {/* Active Filters Tags */}
              {hasActiveFilters && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="flex flex-wrap gap-2 mb-6"
                >
                  {selectedType !== 'all' && (
                    <Badge variant="secondary" className="gap-1">
                      {selectedType === 'public' ? 'Publique' : 'Privée'}
                      <X 
                        className="w-3 h-3 cursor-pointer" 
                        onClick={() => setSelectedType('all')}
                      />
                    </Badge>
                  )}
                  {selectedDomains.map((domain) => (
                    <Badge key={domain} variant="secondary" className="gap-1">
                      {domain}
                      <X 
                        className="w-3 h-3 cursor-pointer" 
                        onClick={() => toggleDomain(domain)}
                      />
                    </Badge>
                  ))}
                  {selectedWilayas.map((wilaya) => (
                    <Badge key={wilaya} variant="secondary" className="gap-1">
                      {wilaya}
                      <X 
                        className="w-3 h-3 cursor-pointer" 
                        onClick={() => toggleWilaya(wilaya)}
                      />
                    </Badge>
                  ))}
                  {selectedProductTypes.map((type) => (
                    <Badge key={type} variant="secondary" className="gap-1">
                      {type}
                      <X 
                        className="w-3 h-3 cursor-pointer" 
                        onClick={() => toggleProductType(type)}
                      />
                    </Badge>
                  ))}
                </motion.div>
              )}
              
              {/* Companies Grid */}
              <AnimatePresence mode="wait">
                {filteredCompanies.length > 0 ? (
                  <motion.div
                    key="grid"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
                  >
                    {filteredCompanies.map((company, index) => (
                      <motion.div
                        key={company.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                      >
                        <CompanyCard company={company} />
                      </motion.div>
                    ))}
                  </motion.div>
                ) : (
                  <motion.div
                    key="empty"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="text-center py-16"
                  >
                    <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
                      <Building2 className="w-10 h-10 text-muted-foreground" />
                    </div>
                    <h3 className="text-xl font-semibold text-foreground mb-2">
                      Aucune société trouvée
                    </h3>
                    <p className="text-muted-foreground mb-6">
                      Essayez de modifier vos critères de recherche
                    </p>
                    <Button variant="outline" onClick={clearFilters}>
                      Effacer les filtres
                    </Button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default TextileCompanies;
