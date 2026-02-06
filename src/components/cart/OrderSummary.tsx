import { motion } from 'framer-motion';
import { ShoppingBag, Truck, Tag, CreditCard, ChevronDown, ChevronUp, Lock } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/hooks/useAuth';
import { formatPrice } from '@/data/mockProducts';
import { useToast } from '@/hooks/use-toast';

const OrderSummary = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { 
    subtotal, 
    deliveryCost, 
    total, 
    itemCount,
    paymentOption,
    monthlyPayment,
    installmentMonths,
    isEligibleForInstallment,
    items
  } = useCart();
  const { isAuthenticated, isCcpValidated, profile } = useAuth();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const handleCheckout = () => {
    if (items.length === 0) {
      toast({
        title: "Panier vide",
        description: "Ajoutez des produits à votre panier pour continuer.",
        variant: "destructive",
      });
      return;
    }

    if (!isAuthenticated) {
      // Store return URL
      sessionStorage.setItem('checkout_return_url', '/panier');
      navigate('/connexion-client', { 
        state: { 
          returnUrl: '/panier',
          message: 'Veuillez vous connecter ou créer un compte pour finaliser votre achat.'
        } 
      });
      return;
    }

    // Check payment option validity
    if (paymentOption === 'installment' && !isCcpValidated) {
      toast({
        title: "CCP non validé",
        description: "Votre compte CCP doit être validé pour utiliser le paiement échelonné.",
        variant: "destructive",
      });
      return;
    }

    if (paymentOption === 'company' && profile?.is_independent) {
      toast({
        title: "Option non disponible",
        description: "Le paiement société est réservé aux employés de sociétés conventionnées.",
        variant: "destructive",
      });
      return;
    }

    // Proceed to checkout (to be implemented)
    toast({
      title: "Commande en cours de préparation",
      description: "Vous allez être redirigé vers la page de confirmation.",
    });
  };

  const discount = 0; // Placeholder for future discount logic

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-card rounded-2xl border border-border overflow-hidden"
    >
      {/* Header - Collapsible on mobile */}
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="w-full p-4 flex items-center justify-between lg:cursor-default"
      >
        <h3 className="font-heading font-semibold text-lg text-foreground flex items-center gap-2">
          <ShoppingBag className="w-5 h-5 text-primary" />
          Récapitulatif
        </h3>
        <div className="lg:hidden">
          {isCollapsed ? (
            <ChevronDown className="w-5 h-5 text-muted-foreground" />
          ) : (
            <ChevronUp className="w-5 h-5 text-muted-foreground" />
          )}
        </div>
      </button>

      {/* Content */}
      <motion.div
        initial={false}
        animate={{ height: isCollapsed ? 0 : 'auto' }}
        className={`overflow-hidden ${isCollapsed ? 'lg:h-auto' : ''}`}
      >
        <div className="px-4 pb-4 space-y-4">
          {/* Line Items */}
          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground flex items-center gap-2">
                <Tag className="w-4 h-4" />
                Sous-total ({itemCount} article{itemCount > 1 ? 's' : ''})
              </span>
              <span className="font-medium">{formatPrice(subtotal)}</span>
            </div>
            
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground flex items-center gap-2">
                <Truck className="w-4 h-4" />
                Livraison
              </span>
              <span className="font-medium">{formatPrice(deliveryCost)}</span>
            </div>

            {discount > 0 && (
              <div className="flex justify-between text-sm text-accent">
                <span className="flex items-center gap-2">
                  <Tag className="w-4 h-4" />
                  Réduction
                </span>
                <span className="font-medium">-{formatPrice(discount)}</span>
              </div>
            )}
          </div>

          {/* Divider */}
          <div className="border-t border-border" />

          {/* Total */}
          <div className="flex justify-between items-baseline">
            <span className="font-heading font-semibold text-foreground">Total</span>
            <span className="font-heading font-bold text-2xl text-primary">
              {formatPrice(total)}
            </span>
          </div>

          {/* Monthly Payment Preview */}
          {paymentOption === 'installment' && isEligibleForInstallment && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-3 bg-accent/10 rounded-xl border border-accent/20"
            >
              <div className="flex items-center gap-2 mb-1">
                <CreditCard className="w-4 h-4 text-accent" />
                <span className="text-sm font-medium text-foreground">Mensualité</span>
              </div>
              <p className="text-xl font-bold text-accent">{formatPrice(monthlyPayment)}/mois</p>
              <p className="text-xs text-muted-foreground">pendant {installmentMonths} mois</p>
            </motion.div>
          )}

          {/* Checkout Button */}
          <Button
            onClick={handleCheckout}
            size="lg"
            className="w-full h-14 rounded-xl text-base font-semibold"
            disabled={items.length === 0}
          >
            {!isAuthenticated ? (
              <>
                <Lock className="w-5 h-5 mr-2" />
                Se connecter pour commander
              </>
            ) : (
              <>
                <ShoppingBag className="w-5 h-5 mr-2" />
                Passer commande
              </>
            )}
          </Button>

          {/* Security Note */}
          <p className="text-xs text-center text-muted-foreground flex items-center justify-center gap-1">
            <Lock className="w-3 h-3" />
            Paiement sécurisé via CCP
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default OrderSummary;
