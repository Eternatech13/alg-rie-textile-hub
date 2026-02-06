import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, Star, Palette, Award, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Checkbox } from '@/components/ui/checkbox';
import { mockDesignerProfiles } from '@/data/mockDesigners';

const Designers = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSpecialties, setSelectedSpecialties] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState('popularity');

  // Get all unique specialties
  const allSpecialties = useMemo(() => {
    const specialties = new Set<string>();
    mockDesignerProfiles.forEach(designer => {
      designer.specialties.forEach(s => specialties.add(s));
    });
    return Array.from(specialties);
  }, []);

  // Filter and sort designers
  const filteredDesigners = useMemo(() => {
    let result = [...mockDesignerProfiles];

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(designer =>
        designer.name.toLowerCase().includes(query) ||
        designer.bio.toLowerCase().includes(query) ||
        designer.specialties.some(s => s.toLowerCase().includes(query))
      );
    }

    // Specialty filter
    if (selectedSpecialties.length > 0) {
      result = result.filter(designer =>
        designer.specialties.some(s => selectedSpecialties.includes(s))
      );
    }

    // Sort
    switch (sortBy) {
      case 'popularity':
        result.sort((a, b) => b.stats.productsSold - a.stats.productsSold);
        break;
      case 'rating':
        result.sort((a, b) => b.rating - a.rating);
        break;
      case 'designs':
        result.sort((a, b) => b.stats.designsPublished - a.stats.designsPublished);
        break;
      case 'name':
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
    }

    return result;
  }, [searchQuery, selectedSpecialties, sortBy]);

  const toggleSpecialty = (specialty: string) => {
    setSelectedSpecialties(prev =>
      prev.includes(specialty)
        ? prev.filter(s => s !== specialty)
        : [...prev, specialty]
    );
  };

  const FilterContent = () => (
    <div className="space-y-6">
      {/* Specialties */}
      <div>
        <h3 className="font-semibold text-foreground mb-3">Spécialités</h3>
        <div className="space-y-2">
          {allSpecialties.map(specialty => (
            <label key={specialty} className="flex items-center gap-2 cursor-pointer">
              <Checkbox
                checked={selectedSpecialties.includes(specialty)}
                onCheckedChange={() => toggleSpecialty(specialty)}
              />
              <span className="text-sm text-muted-foreground">{specialty}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Reset */}
      <Button
        variant="outline"
        className="w-full"
        onClick={() => {
          setSelectedSpecialties([]);
          setSearchQuery('');
        }}
      >
        Réinitialiser les filtres
      </Button>
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Banner */}
      <section className="pt-32 pb-16 bg-gradient-to-br from-primary/10 via-background to-accent/10">
        <div className="section-container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto"
          >
            <Badge className="mb-4 bg-accent/10 text-accent border-accent/20">
              <Palette className="w-3 h-3 mr-1" />
              Créateurs talentueux
            </Badge>
            <h1 className="text-hero text-foreground mb-4">
              Nos Designers Partenaires
            </h1>
            <p className="text-lg text-muted-foreground">
              Découvrez les designers algériens qui façonnent l'avenir du textile local.
              Explorez leurs portfolios et collaborez avec eux.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="section-padding">
        <div className="section-container">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar Filters - Desktop */}
            <aside className="hidden lg:block w-72 shrink-0">
              <div className="sticky top-24 bg-card rounded-2xl border border-border p-6">
                <h2 className="font-heading font-semibold text-lg text-card-foreground mb-6">
                  Filtres
                </h2>
                <FilterContent />
              </div>
            </aside>

            {/* Main Content */}
            <div className="flex-1">
              {/* Search and Controls */}
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                {/* Search */}
                <div className="relative flex-1">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    type="text"
                    placeholder="Rechercher un designer..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-12 h-12 rounded-xl"
                  />
                </div>

                {/* Sort */}
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="h-12 px-4 rounded-xl border border-border bg-background text-foreground"
                >
                  <option value="popularity">Popularité</option>
                  <option value="rating">Meilleure note</option>
                  <option value="designs">Plus de designs</option>
                  <option value="name">Nom A-Z</option>
                </select>

                {/* Mobile Filter Button */}
                <Sheet>
                  <SheetTrigger asChild>
                    <Button variant="outline" className="lg:hidden h-12 px-4 rounded-xl">
                      <Filter className="w-5 h-5 mr-2" />
                      Filtres
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="left" className="w-80">
                    <SheetHeader>
                      <SheetTitle>Filtres</SheetTitle>
                    </SheetHeader>
                    <div className="mt-6">
                      <FilterContent />
                    </div>
                  </SheetContent>
                </Sheet>
              </div>

              {/* Results Count */}
              <p className="text-muted-foreground mb-6">
                {filteredDesigners.length} designer{filteredDesigners.length > 1 ? 's' : ''} trouvé{filteredDesigners.length > 1 ? 's' : ''}
              </p>

              {/* Designers Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredDesigners.map((designer, index) => (
                  <motion.div
                    key={designer.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Link
                      to={`/designer/${designer.id}`}
                      className="block bg-card rounded-2xl border border-border hover:border-primary/30 card-hover overflow-hidden group"
                    >
                      {/* Cover Image */}
                      {designer.coverImage && (
                        <div className="h-32 overflow-hidden">
                          <img
                            src={designer.coverImage}
                            alt=""
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                        </div>
                      )}

                      <div className="p-6 text-center">
                        {/* Photo */}
                        <div className={`relative w-24 h-24 mx-auto ${designer.coverImage ? '-mt-16' : ''}`}>
                          <img
                            src={designer.photo}
                            alt={designer.name}
                            className="w-full h-full rounded-full object-cover border-4 border-card"
                          />
                          {designer.featured && (
                            <div className="absolute -top-1 -right-1 w-6 h-6 bg-accent rounded-full flex items-center justify-center">
                              <Award className="w-3 h-3 text-accent-foreground" />
                            </div>
                          )}
                        </div>

                        {/* Info */}
                        <h3 className="font-heading font-semibold text-lg text-card-foreground mt-4 mb-1">
                          {designer.name}
                        </h3>

                        {/* Rating */}
                        <div className="flex items-center justify-center gap-1 mb-3">
                          <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                          <span className="text-sm font-medium text-foreground">{designer.rating}</span>
                          <span className="text-sm text-muted-foreground">({designer.reviewCount} avis)</span>
                        </div>

                        {/* Specialties */}
                        <div className="flex flex-wrap justify-center gap-1 mb-4">
                          {designer.specialties.slice(0, 2).map(specialty => (
                            <Badge key={specialty} variant="secondary" className="text-xs">
                              {specialty}
                            </Badge>
                          ))}
                          {designer.specialties.length > 2 && (
                            <Badge variant="outline" className="text-xs">
                              +{designer.specialties.length - 2}
                            </Badge>
                          )}
                        </div>

                        {/* Stats */}
                        <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Palette className="w-4 h-4" />
                            <span>{designer.stats.designsPublished}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <TrendingUp className="w-4 h-4" />
                            <span>{designer.stats.productsSold}</span>
                          </div>
                        </div>

                        {/* Bio Preview */}
                        <p className="text-sm text-muted-foreground mt-4 line-clamp-2">
                          {designer.bio}
                        </p>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>

              {/* Empty State */}
              {filteredDesigners.length === 0 && (
                <div className="text-center py-16">
                  <Palette className="w-16 h-16 text-muted-foreground/30 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    Aucun designer trouvé
                  </h3>
                  <p className="text-muted-foreground mb-6">
                    Essayez de modifier vos critères de recherche
                  </p>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setSelectedSpecialties([]);
                      setSearchQuery('');
                    }}
                  >
                    Réinitialiser les filtres
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Designers;
