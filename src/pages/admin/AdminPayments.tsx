import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, RefreshCw } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { mockAdminPayments, AdminPayment } from '@/data/mockAdminData';

const statusConfig: Record<string, { label: string; class: string }> = {
  paid: { label: 'Payé', class: 'bg-green-100 text-green-800' },
  pending: { label: 'En attente', class: 'bg-yellow-100 text-yellow-800' },
  overdue: { label: 'En retard', class: 'bg-red-100 text-red-800' },
  refunded: { label: 'Remboursé', class: 'bg-gray-100 text-gray-800' },
};

const methodLabels: Record<string, string> = {
  full: 'Intégral',
  installment: 'Facilité',
  company: 'Société',
};

export default function AdminPayments() {
  const { toast } = useToast();
  const [payments, setPayments] = useState(mockAdminPayments);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const filtered = payments.filter(p => {
    const q = search.toLowerCase();
    const matchSearch = p.orderNumber.toLowerCase().includes(q) || p.clientName.toLowerCase().includes(q);
    const matchStatus = statusFilter === 'all' || p.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const totalPaid = payments.filter(p => p.status === 'paid').reduce((s, p) => s + p.amount, 0);
  const totalPending = payments.filter(p => p.status === 'pending').reduce((s, p) => s + p.amount, 0);
  const totalOverdue = payments.filter(p => p.status === 'overdue').reduce((s, p) => s + p.amount, 0);

  const markAsPaid = (id: string) => {
    setPayments(prev => prev.map(p => p.id === id ? { ...p, status: 'paid' as const } : p));
    toast({ title: 'Paiement marqué comme payé' });
  };

  const refund = (id: string) => {
    setPayments(prev => prev.map(p => p.id === id ? { ...p, status: 'refunded' as const } : p));
    toast({ title: 'Remboursement effectué' });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-heading font-bold text-foreground">Gestion des Paiements</h1>
        <p className="text-muted-foreground text-sm">{payments.length} paiements</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card><CardContent className="p-4"><p className="text-sm text-muted-foreground">Total payé</p><p className="text-xl font-bold text-green-600">{totalPaid.toLocaleString('fr-DZ')} DA</p></CardContent></Card>
        <Card><CardContent className="p-4"><p className="text-sm text-muted-foreground">En attente</p><p className="text-xl font-bold text-yellow-600">{totalPending.toLocaleString('fr-DZ')} DA</p></CardContent></Card>
        <Card><CardContent className="p-4"><p className="text-sm text-muted-foreground">En retard</p><p className="text-xl font-bold text-destructive">{totalOverdue.toLocaleString('fr-DZ')} DA</p></CardContent></Card>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Rechercher..." value={search} onChange={e => setSearch(e.target.value)} className="pl-10" />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-full sm:w-48"><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tous</SelectItem>
            <SelectItem value="paid">Payés</SelectItem>
            <SelectItem value="pending">En attente</SelectItem>
            <SelectItem value="overdue">En retard</SelectItem>
            <SelectItem value="refunded">Remboursés</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-3">
        {filtered.map((payment, i) => (
          <motion.div key={payment.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.03 }}>
            <Card>
              <CardContent className="p-4 flex flex-col md:flex-row md:items-center justify-between gap-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-mono text-sm text-foreground">{payment.orderNumber}</span>
                    <Badge className={statusConfig[payment.status].class}>{statusConfig[payment.status].label}</Badge>
                    <Badge variant="outline">{methodLabels[payment.method]}</Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {payment.clientName} • {new Date(payment.date).toLocaleDateString('fr-FR')}
                    {payment.companyName && ` • ${payment.companyName}`}
                    {payment.installmentInfo && ` • ${payment.installmentInfo}`}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <p className="text-lg font-bold text-foreground">{payment.amount.toLocaleString('fr-DZ')} DA</p>
                  {(payment.status === 'pending' || payment.status === 'overdue') && (
                    <Button size="sm" onClick={() => markAsPaid(payment.id)} className="bg-green-600 hover:bg-green-700 text-white">Marquer payé</Button>
                  )}
                  {payment.status === 'paid' && (
                    <Button size="sm" variant="outline" onClick={() => refund(payment.id)}>Rembourser</Button>
                  )}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
