import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, Eye, Package, Truck, CheckCircle, Clock, XCircle } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Link } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { mockClientOrders } from '@/data/mockClientData';
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger
} from '@/components/ui/alert-dialog';

const statusConfig: Record<string, { label: string; class: string; icon: typeof Clock }> = {
  pending: { label: 'En attente', class: 'bg-yellow-100 text-yellow-800', icon: Clock },
  confirmed: { label: 'Confirmée', class: 'bg-blue-100 text-blue-800', icon: CheckCircle },
  production: { label: 'En production', class: 'bg-purple-100 text-purple-800', icon: Package },
  shipped: { label: 'Expédiée', class: 'bg-indigo-100 text-indigo-800', icon: Truck },
  delivered: { label: 'Livrée', class: 'bg-green-100 text-green-800', icon: CheckCircle },
  cancelled: { label: 'Annulée', class: 'bg-red-100 text-red-800', icon: XCircle },
};

export default function ClientOrders() {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [orders, setOrders] = useState(mockClientOrders);
  const { toast } = useToast();

  const handleCancel = (orderId: string) => {
    setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status: 'cancelled' as const } : o));
    toast({ title: 'Commande annulée', description: 'Votre commande a été annulée avec succès.' });
  };

  const filtered = orders.filter(o => {
    const matchSearch = o.orderNumber.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === 'all' || o.status === statusFilter;
    return matchSearch && matchStatus;
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-heading font-bold text-foreground">Mes Commandes</h1>
        <p className="text-muted-foreground text-sm">{orders.length} commandes</p>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Rechercher par numéro..." value={search} onChange={e => setSearch(e.target.value)} className="pl-10" />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-full sm:w-48">
            <Filter className="mr-2 h-4 w-4" /><SelectValue placeholder="Statut" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tous les statuts</SelectItem>
            <SelectItem value="pending">En attente</SelectItem>
            <SelectItem value="production">En production</SelectItem>
            <SelectItem value="shipped">Expédiée</SelectItem>
            <SelectItem value="delivered">Livrée</SelectItem>
            <SelectItem value="cancelled">Annulée</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-4">
        {filtered.map((order, i) => {
          const config = statusConfig[order.status];
          const StatusIcon = config.icon;
          const canCancel = order.status === 'pending';
          return (
            <motion.div key={order.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
              <Card className="card-hover">
                <CardContent className="p-5">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${config.class}`}>
                        <StatusIcon className="h-5 w-5" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-sm font-medium text-foreground">{order.orderNumber}</span>
                          <Badge className={config.class}>{config.label}</Badge>
                        </div>
                        <p className="text-xs text-muted-foreground">{new Date(order.date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold text-foreground">{order.total.toLocaleString('fr-DZ')} DA</p>
                      <p className="text-xs text-muted-foreground">{order.paymentMethod}</p>
                    </div>
                  </div>

                  <div className="flex gap-3 overflow-x-auto pb-2">
                    {order.items.map(item => (
                      <div key={item.id} className="flex items-center gap-3 min-w-[200px] p-2 rounded-lg bg-muted/10">
                        <img src={item.productImage} alt={item.productName} className="w-12 h-12 rounded-lg object-cover bg-muted shrink-0" />
                        <div className="min-w-0">
                          <p className="text-sm font-medium text-foreground truncate">{item.productName}</p>
                          <p className="text-xs text-muted-foreground">{item.size} • {item.color} • x{item.quantity}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center justify-between mt-4 pt-3 border-t border-border">
                    <div className="text-xs text-muted-foreground">
                      {order.trackingNumber && <span>Suivi : {order.trackingNumber}</span>}
                      {!order.trackingNumber && order.estimatedDelivery && (
                        <span>Livraison estimée : {new Date(order.estimatedDelivery).toLocaleDateString('fr-FR')}</span>
                      )}
                    </div>
                    <div className="flex gap-2">
                      {canCancel && (
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button variant="outline" size="sm" className="text-destructive border-destructive/30 hover:bg-destructive/10">
                              <XCircle className="mr-1 h-4 w-4" /> Annuler
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Annuler la commande ?</AlertDialogTitle>
                              <AlertDialogDescription>
                                Êtes-vous sûr de vouloir annuler la commande {order.orderNumber} ? Cette action est irréversible.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Non, garder</AlertDialogCancel>
                              <AlertDialogAction onClick={() => handleCancel(order.id)} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
                                Oui, annuler
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      )}
                      <Link to={`/mon-compte/commandes/${order.id}`}>
                        <Button variant="outline" size="sm"><Eye className="mr-1 h-4 w-4" /> Détails</Button>
                      </Link>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-16">
          <Package className="h-12 w-12 mx-auto text-muted-foreground mb-3" />
          <p className="text-muted-foreground">Aucune commande trouvée</p>
        </div>
      )}
    </div>
  );
}
