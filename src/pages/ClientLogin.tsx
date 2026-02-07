import { useState, useEffect } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Eye, EyeOff, Loader2, AlertCircle, Clock, Info } from 'lucide-react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/useAuth';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

// Validation schema
const loginSchema = z.object({
  email: z.string().trim().email("Veuillez entrer une adresse email valide"),
  password: z.string().min(1, "Le mot de passe est requis"),
  rememberMe: z.boolean().optional(),
});

type LoginFormData = z.infer<typeof loginSchema>;

const ClientLogin = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const { signIn, isAuthenticated, isCcpValidated, profile, loading } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showCcpPending, setShowCcpPending] = useState(false);

  // Get return URL from state or session storage
  const returnUrl = location.state?.returnUrl || sessionStorage.getItem('checkout_return_url') || '/';
  const returnMessage = location.state?.message;

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      rememberMe: false,
    },
  });

  const watchRememberMe = watch('rememberMe');

  useEffect(() => {
    if (isAuthenticated && profile) {
      if (!profile.ccp_validated) {
        setShowCcpPending(true);
      }
      // Clear the session storage return URL after successful login
      sessionStorage.removeItem('checkout_return_url');
      // Navigate to return URL
      navigate(returnUrl, { replace: true });
    }
  }, [isAuthenticated, profile, navigate, returnUrl]);

  const onSubmit = async (data: LoginFormData) => {
    setIsSubmitting(true);
    setShowCcpPending(false);
    
    const { error } = await signIn(data.email, data.password);

    setIsSubmitting(false);

    if (error) {
      let errorMessage = "Une erreur est survenue lors de la connexion.";
      if (error.message.includes('Invalid login credentials')) {
        errorMessage = "Email ou mot de passe incorrect.";
      } else if (error.message.includes('Email not confirmed')) {
        errorMessage = "Veuillez confirmer votre email avant de vous connecter.";
      }
      
      toast({
        title: "Erreur de connexion",
        description: errorMessage,
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Connexion réussie",
      description: "Bienvenue sur Sallate Bladi !",
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5 flex flex-col">
      <Header />
      
      <main className="flex-1 flex items-center justify-center py-20 px-4 mt-16">
        <div className="w-full max-w-md">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Header */}
            <div className="text-center mb-10">
              
              <h1 className="text-4xl font-heading font-bold text-foreground mb-3">
                Connexion
              </h1>
              <p className="text-muted-foreground text-base">
                Accédez à votre espace Sallate Bladi
              </p>
              <div className="mt-4 flex items-center justify-center gap-2 text-sm text-muted-foreground">
                <div className="w-8 h-0.5 bg-primary/30"></div>
                <span className="font-medium">Plateforme textile algérienne</span>
                <div className="w-8 h-0.5 bg-primary/30"></div>
              </div>
            </div>

          {/* Return Message Alert */}
          {returnMessage && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6"
            >
              <Alert className="border-primary/30 bg-primary/5">
                <Info className="h-4 w-4 text-primary" />
                <AlertDescription className="text-foreground">
                  {returnMessage}
                </AlertDescription>
              </Alert>
            </motion.div>
          )}

          {/* CCP Pending Alert */}
          {showCcpPending && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6"
            >
              <Alert className="border-accent/30 bg-accent/10">
                <Clock className="h-4 w-4 text-accent" />
                <AlertTitle className="text-foreground">Compte en cours de validation</AlertTitle>
                <AlertDescription className="text-muted-foreground">
                  Votre compte est en cours de validation CCP.
                </AlertDescription>
              </Alert>
            </motion.div>
          )}

          {/* Login Form Card - WHITE CARD */}
          <Card className="shadow-xl border-0 bg-white overflow-hidden">
            <div className="h-2 bg-gradient-to-r from-primary via-accent to-primary"></div>
            <CardContent className="pt-8 pb-8 px-8">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {/* Email */}
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
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

                {/* Password */}
                <div className="space-y-2">
                  <Label htmlFor="password">Mot de passe</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Entrez votre mot de passe"
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
                  {errors.password && (
                    <p className="text-sm text-destructive">{errors.password.message}</p>
                  )}
                </div>

                {/* Remember Me */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="rememberMe"
                      checked={watchRememberMe}
                      onCheckedChange={(checked) => setValue('rememberMe', checked as boolean)}
                    />
                    <Label htmlFor="rememberMe" className="text-sm cursor-pointer">
                      Se souvenir de moi
                    </Label>
                  </div>
                  <Link
                    to="/mot-de-passe-oublie"
                    className="text-sm text-primary hover:underline"
                  >
                    Mot de passe oublié ?
                  </Link>
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full h-12 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold text-base transition-all duration-300 hover:shadow-lg"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Connexion en cours...
                    </>
                  ) : (
                    'Se connecter'
                  )}
                </Button>

                {/* Register Link */}
                <p className="text-center text-sm text-muted-foreground">
                  Vous n'avez pas de compte ?{' '}
                  <Link to="/inscription-client" className="text-primary hover:underline font-medium">
                    Créer un compte
                  </Link>
                </p>
              </form>
            </CardContent>
          </Card>

          {/* Additional Info */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mt-8 text-center"
          >
            <div className="flex items-center justify-center gap-8 text-sm">
              <div className="flex items-center gap-2 text-muted-foreground">
                <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                <span className="font-medium">Connexion sécurisée</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                <span className="font-medium">Paiement CCP</span>
              </div>
            </div>
          </motion.div>
        </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ClientLogin;
