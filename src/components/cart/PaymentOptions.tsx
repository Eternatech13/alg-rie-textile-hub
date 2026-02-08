import { motion } from 'framer-motion';
import { useState } from 'react';
import { CreditCard, Calculator, Building2, Check, AlertCircle, Info, ChevronDown } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/hooks/useAuth';
import { formatPrice } from '@/data/mockProducts';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';

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
  const [isOpen, setIsOpen] = useState(false);

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

  const selectedOption = paymentOptions.find(opt => opt.id === paymentOption);

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <CollapsibleTrigger className="w-full flex items-center justify-between p-4 hover:bg-muted/50 rounded-xl transition-colors">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-primary/10">
            <CreditCard className="w-5 h-5 text-primary" />
          </div>
          <div className="text-left">
            <h3 className="font-heading font-semibold text-base text-foreground">
              Mode de paiement
            </h3>
            <p className="text-sm text-muted-foreground">
              {selectedOption?.title}
            </p>
          </div>
        </div>
        <ChevronDown className={`w-5 h-5 text-muted-foreground transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </CollapsibleTrigger>
      
      <CollapsibleContent className="pt-4 space-y-3">
        {paymentOptions.map((option, index) => {
          const Icon = option.icon;
          const isSelected = paymentOption === option.id;
          
          return (
            <motion.div
              key={option.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <button
                onClick={() => option.enabled && setPaymentOption(option.id)}
                disabled={!option.enabled}
                className={`w-full p-3 rounded-lg border transition-all text-left ${
                  isSelected
                    ? 'border-primary bg-primary/5'
                    : option.enabled
                    ? 'border-border hover:border-primary/50'
                    : 'border-border/50 bg-muted/30 cursor-not-allowed'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`p-1.5 rounded-lg ${
                    isSelected 
                      ? 'bg-primary text-primary-foreground' 
                      : option.enabled 
                      ? 'bg-muted text-muted-foreground'
                      : 'bg-muted/50 text-muted-foreground/50'
                  }`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h4 className={`font-medium text-sm ${option.enabled ? 'text-foreground' : 'text-muted-foreground'}`}>
                        {option.title}
                      </h4>
                      <div className="flex items-center gap-2">
                        {!option.enabled && option.disabledReason && (
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Info className="w-3.5 h-3.5 text-muted-foreground" />
                            </TooltipTrigger>
                            <TooltipContent>
                              <p className="text-xs">{option.disabledReason}</p>
                            </TooltipContent>
                          </Tooltip>
                        )}
                        {isSelected && (
                          <div className="w-4 h-4 rounded-full bg-primary flex items-center justify-center">
                            <Check className="w-2.5 h-2.5 text-primary-foreground" />
                          </div>
                        )}
                      </div>
                    </div>
                    
                    {/* Installment details */}
                    {option.id === 'installment' && option.enabled && isSelected && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        className="mt-3 p-2.5 bg-accent/10 rounded-lg border border-accent/20"
                      >
                        <div className="flex items-center gap-2 mb-2">
                          <Calculator className="w-3.5 h-3.5 text-accent" />
                          <span className="font-medium text-xs text-foreground">Simulateur de mensualités</span>
                        </div>
                        <div className="grid grid-cols-2 gap-3 text-xs">
                          <div>
                            <p className="text-muted-foreground">Mensualité</p>
                            <p className="font-bold text-primary text-base">{formatPrice(monthlyPayment)}</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">Durée</p>
                            <p className="font-bold text-foreground text-base">{installmentMonths} mois</p>
                          </div>
                        </div>
                      </motion.div>
                    )}

                    {/* Company payment details */}
                    {option.id === 'company' && option.enabled && isSelected && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        className="mt-3 p-2.5 bg-primary/10 rounded-lg border border-primary/20"
                      >
                        <p className="text-xs text-muted-foreground">
                          Prélèvement interne sur votre salaire
                        </p>
                      </motion.div>
                    )}
                  </div>
                </div>
              </button>
            </motion.div>
          );
        })}
      </CollapsibleContent>
    </Collapsible>
  );
};

export default PaymentOptions;
