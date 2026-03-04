import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { mockAdminOrders, AdminOrder } from '@/data/mockAdminData';

const statusConfig: Record<string, { label: string; class: string }> = {
  pending: { label: 'En attente', class: 'bg-yellow-100 text-yellow-800' },
  confirmed: { label: 'Confirmée', class: 'bg-blue-100 text-blue-800' },
  production: { label: 'Production', class: 'bg-purple-100 text-purple-800' },
  shipped: { label: 'Expédiée', class: 'bg-indigo-100 text-indigo-800' },
  delivered: { label: 'Livrée', class: 'bg-green-100 text-green-800' },
  cancelled: { label: 'Annulée', class: 'bg-red-100 text-red-800' },
};

const paymentStatusConfig: Record<string, { label: string; class: string }> = {
  paid: { label: 'Payé', class: 'bg-green-100 text-green-800' },
  pending: { label: 'En attente', class: 'bg-yellow-100 text-yellow-800' },
  overdue: { label: 'En retard', class: 'bg-red-100 text-red-800' },
  refunded: { label: 'Remboursé', class: 'bg-gray-100 text-gray-800' },
};

const allStatuses = ['pending', 'confirmed', 'production', 'shipped', 'delivered', 'cancelled'] as const;

export default function AdminOrders() {
  const { toast } = useToast();
  const [orders, setOrders] = useState(mockAdminOrders);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const filtered = orders.filter(o => {
    const q = search.toLowerCase();
    const matchSearch = o.orderNumber.toLowerCase().includes(q) || o.clientName.toLowerCase().includes(q);
    const matchStatus = statusFilter === 'all' || o.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const changeStatus = (id: string, status: AdminOrder['status']) => {
    setOrders(prev => prev.map(o => o.id === id ? { ...o, status } : o));
    toast({ title: `Commande mise à jour : ${statusConfig[status].label}` });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-heading font-bold text-foreground">Gestion des Commandes</h1>
        <p className="text-muted-foreground text-sm">{orders.length} commandes</p>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Rechercher..." value={search} onChange={e => setSearch(e.target.value)} className="pl-10" />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-full sm:w-48"><Filter className="mr-2 h-4 w-4" /><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tous les statuts</SelectItem>
            {allStatuses.map(s => <SelectItem key={s} value={s}>{statusConfig[s].label}</SelectItem>)}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-3">
        {filtered.map((order, i) => (
          <motion.div key={order.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.03 }}>
            <Card>
              <CardContent className="p-4">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-mono text-sm font-medium text-foreground">{order.orderNumber}</span>
                      <Badge className={statusConfig[order.status].class}>{statusConfig[order.status].label}</Badge>
                      <Badge className={paymentStatusConfig[order.paymentStatus].class}>{paymentStatusConfig[order.paymentStatus].label}</Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">{order.clientName} • {order.clientEmail}</p>
                    <p className="text-xs text-muted-foreground">{new Date(order.date).toLocaleDateString('fr-FR')} • {order.itemsCount} articles • {order.paymentMethod}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <p className="text-lg font-bold text-foreground">{order.total.toLocaleString('fr-DZ')} DA</p>
                    <Select value={order.status} onValueChange={(v) => changeStatus(order.id, v as AdminOrder['status'])}>
                      <SelectTrigger className="w-36 h-8 text-xs"><SelectValue /></SelectTrigger>
                      <SelectContent>
                        {allStatuses.map(s => <SelectItem key={s} value={s}>{statusConfig[s].label}</SelectItem>)}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
