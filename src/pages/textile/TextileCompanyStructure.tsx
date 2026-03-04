import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Building2, MapPin, Users, Package, ShoppingCart, Plus, Edit, Power } from "lucide-react";
import { textileCompanyInfo, productionUnits } from "@/data/mockTextileCompanyData";

export default function TextileCompanyStructure() {
  const [units, setUnits] = useState(productionUnits);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-foreground">Structure & Unités de production</h2>
        <Button><Plus className="mr-2 h-4 w-4" /> Ajouter une unité</Button>
      </div>

      {/* Company Overview */}
      <Card className="border-primary/20 bg-primary/5">
        <CardContent className="pt-6">
          <div className="flex items-start gap-4">
            <div className="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
              <Building2 className="w-8 h-8 text-primary" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-xl font-bold text-foreground">{textileCompanyInfo.name}</h3>
              <p className="text-sm text-muted-foreground mb-2">{textileCompanyInfo.type === "public" ? "Entreprise publique" : "Entreprise privée"} · Fondée en {textileCompanyInfo.foundedYear}</p>
              <div className="flex flex-wrap gap-2">
                {textileCompanyInfo.domains.map((d) => (
                  <Badge key={d} variant="secondary">{d}</Badge>
                ))}
              </div>
              <div className="flex gap-6 mt-3 text-sm text-muted-foreground">
                <span className="flex items-center gap-1"><MapPin className="h-4 w-4" />{textileCompanyInfo.wilaya}</span>
                <span className="flex items-center gap-1"><Users className="h-4 w-4" />{textileCompanyInfo.employeeCount} employés</span>
                <span className="flex items-center gap-1"><Building2 className="h-4 w-4" />{units.length} unités</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Units Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {units.map((unit) => {
          const loadPercent = Math.round((unit.currentLoad / unit.monthlyCapacity) * 100);
          return (
            <Card key={unit.id} className={unit.status === "inactive" ? "opacity-60" : ""}>
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-base">{unit.name}</CardTitle>
                    <p className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
                      <MapPin className="h-3 w-3" /> {unit.wilaya}
                    </p>
                  </div>
                  <div className="flex gap-1">
                    <Button variant="ghost" size="icon" className="h-8 w-8"><Edit className="h-4 w-4" /></Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8"><Power className="h-4 w-4" /></Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Badge variant="outline">{unit.specialty}</Badge>
                  <Badge variant={unit.status === "active" ? "default" : "secondary"} className="ml-2">
                    {unit.status === "active" ? "Actif" : "Inactif"}
                  </Badge>
                </div>

                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-muted-foreground">Capacité utilisée</span>
                    <span className="font-medium text-foreground">{loadPercent}%</span>
                  </div>
                  <Progress value={loadPercent} className="h-2" />
                  <p className="text-xs text-muted-foreground mt-1">
                    {unit.currentLoad.toLocaleString()} / {unit.monthlyCapacity.toLocaleString()} unités/mois
                  </p>
                </div>

                <div className="grid grid-cols-3 gap-3 pt-2 border-t border-border">
                  <div className="text-center">
                    <p className="text-lg font-bold text-foreground">{unit.employeeCount}</p>
                    <p className="text-xs text-muted-foreground">Employés</p>
                  </div>
                  <div className="text-center">
                    <p className="text-lg font-bold text-foreground">{unit.productsCount}</p>
                    <p className="text-xs text-muted-foreground">Produits</p>
                  </div>
                  <div className="text-center">
                    <p className="text-lg font-bold text-foreground">{unit.ordersCount}</p>
                    <p className="text-xs text-muted-foreground">Commandes</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
