import { motion } from 'framer-motion';
import { CheckCircle, Package, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export default function OrderConfirmation() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="pt-32 pb-20 section-container">
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="max-w-2xl mx-auto text-center">
          <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-green-100 flex items-center justify-center">
            <CheckCircle className="w-10 h-10 text-green-600" />
          </div>
          <h1 className="font-heading text-3xl font-bold text-foreground mb-3">Commande confirmée !</h1>
          <p className="text-muted-foreground mb-2">Merci pour votre achat sur Sallate Bladi.</p>
          <p className="text-sm text-muted-foreground mb-8">Numéro de commande : <strong className="text-foreground">CMD-2026-0523</strong></p>
          <Card className="text-left mb-8">
            <CardContent className="p-6 space-y-3">
              <div className="flex justify-between text-sm"><span className="text-muted-foreground">Livraison estimée</span><span className="text-foreground">12 Mars 2026</span></div>
              <div className="flex justify-between text-sm"><span className="text-muted-foreground">Mode de paiement</span><span className="text-foreground">Paiement intégral</span></div>
              <div className="flex justify-between text-sm"><span className="text-muted-foreground">Total</span><span className="font-bold text-primary">6 500 DA</span></div>
            </CardContent>
          </Card>
          <div className="flex gap-3 justify-center">
            <Link to="/mon-compte/commandes"><Button className="bg-primary hover:bg-primary/90"><Package className="mr-2 h-4 w-4" /> Suivre ma commande</Button></Link>
            <Link to="/catalogue"><Button variant="outline">Continuer mes achats <ArrowRight className="ml-2 h-4 w-4" /></Button></Link>
          </div>
        </motion.div>
      </div>
      <Footer />
    </div>
  );
}
