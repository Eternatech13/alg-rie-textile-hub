import { motion } from 'framer-motion';
import { DollarSign, TrendingUp, Clock, CheckCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { mockRevenueEntries, mockDesignerStats, mockMonthlyRevenue } from '@/data/mockDesignerData';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';

export default function DesignerRevenue() {
  const totalPaid = mockRevenueEntries.filter(r => r.status === 'paid').reduce((s, r) => s + r.amount, 0);
  const totalPending = mockRevenueEntries.filter(r => r.status === 'pending').reduce((s, r) => s + r.amount, 0);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-heading font-bold text-foreground">Mes Revenus</h1>
        <p className="text-muted-foreground text-sm">Suivi de vos paiements et revenus</p>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { label: 'Revenu Total', value: mockDesignerStats.totalRevenue, icon: DollarSign, color: 'text-primary bg-primary/10' },
          { label: 'Payé', value: totalPaid, icon: CheckCircle, color: 'text-green-600 bg-green-100' },
          { label: 'En attente', value: totalPending, icon: Clock, color: 'text-accent bg-accent/10' },
        ].map((stat, i) => (
          <motion.div key={stat.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
            <Card>
              <CardContent className="p-5 flex items-center gap-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${stat.color}`}>
                  <stat.icon className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">{stat.label}</p>
                  <p className="text-xl font-bold text-foreground">{stat.value.toLocaleString('fr-DZ')} DA</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Chart */}
      <Card>
        <CardHeader><CardTitle className="text-base font-heading">Évolution des revenus</CardTitle></CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={280}>
            <LineChart data={mockMonthlyRevenue}>
              <XAxis dataKey="month" tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 12 }} axisLine={false} tickLine={false} tickFormatter={v => `${(v / 1000).toFixed(0)}k`} />
              <Tooltip formatter={(value: number) => [`${value.toLocaleString('fr-DZ')} DA`, 'Revenu']} />
              <Line type="monotone" dataKey="revenue" stroke="hsl(183 50% 37%)" strokeWidth={2.5} dot={{ fill: 'hsl(183 50% 37%)', r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* History */}
      <Card>
        <CardHeader><CardTitle className="text-base font-heading">Historique des paiements</CardTitle></CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border text-left">
                  <th className="pb-2 font-medium text-muted-foreground">Période</th>
                  <th className="pb-2 font-medium text-muted-foreground hidden sm:table-cell">Design</th>
                  <th className="pb-2 font-medium text-muted-foreground hidden md:table-cell">Source</th>
                  <th className="pb-2 font-medium text-muted-foreground">Montant</th>
                  <th className="pb-2 font-medium text-muted-foreground">Statut</th>
                </tr>
              </thead>
              <tbody>
                {mockRevenueEntries.map(entry => (
                  <tr key={entry.id} className="border-b border-border/50 last:border-0">
                    <td className="py-3">{entry.month} {entry.year}</td>
                    <td className="py-3 hidden sm:table-cell text-muted-foreground">{entry.designName}</td>
                    <td className="py-3 hidden md:table-cell">
                      <Badge variant="outline" className="text-xs">{entry.source === 'convention' ? 'Convention' : 'Vente directe'}</Badge>
                    </td>
                    <td className="py-3 font-medium">{entry.amount.toLocaleString('fr-DZ')} DA</td>
                    <td className="py-3">
                      <Badge className={entry.status === 'paid' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}>
                        {entry.status === 'paid' ? 'Payé' : 'En attente'}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
