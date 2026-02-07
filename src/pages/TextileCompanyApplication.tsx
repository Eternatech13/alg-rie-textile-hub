import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Upload, CheckCircle, Building2, Factory, Layers, Package, Award, Handshake, Loader2 } from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Progress } from '@/components/ui/progress';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/components/ui/use-toast';

const STEPS = [
  { id: 1, title: 'Informations générales', icon: Building2 },
  { id: 2, title: 'Structure industrielle', icon: Factory },
  { id: 3, title: 'Domaines textiles', icon: Layers },
  { id: 4, title: 'Produits fabriqués', icon: Package },
  { id: 5, title: 'Certifications', icon: Award },
  { id: 6, title: 'Collaboration', icon: Handshake },
];

const TEXTILE_DOMAINS = [
  'Textile traditionnel',
  'Textile moderne',
  'Textile médical',
  'Textile professionnel',
  'Fabrication de tissus',
  'Autre'
];

const PRODUCTS = [
  'Vêtements Femme',
  'Vêtements Homme',
  'Enfant',
  'Uniformes',
  'Tissus bruts'
];

const TextileCompanyApplication = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const [formData, setFormData] = useState({
    // Step 1 - General Info
    companyName: '',
    companyType: '',
    yearFounded: '',
    wilaya: '',
    address: '',
    email: '',
    phone: '',
    // Step 2 - Industrial Structure
    parentCompany: '',
    subsidiariesCount: '',
    productionUnits: '',
    monthlyCapacity: '',
    // Step 3 - Textile Domains
    textileDomains: [] as string[],
    // Step 4 - Products
    products: [] as string[],
    // Step 5 - Certifications
    hasQualityCertifications: false,
    isArtisanal: false,
    isIndustrial: false,
    commerceRegistryFile: null as File | null,
    certificationsFile: null as File | null,
    // Step 6 - Collaboration
    openToDesigners: false,
    productionOnDemand: false,
    exclusiveProduction: false,
  });

  const updateFormData = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const toggleArrayItem = (field: string, item: string) => {
    setFormData(prev => {
      const currentArray = prev[field as keyof typeof prev] as string[];
      if (currentArray.includes(item)) {
        return { ...prev, [field]: currentArray.filter(i => i !== item) };
      }
      return { ...prev, [field]: [...currentArray, item] };
    });
  };

  const handleFileChange = (field: string, files: FileList | null) => {
    if (!files) return;
    updateFormData(field, files[0]);
  };

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return formData.companyName && formData.companyType && formData.wilaya && formData.email && formData.phone;
      case 2:
        return formData.productionUnits && formData.monthlyCapacity;
      case 3:
        return formData.textileDomains.length > 0;
      case 4:
        return formData.products.length > 0;
      case 5:
        return formData.commerceRegistryFile;
      case 6:
        return true;
      default:
        return false;
    }
  };

  const handleNext = () => {
    if (currentStep < STEPS.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsSubmitting(false);
    setIsSubmitted(true);
    toast({
      title: "Demande soumise",
      description: "Notre équipe vous contactera après étude du dossier.",
    });
  };

  const progress = (currentStep / STEPS.length) * 100;

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="pt-32 pb-20 section-container">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-2xl mx-auto text-center"
          >
            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-primary/10 flex items-center justify-center">
              <CheckCircle className="w-10 h-10 text-primary" />
            </div>
            <h1 className="font-heading text-3xl font-bold text-foreground mb-4">
              Votre société a soumis sa demande avec succès
            </h1>
            <p className="text-muted-foreground mb-8">
              Notre équipe vous contactera après étude du dossier. 
              Vous recevrez un email de confirmation à l'adresse : <strong>{formData.email}</strong>
            </p>
            <Button onClick={() => navigate('/')} className="rounded-xl">
              Retour à l'accueil
            </Button>
          </motion.div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="pt-28 pb-20">
        <div className="section-container">
          {/* Back Button */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="mb-6"
          >
            <Button
              variant="ghost"
              onClick={() => navigate('/devenir-partenaire')}
              className="gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Retour
            </Button>
          </motion.div>

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8"
          >
            <h1 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-2">
              Inscription Société Textile
            </h1>
            <p className="text-muted-foreground">
              Complétez le formulaire pour rejoindre notre réseau de partenaires textiles
            </p>
          </motion.div>

          {/* Progress */}
          <div className="max-w-4xl mx-auto mb-8">
            <Progress value={progress} className="h-2 mb-4" />
            <div className="flex justify-between overflow-x-auto">
              {STEPS.map((step, index) => (
                <div
                  key={step.id}
                  className={`flex flex-col items-center min-w-[60px] ${
                    index > 0 ? 'flex-1' : ''
                  }`}
                >
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium transition-all ${
                      currentStep >= step.id
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted/30 text-muted-foreground'
                    }`}
                  >
                    {currentStep > step.id ? (
                      <CheckCircle className="w-5 h-5" />
                    ) : (
                      <step.icon className="w-5 h-5" />
                    )}
                  </div>
                  <span className="hidden lg:block text-xs mt-2 text-muted-foreground text-center">
                    {step.title}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Form Card */}
          <Card className="max-w-3xl mx-auto">
            <CardContent className="p-6 md:p-8">
              <AnimatePresence mode="wait">
                {/* Step 1 - General Info */}
                {currentStep === 1 && (
                  <motion.div
                    key="step1"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-6"
                  >
                    <h2 className="font-heading text-xl font-semibold mb-4">Informations générales</h2>
                    <div>
                      <Label htmlFor="companyName">Nom de la société *</Label>
                      <Input
                        id="companyName"
                        value={formData.companyName}
                        onChange={(e) => updateFormData('companyName', e.target.value)}
                        placeholder="Ex: EATIT Algérie"
                        className="mt-1"
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="companyType">Type de société *</Label>
                        <Select
                          value={formData.companyType}
                          onValueChange={(value) => updateFormData('companyType', value)}
                        >
                          <SelectTrigger className="mt-1">
                            <SelectValue placeholder="Sélectionner" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="publique">Publique</SelectItem>
                            <SelectItem value="privee">Privée</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="yearFounded">Année de création</Label>
                        <Input
                          id="yearFounded"
                          type="number"
                          min="1900"
                          max={new Date().getFullYear()}
                          value={formData.yearFounded}
                          onChange={(e) => updateFormData('yearFounded', e.target.value)}
                          placeholder="Ex: 1998"
                          className="mt-1"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="wilaya">Wilaya *</Label>
                        <Input
                          id="wilaya"
                          value={formData.wilaya}
                          onChange={(e) => updateFormData('wilaya', e.target.value)}
                          placeholder="Ex: Alger"
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor="address">Adresse</Label>
                        <Input
                          id="address"
                          value={formData.address}
                          onChange={(e) => updateFormData('address', e.target.value)}
                          placeholder="Adresse complète"
                          className="mt-1"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="email">Email professionnel *</Label>
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => updateFormData('email', e.target.value)}
                          placeholder="contact@societe.dz"
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor="phone">Téléphone *</Label>
                        <Input
                          id="phone"
                          value={formData.phone}
                          onChange={(e) => updateFormData('phone', e.target.value)}
                          placeholder="021 XX XX XX"
                          className="mt-1"
                        />
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Step 2 - Industrial Structure */}
                {currentStep === 2 && (
                  <motion.div
                    key="step2"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-6"
                  >
                    <h2 className="font-heading text-xl font-semibold mb-4">Structure industrielle</h2>
                    <div>
                      <Label htmlFor="parentCompany">Société mère (si applicable)</Label>
                      <Input
                        id="parentCompany"
                        value={formData.parentCompany}
                        onChange={(e) => updateFormData('parentCompany', e.target.value)}
                        placeholder="Ex: Groupe XYZ"
                        className="mt-1"
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="subsidiariesCount">Nombre de sous-sociétés</Label>
                        <Input
                          id="subsidiariesCount"
                          type="number"
                          min="0"
                          value={formData.subsidiariesCount}
                          onChange={(e) => updateFormData('subsidiariesCount', e.target.value)}
                          placeholder="Ex: 3"
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor="productionUnits">Nombre d'unités de production *</Label>
                        <Input
                          id="productionUnits"
                          type="number"
                          min="1"
                          value={formData.productionUnits}
                          onChange={(e) => updateFormData('productionUnits', e.target.value)}
                          placeholder="Ex: 5"
                          className="mt-1"
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="monthlyCapacity">Capacité de production mensuelle *</Label>
                      <Input
                        id="monthlyCapacity"
                        value={formData.monthlyCapacity}
                        onChange={(e) => updateFormData('monthlyCapacity', e.target.value)}
                        placeholder="Ex: 10 000 pièces / mois"
                        className="mt-1"
                      />
                      <p className="text-xs text-muted-foreground mt-1">
                        Indiquez une estimation de votre capacité de production
                      </p>
                    </div>
                  </motion.div>
                )}

                {/* Step 3 - Textile Domains */}
                {currentStep === 3 && (
                  <motion.div
                    key="step3"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-6"
                  >
                    <h2 className="font-heading text-xl font-semibold mb-4">Domaines textiles</h2>
                    <div>
                      <Label>Sélectionnez vos domaines d'activité *</Label>
                      <div className="grid grid-cols-2 gap-3 mt-3">
                        {TEXTILE_DOMAINS.map((domain) => (
                          <div
                            key={domain}
                            onClick={() => toggleArrayItem('textileDomains', domain)}
                            className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
                              formData.textileDomains.includes(domain)
                                ? 'border-primary bg-primary/5 text-primary'
                                : 'border-border hover:border-primary/50'
                            }`}
                          >
                            <div className="flex items-center gap-3">
                              <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                                formData.textileDomains.includes(domain)
                                  ? 'border-primary bg-primary'
                                  : 'border-muted-foreground'
                              }`}>
                                {formData.textileDomains.includes(domain) && (
                                  <CheckCircle className="w-3 h-3 text-white" />
                                )}
                              </div>
                              <span className="text-sm font-medium">{domain}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Step 4 - Products */}
                {currentStep === 4 && (
                  <motion.div
                    key="step4"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-6"
                  >
                    <h2 className="font-heading text-xl font-semibold mb-4">Produits fabriqués</h2>
                    <div>
                      <Label>Quels types de produits fabriquez-vous ? *</Label>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-3">
                        {PRODUCTS.map((product) => (
                          <div
                            key={product}
                            onClick={() => toggleArrayItem('products', product)}
                            className={`p-4 rounded-xl border-2 cursor-pointer transition-all text-center ${
                              formData.products.includes(product)
                                ? 'border-primary bg-primary/5 text-primary'
                                : 'border-border hover:border-primary/50'
                            }`}
                          >
                            <span className="text-sm font-medium">{product}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Step 5 - Certifications */}
                {currentStep === 5 && (
                  <motion.div
                    key="step5"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-6"
                  >
                    <h2 className="font-heading text-xl font-semibold mb-4">Certifications & Qualité</h2>
                    <div className="space-y-4">
                      <div className="flex items-start gap-3 p-4 rounded-lg border border-border">
                        <Checkbox
                          id="hasQualityCertifications"
                          checked={formData.hasQualityCertifications}
                          onCheckedChange={(checked) => updateFormData('hasQualityCertifications', checked)}
                        />
                        <div>
                          <Label htmlFor="hasQualityCertifications" className="cursor-pointer">
                            Certifications qualité
                          </Label>
                          <p className="text-sm text-muted-foreground mt-1">
                            ISO, CE, ou autres certifications de qualité
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3 p-4 rounded-lg border border-border">
                        <Checkbox
                          id="isArtisanal"
                          checked={formData.isArtisanal}
                          onCheckedChange={(checked) => updateFormData('isArtisanal', checked)}
                        />
                        <div>
                          <Label htmlFor="isArtisanal" className="cursor-pointer">
                            Production artisanale
                          </Label>
                          <p className="text-sm text-muted-foreground mt-1">
                            Fabrication traditionnelle et savoir-faire artisanal
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3 p-4 rounded-lg border border-border">
                        <Checkbox
                          id="isIndustrial"
                          checked={formData.isIndustrial}
                          onCheckedChange={(checked) => updateFormData('isIndustrial', checked)}
                        />
                        <div>
                          <Label htmlFor="isIndustrial" className="cursor-pointer">
                            Production industrielle
                          </Label>
                          <p className="text-sm text-muted-foreground mt-1">
                            Fabrication en grande série avec équipements modernes
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="pt-4 space-y-4">
                      <div>
                        <Label>Registre de commerce *</Label>
                        <div className="mt-2 border-2 border-dashed border-border rounded-xl p-6 text-center hover:border-primary/50 transition-colors">
                          <Upload className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                          <input
                            type="file"
                            accept=".pdf,.jpg,.jpeg,.png"
                            onChange={(e) => handleFileChange('commerceRegistryFile', e.target.files)}
                            className="hidden"
                            id="commerceRegistryFile"
                          />
                          <Button variant="outline" asChild className="rounded-lg">
                            <label htmlFor="commerceRegistryFile" className="cursor-pointer">
                              Téléverser
                            </label>
                          </Button>
                          {formData.commerceRegistryFile && (
                            <p className="text-sm text-primary mt-2">{formData.commerceRegistryFile.name}</p>
                          )}
                        </div>
                      </div>
                      <div>
                        <Label>Certifications (si disponible)</Label>
                        <div className="mt-2 border-2 border-dashed border-border rounded-xl p-6 text-center hover:border-primary/50 transition-colors">
                          <Upload className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                          <input
                            type="file"
                            accept=".pdf,.jpg,.jpeg,.png"
                            onChange={(e) => handleFileChange('certificationsFile', e.target.files)}
                            className="hidden"
                            id="certificationsFile"
                          />
                          <Button variant="outline" asChild className="rounded-lg">
                            <label htmlFor="certificationsFile" className="cursor-pointer">
                              Téléverser
                            </label>
                          </Button>
                          {formData.certificationsFile && (
                            <p className="text-sm text-primary mt-2">{formData.certificationsFile.name}</p>
                          )}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Step 6 - Collaboration */}
                {currentStep === 6 && (
                  <motion.div
                    key="step6"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-6"
                  >
                    <h2 className="font-heading text-xl font-semibold mb-4">Collaboration avec designers</h2>
                    <p className="text-muted-foreground mb-6">
                      Indiquez vos préférences de collaboration avec les designers de notre plateforme
                    </p>
                    <div className="space-y-4">
                      <div className="flex items-start gap-3 p-4 rounded-lg border border-border">
                        <Checkbox
                          id="openToDesigners"
                          checked={formData.openToDesigners}
                          onCheckedChange={(checked) => updateFormData('openToDesigners', checked)}
                        />
                        <div>
                          <Label htmlFor="openToDesigners" className="cursor-pointer">
                            Ouvert aux designers indépendants
                          </Label>
                          <p className="text-sm text-muted-foreground mt-1">
                            Acceptez des collaborations avec des designers freelance
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3 p-4 rounded-lg border border-border">
                        <Checkbox
                          id="productionOnDemand"
                          checked={formData.productionOnDemand}
                          onCheckedChange={(checked) => updateFormData('productionOnDemand', checked)}
                        />
                        <div>
                          <Label htmlFor="productionOnDemand" className="cursor-pointer">
                            Production sur commande
                          </Label>
                          <p className="text-sm text-muted-foreground mt-1">
                            Proposez de produire selon les besoins spécifiques des designers
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3 p-4 rounded-lg border border-border">
                        <Checkbox
                          id="exclusiveProduction"
                          checked={formData.exclusiveProduction}
                          onCheckedChange={(checked) => updateFormData('exclusiveProduction', checked)}
                        />
                        <div>
                          <Label htmlFor="exclusiveProduction" className="cursor-pointer">
                            Production exclusive
                          </Label>
                          <p className="text-sm text-muted-foreground mt-1">
                            Possibilité de partenariats exclusifs avec certains designers
                          </p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Navigation Buttons */}
              <div className="flex justify-between mt-8 pt-6 border-t border-border">
                <Button
                  variant="outline"
                  onClick={handlePrev}
                  disabled={currentStep === 1}
                  className="rounded-xl gap-2"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Précédent
                </Button>
                {currentStep < STEPS.length ? (
                  <Button
                    onClick={handleNext}
                    disabled={!canProceed()}
                    className="rounded-xl gap-2"
                  >
                    Suivant
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                ) : (
                  <Button
                    onClick={handleSubmit}
                    disabled={!canProceed() || isSubmitting}
                    className="rounded-xl gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Envoi en cours...
                      </>
                    ) : (
                      'Soumettre la demande'
                    )}
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default TextileCompanyApplication;
