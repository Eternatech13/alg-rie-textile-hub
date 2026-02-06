import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, ArrowLeft, Trash2 } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import CartItem from '@/components/cart/CartItem';
import DeliveryOptions from '@/components/cart/DeliveryOptions';
import PaymentOptions from '@/components/cart/PaymentOptions';
import OrderSummary from '@/components/cart/OrderSummary';
import EmptyCart from '@/components/cart/EmptyCart';
import { Button } from '@/components/ui/button';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/hooks/useAuth';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';

const Cart = () => {
  const location = useLocation();
  const { items, clearCart, itemCount } = useCart();
  const { isAuthenticated, isCcpValidated, profile } = useAuth();

  // Check for return message from login
  const returnMessage = location.state?.message;

  // Show CCP validation warning if needed
  const showCcpWarning = isAuthenticated && !isCcpValidated;

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="pt-24">
        {/* Breadcrumb */}
        <div className="section-container py-4">
          <nav className="flex items-center gap-2 text-sm text-muted-foreground">
            <Link to="/" className="hover:text-primary transition-colors">Accueil</Link>
            <span>/</span>
            <span className="text-foreground">Panier</span>
          </nav>
        </div>

        {/* Page Header */}
        <section className="section-container pb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-heading font-bold text-foreground flex items-center gap-3">
                <ShoppingCart className="w-8 h-8 text-primary" />
                Votre panier
              </h1>
              <p className="text-muted-foreground mt-1">
                {itemCount > 0 
                  ? `${itemCount} article${itemCount > 1 ? 's' : ''} dans votre panier`
                  : 'Aucun article dans votre panier'
                }
              </p>
            </div>
            
            {items.length > 0 && (
              <div className="flex gap-3">
                <Link to="/catalogue">
                  <Button variant="outline" className="rounded-xl">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Continuer mes achats
                  </Button>
                </Link>
                <Button 
                  variant="ghost" 
                  onClick={clearCart}
                  className="text-muted-foreground hover:text-destructive"
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Vider le panier
                </Button>
              </div>
            )}
          </div>
        </section>

        {/* Alerts */}
        {(returnMessage || showCcpWarning) && (
          <div className="section-container pb-6 space-y-3">
            {returnMessage && (
              <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{returnMessage}</AlertDescription>
              </Alert>
            )}
            {showCcpWarning && (
              <Alert variant="default" className="border-accent/50 bg-accent/5">
                <AlertCircle className="h-4 w-4 text-accent" />
                <AlertDescription className="text-foreground">
                  Votre compte CCP est en cours de validation. Le paiement échelonné sera disponible après validation.
                </AlertDescription>
              </Alert>
            )}
          </div>
        )}

        {/* Main Content */}
        <section className="section-container pb-16">
          {items.length === 0 ? (
            <EmptyCart />
          ) : (
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Left Column - Cart Items, Delivery, Payment */}
              <div className="lg:col-span-2 space-y-8">
                {/* Cart Items */}
                <div className="space-y-4">
                  <h2 className="font-heading font-semibold text-xl text-foreground">
                    Articles
                  </h2>
                  <AnimatePresence mode="popLayout">
                    {items.map((item, index) => (
                      <CartItem key={item.id} item={item} index={index} />
                    ))}
                  </AnimatePresence>
                </div>

                {/* Delivery Options */}
                <div className="bg-card rounded-2xl border border-border p-6">
                  <DeliveryOptions />
                </div>

                {/* Payment Options */}
                <div className="bg-card rounded-2xl border border-border p-6">
                  <PaymentOptions />
                </div>
              </div>

              {/* Right Column - Order Summary (Sticky) */}
              <div className="lg:col-span-1">
                <div className="sticky top-28">
                  <OrderSummary />
                </div>
              </div>
            </div>
          )}
        </section>
      </div>

      <Footer />
    </div>
  );
};

export default Cart;
