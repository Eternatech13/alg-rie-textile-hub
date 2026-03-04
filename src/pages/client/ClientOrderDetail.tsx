import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Package, Truck, CheckCircle, Clock, MapPin, CreditCard } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { mockClientOrders } from '@/data/mockClientData';

const statusConfig: Record<string, { label: string; class: string }> = {
  pending: { label: 'En attente', class: 'bg-yellow-100 text-yellow-800' },
  confirmed: { label: 'Confirmée', class: 'bg-blue-100 text-blue-800' },
  production: { label: 'En production', class: 'bg-purple-100 text-purple-800' },
  shipped: { label: 'Expédiée', class: 'bg-indigo-100 text-indigo-800' },
  delivered: { label: 'Livrée', class: 'bg-green-100 text-green-800' },
  cancelled: { label: 'Annulée', class: 'bg-red-100 text-red-800' },
};

const steps = ['pending', 'confirmed', 'production', 'shipped', 'delivered'];

export default function ClientOrderDetail() {
  const { id } = useParams();
  const order = mockClientOrders.find(o => o.id === id);

  if (!order) {
    return (
      <div className="text-center py-16">
        <p className="text-muted-foreground">Commande introuvable</p>
        <Link to="/mon-compte/commandes"><Button variant="outline" className="mt-4">Retour</Button></Link>
      </div>
    );
  }

  const currentStepIndex = steps.indexOf(order.status);

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center gap-4">
        <Link to="/mon-compte/commandes"><Button variant="ghost" size="icon"><ArrowLeft className="h-5 w-5" /></Button></Link>
        <div>
          <h1 className="text-2xl font-heading font-bold text-foreground">{order.orderNumber}</h1>
          <p className="text-muted-foreground text-sm">Commandé le {new Date(order.date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
        </div>
        <Badge className={`ml-auto ${statusConfig[order.status].class}`}>{statusConfig[order.status].label}</Badge>
      </div>

      {/* Progress tracker */}
      {order.status !== 'cancelled' && (
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              {steps.map((step, i) => (
                <div key={step} className="flex items-center flex-1">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium shrink-0 ${
                    i <= currentStepIndex ? 'bg-primary text-primary-foreground' : 'bg-muted/30 text-muted-foreground'
                  }`}>
                    {i <= currentStepIndex ? <CheckCircle className="h-4 w-4" /> : i + 1}
                  </div>
                  {i < steps.length - 1 && (
                    <div className={`flex-1 h-1 mx-2 rounded ${i < currentStepIndex ? 'bg-primary' : 'bg-muted/30'}`} />
                  )}
                </div>
              ))}
            </div>
            <div className="flex justify-between mt-2">
              {['En attente', 'Confirmée', 'Production', 'Expédiée', 'Livrée'].map((label, i) => (
                <span key={label} className={`text-xs ${i <= currentStepIndex ? 'text-primary font-medium' : 'text-muted-foreground'}`}>{label}</span>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Items */}
      <Card>
        <CardHeader><CardTitle>Articles commandés</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          {order.items.map(item => (
            <div key={item.id} className="flex items-center gap-4 p-3 rounded-lg bg-muted/10">
              <img src={item.productImage} alt={item.productName} className="w-16 h-16 rounded-lg object-cover bg-muted shrink-0" />
              <div className="flex-1 min-w-0">
                <h3 className="font-medium text-foreground">{item.productName}</h3>
                <p className="text-xs text-muted-foreground">Designer : {item.designer} • {item.textileCompany}</p>
                <p className="text-xs text-muted-foreground">Taille : {item.size} • Couleur : {item.color}</p>
              </div>
              <div className="text-right shrink-0">
                <p className="font-medium text-foreground">{item.totalPrice.toLocaleString('fr-DZ')} DA</p>
                <p className="text-xs text-muted-foreground">x{item.quantity} × {item.unitPrice.toLocaleString('fr-DZ')} DA</p>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Delivery */}
        <Card>
          <CardHeader><CardTitle className="flex items-center gap-2"><MapPin className="h-5 w-5" /> Livraison</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            <div>
              <p className="text-sm font-medium text-foreground">{order.address.fullName}</p>
              <p className="text-sm text-muted-foreground">{order.address.address}</p>
              <p className="text-sm text-muted-foreground">{order.address.city}, {order.address.wilaya} {order.address.postalCode}</p>
              <p className="text-sm text-muted-foreground">{order.address.phone}</p>
            </div>
            <Separator />
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Méthode</span>
              <span className="text-foreground">{order.deliveryMethod}</span>
            </div>
            {order.trackingNumber && (
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">N° suivi</span>
                <span className="font-mono text-foreground">{order.trackingNumber}</span>
              </div>
            )}
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Livraison estimée</span>
              <span className="text-foreground">{new Date(order.estimatedDelivery).toLocaleDateString('fr-FR')}</span>
            </div>
          </CardContent>
        </Card>

        {/* Payment summary */}
        <Card>
          <CardHeader><CardTitle className="flex items-center gap-2"><CreditCard className="h-5 w-5" /> Paiement</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Sous-total</span>
              <span className="text-foreground">{order.subtotal.toLocaleString('fr-DZ')} DA</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Livraison</span>
              <span className="text-foreground">{order.deliveryCost === 0 ? 'Gratuite' : `${order.deliveryCost.toLocaleString('fr-DZ')} DA`}</span>
            </div>
            {order.discount > 0 && (
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Réduction</span>
                <span className="text-green-600">-{order.discount.toLocaleString('fr-DZ')} DA</span>
              </div>
            )}
            <Separator />
            <div className="flex justify-between text-base font-bold">
              <span className="text-foreground">Total</span>
              <span className="text-primary">{order.total.toLocaleString('fr-DZ')} DA</span>
            </div>
            <Badge variant="outline" className="mt-2">{order.paymentMethod}</Badge>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
