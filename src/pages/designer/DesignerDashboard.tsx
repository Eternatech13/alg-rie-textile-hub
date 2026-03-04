import { motion } from 'framer-motion';
import { Palette, Handshake, ShoppingBag, DollarSign, TrendingUp, Clock, ArrowUpRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { mockDesignerStats, mockDesignerOrders, mockNotifications, mockMonthlyRevenue } from '@/data/mockDesignerData';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const statCards = [
  { label: 'Designs Approuvés', value: mockDesignerStats.approvedDesigns, total: mockDesignerStats.totalDesigns, icon: Palette, color: 'bg-primary/10 text-primary', link: '/designer/designs' },
  { label: 'Conventions Actives', value: mockDesignerStats.activeConventions, icon: Handshake, color: 'bg-accent/10 text-accent', link: '/designer/conventions' },
  { label: 'Commandes', value: mockDesignerStats.totalOrders, icon: ShoppingBag, color: 'bg-secondary/20 text-primary', link: '/designer/commandes' },
  { label: 'Revenu Total', value: `${(mockDesignerStats.totalRevenue).toLocaleString('fr-DZ')} DA`, icon: DollarSign, color: 'bg-green-100 text-green-700', link: '/designer/revenus' },
];

const statusColors: Record<string, string> = {
  pending: 'bg-yellow-100 text-yellow-800',
  production: 'bg-blue-100 text-blue-800',
  shipped: 'bg-purple-100 text-purple-800',
  delivered: 'bg-green-100 text-green-800',
  cancelled: 'bg-red-100 text-red-800',
};

const statusLabels: Record<string, string> = {
  pending: 'En attente',
  production: 'En production',
  shipped: 'Expédiée',
  delivered: 'Livrée',
  cancelled: 'Annulée',
};

export default function DesignerDashboard() {
  const recentOrders = mockDesignerOrders.slice(0, 3);
  const unreadNotifs = mockNotifications.filter(n => !n.read);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-heading font-bold text-foreground">Tableau de bord</h1>
          <p className="text-muted-foreground text-sm">Bienvenue dans votre espace designer</p>
        </div>
        <Link to="/designer/designs/nouveau">
          <Button className="bg-primary hover:bg-primary/90">
            <Palette className="mr-2 h-4 w-4" /> Nouveau Design
          </Button>
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((stat, i) => (
          <motion.div key={stat.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
            <Link to={stat.link}>
              <Card className="card-hover cursor-pointer group">
                <CardContent className="p-5">
                  <div className="flex items-center justify-between">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${stat.color}`}>
                      <stat.icon className="h-5 w-5" />
                    </div>
                    <ArrowUpRight className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <div className="mt-3">
                    <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {stat.label}
                      {stat.total && <span className="text-muted"> / {stat.total} total</span>}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </Link>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Revenue chart */}
        <Card className="lg:col-span-2">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base font-heading">Revenus mensuels</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </div>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={mockMonthlyRevenue}>
                <XAxis dataKey="month" tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 12 }} axisLine={false} tickLine={false} tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`} />
                <Tooltip formatter={(value: number) => [`${value.toLocaleString('fr-DZ')} DA`, 'Revenu']} />
                <Bar dataKey="revenue" fill="hsl(183 50% 37%)" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Notifications */}
        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base font-heading">Notifications</CardTitle>
              <Link to="/designer/notifications">
                <Button variant="ghost" size="sm" className="text-xs">Tout voir</Button>
              </Link>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            {unreadNotifs.length === 0 ? (
              <p className="text-sm text-muted-foreground text-center py-4">Aucune notification</p>
            ) : (
              unreadNotifs.map(n => (
                <Link key={n.id} to={n.link || '#'}>
                  <div className="p-3 rounded-lg bg-primary/5 hover:bg-primary/10 transition-colors cursor-pointer">
                    <p className="text-sm font-medium text-foreground">{n.title}</p>
                    <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{n.message}</p>
                    <p className="text-xs text-muted-foreground/60 mt-1">{new Date(n.date).toLocaleDateString('fr-FR')}</p>
                  </div>
                </Link>
              ))
            )}
          </CardContent>
        </Card>
      </div>

      {/* Recent orders */}
      <Card>
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <CardTitle className="text-base font-heading">Commandes récentes</CardTitle>
            <Link to="/designer/commandes">
              <Button variant="ghost" size="sm" className="text-xs">Tout voir</Button>
            </Link>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border text-left">
                  <th className="pb-2 font-medium text-muted-foreground">Commande</th>
                  <th className="pb-2 font-medium text-muted-foreground hidden sm:table-cell">Design</th>
                  <th className="pb-2 font-medium text-muted-foreground hidden md:table-cell">Client</th>
                  <th className="pb-2 font-medium text-muted-foreground">Revenu</th>
                  <th className="pb-2 font-medium text-muted-foreground">Statut</th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.map(order => (
                  <tr key={order.id} className="border-b border-border/50 last:border-0">
                    <td className="py-3 font-mono text-xs">{order.orderNumber}</td>
                    <td className="py-3 hidden sm:table-cell">{order.designName}</td>
                    <td className="py-3 hidden md:table-cell text-muted-foreground">{order.clientName}</td>
                    <td className="py-3 font-medium">{order.designerRevenue.toLocaleString('fr-DZ')} DA</td>
                    <td className="py-3">
                      <Badge variant="secondary" className={statusColors[order.status]}>
                        {statusLabels[order.status]}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Quick info */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Card className="border-accent/30 bg-accent/5">
          <CardContent className="p-5 flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-accent/20 flex items-center justify-center shrink-0">
              <Clock className="h-6 w-6 text-accent" />
            </div>
            <div>
              <p className="text-sm font-medium text-foreground">Paiements en attente</p>
              <p className="text-xl font-bold text-accent">{mockDesignerStats.pendingPayments.toLocaleString('fr-DZ')} DA</p>
            </div>
          </CardContent>
        </Card>
        <Card className="border-primary/30 bg-primary/5">
          <CardContent className="p-5 flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center shrink-0">
              <TrendingUp className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="text-sm font-medium text-foreground">Revenu ce mois</p>
              <p className="text-xl font-bold text-primary">{mockDesignerStats.monthlyRevenue.toLocaleString('fr-DZ')} DA</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
