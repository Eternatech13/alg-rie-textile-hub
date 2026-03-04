import { motion } from 'framer-motion';
import { CreditCard, CheckCircle, Clock, AlertTriangle, Building2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { mockClientPayments } from '@/data/mockClientData';

const methodLabels: Record<string, string> = {
  full: 'Paiement intégral',
  installment: 'Facilité paiement',
  company: 'Paiement société',
};

const statusConfig: Record<string, { label: string; class: string; icon: typeof CheckCircle }> = {
  paid: { label: 'Payé', class: 'bg-green-100 text-green-800', icon: CheckCircle },
  pending: { label: 'En attente', class: 'bg-yellow-100 text-yellow-800', icon: Clock },
  overdue: { label: 'En retard', class: 'bg-red-100 text-red-800', icon: AlertTriangle },
};

export default function ClientPayments() {
  const totalPaid = mockClientPayments.filter(p => p.status === 'paid').reduce((s, p) => s + p.amount, 0);
  const totalPending = mockClientPayments.filter(p => p.status === 'pending').reduce((s, p) => s + p.amount, 0);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-heading font-bold text-foreground">Mes Paiements</h1>
        <p className="text-muted-foreground text-sm">Historique et suivi de vos paiements</p>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { label: 'Total payé', value: totalPaid, icon: CheckCircle, color: 'text-green-600 bg-green-100' },
          { label: 'En attente', value: totalPending, icon: Clock, color: 'text-accent bg-accent/10' },
          { label: 'Paiements', value: mockClientPayments.length, icon: CreditCard, color: 'text-primary bg-primary/10', suffix: '' },
        ].map((stat, i) => (
          <motion.div key={stat.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
            <Card>
              <CardContent className="p-5 flex items-center gap-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${stat.color}`}>
                  <stat.icon className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">{stat.label}</p>
                  <p className="text-xl font-bold text-foreground">
                    {typeof stat.value === 'number' && stat.suffix !== '' ? `${stat.value.toLocaleString('fr-DZ')} DA` : stat.value}
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Payments list */}
      <div className="space-y-4">
        {mockClientPayments.map((payment, i) => {
          const config = statusConfig[payment.status];
          const StatusIcon = config.icon;
          return (
            <motion.div key={payment.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
              <Card className="card-hover">
                <CardContent className="p-5">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${config.class}`}>
                        <StatusIcon className="h-5 w-5" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-sm text-foreground">{payment.orderNumber}</span>
                          <Badge className={config.class}>{config.label}</Badge>
                        </div>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge variant="outline" className="text-xs">{methodLabels[payment.method]}</Badge>
                          {payment.companyName && (
                            <span className="text-xs text-muted-foreground flex items-center gap-1">
                              <Building2 className="h-3 w-3" /> {payment.companyName}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold text-foreground">{payment.amount.toLocaleString('fr-DZ')} DA</p>
                      <p className="text-xs text-muted-foreground">{new Date(payment.date).toLocaleDateString('fr-FR')}</p>
                    </div>
                  </div>

                  {/* Installment details */}
                  {payment.installmentDetails && (
                    <div className="mt-4 p-4 rounded-xl bg-primary/5 border border-primary/20">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-foreground">Échéancier</span>
                        <span className="text-sm text-primary font-medium">
                          {payment.installmentDetails.paidMonths}/{payment.installmentDetails.totalMonths} mensualités
                        </span>
                      </div>
                      <Progress value={(payment.installmentDetails.paidMonths / payment.installmentDetails.totalMonths) * 100} className="h-2 mb-3" />
                      <div className="grid grid-cols-3 gap-2 text-xs">
                        <div>
                          <span className="text-muted-foreground">Mensualité</span>
                          <p className="font-medium text-foreground">{payment.installmentDetails.monthlyAmount.toLocaleString('fr-DZ')} DA</p>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Payé</span>
                          <p className="font-medium text-green-600">{(payment.installmentDetails.paidMonths * payment.installmentDetails.monthlyAmount).toLocaleString('fr-DZ')} DA</p>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Prochaine échéance</span>
                          <p className="font-medium text-foreground">{new Date(payment.installmentDetails.nextDueDate).toLocaleDateString('fr-FR')}</p>
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
