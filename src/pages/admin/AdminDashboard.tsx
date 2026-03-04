import { motion } from 'framer-motion';
import { DollarSign, ShoppingCart, Users, Package, AlertTriangle, TrendingUp, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { adminKPIs, revenueByMonth, ordersByCategory, mockAdminOrders, mockAdminDesigners, mockAdminUsers } from '@/data/mockAdminData';

const COLORS = ['hsl(183,50%,37%)', 'hsl(30,52%,57%)', 'hsl(190,22%,67%)', 'hsl(0,84%,60%)'];

const kpiCards = [
  { title: 'Chiffre d\'affaires', value: `${(adminKPIs.totalRevenue / 1000).toFixed(0)}K DA`, growth: adminKPIs.revenueGrowth, icon: DollarSign, color: 'text-primary' },
  { title: 'Commandes', value: adminKPIs.totalOrders, growth: adminKPIs.ordersGrowth, icon: ShoppingCart, color: 'text-accent' },
  { title: 'Utilisateurs', value: adminKPIs.totalUsers, growth: adminKPIs.usersGrowth, icon: Users, color: 'text-secondary' },
  { title: 'Produits actifs', value: adminKPIs.activeProducts, growth: adminKPIs.productsGrowth, icon: Package, color: 'text-primary' },
];

export default function AdminDashboard() {
  const pendingTotal = adminKPIs.pendingCCP + adminKPIs.pendingDesigners + adminKPIs.pendingCompanies;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-heading font-bold text-foreground">Dashboard</h1>
          <p className="text-muted-foreground text-sm">Vue d'ensemble de la plateforme</p>
        </div>
        {pendingTotal > 0 && (
          <Badge variant="destructive" className="text-sm px-3 py-1">
            <AlertTriangle className="w-4 h-4 mr-1" /> {pendingTotal} action{pendingTotal > 1 ? 's' : ''} en attente
          </Badge>
        )}
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpiCards.map((kpi, i) => (
          <motion.div key={kpi.title} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
            <Card>
              <CardContent className="p-5">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm text-muted-foreground">{kpi.title}</span>
                  <kpi.icon className={`h-5 w-5 ${kpi.color}`} />
                </div>
                <p className="text-2xl font-heading font-bold text-foreground">{kpi.value}</p>
                <div className="flex items-center gap-1 mt-1">
                  {kpi.growth > 0 ? (
                    <ArrowUpRight className="w-4 h-4 text-green-600" />
                  ) : (
                    <ArrowDownRight className="w-4 h-4 text-destructive" />
                  )}
                  <span className={`text-sm font-medium ${kpi.growth > 0 ? 'text-green-600' : 'text-destructive'}`}>
                    {kpi.growth > 0 ? '+' : ''}{kpi.growth}%
                  </span>
                  <span className="text-xs text-muted-foreground">vs mois dernier</span>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Alerts */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { label: 'CCP à valider', count: adminKPIs.pendingCCP, color: 'bg-yellow-100 text-yellow-800' },
          { label: 'Candidatures designers', count: adminKPIs.pendingDesigners, color: 'bg-blue-100 text-blue-800' },
          { label: 'Paiements en retard', count: adminKPIs.overduePayments, color: 'bg-red-100 text-red-800' },
        ].map(alert => (
          <Card key={alert.label}>
            <CardContent className="p-4 flex items-center gap-3">
              <Badge className={alert.color}>{alert.count}</Badge>
              <span className="text-sm font-medium text-foreground">{alert.label}</span>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader><CardTitle>Revenus mensuels</CardTitle></CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={revenueByMonth}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                <XAxis dataKey="month" className="text-xs" />
                <YAxis className="text-xs" tickFormatter={v => `${(v/1000).toFixed(0)}K`} />
                <Tooltip formatter={(v: number) => `${v.toLocaleString('fr-DZ')} DA`} />
                <Bar dataKey="revenue" fill="hsl(183,50%,37%)" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle>Par catégorie</CardTitle></CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie data={ordersByCategory} dataKey="count" nameKey="category" cx="50%" cy="50%" outerRadius={100} label={({ category, percent }) => `${category} ${(percent * 100).toFixed(0)}%`}>
                  {ordersByCategory.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Recent activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader><CardTitle>Dernières commandes</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            {mockAdminOrders.slice(0, 5).map(order => (
              <div key={order.id} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                <div>
                  <p className="text-sm font-medium text-foreground">{order.orderNumber}</p>
                  <p className="text-xs text-muted-foreground">{order.clientName}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-foreground">{order.total.toLocaleString('fr-DZ')} DA</p>
                  <Badge variant="outline" className="text-xs">{order.status}</Badge>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle>Inscriptions récentes</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            {mockAdminUsers.slice(0, 5).map(user => (
              <div key={user.id} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                <div>
                  <p className="text-sm font-medium text-foreground">{user.firstName} {user.lastName}</p>
                  <p className="text-xs text-muted-foreground">{user.email}</p>
                </div>
                <Badge className={user.ccpValidated ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}>
                  {user.ccpValidated ? 'CCP Validé' : 'En attente'}
                </Badge>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
