import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Shield, Bell, Eye, Trash2 } from "lucide-react";

export default function TextileCompanySettings() {
  return (
    <div className="space-y-6 max-w-3xl">
      <h2 className="text-2xl font-bold text-foreground">Paramètres</h2>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><Shield className="h-5 w-5" /> Sécurité</CardTitle>
          <CardDescription>Gérez la sécurité de votre compte</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div><Label>Email actuel</Label><Input value="contact@sotexal.dz" readOnly className="mt-1" /></div>
          <div><Label>Nouveau mot de passe</Label><Input type="password" placeholder="••••••••" className="mt-1" /></div>
          <div><Label>Confirmer le mot de passe</Label><Input type="password" placeholder="••••••••" className="mt-1" /></div>
          <Button>Mettre à jour le mot de passe</Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><Bell className="h-5 w-5" /> Notifications</CardTitle>
          <CardDescription>Configurez vos préférences de notification</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {[
            { label: "Nouvelles commandes", desc: "Recevoir une notification pour chaque nouvelle commande" },
            { label: "Demandes de convention", desc: "Être notifié des demandes de collaboration" },
            { label: "Alertes de stock", desc: "Notification quand un produit est en rupture" },
            { label: "Rapports hebdomadaires", desc: "Recevoir un résumé des performances chaque semaine" },
          ].map((item) => (
            <div key={item.label} className="flex items-center justify-between">
              <div><p className="text-sm font-medium text-foreground">{item.label}</p><p className="text-sm text-muted-foreground">{item.desc}</p></div>
              <Switch defaultChecked />
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><Eye className="h-5 w-5" /> Visibilité</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div><p className="text-sm font-medium text-foreground">Profil public</p><p className="text-sm text-muted-foreground">Votre société apparaît dans le répertoire</p></div>
            <Switch defaultChecked />
          </div>
          <div className="flex items-center justify-between">
            <div><p className="text-sm font-medium text-foreground">Afficher les capacités</p><p className="text-sm text-muted-foreground">Montrer les infos de capacité de production</p></div>
            <Switch defaultChecked />
          </div>
        </CardContent>
      </Card>

      <Card className="border-destructive/30">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-destructive"><Trash2 className="h-5 w-5" /> Zone de danger</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground mb-4">La suppression de votre compte est irréversible.</p>
          <Button variant="destructive">Supprimer le compte</Button>
        </CardContent>
      </Card>
    </div>
  );
}
