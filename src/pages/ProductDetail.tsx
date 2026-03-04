import { useState, useMemo, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronRight, ChevronLeft, Heart, Share2, ShoppingCart,
  Minus, Plus, Star, MapPin, Award, Truck, Shield, CreditCard,
  Building2, User, Check, Calculator, Calendar
} from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { mockProducts, mockSuppliers, mockDesigners, formatPrice } from '@/data/mockProducts';
import { useCart } from '@/contexts/CartContext';
import { useFavorites } from '@/contexts/FavoritesContext';
import { useRecentlyViewed } from '@/contexts/RecentlyViewedContext';
import { useToast } from '@/hooks/use-toast';
import { getReviewsForProduct, getAverageRating } from '@/data/mockReviews';
import SizeGuideModal from '@/components/products/SizeGuideModal';
import ProductCard from '@/components/products/ProductCard';

const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
const colors = [
  { name: 'Noir', value: '#000000' },
  { name: 'Blanc', value: '#FFFFFF' },
  { name: 'Bleu Marine', value: '#1E3A5F' },
  { name: 'Beige', value: '#D4B896' },
];

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { addItem } = useCart();
  const { toggleFavorite, isFavorite } = useFavorites();
  const { addViewed, recentIds } = useRecentlyViewed();
  const { toast } = useToast();
  const [selectedSize, setSelectedSize] = useState('M');
  const [selectedColor, setSelectedColor] = useState('Noir');
  const [quantity, setQuantity] = useState(1);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [paymentOption, setPaymentOption] = useState<'full' | 'installment' | 'company'>('full');
  const [reviewText, setReviewText] = useState('');
  const [reviewRating, setReviewRating] = useState(5);

  const product = useMemo(() => mockProducts.find(p => p.id === id), [id]);

  useEffect(() => {
    if (product) addViewed(product.id);
  }, [product, addViewed]);

  const fav = product ? isFavorite(product.id) : false;
  const reviews = product ? getReviewsForProduct(product.id) : [];
  const ratingInfo = product ? getAverageRating(product.id) : { average: 0, count: 0 };

  const supplier = useMemo(() => mockSuppliers.find(s => s.id === product?.supplier.id), [product]);
  const designer = useMemo(() => mockDesigners[Math.floor(Math.random() * mockDesigners.length)], []);
  const similarProducts = useMemo(() => {
    if (!product) return [];
    return mockProducts.filter(p => p.id !== product.id && p.category === product.category).slice(0, 4);
  }, [product]);

  const recentlyViewedProducts = useMemo(() => {
    return recentIds
      .filter(rid => rid !== id)
      .map(rid => mockProducts.find(p => p.id === rid))
      .filter(Boolean)
      .slice(0, 4) as typeof mockProducts;
  }, [recentIds, id]);

  const handleAddToCart = () => {
    if (!product) return;
    addItem({ productId: product.id, product, quantity, size: selectedSize, color: selectedColor, designerName: designer?.name });
    toast({ title: "Ajouté au panier", description: `${product.name} (${selectedSize}, ${selectedColor}) a été ajouté à votre panier.` });
  };

  const handleSubmitReview = () => {
    if (!reviewText.trim()) return;
    toast({ title: 'Avis envoyé', description: 'Merci pour votre retour !' });
    setReviewText('');
    setReviewRating(5);
  };

  const productImages = [product?.image];

  if (!product) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="section-container py-32 text-center">
          <h1 className="text-3xl font-heading font-bold text-foreground mb-4">Produit non trouvé</h1>
          <Link to="/catalogue" className="text-primary hover:underline">Retour au catalogue</Link>
        </div>
        <Footer />
      </div>
    );
  }

  const totalPrice = product.price * quantity;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="pt-24">
        {/* Breadcrumb */}
        <div className="section-container py-4">
          <nav className="flex items-center gap-2 text-sm text-muted-foreground">
            <Link to="/" className="hover:text-primary transition-colors">Accueil</Link>
            <ChevronRight className="w-4 h-4" />
            <Link to="/catalogue" className="hover:text-primary transition-colors">Catalogue</Link>
            <ChevronRight className="w-4 h-4" />
            <Link to={`/categorie/${product.category.toLowerCase()}`} className="hover:text-primary transition-colors">{product.category}</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-foreground">{product.name}</span>
          </nav>
        </div>

        {/* Product Main Section */}
        <section className="section-container pb-16">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Gallery */}
            <div className="space-y-4">
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-muted">
                <AnimatePresence mode="wait">
                  <motion.img key={currentImageIndex} src={productImages[currentImageIndex]} alt={product.name} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="w-full h-full object-cover" />
                </AnimatePresence>
                <button onClick={() => setCurrentImageIndex(i => i > 0 ? i - 1 : productImages.length - 1)} className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center hover:bg-white transition-colors">
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button onClick={() => setCurrentImageIndex(i => i < productImages.length - 1 ? i + 1 : 0)} className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center hover:bg-white transition-colors">
                  <ChevronRight className="w-5 h-5" />
                </button>
                <div className="absolute top-4 left-4 flex flex-col gap-2">
                  {product.featured && <span className="badge-featured">Vedette</span>}
                  <span className="badge-category">{product.category}</span>
                </div>
              </div>
              <div className="flex gap-3">
                {productImages.map((img, idx) => (
                  <button key={idx} onClick={() => setCurrentImageIndex(idx)} className={`w-20 h-20 rounded-xl overflow-hidden border-2 transition-all ${currentImageIndex === idx ? 'border-primary' : 'border-transparent hover:border-primary/50'}`}>
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>

            {/* Info */}
            <div className="space-y-6">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <Badge variant="outline">{product.sector}</Badge>
                  <div className="flex items-center gap-1 text-sm text-accent">
                    <Star className="w-4 h-4 fill-current" />
                    <span>{ratingInfo.average || '4.8'}</span>
                    <span className="text-muted-foreground">({ratingInfo.count || 0} avis)</span>
                  </div>
                </div>
                <h1 className="text-3xl font-heading font-bold text-foreground mb-2">{product.name}</h1>
                <Link to={`/societe-textile/${product.supplier.id}`} className="text-primary hover:underline">Par {product.supplier.name}</Link>
              </div>

              <div className="flex items-baseline gap-3">
                <span className="text-3xl font-heading font-bold text-primary">{formatPrice(totalPrice)}</span>
                {quantity > 1 && <span className="text-muted-foreground">({formatPrice(product.price)} / unité)</span>}
              </div>

              <p className="text-muted-foreground leading-relaxed">{product.description}</p>

              {/* Size */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="font-medium text-foreground">Taille</span>
                  <SizeGuideModal>
                    <button className="text-sm text-primary hover:underline">Guide des tailles</button>
                  </SizeGuideModal>
                </div>
                <div className="flex flex-wrap gap-2">
                  {sizes.map(size => (
                    <button key={size} onClick={() => setSelectedSize(size)} className={`px-4 py-2 rounded-xl border-2 font-medium transition-all ${selectedSize === size ? 'border-primary bg-primary text-primary-foreground' : 'border-border text-foreground hover:border-primary'}`}>
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Color */}
              <div>
                <span className="font-medium text-foreground block mb-3">Couleur: {selectedColor}</span>
                <div className="flex gap-3">
                  {colors.map(color => (
                    <button key={color.name} onClick={() => setSelectedColor(color.name)} className={`w-10 h-10 rounded-full border-2 transition-all hover:scale-110 ${selectedColor === color.name ? 'ring-2 ring-primary ring-offset-2 border-primary' : 'border-border'}`} style={{ backgroundColor: color.value }} title={color.name} />
                  ))}
                </div>
              </div>

              {/* Quantity */}
              <div>
                <span className="font-medium text-foreground block mb-3">Quantité</span>
                <div className="flex items-center gap-4">
                  <div className="flex items-center border border-border rounded-xl">
                    <button onClick={() => setQuantity(q => Math.max(1, q - 1))} className="w-12 h-12 flex items-center justify-center hover:bg-muted transition-colors rounded-l-xl"><Minus className="w-4 h-4" /></button>
                    <span className="w-12 text-center font-medium">{quantity}</span>
                    <button onClick={() => setQuantity(q => q + 1)} className="w-12 h-12 flex items-center justify-center hover:bg-muted transition-colors rounded-r-xl"><Plus className="w-4 h-4" /></button>
                  </div>
                  <span className="text-sm text-muted-foreground">En stock</span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3 pt-4">
                <Button size="lg" className="flex-1 h-14 rounded-xl text-base" onClick={handleAddToCart}>
                  <ShoppingCart className="w-5 h-5 mr-2" /> Ajouter au panier
                </Button>
                <Button variant="outline" size="lg" className="h-14 w-14 rounded-xl" onClick={() => { toggleFavorite(product.id); toast({ title: fav ? 'Retiré des favoris' : 'Ajouté aux favoris' }); }}>
                  <Heart className={`w-5 h-5 ${fav ? 'fill-destructive text-destructive' : ''}`} />
                </Button>
                <Button variant="outline" size="lg" className="h-14 w-14 rounded-xl">
                  <Share2 className="w-5 h-5" />
                </Button>
              </div>

              {/* Reassurance */}
              <div className="grid grid-cols-2 gap-3 pt-4">
                <div className="flex items-center gap-3 p-3 rounded-xl bg-muted/50"><Truck className="w-5 h-5 text-primary" /><span className="text-sm">Livraison sécurisée</span></div>
                <div className="flex items-center gap-3 p-3 rounded-xl bg-muted/50"><CreditCard className="w-5 h-5 text-primary" /><span className="text-sm">Paiement CCP</span></div>
                <div className="flex items-center gap-3 p-3 rounded-xl bg-muted/50"><Shield className="w-5 h-5 text-primary" /><span className="text-sm">Garantie qualité</span></div>
                <div className="flex items-center gap-3 p-3 rounded-xl bg-muted/50"><Award className="w-5 h-5 text-primary" /><span className="text-sm">Production locale</span></div>
              </div>
            </div>
          </div>
        </section>

        {/* Tabs */}
        <section className="section-container section-padding">
          <Tabs defaultValue="details" className="w-full">
            <TabsList className="grid w-full grid-cols-4 mb-8">
              <TabsTrigger value="details">Détails</TabsTrigger>
              <TabsTrigger value="designer">Designer</TabsTrigger>
              <TabsTrigger value="fabrication">Fabrication</TabsTrigger>
              <TabsTrigger value="avis">Avis ({ratingInfo.count})</TabsTrigger>
            </TabsList>

            <TabsContent value="details" className="space-y-6">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="font-heading font-semibold text-xl mb-4">Caractéristiques</h3>
                  <dl className="space-y-3">
                    {[['Matière', '100% Coton bio'], ['Type textile', product.sector], ['Origine', 'Algérie'], ['Entretien', 'Lavage 30°']].map(([k, v]) => (
                      <div key={k} className="flex justify-between py-2 border-b border-border">
                        <dt className="text-muted-foreground">{k}</dt>
                        <dd className="font-medium">{v}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
                <div>
                  <h3 className="font-heading font-semibold text-xl mb-4">Description complète</h3>
                  <p className="text-muted-foreground leading-relaxed mb-4">{product.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {product.tags.map(tag => <Badge key={tag} variant="secondary">{tag}</Badge>)}
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="designer">
              {designer && (
                <div className="flex flex-col md:flex-row gap-8">
                  <div className="w-48 h-48 rounded-2xl overflow-hidden flex-shrink-0">
                    <img src={designer.photo} alt={designer.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-heading font-bold text-2xl mb-2">{designer.name}</h3>
                    <p className="text-primary font-medium mb-4">{designer.specialty}</p>
                    <p className="text-muted-foreground leading-relaxed mb-6">{designer.bio}</p>
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1 text-accent"><Star className="w-5 h-5 fill-current" /><span className="font-medium">4.9</span></div>
                      <span className="text-muted-foreground">{designer.collections.length} collections</span>
                    </div>
                  </div>
                </div>
              )}
            </TabsContent>

            <TabsContent value="fabrication">
              {supplier && (
                <div className="space-y-8">
                  <div className="flex flex-col md:flex-row gap-8">
                    <div className="w-32 h-32 rounded-2xl overflow-hidden flex-shrink-0">
                      <img src={supplier.logo} alt={supplier.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-heading font-bold text-2xl">{supplier.name}</h3>
                        <Badge variant={supplier.type === 'public' ? 'default' : 'secondary'}>{supplier.type === 'public' ? 'Publique' : 'Privée'}</Badge>
                        {supplier.verified && <Badge className="bg-accent text-accent-foreground"><Check className="w-3 h-3 mr-1" /> Vérifié</Badge>}
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground mb-4"><MapPin className="w-4 h-4" />{supplier.wilaya}</div>
                      <p className="text-muted-foreground leading-relaxed mb-4">{supplier.description}</p>
                      <div className="flex flex-wrap gap-2">{supplier.specialty.map(spec => <Badge key={spec} variant="outline">{spec}</Badge>)}</div>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {[{ icon: Award, label: 'Fabrication locale' }, { icon: Shield, label: 'Certifié qualité' }, { icon: User, label: 'Artisanat' }, { icon: Building2, label: 'Norme industrielle' }].map(({ icon: Icon, label }) => (
                      <div key={label} className="p-4 rounded-xl bg-muted/50 text-center"><Icon className="w-8 h-8 text-primary mx-auto mb-2" /><p className="font-medium">{label}</p></div>
                    ))}
                  </div>
                  <Link to={`/societe-textile/${supplier.id}`}><Button variant="outline" className="w-full">Voir le profil de la société</Button></Link>
                </div>
              )}
            </TabsContent>

            <TabsContent value="avis">
              <div className="space-y-6">
                {/* Rating summary */}
                <div className="flex items-center gap-6">
                  <div className="text-center">
                    <p className="text-5xl font-bold text-foreground">{ratingInfo.average || '4.8'}</p>
                    <div className="flex items-center gap-1 text-accent my-2">
                      {[...Array(5)].map((_, i) => <Star key={i} className={`w-5 h-5 ${i < Math.round(ratingInfo.average || 4.8) ? 'fill-current' : ''}`} />)}
                    </div>
                    <p className="text-sm text-muted-foreground">{ratingInfo.count} avis</p>
                  </div>
                </div>

                {/* Review form */}
                <Card>
                  <CardHeader><CardTitle className="text-lg">Laisser un avis</CardTitle></CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <span className="text-sm font-medium text-foreground block mb-2">Note</span>
                      <div className="flex gap-1">
                        {[1, 2, 3, 4, 5].map(n => (
                          <button key={n} onClick={() => setReviewRating(n)}>
                            <Star className={`w-6 h-6 ${n <= reviewRating ? 'fill-accent text-accent' : 'text-muted-foreground'}`} />
                          </button>
                        ))}
                      </div>
                    </div>
                    <Textarea placeholder="Partagez votre expérience..." value={reviewText} onChange={e => setReviewText(e.target.value)} rows={3} />
                    <Button onClick={handleSubmitReview} disabled={!reviewText.trim()}>Envoyer l'avis</Button>
                  </CardContent>
                </Card>

                {/* Reviews list */}
                <div className="space-y-4">
                  {reviews.map(review => (
                    <div key={review.id} className="p-4 rounded-xl border border-border">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                            <User className="w-5 h-5 text-primary" />
                          </div>
                          <div>
                            <p className="font-medium">{review.userName}</p>
                            <p className="text-xs text-muted-foreground">{new Date(review.date).toLocaleDateString('fr-FR')}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-1 text-accent">
                          {[...Array(5)].map((_, i) => <Star key={i} className={`w-4 h-4 ${i < review.rating ? 'fill-current' : ''}`} />)}
                        </div>
                      </div>
                      <p className="text-muted-foreground">{review.comment}</p>
                      {review.verified && <Badge variant="outline" className="mt-2 text-xs">Achat vérifié</Badge>}
                    </div>
                  ))}
                  {reviews.length === 0 && (
                    <div className="text-center py-8">
                      <Star className="w-10 h-10 mx-auto text-muted-foreground/30 mb-2" />
                      <p className="text-muted-foreground">Aucun avis pour le moment. Soyez le premier !</p>
                    </div>
                  )}
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </section>

        {/* Similar Products */}
        {similarProducts.length > 0 && (
          <section className="section-container pb-16">
            <h2 className="text-2xl font-heading font-bold text-foreground mb-8">Produits similaires</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {similarProducts.map((prod, index) => (
                <ProductCard key={prod.id} product={prod} index={index} />
              ))}
            </div>
          </section>
        )}

        {/* Recently Viewed */}
        {recentlyViewedProducts.length > 0 && (
          <section className="section-container pb-16">
            <h2 className="text-2xl font-heading font-bold text-foreground mb-8">Vus récemment</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {recentlyViewedProducts.map((prod, index) => (
                <ProductCard key={prod.id} product={prod} index={index} />
              ))}
            </div>
          </section>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default ProductDetail;
