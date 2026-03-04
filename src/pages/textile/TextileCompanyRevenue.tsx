import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from "recharts";
import { TrendingUp, ArrowUpRight, Building2, DollarSign } from "lucide-react";
import { textileRevenueData, revenueByUnit, textileCompanyKPIs } from "@/data/mockTextileCompanyData";

const COLORS = ["hsl(var(--primary))", "hsl(var(--secondary))", "#f59e0b", "#6b7280"];

export default function TextileCompanyRevenue() {
  const totalRevenue = textileRevenueData.reduce((sum, m) => sum + m.revenue, 0);

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-foreground">Revenus & Finances</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Revenu du mois</p>
                <p className="text-2xl font-bold text-foreground">{(textileCompanyKPIs.monthlyRevenue / 1000000).toFixed(1)}M DA</p>
              </div>
              <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
                <TrendingUp className="h-5 w-5 text-green-600" />
              </div>
            </div>
            <p className="text-xs text-green-600 mt-2 flex items-center gap-1">
              <ArrowUpRight className="h-3 w-3" /> +6.3% vs mois dernier
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Revenu total (6 mois)</p>
                <p className="text-2xl font-bold text-foreground">{(totalRevenue / 1000000).toFixed(1)}M DA</p>
              </div>
              <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                <DollarSign className="h-5 w-5 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Unités contributrices</p>
                <p className="text-2xl font-bold text-foreground">{revenueByUnit.length}</p>
              </div>
              <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                <Building2 className="h-5 w-5 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader><CardTitle>Évolution des revenus</CardTitle></CardHeader>
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
          <CardHeader><CardTitle>Répartition par unité</CardTitle></CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie data={revenueByUnit} dataKey="revenue" nameKey="unitName" cx="50%" cy="50%" outerRadius={90} label={({ percentage }) => `${percentage}%`}>
                  {revenueByUnit.map((_, i) => (
                    <Cell key={i} fill={COLORS[i % COLORS.length]} />
                  ))}
                </Pie>
                <Legend />
                <Tooltip formatter={(v: number) => `${v.toLocaleString()} DA`} />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
