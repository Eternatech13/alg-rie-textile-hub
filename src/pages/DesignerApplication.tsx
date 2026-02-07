import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Upload, CheckCircle, User, Briefcase, Image, Handshake, FileText, Loader2 } from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/components/ui/use-toast';

const STEPS = [
  { id: 1, title: 'Informations personnelles', icon: User },
  { id: 2, title: 'Profil professionnel', icon: Briefcase },
  { id: 3, title: 'Portfolio', icon: Image },
  { id: 4, title: 'Collaboration', icon: Handshake },
  { id: 5, title: 'Documents', icon: FileText },
];

const SPECIALTIES = [
  'Mode traditionnelle',
  'Mode moderne',
  'Textile professionnel',
  'Textile médical',
  'Autre'
];

const CATEGORIES = [
  'Robes',
  'Costumes',
  'Tenues traditionnelles',
  'Uniformes',
  'Accessoires',
  'Autre'
];

const DesignerApplication = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const [formData, setFormData] = useState({
    // Step 1 - Personal Info
    lastName: '',
    firstName: '',
    email: '',
    phone: '',
    wilaya: '',
    city: '',
    // Step 2 - Professional Profile
    brandName: '',
    specialties: [] as string[],
    yearsExperience: '',
    bio: '',
    // Step 3 - Portfolio
    portfolioImages: [] as File[],
    portfolioUrl: '',
    targetCategories: [] as string[],
    // Step 4 - Collaboration
    interestedTextileUnits: false,
    interestedSallateBladi: false,
    desiredPercentage: '',
    // Step 5 - Documents
    idDocument: null as File | null,
    cvDocument: null as File | null,
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
    if (field === 'portfolioImages') {
      updateFormData(field, Array.from(files));
    } else {
      updateFormData(field, files[0]);
    }
  };

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return formData.lastName && formData.firstName && formData.email && formData.phone && formData.wilaya;
      case 2:
        return formData.brandName && formData.specialties.length > 0 && formData.yearsExperience;
      case 3:
        return formData.targetCategories.length > 0;
      case 4:
        return true;
      case 5:
        return formData.idDocument;
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
      title: "Candidature envoyée",
      description: "Notre équipe vous contactera après validation.",
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
              Votre demande a été envoyée avec succès
            </h1>
            <p className="text-muted-foreground mb-8">
              Notre équipe vous contactera après validation de votre dossier. 
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
              Inscription Designer
            </h1>
            <p className="text-muted-foreground">
              Complétez votre profil pour rejoindre notre équipe de designers
            </p>
          </motion.div>

          {/* Progress */}
          <div className="max-w-3xl mx-auto mb-8">
            <Progress value={progress} className="h-2 mb-4" />
            <div className="flex justify-between">
              {STEPS.map((step, index) => (
                <div
                  key={step.id}
                  className={`flex flex-col items-center ${
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
                  <span className="hidden md:block text-xs mt-2 text-muted-foreground text-center">
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
                {/* Step 1 - Personal Info */}
                {currentStep === 1 && (
                  <motion.div
                    key="step1"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-6"
                  >
                    <h2 className="font-heading text-xl font-semibold mb-4">Informations personnelles</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="lastName">Nom *</Label>
                        <Input
                          id="lastName"
                          value={formData.lastName}
                          onChange={(e) => updateFormData('lastName', e.target.value)}
                          placeholder="Votre nom"
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor="firstName">Prénom *</Label>
                        <Input
                          id="firstName"
                          value={formData.firstName}
                          onChange={(e) => updateFormData('firstName', e.target.value)}
                          placeholder="Votre prénom"
                          className="mt-1"
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="email">Email professionnel *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => updateFormData('email', e.target.value)}
                        placeholder="email@exemple.com"
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone">Numéro de téléphone *</Label>
                      <Input
                        id="phone"
                        value={formData.phone}
                        onChange={(e) => updateFormData('phone', e.target.value)}
                        placeholder="05XX XX XX XX"
                        className="mt-1"
                      />
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
                        <Label htmlFor="city">Ville</Label>
                        <Input
                          id="city"
                          value={formData.city}
                          onChange={(e) => updateFormData('city', e.target.value)}
                          placeholder="Ex: Bab El Oued"
                          className="mt-1"
                        />
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Step 2 - Professional Profile */}
                {currentStep === 2 && (
                  <motion.div
                    key="step2"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-6"
                  >
                    <h2 className="font-heading text-xl font-semibold mb-4">Profil professionnel</h2>
                    <div>
                      <Label htmlFor="brandName">Nom de marque / Nom artistique *</Label>
                      <Input
                        id="brandName"
                        value={formData.brandName}
                        onChange={(e) => updateFormData('brandName', e.target.value)}
                        placeholder="Votre nom de marque"
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label>Spécialité design * (sélectionnez une ou plusieurs)</Label>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-2">
                        {SPECIALTIES.map((specialty) => (
                          <div
                            key={specialty}
                            onClick={() => toggleArrayItem('specialties', specialty)}
                            className={`p-3 rounded-lg border-2 cursor-pointer transition-all text-sm text-center ${
                              formData.specialties.includes(specialty)
                                ? 'border-primary bg-primary/5 text-primary'
                                : 'border-border hover:border-primary/50'
                            }`}
                          >
                            {specialty}
                          </div>
                        ))}
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="yearsExperience">Années d'expérience *</Label>
                      <Input
                        id="yearsExperience"
                        type="number"
                        min="0"
                        value={formData.yearsExperience}
                        onChange={(e) => updateFormData('yearsExperience', e.target.value)}
                        placeholder="Ex: 5"
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="bio">Description courte du parcours</Label>
                      <Textarea
                        id="bio"
                        value={formData.bio}
                        onChange={(e) => updateFormData('bio', e.target.value)}
                        placeholder="Parlez-nous de votre parcours et de votre style..."
                        className="mt-1 min-h-[120px]"
                      />
                    </div>
                  </motion.div>
                )}

                {/* Step 3 - Portfolio */}
                {currentStep === 3 && (
                  <motion.div
                    key="step3"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-6"
                  >
                    <h2 className="font-heading text-xl font-semibold mb-4">Portfolio</h2>
                    <div>
                      <Label>Upload images designs (multiple)</Label>
                      <div className="mt-2 border-2 border-dashed border-border rounded-xl p-8 text-center hover:border-primary/50 transition-colors">
                        <Upload className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
                        <p className="text-sm text-muted-foreground mb-2">
                          Glissez vos images ici ou cliquez pour sélectionner
                        </p>
                        <input
                          type="file"
                          accept="image/*"
                          multiple
                          onChange={(e) => handleFileChange('portfolioImages', e.target.files)}
                          className="hidden"
                          id="portfolioImages"
                        />
                        <Button variant="outline" asChild className="rounded-lg">
                          <label htmlFor="portfolioImages" className="cursor-pointer">
                            Sélectionner des images
                          </label>
                        </Button>
                        {formData.portfolioImages.length > 0 && (
                          <p className="text-sm text-primary mt-3">
                            {formData.portfolioImages.length} image(s) sélectionnée(s)
                          </p>
                        )}
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="portfolioUrl">Lien portfolio externe (optionnel)</Label>
                      <Input
                        id="portfolioUrl"
                        value={formData.portfolioUrl}
                        onChange={(e) => updateFormData('portfolioUrl', e.target.value)}
                        placeholder="https://votre-portfolio.com"
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label>Catégories de produits ciblées *</Label>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-2">
                        {CATEGORIES.map((category) => (
                          <div
                            key={category}
                            onClick={() => toggleArrayItem('targetCategories', category)}
                            className={`p-3 rounded-lg border-2 cursor-pointer transition-all text-sm text-center ${
                              formData.targetCategories.includes(category)
                                ? 'border-primary bg-primary/5 text-primary'
                                : 'border-border hover:border-primary/50'
                            }`}
                          >
                            {category}
                          </div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Step 4 - Collaboration */}
                {currentStep === 4 && (
                  <motion.div
                    key="step4"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-6"
                  >
                    <h2 className="font-heading text-xl font-semibold mb-4">Collaboration & Conventions</h2>
                    <div className="space-y-4">
                      <div className="flex items-start gap-3 p-4 rounded-lg border border-border">
                        <Checkbox
                          id="interestedTextileUnits"
                          checked={formData.interestedTextileUnits}
                          onCheckedChange={(checked) => updateFormData('interestedTextileUnits', checked)}
                        />
                        <div>
                          <Label htmlFor="interestedTextileUnits" className="cursor-pointer">
                            Intéressé par conventions avec unités textiles
                          </Label>
                          <p className="text-sm text-muted-foreground mt-1">
                            Collaborez avec nos partenaires textiles pour la production de vos créations
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3 p-4 rounded-lg border border-border">
                        <Checkbox
                          id="interestedSallateBladi"
                          checked={formData.interestedSallateBladi}
                          onCheckedChange={(checked) => updateFormData('interestedSallateBladi', checked)}
                        />
                        <div>
                          <Label htmlFor="interestedSallateBladi" className="cursor-pointer">
                            Intéressé par convention directe avec Sallate Bladi
                          </Label>
                          <p className="text-sm text-muted-foreground mt-1">
                            Travaillez en exclusivité avec notre marketplace
                          </p>
                        </div>
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="desiredPercentage">Pourcentage souhaité par pièce (indicatif)</Label>
                      <div className="flex items-center gap-2 mt-1">
                        <Input
                          id="desiredPercentage"
                          type="number"
                          min="0"
                          max="100"
                          value={formData.desiredPercentage}
                          onChange={(e) => updateFormData('desiredPercentage', e.target.value)}
                          placeholder="Ex: 15"
                          className="w-32"
                        />
                        <span className="text-muted-foreground">%</span>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">
                        Ce pourcentage est indicatif et sera discuté lors de la validation
                      </p>
                    </div>
                  </motion.div>
                )}

                {/* Step 5 - Documents */}
                {currentStep === 5 && (
                  <motion.div
                    key="step5"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-6"
                  >
                    <h2 className="font-heading text-xl font-semibold mb-4">Documents</h2>
                    <div>
                      <Label>Pièce d'identité *</Label>
                      <div className="mt-2 border-2 border-dashed border-border rounded-xl p-6 text-center hover:border-primary/50 transition-colors">
                        <FileText className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                        <input
                          type="file"
                          accept=".pdf,.jpg,.jpeg,.png"
                          onChange={(e) => handleFileChange('idDocument', e.target.files)}
                          className="hidden"
                          id="idDocument"
                        />
                        <Button variant="outline" asChild className="rounded-lg">
                          <label htmlFor="idDocument" className="cursor-pointer">
                            Téléverser
                          </label>
                        </Button>
                        {formData.idDocument && (
                          <p className="text-sm text-primary mt-2">{formData.idDocument.name}</p>
                        )}
                      </div>
                    </div>
                    <div>
                      <Label>CV ou document équivalent (optionnel)</Label>
                      <div className="mt-2 border-2 border-dashed border-border rounded-xl p-6 text-center hover:border-primary/50 transition-colors">
                        <FileText className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                        <input
                          type="file"
                          accept=".pdf,.doc,.docx"
                          onChange={(e) => handleFileChange('cvDocument', e.target.files)}
                          className="hidden"
                          id="cvDocument"
                        />
                        <Button variant="outline" asChild className="rounded-lg">
                          <label htmlFor="cvDocument" className="cursor-pointer">
                            Téléverser
                          </label>
                        </Button>
                        {formData.cvDocument && (
                          <p className="text-sm text-primary mt-2">{formData.cvDocument.name}</p>
                        )}
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
                      'Envoyer ma candidature'
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

export default DesignerApplication;
