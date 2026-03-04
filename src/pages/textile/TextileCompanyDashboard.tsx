import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, Package, TrendingUp, Star, Factory, AlertTriangle } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { textileCompanyKPIs, textileRevenueData, textileOrders, productionUnits } from "@/data/mockTextileCompanyData";

const container = { hidden: {}, show: { transition: { staggerChildren: 0.08 } } };
const item = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" as const } } };

export default function TextileCompanyDashboard() {
  const kpis = [
    { label: "Commandes actives", value: textileCompanyKPIs.activeOrders, icon: ShoppingCart, color: "text-blue-600" },
    { label: "Produits actifs", value: textileCompanyKPIs.activeProducts, icon: Package, color: "text-green-600" },
    { label: "Revenu du mois", value: `${(textileCompanyKPIs.monthlyRevenue / 1000000).toFixed(1)}M DA`, icon: TrendingUp, color: "text-primary" },
    { label: "Satisfaction", value: `${textileCompanyKPIs.satisfactionRate}%`, icon: Star, color: "text-yellow-600" },
  ];

  return (
    <motion.div className="space-y-6" variants={container} initial="hidden" animate="show">
      <motion.h2 variants={item} className="text-2xl font-bold text-foreground">Tableau de bord</motion.h2>

      <motion.div variants={container} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpis.map((kpi) => (
          <motion.div key={kpi.label} variants={item} whileHover={{ scale: 1.03 }} transition={{ type: "spring", stiffness: 300 }}>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">{kpi.label}</p>
                    <p className="text-2xl font-bold text-foreground">{kpi.value}</p>
                  </div>
                  <kpi.icon className={`h-8 w-8 ${kpi.color}`} />
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      <motion.div variants={item} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader><CardTitle>Revenus mensuels</CardTitle></CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={textileRevenueData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis tickFormatter={(v) => `${(v / 1000000).toFixed(1)}M`} />
                <Tooltip formatter={(v: number) => `${v.toLocaleString()} DA`} />
                <Bar dataKey="revenue" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><Factory className="h-5 w-5" /> Unités de production</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {productionUnits.map((unit) => (
              <div key={unit.id} className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-foreground">{unit.name}</p>
                  <p className="text-xs text-muted-foreground">{Math.round((unit.currentLoad / unit.monthlyCapacity) * 100)}% capacité</p>
                </div>
                <Badge variant={unit.status === "active" ? "default" : "secondary"}>
                  {unit.status === "active" ? "Actif" : "Inactif"}
                </Badge>
              </div>
            ))}
          </CardContent>
        </Card>
      </motion.div>

      <motion.div variants={item}>
        <Card>
          <CardHeader><CardTitle>Dernières commandes</CardTitle></CardHeader>
          <CardContent>
            <div className="space-y-3">
              {textileOrders.slice(0, 4).map((order, index) => {
                const statusMap: Record<string, { label: string; variant: "default" | "secondary" | "destructive" | "outline" }> = {
                  pending: { label: "En attente", variant: "outline" },
                  in_production: { label: "En production", variant: "default" },
                  shipped: { label: "Expédiée", variant: "secondary" },
                  delivered: { label: "Livrée", variant: "secondary" },
                };
                const s = statusMap[order.status] || { label: order.status, variant: "outline" as const };
                return (
                  <motion.div
                    key={order.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + index * 0.08 }}
                    className="flex items-center justify-between p-3 rounded-lg bg-muted/30"
                  >
                    <div>
                      <p className="font-medium text-sm text-foreground">{order.id}</p>
                      <p className="text-xs text-muted-foreground">{order.clientName} · {order.unitName}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-sm font-semibold text-foreground">{order.total.toLocaleString()} DA</span>
                      <Badge variant={s.variant}>{s.label}</Badge>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
}
