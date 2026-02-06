import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Eye, EyeOff, Check, X, Building2, User as UserIcon, Loader2 } from 'lucide-react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { useAuth, fetchPartnerCompanies, PartnerCompany } from '@/hooks/useAuth';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

// Validation schema
const registrationSchema = z.object({
  lastName: z.string().trim().min(2, "Le nom doit contenir au moins 2 caractères").max(50, "Le nom ne peut pas dépasser 50 caractères"),
  firstName: z.string().trim().min(2, "Le prénom doit contenir au moins 2 caractères").max(50, "Le prénom ne peut pas dépasser 50 caractères"),
  email: z.string().trim().email("Veuillez entrer une adresse email valide").max(255, "L'email ne peut pas dépasser 255 caractères"),
  phone: z.string().trim().regex(/^(0)(5|6|7)[0-9]{8}$/, "Numéro de téléphone algérien invalide (ex: 0555123456)"),
  password: z.string()
    .min(8, "Le mot de passe doit contenir au moins 8 caractères")
    .regex(/[A-Z]/, "Le mot de passe doit contenir au moins une majuscule")
    .regex(/[0-9]/, "Le mot de passe doit contenir au moins un chiffre"),
  confirmPassword: z.string(),
  ccpNumber: z.string().trim().regex(/^[0-9]{10,20}$/, "Numéro CCP invalide (10 à 20 chiffres)"),
  isIndependent: z.boolean(),
  partnerCompanyId: z.string().optional(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Les mots de passe ne correspondent pas",
  path: ["confirmPassword"],
});

type RegistrationFormData = z.infer<typeof registrationSchema>;

const ClientRegistration = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { signUp, isAuthenticated } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [partnerCompanies, setPartnerCompanies] = useState<PartnerCompany[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const [searchCompany, setSearchCompany] = useState('');

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<RegistrationFormData>({
    resolver: zodResolver(registrationSchema),
    defaultValues: {
      isIndependent: true,
    },
  });

  const watchIsIndependent = watch('isIndependent');
  const watchPassword = watch('password', '');

  // Password strength indicators
  const hasMinLength = watchPassword.length >= 8;
  const hasUppercase = /[A-Z]/.test(watchPassword);
  const hasNumber = /[0-9]/.test(watchPassword);

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    const loadCompanies = async () => {
      const companies = await fetchPartnerCompanies();
      setPartnerCompanies(companies);
    };
    loadCompanies();
  }, []);

  const filteredCompanies = partnerCompanies.filter(company =>
    company.name.toLowerCase().includes(searchCompany.toLowerCase())
  );

  const onSubmit = async (data: RegistrationFormData) => {
    setIsSubmitting(true);
    
    const { error } = await signUp(
      data.email,
      data.password,
      {
        firstName: data.firstName,
        lastName: data.lastName,
        phone: data.phone,
        ccpNumber: data.ccpNumber,
        isIndependent: data.isIndependent,
        partnerCompanyId: data.isIndependent ? null : (data.partnerCompanyId || null),
      }
    );

    setIsSubmitting(false);

    if (error) {
      let errorMessage = "Une erreur est survenue lors de l'inscription.";
      if (error.message.includes('already registered')) {
        errorMessage = "Cette adresse email est déjà utilisée.";
      } else if (error.message.includes('weak_password')) {
        errorMessage = "Le mot de passe est trop faible.";
      }
      
      toast({
        title: "Erreur d'inscription",
        description: errorMessage,
        variant: "destructive",
      });
      return;
    }

    setShowSuccessDialog(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-secondary/10 via-background to-primary/5">
      <Header />
      
      <main className="pt-24 pb-16">
        <div className="section-container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-2xl mx-auto"
          >
            {/* Header */}
            <div className="text-center mb-8">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center mx-auto mb-4"
              >
                <span className="text-primary-foreground font-heading font-bold text-2xl">S</span>
              </motion.div>
              <h1 className="text-3xl font-heading font-bold text-foreground mb-2">
                Créer votre compte Sallate Bladi
              </h1>
              <p className="text-muted-foreground">
                Accédez aux produits textiles algériens avec facilité de paiement
              </p>
            </div>

            {/* Registration Form Card */}
            <Card className="shadow-lg border-0 bg-card/80 backdrop-blur-sm">
              <CardContent className="pt-8 pb-8 px-8">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  {/* Name Fields */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Nom *</Label>
                      <Input
                        id="lastName"
                        placeholder="Votre nom"
                        {...register('lastName')}
                        className={errors.lastName ? 'border-destructive' : ''}
                      />
                      {errors.lastName && (
                        <p className="text-sm text-destructive">{errors.lastName.message}</p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="firstName">Prénom *</Label>
                      <Input
                        id="firstName"
                        placeholder="Votre prénom"
                        {...register('firstName')}
                        className={errors.firstName ? 'border-destructive' : ''}
                      />
                      {errors.firstName && (
                        <p className="text-sm text-destructive">{errors.firstName.message}</p>
                      )}
                    </div>
                  </div>

                  {/* Email */}
                  <div className="space-y-2">
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="votre@email.com"
                      {...register('email')}
                      className={errors.email ? 'border-destructive' : ''}
                    />
                    {errors.email && (
                      <p className="text-sm text-destructive">{errors.email.message}</p>
                    )}
                  </div>

                  {/* Phone */}
                  <div className="space-y-2">
                    <Label htmlFor="phone">Numéro de téléphone *</Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="0555123456"
                      {...register('phone')}
                      className={errors.phone ? 'border-destructive' : ''}
                    />
                    {errors.phone && (
                      <p className="text-sm text-destructive">{errors.phone.message}</p>
                    )}
                  </div>

                  {/* Password */}
                  <div className="space-y-2">
                    <Label htmlFor="password">Mot de passe *</Label>
                    <div className="relative">
                      <Input
                        id="password"
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Créez un mot de passe sécurisé"
                        {...register('password')}
                        className={errors.password ? 'border-destructive pr-10' : 'pr-10'}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                    {/* Password strength indicators */}
                    <div className="flex gap-4 text-xs mt-2">
                      <span className={`flex items-center gap-1 ${hasMinLength ? 'text-accent' : 'text-muted-foreground'}`}>
                        {hasMinLength ? <Check className="h-3 w-3" /> : <X className="h-3 w-3" />}
                        8 caractères min
                      </span>
                      <span className={`flex items-center gap-1 ${hasUppercase ? 'text-accent' : 'text-muted-foreground'}`}>
                        {hasUppercase ? <Check className="h-3 w-3" /> : <X className="h-3 w-3" />}
                        1 majuscule
                      </span>
                      <span className={`flex items-center gap-1 ${hasNumber ? 'text-accent' : 'text-muted-foreground'}`}>
                        {hasNumber ? <Check className="h-3 w-3" /> : <X className="h-3 w-3" />}
                        1 chiffre
                      </span>
                    </div>
                    {errors.password && (
                      <p className="text-sm text-destructive">{errors.password.message}</p>
                    )}
                  </div>

                  {/* Confirm Password */}
                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirmer le mot de passe *</Label>
                    <div className="relative">
                      <Input
                        id="confirmPassword"
                        type={showConfirmPassword ? 'text' : 'password'}
                        placeholder="Confirmez votre mot de passe"
                        {...register('confirmPassword')}
                        className={errors.confirmPassword ? 'border-destructive pr-10' : 'pr-10'}
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                      >
                        {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                    {errors.confirmPassword && (
                      <p className="text-sm text-destructive">{errors.confirmPassword.message}</p>
                    )}
                  </div>

                  {/* Separator */}
                  <div className="border-t border-border pt-6">
                    <h3 className="font-heading font-semibold text-lg mb-4 flex items-center gap-2">
                      <Building2 className="h-5 w-5 text-primary" />
                      Appartenance société
                    </h3>

                    {/* Independent Client Checkbox */}
                    <div className="flex items-center space-x-3 mb-4 p-4 rounded-lg bg-secondary/10 border border-secondary/20">
                      <Checkbox
                        id="isIndependent"
                        checked={watchIsIndependent}
                        onCheckedChange={(checked) => {
                          setValue('isIndependent', checked as boolean);
                          if (checked) {
                            setValue('partnerCompanyId', undefined);
                          }
                        }}
                      />
                      <Label htmlFor="isIndependent" className="flex items-center gap-2 cursor-pointer">
                        <UserIcon className="h-4 w-4" />
                        Je suis un client indépendant
                      </Label>
                    </div>

                    {/* Partner Company Selection */}
                    {!watchIsIndependent && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="space-y-2"
                      >
                        <Label>Sélectionnez votre société conventionnée</Label>
                        <Select
                          onValueChange={(value) => setValue('partnerCompanyId', value)}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Rechercher une société..." />
                          </SelectTrigger>
                          <SelectContent>
                            <div className="p-2">
                              <Input
                                placeholder="Filtrer les sociétés..."
                                value={searchCompany}
                                onChange={(e) => setSearchCompany(e.target.value)}
                                className="mb-2"
                              />
                            </div>
                            {filteredCompanies.map((company) => (
                              <SelectItem key={company.id} value={company.id}>
                                {company.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        {errors.partnerCompanyId && (
                          <p className="text-sm text-destructive">{errors.partnerCompanyId.message}</p>
                        )}
                      </motion.div>
                    )}
                  </div>

                  {/* CCP Section */}
                  <div className="border-t border-border pt-6">
                    <h3 className="font-heading font-semibold text-lg mb-4 flex items-center gap-2">
                      <span className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center text-accent font-bold text-sm">
                        CCP
                      </span>
                      Compte CCP
                    </h3>
                    <div className="space-y-2">
                      <Label htmlFor="ccpNumber">Numéro de compte CCP *</Label>
                      <Input
                        id="ccpNumber"
                        type="text"
                        placeholder="Entrez votre numéro CCP"
                        {...register('ccpNumber')}
                        className={errors.ccpNumber ? 'border-destructive' : ''}
                      />
                      {errors.ccpNumber && (
                        <p className="text-sm text-destructive">{errors.ccpNumber.message}</p>
                      )}
                      <p className="text-xs text-muted-foreground">
                        Votre compte CCP sera validé pour activer les facilités de paiement.
                      </p>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full h-12 bg-accent hover:bg-accent/90 text-accent-foreground font-semibold text-base transition-all duration-300 hover:shadow-lg"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Création en cours...
                      </>
                    ) : (
                      'Créer mon compte'
                    )}
                  </Button>

                  {/* Login Link */}
                  <p className="text-center text-sm text-muted-foreground">
                    Vous avez déjà un compte ?{' '}
                    <Link to="/connexion-client" className="text-primary hover:underline font-medium">
                      Connectez-vous
                    </Link>
                  </p>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </main>

      {/* Success Dialog */}
      <Dialog open={showSuccessDialog} onOpenChange={setShowSuccessDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <div className="mx-auto w-16 h-16 bg-accent/20 rounded-full flex items-center justify-center mb-4">
              <Check className="h-8 w-8 text-accent" />
            </div>
            <DialogTitle className="text-center text-xl">
              Votre compte Sallate Bladi a été créé avec succès
            </DialogTitle>
            <DialogDescription className="text-center space-y-2 pt-2">
              <p>Vous allez recevoir un email de vérification.</p>
              <p className="text-sm bg-secondary/20 p-3 rounded-lg">
                Votre compte sera activé après validation de votre compte CCP.
              </p>
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex flex-col gap-2 sm:flex-col">
            <Button
              onClick={() => navigate('/connexion-client')}
              className="w-full bg-primary hover:bg-primary/90"
            >
              Aller à la page connexion
            </Button>
            <Button
              variant="outline"
              onClick={() => navigate('/')}
              className="w-full"
            >
              Retour accueil
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Footer />
    </div>
  );
};

export default ClientRegistration;
