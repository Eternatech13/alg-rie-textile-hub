import { useState } from 'react';
import { Save } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';

export default function AdminSettings() {
  const { toast } = useToast();
  const [settings, setSettings] = useState({
    standardDelivery: 500,
    expressDelivery: 1200,
    pickupDelivery: 300,
    maxInstallmentAmount: 30000,
    monthlyDeduction: 5000,
    freeDeliveryThreshold: 15000,
    maintenanceMode: false,
    autoApproveReviews: false,
    emailNotifications: true,
  });

  const update = (key: string, value: number | boolean) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const handleSave = () => {
    toast({ title: 'Paramètres sauvegardés', description: 'Les modifications ont été enregistrées.' });
  };

  return (
    <div className="space-y-6 max-w-3xl">
      <h1 className="text-2xl font-heading font-bold text-foreground">Paramètres Plateforme</h1>

      <Card>
        <CardHeader><CardTitle>Livraison</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div><Label>Standard (DA)</Label><Input type="number" value={settings.standardDelivery} onChange={e => update('standardDelivery', Number(e.target.value))} /></div>
            <div><Label>Express (DA)</Label><Input type="number" value={settings.expressDelivery} onChange={e => update('expressDelivery', Number(e.target.value))} /></div>
            <div><Label>Point relais (DA)</Label><Input type="number" value={settings.pickupDelivery} onChange={e => update('pickupDelivery', Number(e.target.value))} /></div>
          </div>
          <div><Label>Seuil livraison gratuite (DA)</Label><Input type="number" value={settings.freeDeliveryThreshold} onChange={e => update('freeDeliveryThreshold', Number(e.target.value))} /></div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle>Facilité de Paiement</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div><Label>Plafond facilité (DA)</Label><Input type="number" value={settings.maxInstallmentAmount} onChange={e => update('maxInstallmentAmount', Number(e.target.value))} /></div>
            <div><Label>Mensualité CCP (DA)</Label><Input type="number" value={settings.monthlyDeduction} onChange={e => update('monthlyDeduction', Number(e.target.value))} /></div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle>Système</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div><p className="font-medium text-foreground">Mode maintenance</p><p className="text-xs text-muted-foreground">Désactive l'accès au site pour les utilisateurs</p></div>
            <Switch checked={settings.maintenanceMode} onCheckedChange={v => update('maintenanceMode', v)} />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div><p className="font-medium text-foreground">Approbation auto des avis</p><p className="text-xs text-muted-foreground">Les avis sont publiés sans modération</p></div>
            <Switch checked={settings.autoApproveReviews} onCheckedChange={v => update('autoApproveReviews', v)} />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div><p className="font-medium text-foreground">Notifications email</p><p className="text-xs text-muted-foreground">Envoyer des emails de notification</p></div>
            <Switch checked={settings.emailNotifications} onCheckedChange={v => update('emailNotifications', v)} />
          </div>
        </CardContent>
      </Card>

      <Button onClick={handleSave} size="lg" className="w-full sm:w-auto">
        <Save className="mr-2 h-4 w-4" /> Sauvegarder les paramètres
      </Button>
    </div>
  );
}
