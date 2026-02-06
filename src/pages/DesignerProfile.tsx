import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import {
  Star, Heart, MapPin, Calendar, Instagram, Globe, Facebook,
  Palette, Award, TrendingUp, Users, ShoppingBag, ArrowRight,
  Filter, Grid3X3, List, Eye, FileSignature, Building2, Percent,
  Clock, FileText, CheckCircle, X
} from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import {
  getDesignerById,
  getDesignsByDesignerId,
  getDesignerReviews,
  formatDesignerJoinDate,
  Design
} from '@/data/mockDesigners';
import { mockTextileCompanies } from '@/data/mockTextileCompanies';

const DesignerProfile = () => {
  const { id } = useParams<{ id: string }>();
  const designer = getDesignerById(id || '');
  const designs = getDesignsByDesignerId(id || '');
  const reviews = getDesignerReviews(id || '');

  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [likedDesigns, setLikedDesigns] = useState<Set<string>>(new Set());
  const [selectedDesign, setSelectedDesign] = useState<Design | null>(null);
  const [isConventionDialogOpen, setIsConventionDialogOpen] = useState(false);
  const [conventionForm, setConventionForm] = useState({
    type: 'sallate_bladi',
    productionUnitId: '',
    designerPercentage: 15,
    duration: '12',
    isExclusive: false,
    productionVolume: '',
    notes: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  if (!designer) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-2xl font-bold text-foreground">Designer non trouvé</h1>
          <Link to="/catalogue" className="text-primary hover:underline mt-4 inline-block">
            Retour au catalogue
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const handleLikeDesign = (designId: string) => {
    setLikedDesigns(prev => {
      const newSet = new Set(prev);
      if (newSet.has(designId)) {
        newSet.delete(designId);
      } else {
        newSet.add(designId);
      }
      return newSet;
    });
  };

  const handleConventionSubmit = async () => {
    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setSubmitSuccess(true);
    setTimeout(() => {
      setIsConventionDialogOpen(false);
      setSubmitSuccess(false);
      setSelectedDesign(null);
    }, 2000);
  };

  const filteredDesigns = designs.filter(design => {
    if (filterCategory !== 'all' && design.category !== filterCategory) return false;
    if (filterStatus !== 'all' && design.status !== filterStatus) return false;
    return true;
  });

  const categories = [...new Set(designs.map(d => d.category))];

  const productionUnits = mockTextileCompanies.flatMap(company =>
    company.subCompanies.flatMap(sub =>
      sub.productionUnits.map(unit => ({
        id: unit.id,
        name: `${unit.name} - ${company.name}`,
        companyId: company.id
      }))
    )
  );

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Cover Image */}
      <div className="relative h-64 md:h-80 overflow-hidden">
        <img
          src={designer.coverImage || designer.photo}
          alt={`Couverture ${designer.name}`}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
      </div>

      {/* Profile Header */}
      <div className="container mx-auto px-4 -mt-24 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-card rounded-2xl shadow-xl p-6 md:p-8 border border-border"
        >
          <div className="flex flex-col md:flex-row gap-6">
            {/* Photo */}
            <div className="flex-shrink-0">
              <div className="relative">
                <img
                  src={designer.photo}
                  alt={designer.name}
                  className="w-32 h-32 md:w-40 md:h-40 rounded-full object-cover border-4 border-primary/20 shadow-lg"
                />
                {designer.verified && (
                  <div className="absolute -bottom-2 -right-2 bg-primary rounded-full p-2">
                    <CheckCircle className="w-5 h-5 text-primary-foreground" />
                  </div>
                )}
              </div>
            </div>

            {/* Info */}
            <div className="flex-1">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <h1 className="text-2xl md:text-3xl font-heading font-bold text-foreground">
                    {designer.name}
                  </h1>
                  <div className="flex items-center gap-2 mt-2 text-muted-foreground">
                    <MapPin className="w-4 h-4" />
                    <span>{designer.location}</span>
                    <span className="mx-2">•</span>
                    <Calendar className="w-4 h-4" />
                    <span>Membre depuis {formatDesignerJoinDate(designer.joinedDate)}</span>
                  </div>
                </div>

                {/* Rating */}
                <div className="flex items-center gap-2 bg-accent/10 rounded-lg px-4 py-2">
                  <Star className="w-5 h-5 text-accent fill-accent" />
                  <span className="text-xl font-bold text-foreground">{designer.rating}</span>
                  <span className="text-muted-foreground">({designer.reviewCount} avis)</span>
                </div>
              </div>

              {/* Specialties */}
              <div className="flex flex-wrap gap-2 mt-4">
                {designer.specialties.map((specialty, index) => (
                  <Badge key={index} variant="secondary" className="bg-primary/10 text-primary">
                    {specialty}
                  </Badge>
                ))}
              </div>

              {/* Bio */}
              <p className="text-muted-foreground mt-4 leading-relaxed">
                {designer.bio}
              </p>

              {/* Social Links */}
              {designer.socialLinks && (
                <div className="flex gap-3 mt-4">
                  {designer.socialLinks.instagram && (
                    <Button variant="outline" size="sm" className="gap-2">
                      <Instagram className="w-4 h-4" />
                      {designer.socialLinks.instagram}
                    </Button>
                  )}
                  {designer.socialLinks.facebook && (
                    <Button variant="outline" size="sm" className="gap-2">
                      <Facebook className="w-4 h-4" />
                      Facebook
                    </Button>
                  )}
                  {designer.socialLinks.website && (
                    <Button variant="outline" size="sm" className="gap-2">
                      <Globe className="w-4 h-4" />
                      Site web
                    </Button>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 pt-6 border-t border-border">
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 text-primary mb-2">
                <Palette className="w-5 h-5" />
              </div>
              <div className="text-2xl font-bold text-foreground">{designer.stats.designsPublished}</div>
              <div className="text-sm text-muted-foreground">Designs publiés</div>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 text-accent mb-2">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <div className="text-2xl font-bold text-foreground">{designer.stats.productsSold.toLocaleString()}</div>
              <div className="text-sm text-muted-foreground">Produits vendus</div>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 text-secondary mb-2">
                <Users className="w-5 h-5" />
              </div>
              <div className="text-2xl font-bold text-foreground">{designer.stats.partnerCompanies}</div>
              <div className="text-sm text-muted-foreground">Sociétés partenaires</div>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 text-primary mb-2">
                <TrendingUp className="w-5 h-5" />
              </div>
              <div className="text-2xl font-bold text-foreground">{designer.stats.popularity}%</div>
              <div className="text-sm text-muted-foreground">Popularité</div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <Tabs defaultValue="portfolio" className="space-y-8">
          <TabsList className="flex flex-wrap justify-start gap-2 bg-transparent p-0">
            <TabsTrigger value="portfolio" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <Palette className="w-4 h-4 mr-2" />
              Portfolio
            </TabsTrigger>
            <TabsTrigger value="about" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <Award className="w-4 h-4 mr-2" />
              À propos
            </TabsTrigger>
            <TabsTrigger value="reviews" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <Star className="w-4 h-4 mr-2" />
              Avis ({reviews.length})
            </TabsTrigger>
          </TabsList>

          {/* Portfolio Tab */}
          <TabsContent value="portfolio" className="space-y-6">
            {/* Filters */}
            <div className="flex flex-wrap items-center justify-between gap-4 bg-card p-4 rounded-xl border border-border">
              <div className="flex flex-wrap items-center gap-4">
                <div className="flex items-center gap-2">
                  <Filter className="w-4 h-4 text-muted-foreground" />
                  <Select value={filterCategory} onValueChange={setFilterCategory}>
                    <SelectTrigger className="w-40">
                      <SelectValue placeholder="Catégorie" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Toutes catégories</SelectItem>
                      {categories.map(cat => (
                        <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <Select value={filterStatus} onValueChange={setFilterStatus}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Statut" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tous les statuts</SelectItem>
                    <SelectItem value="disponible">Disponible</SelectItem>
                    <SelectItem value="exclusif">Exclusif</SelectItem>
                    <SelectItem value="sous_convention">Sous convention</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant={viewMode === 'grid' ? 'default' : 'outline'}
                  size="icon"
                  onClick={() => setViewMode('grid')}
                >
                  <Grid3X3 className="w-4 h-4" />
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'default' : 'outline'}
                  size="icon"
                  onClick={() => setViewMode('list')}
                >
                  <List className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Designs Grid */}
            <div className={`grid gap-6 ${viewMode === 'grid' ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}`}>
              <AnimatePresence mode="popLayout">
                {filteredDesigns.map((design, index) => (
                  <motion.div
                    key={design.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Card className={`group overflow-hidden hover:shadow-lg transition-all duration-300 ${viewMode === 'list' ? 'flex flex-row' : ''}`}>
                      {/* Image */}
                      <div className={`relative overflow-hidden ${viewMode === 'list' ? 'w-48 flex-shrink-0' : 'aspect-[3/4]'}`}>
                        <img
                          src={design.images[0]}
                          alt={design.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        {/* Badges */}
                        <div className="absolute top-3 left-3 flex flex-col gap-2">
                          {design.isNew && (
                            <Badge className="bg-accent text-accent-foreground">Nouveau</Badge>
                          )}
                          <Badge
                            variant={design.status === 'disponible' ? 'default' : design.status === 'exclusif' ? 'secondary' : 'outline'}
                            className={
                              design.status === 'disponible' ? 'bg-green-500' :
                              design.status === 'exclusif' ? 'bg-purple-500 text-white' :
                              'bg-amber-500 text-white border-0'
                            }
                          >
                            {design.status === 'sous_convention' ? 'Sous convention' : design.status.charAt(0).toUpperCase() + design.status.slice(1)}
                          </Badge>
                        </div>
                        {/* Like Button */}
                        <button
                          onClick={() => handleLikeDesign(design.id)}
                          className="absolute top-3 right-3 w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-md hover:scale-110 transition-transform"
                        >
                          <Heart
                            className={`w-5 h-5 transition-colors ${likedDesigns.has(design.id) ? 'text-red-500 fill-red-500' : 'text-muted-foreground'}`}
                          />
                        </button>
                        {/* Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                          <div className="absolute bottom-4 left-4 right-4 flex gap-2">
                            <Button
                              size="sm"
                              variant="secondary"
                              className="flex-1"
                              asChild
                            >
                              <Link to={`/design/${design.id}`}>
                                <Eye className="w-4 h-4 mr-1" />
                                Voir
                              </Link>
                            </Button>
                            <Button
                              size="sm"
                              className="flex-1"
                              onClick={() => {
                                setSelectedDesign(design);
                                setIsConventionDialogOpen(true);
                              }}
                            >
                              <FileSignature className="w-4 h-4 mr-1" />
                              Convention
                            </Button>
                          </div>
                        </div>
                      </div>

                      {/* Content */}
                      <CardContent className={`p-4 ${viewMode === 'list' ? 'flex-1' : ''}`}>
                        <div className="flex items-start justify-between gap-2 mb-2">
                          <div>
                            <h3 className="font-semibold text-foreground line-clamp-1">{design.name}</h3>
                            <p className="text-sm text-muted-foreground">{design.category} • {design.subcategory}</p>
                          </div>
                        </div>

                        {design.partneredCompanyName && (
                          <div className="flex items-center gap-2 text-sm text-primary mb-2">
                            <Building2 className="w-4 h-4" />
                            {design.partneredCompanyName}
                          </div>
                        )}

                        <div className="flex items-center justify-between text-sm text-muted-foreground">
                          <div className="flex items-center gap-3">
                            <span className="flex items-center gap-1">
                              <Heart className="w-4 h-4" />
                              {design.likes + (likedDesigns.has(design.id) ? 1 : 0)}
                            </span>
                            <span className="flex items-center gap-1">
                              <ShoppingBag className="w-4 h-4" />
                              {design.orderCount}
                            </span>
                          </div>
                          <span className="font-medium text-foreground">
                            {design.priceRange.min.toLocaleString()} - {design.priceRange.max.toLocaleString()} DA
                          </span>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {filteredDesigns.length === 0 && (
              <div className="text-center py-12">
                <Palette className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">Aucun design trouvé avec ces filtres</p>
              </div>
            )}
          </TabsContent>

          {/* About Tab */}
          <TabsContent value="about">
            <div className="grid md:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Award className="w-5 h-5 text-primary" />
                    Expérience
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground">{designer.experience}</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Palette className="w-5 h-5 text-primary" />
                    Style artistique
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground">{designer.artisticStyle}</p>
                </CardContent>
              </Card>

              <Card className="md:col-span-2">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Star className="w-5 h-5 text-accent" />
                    Inspirations
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{designer.inspirations}</p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Reviews Tab */}
          <TabsContent value="reviews">
            <div className="space-y-6">
              {reviews.map((review, index) => (
                <motion.div
                  key={review.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <Avatar className="w-12 h-12">
                          <AvatarImage src={review.userPhoto} alt={review.userName} />
                          <AvatarFallback>{review.userName.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <div>
                              <p className="font-semibold text-foreground">{review.userName}</p>
                              <p className="text-sm text-muted-foreground">
                                {new Date(review.createdAt).toLocaleDateString('fr-FR', {
                                  day: 'numeric',
                                  month: 'long',
                                  year: 'numeric'
                                })}
                              </p>
                            </div>
                            <div className="flex items-center gap-1">
                              {Array.from({ length: 5 }).map((_, i) => (
                                <Star
                                  key={i}
                                  className={`w-4 h-4 ${i < review.rating ? 'text-accent fill-accent' : 'text-muted-foreground'}`}
                                />
                              ))}
                            </div>
                          </div>
                          <p className="text-muted-foreground">{review.comment}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}

              {reviews.length === 0 && (
                <div className="text-center py-12">
                  <Star className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">Aucun avis pour le moment</p>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Convention Dialog */}
      <Dialog open={isConventionDialogOpen} onOpenChange={setIsConventionDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <FileSignature className="w-5 h-5 text-primary" />
              Demande de convention design
            </DialogTitle>
            <DialogDescription>
              {selectedDesign && (
                <span>Pour le design : <strong>{selectedDesign.name}</strong></span>
              )}
            </DialogDescription>
          </DialogHeader>

          {submitSuccess ? (
            <div className="py-12 text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4"
              >
                <CheckCircle className="w-8 h-8 text-green-600" />
              </motion.div>
              <h3 className="text-lg font-semibold text-foreground mb-2">Demande envoyée !</h3>
              <p className="text-muted-foreground">Votre demande de convention a été transmise au designer.</p>
            </div>
          ) : (
            <div className="space-y-6 py-4">
              {/* Convention Type */}
              <div className="space-y-2">
                <Label>Type de convention</Label>
                <Select
                  value={conventionForm.type}
                  onValueChange={(value) => setConventionForm({ ...conventionForm, type: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="sallate_bladi">Convention via Sallate Bladi</SelectItem>
                    <SelectItem value="direct">Convention directe avec unité textile</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Production Unit */}
              <div className="space-y-2">
                <Label className="flex items-center gap-2">
                  <Building2 className="w-4 h-4" />
                  Unité textile partenaire
                </Label>
                <Select
                  value={conventionForm.productionUnitId}
                  onValueChange={(value) => setConventionForm({ ...conventionForm, productionUnitId: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionner une unité" />
                  </SelectTrigger>
                  <SelectContent>
                    {productionUnits.map(unit => (
                      <SelectItem key={unit.id} value={unit.id}>{unit.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Designer Percentage */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label className="flex items-center gap-2">
                    <Percent className="w-4 h-4" />
                    Pourcentage designer par pièce
                  </Label>
                  <span className="text-lg font-bold text-primary">{conventionForm.designerPercentage}%</span>
                </div>
                <Slider
                  value={[conventionForm.designerPercentage]}
                  onValueChange={([value]) => setConventionForm({ ...conventionForm, designerPercentage: value })}
                  min={5}
                  max={30}
                  step={1}
                  className="w-full"
                />
                <p className="text-sm text-muted-foreground">
                  Le designer recevra {conventionForm.designerPercentage}% du prix de vente par pièce produite.
                </p>
              </div>

              {/* Duration */}
              <div className="space-y-2">
                <Label className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  Durée de la convention
                </Label>
                <Select
                  value={conventionForm.duration}
                  onValueChange={(value) => setConventionForm({ ...conventionForm, duration: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="6">6 mois</SelectItem>
                    <SelectItem value="12">12 mois</SelectItem>
                    <SelectItem value="24">24 mois</SelectItem>
                    <SelectItem value="36">36 mois</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Exclusivity */}
              <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                <div>
                  <Label className="font-medium">Convention exclusive</Label>
                  <p className="text-sm text-muted-foreground">Le design ne pourra être produit que par cette unité</p>
                </div>
                <Switch
                  checked={conventionForm.isExclusive}
                  onCheckedChange={(checked) => setConventionForm({ ...conventionForm, isExclusive: checked })}
                />
              </div>

              {/* Production Volume */}
              <div className="space-y-2">
                <Label>Volume de production estimé</Label>
                <Input
                  placeholder="Ex: 500 pièces/mois"
                  value={conventionForm.productionVolume}
                  onChange={(e) => setConventionForm({ ...conventionForm, productionVolume: e.target.value })}
                />
              </div>

              {/* Notes */}
              <div className="space-y-2">
                <Label className="flex items-center gap-2">
                  <FileText className="w-4 h-4" />
                  Notes et conditions supplémentaires
                </Label>
                <Textarea
                  placeholder="Ajoutez des conditions spécifiques..."
                  value={conventionForm.notes}
                  onChange={(e) => setConventionForm({ ...conventionForm, notes: e.target.value })}
                  rows={4}
                />
              </div>
            </div>
          )}

          {!submitSuccess && (
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsConventionDialogOpen(false)}>
                Annuler
              </Button>
              <Button onClick={handleConventionSubmit} disabled={isSubmitting || !conventionForm.productionUnitId}>
                {isSubmitting ? (
                  <>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full mr-2"
                    />
                    Envoi en cours...
                  </>
                ) : (
                  <>
                    <FileSignature className="w-4 h-4 mr-2" />
                    Envoyer la demande
                  </>
                )}
              </Button>
            </DialogFooter>
          )}
        </DialogContent>
      </Dialog>

      <Footer />
    </div>
  );
};

export default DesignerProfile;
