import { motion } from 'framer-motion';
import { CreditCard, Calculator, Building2, Check, AlertCircle, Info } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/hooks/useAuth';
import { formatPrice } from '@/data/mockProducts';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

const PaymentOptions = () => {
  const { 
    paymentOption, 
    setPaymentOption, 
    total, 
    isEligibleForInstallment, 
    monthlyPayment, 
    installmentMonths 
  } = useCart();
  const { isAuthenticated, profile, isCcpValidated } = useAuth();

  // Check if user can use installment payment
  const canUseInstallment = isAuthenticated && isCcpValidated && isEligibleForInstallment;
  
  // Check if user belongs to a company
  const hasCompanyPayment = isAuthenticated && profile && !profile.is_independent && profile.partner_company_id;

  const paymentOptions = [
    {
      id: 'full' as const,
      title: 'Paiement intégral',
      icon: CreditCard,
      description: 'Payez la totalité maintenant',
      enabled: true,
      disabledReason: '',
    },
    {
      id: 'installment' as const,
      title: 'Facilité Sallate Bladi',
      icon: Calculator,
      description: 'Paiement échelonné via CCP',
      enabled: canUseInstallment,
      disabledReason: !isAuthenticated 
        ? 'Connectez-vous pour accéder à cette option'
        : !isCcpValidated 
        ? 'Votre compte CCP doit être validé'
        : !isEligibleForInstallment 
        ? `Disponible pour les commandes jusqu'à ${formatPrice(30000)}`
        : '',
    },
    {
      id: 'company' as const,
      title: 'Paiement société',
      icon: Building2,
      description: 'Prélèvement via votre employeur',
      enabled: !!hasCompanyPayment,
      disabledReason: !isAuthenticated 
        ? 'Connectez-vous pour accéder à cette option'
        : profile?.is_independent 
        ? 'Réservé aux employés de sociétés conventionnées'
        : 'Vous n\'êtes pas rattaché à une société conventionnée',
    },
  ];

  return (
    <div className="space-y-4">
      <h3 className="font-heading font-semibold text-lg text-foreground flex items-center gap-2">
        <CreditCard className="w-5 h-5 text-primary" />
        Mode de paiement
      </h3>
      
      <div className="space-y-3">
        {paymentOptions.map((option, index) => {
          const Icon = option.icon;
          const isSelected = paymentOption === option.id;
          
          return (
            <motion.div
              key={option.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <button
                onClick={() => option.enabled && setPaymentOption(option.id)}
                disabled={!option.enabled}
                className={`w-full p-4 rounded-xl border-2 transition-all text-left ${
                  isSelected
                    ? 'border-primary bg-primary/5'
                    : option.enabled
                    ? 'border-border hover:border-primary/50'
                    : 'border-border/50 bg-muted/30 cursor-not-allowed'
                }`}
              >
                <div className="flex items-start gap-4">
                  <div className={`p-2 rounded-lg ${
                    isSelected 
                      ? 'bg-primary text-primary-foreground' 
                      : option.enabled 
                      ? 'bg-muted text-muted-foreground'
                      : 'bg-muted/50 text-muted-foreground/50'
                  }`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h4 className={`font-medium ${option.enabled ? 'text-foreground' : 'text-muted-foreground'}`}>
                        {option.title}
                      </h4>
                      <div className="flex items-center gap-2">
                        {!option.enabled && option.disabledReason && (
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Info className="w-4 h-4 text-muted-foreground" />
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>{option.disabledReason}</p>
                            </TooltipContent>
                          </Tooltip>
                        )}
                        {isSelected && (
                          <div className="w-5 h-5 rounded-full bg-primary flex items-center justify-center">
                            <Check className="w-3 h-3 text-primary-foreground" />
                          </div>
                        )}
                      </div>
                    </div>
                    <p className={`text-sm mt-1 ${option.enabled ? 'text-muted-foreground' : 'text-muted-foreground/50'}`}>
                      {option.description}
                    </p>
                    
                    {/* Installment details */}
                    {option.id === 'installment' && option.enabled && isSelected && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        className="mt-4 p-3 bg-accent/10 rounded-lg border border-accent/20"
                      >
                        <div className="flex items-center gap-2 mb-2">
                          <Calculator className="w-4 h-4 text-accent" />
                          <span className="font-medium text-foreground">Simulateur de mensualités</span>
                        </div>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <p className="text-muted-foreground">Mensualité</p>
                            <p className="font-bold text-primary text-lg">{formatPrice(monthlyPayment)}</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">Durée</p>
                            <p className="font-bold text-foreground text-lg">{installmentMonths} mois</p>
                          </div>
                        </div>
                        <div className="mt-3 pt-3 border-t border-border">
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Total à payer</span>
                            <span className="font-semibold">{formatPrice(total)}</span>
                          </div>
                        </div>
                        <p className="text-xs text-muted-foreground mt-2 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" />
                          Prélèvement mensuel sur votre compte CCP
                        </p>
                      </motion.div>
                    )}

                    {/* Company payment details */}
                    {option.id === 'company' && option.enabled && isSelected && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        className="mt-4 p-3 bg-primary/10 rounded-lg border border-primary/20"
                      >
                        <div className="flex items-center gap-2 mb-2">
                          <Building2 className="w-4 h-4 text-primary" />
                          <span className="font-medium text-foreground">Paiement entreprise</span>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Votre société règle Sallate Bladi et effectue un prélèvement interne sur votre salaire.
                        </p>
                        <div className="mt-3 pt-3 border-t border-border">
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Montant couvert</span>
                            <span className="font-semibold text-primary">{formatPrice(total)}</span>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </div>
                </div>
              </button>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default PaymentOptions;
