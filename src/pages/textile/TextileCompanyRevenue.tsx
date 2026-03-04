import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from "recharts";
import { TrendingUp, ArrowUpRight, Building2, DollarSign } from "lucide-react";
import { textileRevenueData, revenueByUnit, textileCompanyKPIs } from "@/data/mockTextileCompanyData";

const COLORS = ["hsl(var(--primary))", "hsl(var(--secondary))", "#f59e0b", "#6b7280"];
const container = { hidden: {}, show: { transition: { staggerChildren: 0.1 } } };
const item = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { duration: 0.4 } } };

export default function TextileCompanyRevenue() {
  const totalRevenue = textileRevenueData.reduce((sum, m) => sum + m.revenue, 0);

  return (
    <motion.div className="space-y-6" variants={container} initial="hidden" animate="show">
      <motion.h2 variants={item} className="text-2xl font-bold text-foreground">Revenus & Finances</motion.h2>

      <motion.div variants={container} className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { label: "Revenu du mois", value: `${(textileCompanyKPIs.monthlyRevenue / 1000000).toFixed(1)}M DA`, icon: TrendingUp, bg: "bg-green-100", iconColor: "text-green-600", extra: <p className="text-xs text-green-600 mt-2 flex items-center gap-1"><ArrowUpRight className="h-3 w-3" /> +6.3% vs mois dernier</p> },
          { label: "Revenu total (6 mois)", value: `${(totalRevenue / 1000000).toFixed(1)}M DA`, icon: DollarSign, bg: "bg-primary/10", iconColor: "text-primary" },
          { label: "Unités contributrices", value: revenueByUnit.length, icon: Building2, bg: "bg-blue-100", iconColor: "text-blue-600" },
        ].map((kpi) => (
          <motion.div key={kpi.label} variants={item} whileHover={{ scale: 1.03 }} transition={{ type: "spring", stiffness: 300 }}>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">{kpi.label}</p>
                    <p className="text-2xl font-bold text-foreground">{kpi.value}</p>
                  </div>
                  <div className={`h-10 w-10 rounded-full ${kpi.bg} flex items-center justify-center`}>
                    <kpi.icon className={`h-5 w-5 ${kpi.iconColor}`} />
                  </div>
                </div>
                {kpi.extra}
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      <motion.div variants={item} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader><CardTitle>Évolution des revenus</CardTitle></CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={textileRevenueData}><CartesianGrid strokeDasharray="3 3" /><XAxis dataKey="month" /><YAxis tickFormatter={(v) => `${(v / 1000000).toFixed(1)}M`} /><Tooltip formatter={(v: number) => `${v.toLocaleString()} DA`} /><Bar dataKey="revenue" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} /></BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle>Répartition par unité</CardTitle></CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart><Pie data={revenueByUnit} dataKey="revenue" nameKey="unitName" cx="50%" cy="50%" outerRadius={90} label={({ percentage }) => `${percentage}%`}>{revenueByUnit.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}</Pie><Legend /><Tooltip formatter={(v: number) => `${v.toLocaleString()} DA`} /></PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
}
