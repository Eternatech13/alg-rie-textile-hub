import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useState } from 'react';
import {
  Heart, Share2, ArrowLeft, ChevronLeft, ChevronRight, ZoomIn,
  Palette, Building2, Calendar, ShoppingBag, Star, Tag, Layers,
  Users, FileSignature, MessageSquare, CheckCircle, X,
  Percent, Clock, FileText
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
  getDesignById,
  getDesignerById,
  mockDesigns
} from '@/data/mockDesigners';
import { mockTextileCompanies, getTextileCompanyById } from '@/data/mockTextileCompanies';

const DesignDetail = () => {
  const { id } = useParams<{ id: string }>();
  const design = getDesignById(id || '');
  const designer = design ? getDesignerById(design.designerId) : null;
  const partnerCompany = design?.partneredCompanyId ? getTextileCompanyById(design.partneredCompanyId) : null;

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);
  const [isConventionDialogOpen, setIsConventionDialogOpen] = useState(false);
  const [isCollaborationDialogOpen, setIsCollaborationDialogOpen] = useState(false);
  const [conventionForm, setConventionForm] = useState({
    type: 'sallate_bladi',
    productionUnitId: '',
    designerPercentage: 15,
    duration: '12',
    isExclusive: false,
    productionVolume: '',
    notes: ''
  });
  const [collaborationMessage, setCollaborationMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  if (!design || !designer) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-2xl font-bold text-foreground">Design non trouvé</h1>
          <Link to="/catalogue" className="text-primary hover:underline mt-4 inline-block">
            Retour au catalogue
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const similarDesigns = mockDesigns
    .filter(d => d.id !== design.id && (d.category === design.category || d.designerId === design.designerId))
    .slice(0, 4);

  const productionUnits = mockTextileCompanies.flatMap(company =>
    company.subCompanies.flatMap(sub =>
      sub.productionUnits.map(unit => ({
        id: unit.id,
        name: `${unit.name} - ${company.name}`,
        companyId: company.id
      }))
    )
  );

  const handleConventionSubmit = async () => {
    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setSubmitSuccess(true);
    setTimeout(() => {
      setIsConventionDialogOpen(false);
      setSubmitSuccess(false);
    }, 2000);
  };

  const handleCollaborationSubmit = async () => {
    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setSubmitSuccess(true);
    setTimeout(() => {
      setIsCollaborationDialogOpen(false);
      setSubmitSuccess(false);
      setCollaborationMessage('');
    }, 2000);
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % design.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + design.images.length) % design.images.length);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Breadcrumb */}
      <div className="container mx-auto px-4 py-4">
        <nav className="flex items-center gap-2 text-sm text-muted-foreground">
          <Link to="/" className="hover:text-primary">Accueil</Link>
          <span>/</span>
          <Link to="/catalogue" className="hover:text-primary">Catalogue</Link>
          <span>/</span>
          <Link to={`/designer/${designer.id}`} className="hover:text-primary">{designer.name}</Link>
          <span>/</span>
          <span className="text-foreground">{design.name}</span>
        </nav>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Gallery */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-4"
          >
            {/* Main Image */}
            <div className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-muted">
              <img
                src={design.images[currentImageIndex]}
                alt={design.name}
                className={`w-full h-full object-cover transition-transform duration-300 ${isZoomed ? 'scale-150 cursor-zoom-out' : 'cursor-zoom-in'}`}
                onClick={() => setIsZoomed(!isZoomed)}
              />

              {/* Navigation Arrows */}
              {design.images.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </>
              )}

              {/* Zoom Button */}
              <button
                onClick={() => setIsZoomed(!isZoomed)}
                className="absolute bottom-4 right-4 w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-lg"
              >
                <ZoomIn className="w-5 h-5" />
              </button>

              {/* Status Badge */}
              <div className="absolute top-4 left-4">
                <Badge
                  className={
                    design.status === 'disponible' ? 'bg-green-500' :
                    design.status === 'exclusif' ? 'bg-purple-500 text-white' :
                    'bg-amber-500 text-white'
                  }
                >
                  {design.status === 'sous_convention' ? 'Sous convention' : design.status.charAt(0).toUpperCase() + design.status.slice(1)}
                </Badge>
              </div>
            </div>

            {/* Thumbnails */}
            {design.images.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-2">
                {design.images.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`flex-shrink-0 w-20 h-24 rounded-lg overflow-hidden border-2 transition-all ${
                      currentImageIndex === index ? 'border-primary' : 'border-transparent opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt={`${design.name} ${index + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </motion.div>

          {/* Design Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            {/* Title & Actions */}
            <div className="flex items-start justify-between gap-4">
              <div>
                <h1 className="text-3xl font-heading font-bold text-foreground mb-2">
                  {design.name}
                </h1>
                {design.collection && (
                  <p className="text-muted-foreground">Collection : {design.collection}</p>
                )}
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setIsLiked(!isLiked)}
                  className={isLiked ? 'text-red-500 border-red-500' : ''}
                >
                  <Heart className={`w-5 h-5 ${isLiked ? 'fill-red-500' : ''}`} />
                </Button>
                <Button variant="outline" size="icon">
                  <Share2 className="w-5 h-5" />
                </Button>
              </div>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Heart className="w-4 h-4" />
                <span>{design.likes + (isLiked ? 1 : 0)} likes</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <ShoppingBag className="w-4 h-4" />
                <span>{design.orderCount} commandes</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Calendar className="w-4 h-4" />
                <span>Créé le {new Date(design.createdAt).toLocaleDateString('fr-FR')}</span>
              </div>
            </div>

            {/* Price Range */}
            <div className="bg-primary/5 rounded-xl p-4">
              <p className="text-sm text-muted-foreground mb-1">Gamme de prix estimée</p>
              <p className="text-2xl font-bold text-primary">
                {design.priceRange.min.toLocaleString()} - {design.priceRange.max.toLocaleString()} DA
              </p>
            </div>

            {/* Description */}
            <div>
              <h3 className="font-semibold text-foreground mb-2">Description</h3>
              <p className="text-muted-foreground leading-relaxed">{design.description}</p>
            </div>

            {/* Tags */}
            <div className="space-y-3">
              <div className="flex flex-wrap gap-2">
                <Badge variant="outline" className="gap-1">
                  <Tag className="w-3 h-3" />
                  {design.category}
                </Badge>
                <Badge variant="outline" className="gap-1">
                  {design.subcategory}
                </Badge>
                {design.targetAudience.map((audience, index) => (
                  <Badge key={index} variant="secondary">
                    {audience}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Materials & Techniques */}
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <h4 className="font-medium text-foreground mb-2 flex items-center gap-2">
                  <Layers className="w-4 h-4 text-primary" />
                  Matériaux
                </h4>
                <div className="flex flex-wrap gap-2">
                  {design.materials.map((material, index) => (
                    <Badge key={index} variant="outline">{material}</Badge>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-2 flex items-center gap-2">
                  <Palette className="w-4 h-4 text-primary" />
                  Techniques
                </h4>
                <div className="flex flex-wrap gap-2">
                  {design.techniques.map((technique, index) => (
                    <Badge key={index} variant="outline">{technique}</Badge>
                  ))}
                </div>
              </div>
            </div>

            {/* Colors */}
            <div>
              <h4 className="font-medium text-foreground mb-2">Couleurs disponibles</h4>
              <div className="flex flex-wrap gap-2">
                {design.colors.map((color, index) => (
                  <Badge key={index} variant="secondary">{color}</Badge>
                ))}
              </div>
            </div>

            {/* Designer Card */}
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-4">
                  <Avatar className="w-16 h-16">
                    <AvatarImage src={designer.photo} alt={designer.name} />
                    <AvatarFallback>{designer.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <Link
                      to={`/designer/${designer.id}`}
                      className="font-semibold text-foreground hover:text-primary transition-colors"
                    >
                      {designer.name}
                    </Link>
                    <p className="text-sm text-muted-foreground">{designer.specialties[0]}</p>
                    <div className="flex items-center gap-1 mt-1">
                      <Star className="w-4 h-4 text-accent fill-accent" />
                      <span className="text-sm font-medium">{designer.rating}</span>
                      <span className="text-sm text-muted-foreground">({designer.reviewCount} avis)</span>
                    </div>
                  </div>
                  <Button variant="outline" asChild>
                    <Link to={`/designer/${designer.id}`}>Voir profil</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Partner Company */}
            {partnerCompany && (
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-lg overflow-hidden bg-muted">
                      <img
                        src={partnerCompany.logo}
                        alt={partnerCompany.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-muted-foreground mb-1">Produit par</p>
                      <Link
                        to={`/societe-textile/${partnerCompany.id}`}
                        className="font-semibold text-foreground hover:text-primary transition-colors"
                      >
                        {partnerCompany.name}
                      </Link>
                      <p className="text-sm text-muted-foreground">{partnerCompany.wilaya}</p>
                    </div>
                    <Button variant="outline" asChild>
                      <Link to={`/societe-textile/${partnerCompany.id}`}>Voir société</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-4">
              <Button
                size="lg"
                className="flex-1 gap-2"
                onClick={() => setIsConventionDialogOpen(true)}
              >
                <FileSignature className="w-5 h-5" />
                Faire une convention
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="flex-1 gap-2"
                onClick={() => setIsCollaborationDialogOpen(true)}
              >
                <MessageSquare className="w-5 h-5" />
                Contacter le designer
              </Button>
            </div>
          </motion.div>
        </div>

        {/* Similar Designs */}
        {similarDesigns.length > 0 && (
          <section className="mt-16">
            <h2 className="text-2xl font-heading font-bold text-foreground mb-8">
              Designs similaires
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {similarDesigns.map((similarDesign) => {
                const similarDesigner = getDesignerById(similarDesign.designerId);
                return (
                  <Link key={similarDesign.id} to={`/design/${similarDesign.id}`}>
                    <Card className="group overflow-hidden hover:shadow-lg transition-all duration-300">
                      <div className="aspect-[3/4] overflow-hidden">
                        <img
                          src={similarDesign.images[0]}
                          alt={similarDesign.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                      <CardContent className="p-4">
                        <h3 className="font-semibold text-foreground line-clamp-1 group-hover:text-primary transition-colors">
                          {similarDesign.name}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          Par {similarDesigner?.name}
                        </p>
                        <p className="text-sm font-medium text-primary mt-2">
                          {similarDesign.priceRange.min.toLocaleString()} - {similarDesign.priceRange.max.toLocaleString()} DA
                        </p>
                      </CardContent>
                    </Card>
                  </Link>
                );
              })}
            </div>
          </section>
        )}
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
              Pour le design : <strong>{design.name}</strong>
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
                />
              </div>

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

              <div className="space-y-2">
                <Label>Volume de production estimé</Label>
                <Input
                  placeholder="Ex: 500 pièces/mois"
                  value={conventionForm.productionVolume}
                  onChange={(e) => setConventionForm({ ...conventionForm, productionVolume: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label className="flex items-center gap-2">
                  <FileText className="w-4 h-4" />
                  Notes et conditions
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
                {isSubmitting ? 'Envoi...' : 'Envoyer la demande'}
              </Button>
            </DialogFooter>
          )}
        </DialogContent>
      </Dialog>

      {/* Collaboration Dialog */}
      <Dialog open={isCollaborationDialogOpen} onOpenChange={setIsCollaborationDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-primary" />
              Contacter {designer.name}
            </DialogTitle>
            <DialogDescription>
              Envoyez un message pour discuter d'une collaboration
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
              <h3 className="text-lg font-semibold text-foreground mb-2">Message envoyé !</h3>
              <p className="text-muted-foreground">Le designer vous répondra bientôt.</p>
            </div>
          ) : (
            <div className="space-y-4 py-4">
              <div className="flex items-center gap-4 p-4 bg-muted/50 rounded-lg">
                <Avatar>
                  <AvatarImage src={designer.photo} alt={designer.name} />
                  <AvatarFallback>{designer.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium text-foreground">{designer.name}</p>
                  <p className="text-sm text-muted-foreground">{designer.specialties[0]}</p>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Votre message</Label>
                <Textarea
                  placeholder="Décrivez votre projet ou votre demande de collaboration..."
                  value={collaborationMessage}
                  onChange={(e) => setCollaborationMessage(e.target.value)}
                  rows={6}
                />
              </div>
            </div>
          )}

          {!submitSuccess && (
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsCollaborationDialogOpen(false)}>
                Annuler
              </Button>
              <Button onClick={handleCollaborationSubmit} disabled={isSubmitting || !collaborationMessage.trim()}>
                {isSubmitting ? 'Envoi...' : 'Envoyer le message'}
              </Button>
            </DialogFooter>
          )}
        </DialogContent>
      </Dialog>

      <Footer />
    </div>
  );
};

export default DesignDetail;
