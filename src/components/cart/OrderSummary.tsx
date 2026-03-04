import { useState } from 'react';
import { motion } from 'framer-motion';
import { ShoppingBag, Truck, Tag, CreditCard, ChevronDown, ChevronUp, Lock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/hooks/useAuth';
import { formatPrice } from '@/data/mockProducts';
import { useToast } from '@/hooks/use-toast';
import PromoCodeInput from './PromoCodeInput';

const OrderSummary = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { subtotal, deliveryCost, total, itemCount, paymentOption, monthlyPayment, installmentMonths, isEligibleForInstallment, items } = useCart();
  const { isAuthenticated, isCcpValidated, profile } = useAuth();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [promoDiscount, setPromoDiscount] = useState(0);
  const [promoCode, setPromoCode] = useState<string | null>(null);

  const finalTotal = total - promoDiscount;

  const handleCheckout = () => {
    if (items.length === 0) {
      toast({ title: "Panier vide", description: "Ajoutez des produits à votre panier pour continuer.", variant: "destructive" });
      return;
    }
    if (!isAuthenticated) {
      sessionStorage.setItem('checkout_return_url', '/panier');
      navigate('/connexion-client', { state: { returnUrl: '/panier', message: 'Veuillez vous connecter ou créer un compte pour finaliser votre achat.' } });
      return;
    }
    if (paymentOption === 'installment' && !isCcpValidated) {
      toast({ title: "CCP non validé", description: "Votre compte CCP doit être validé pour utiliser le paiement échelonné.", variant: "destructive" });
      return;
    }
    if (paymentOption === 'company' && profile?.is_independent) {
      toast({ title: "Option non disponible", description: "Le paiement société est réservé aux employés de sociétés conventionnées.", variant: "destructive" });
      return;
    }
    toast({ title: "Commande en cours de préparation", description: "Vous allez être redirigé vers la page de confirmation." });
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-card rounded-2xl border border-border overflow-hidden">
      <button onClick={() => setIsCollapsed(!isCollapsed)} className="w-full p-4 flex items-center justify-between lg:cursor-default">
        <h3 className="font-heading font-semibold text-lg text-foreground flex items-center gap-2">
          <ShoppingBag className="w-5 h-5 text-primary" /> Récapitulatif
        </h3>
        <div className="lg:hidden">
          {isCollapsed ? <ChevronDown className="w-5 h-5 text-muted-foreground" /> : <ChevronUp className="w-5 h-5 text-muted-foreground" />}
        </div>
      </button>

      <motion.div initial={false} animate={{ height: isCollapsed ? 0 : 'auto' }} className={`overflow-hidden ${isCollapsed ? 'lg:h-auto' : ''}`}>
        <div className="px-4 pb-4 space-y-4">
          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground flex items-center gap-2"><Tag className="w-4 h-4" />Sous-total ({itemCount} article{itemCount > 1 ? 's' : ''})</span>
              <span className="font-medium">{formatPrice(subtotal)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground flex items-center gap-2"><Truck className="w-4 h-4" />Livraison</span>
              <span className="font-medium">{formatPrice(deliveryCost)}</span>
            </div>
            {promoDiscount > 0 && (
              <div className="flex justify-between text-sm text-accent">
                <span className="flex items-center gap-2"><Tag className="w-4 h-4" />Réduction</span>
                <span className="font-medium">-{formatPrice(promoDiscount)}</span>
              </div>
            )}
          </div>

          {/* Promo Code */}
          <PromoCodeInput
            subtotal={subtotal}
            onApply={(discount, code) => { setPromoDiscount(discount); setPromoCode(code); }}
            onRemove={() => { setPromoDiscount(0); setPromoCode(null); }}
            appliedCode={promoCode}
            appliedDiscount={promoDiscount}
          />

          <div className="border-t border-border" />

          <div className="flex justify-between items-baseline">
            <span className="font-heading font-semibold text-foreground">Total</span>
            <span className="font-heading font-bold text-2xl text-primary">{formatPrice(finalTotal)}</span>
          </div>

          {paymentOption === 'installment' && isEligibleForInstallment && (
            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="p-3 bg-accent/10 rounded-xl border border-accent/20">
              <div className="flex items-center gap-2 mb-1"><CreditCard className="w-4 h-4 text-accent" /><span className="text-sm font-medium text-foreground">Mensualité</span></div>
              <p className="text-xl font-bold text-accent">{formatPrice(monthlyPayment)}/mois</p>
              <p className="text-xs text-muted-foreground">pendant {installmentMonths} mois</p>
            </motion.div>
          )}

          <Button onClick={handleCheckout} size="lg" className="w-full h-14 rounded-xl text-base font-semibold" disabled={items.length === 0}>
            {!isAuthenticated ? (<><Lock className="w-5 h-5 mr-2" />Se connecter pour commander</>) : (<><ShoppingBag className="w-5 h-5 mr-2" />Passer commande</>)}
          </Button>

          <p className="text-xs text-center text-muted-foreground flex items-center justify-center gap-1">
            <Lock className="w-3 h-3" /> Paiement sécurisé via CCP
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default OrderSummary;
