import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { mockDesignerOrders } from '@/data/mockDesignerData';

const statusConfig: Record<string, { label: string; class: string }> = {
  pending: { label: 'En attente', class: 'bg-yellow-100 text-yellow-800' },
  production: { label: 'En production', class: 'bg-blue-100 text-blue-800' },
  shipped: { label: 'Expédiée', class: 'bg-purple-100 text-purple-800' },
  delivered: { label: 'Livrée', class: 'bg-green-100 text-green-800' },
  cancelled: { label: 'Annulée', class: 'bg-red-100 text-red-800' },
};

export default function DesignerOrders() {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const filtered = mockDesignerOrders.filter(o => {
    const matchSearch = o.orderNumber.toLowerCase().includes(search.toLowerCase()) || o.designName.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === 'all' || o.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const totalRevenue = filtered.reduce((sum, o) => sum + o.designerRevenue, 0);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-heading font-bold text-foreground">Mes Commandes</h1>
        <p className="text-muted-foreground text-sm">{mockDesignerOrders.length} commandes • Revenu total : {totalRevenue.toLocaleString('fr-DZ')} DA</p>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Rechercher..." value={search} onChange={e => setSearch(e.target.value)} className="pl-10" />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-full sm:w-48">
            <Filter className="mr-2 h-4 w-4" />
            <SelectValue placeholder="Statut" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tous</SelectItem>
            <SelectItem value="pending">En attente</SelectItem>
            <SelectItem value="production">En production</SelectItem>
            <SelectItem value="shipped">Expédiée</SelectItem>
            <SelectItem value="delivered">Livrée</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-3">
        {filtered.map((order, i) => (
          <motion.div key={order.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
            <Card className="card-hover">
              <CardContent className="p-4">
                <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                  <img src={order.designImage} alt={order.designName} className="w-16 h-16 rounded-lg object-cover bg-muted shrink-0" />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-mono text-xs text-muted-foreground">{order.orderNumber}</span>
                      <Badge className={statusConfig[order.status].class}>{statusConfig[order.status].label}</Badge>
                    </div>
                    <h3 className="font-medium text-foreground mt-1">{order.designName}</h3>
                    <p className="text-xs text-muted-foreground">Client : {order.clientName} • {order.textileCompany}</p>
                  </div>
                  <div className="sm:text-right space-y-1 shrink-0">
                    <p className="text-xs text-muted-foreground">Qté : {order.quantity} × {order.unitPrice.toLocaleString('fr-DZ')} DA</p>
                    <p className="text-sm font-bold text-primary">Revenu : {order.designerRevenue.toLocaleString('fr-DZ')} DA</p>
                    <p className="text-xs text-muted-foreground">{new Date(order.date).toLocaleDateString('fr-FR')}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-16">
          <p className="text-muted-foreground">Aucune commande trouvée</p>
        </div>
      )}
    </div>
  );
}
