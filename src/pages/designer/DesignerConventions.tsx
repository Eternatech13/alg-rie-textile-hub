import { motion } from 'framer-motion';
import { Handshake, ArrowUpRight, Calendar, TrendingUp, Package } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { mockConventions } from '@/data/mockDesignerData';

const statusConfig: Record<string, { label: string; class: string }> = {
  pending: { label: 'En attente', class: 'bg-yellow-100 text-yellow-800' },
  active: { label: 'Active', class: 'bg-green-100 text-green-800' },
  completed: { label: 'Terminée', class: 'bg-muted/30 text-muted-foreground' },
  rejected: { label: 'Rejetée', class: 'bg-red-100 text-red-800' },
};

export default function DesignerConventions() {
  const active = mockConventions.filter(c => c.status === 'active');
  const others = mockConventions.filter(c => c.status !== 'active');

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-heading font-bold text-foreground">Mes Conventions</h1>
        <p className="text-muted-foreground text-sm">{mockConventions.length} conventions au total</p>
      </div>

      {/* Active conventions */}
      {active.length > 0 && (
        <div>
          <h2 className="text-lg font-heading font-semibold mb-3 flex items-center gap-2">
            <Handshake className="h-5 w-5 text-primary" /> Conventions actives
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {active.map((conv, i) => (
              <motion.div key={conv.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
                <Card className="border-primary/20 bg-primary/5 card-hover">
                  <CardContent className="p-5">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <img src={conv.companyLogo} alt={conv.companyName} className="w-12 h-12 rounded-xl object-cover bg-muted" />
                        <div>
                          <h3 className="font-semibold text-foreground">{conv.companyName}</h3>
                          <Badge className={statusConfig[conv.status].class}>{statusConfig[conv.status].label}</Badge>
                        </div>
                      </div>
                      <Button size="icon" variant="ghost"><ArrowUpRight className="h-4 w-4" /></Button>
                    </div>
                    <p className="text-sm text-muted-foreground mt-3">{conv.description}</p>
                    <div className="grid grid-cols-3 gap-4 mt-4">
                      <div className="text-center p-2 rounded-lg bg-background">
                        <TrendingUp className="h-4 w-4 mx-auto text-primary mb-1" />
                        <p className="text-sm font-bold text-foreground">{conv.percentage}%</p>
                        <p className="text-xs text-muted-foreground">Commission</p>
                      </div>
                      <div className="text-center p-2 rounded-lg bg-background">
                        <Package className="h-4 w-4 mx-auto text-accent mb-1" />
                        <p className="text-sm font-bold text-foreground">{conv.productsCount}</p>
                        <p className="text-xs text-muted-foreground">Produits</p>
                      </div>
                      <div className="text-center p-2 rounded-lg bg-background">
                        <Calendar className="h-4 w-4 mx-auto text-secondary mb-1" />
                        <p className="text-sm font-bold text-foreground">{new Date(conv.startDate).toLocaleDateString('fr-FR', { month: 'short', year: 'numeric' })}</p>
                        <p className="text-xs text-muted-foreground">Début</p>
                      </div>
                    </div>
                    <div className="mt-4 p-3 rounded-lg bg-background border border-border">
                      <p className="text-xs text-muted-foreground">Revenu total</p>
                      <p className="text-lg font-bold text-primary">{conv.totalRevenue.toLocaleString('fr-DZ')} DA</p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* Other conventions */}
      {others.length > 0 && (
        <div>
          <h2 className="text-lg font-heading font-semibold mb-3">Autres conventions</h2>
          <div className="space-y-3">
            {others.map((conv, i) => (
              <motion.div key={conv.id} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }}>
                <Card className="card-hover">
                  <CardContent className="p-4 flex items-center gap-4">
                    <img src={conv.companyLogo} alt={conv.companyName} className="w-12 h-12 rounded-xl object-cover bg-muted shrink-0" />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <h3 className="font-medium text-foreground truncate">{conv.companyName}</h3>
                        <Badge className={statusConfig[conv.status].class}>{statusConfig[conv.status].label}</Badge>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1 truncate">{conv.description}</p>
                    </div>
                    <div className="text-right shrink-0 hidden sm:block">
                      <p className="font-bold text-foreground">{conv.percentage}%</p>
                      <p className="text-xs text-muted-foreground">{conv.productsCount} produits</p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
