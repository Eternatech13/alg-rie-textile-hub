import { useState } from 'react';
import { Bell, Eye, Shield, Moon, Globe } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/useAuth';

export default function ClientSettings() {
  const { toast } = useToast();
  const { user } = useAuth();

  const [settings, setSettings] = useState({
    emailNotifs: true,
    orderNotifs: true,
    promoNotifs: true,
    paymentNotifs: true,
    language: 'fr',
  });

  const toggle = (key: keyof typeof settings) => setSettings(prev => ({ ...prev, [key]: !prev[key] }));

  const handleSave = () => {
    toast({ title: 'Paramètres enregistrés' });
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-heading font-bold text-foreground">Paramètres</h1>
        <p className="text-muted-foreground text-sm">Gérez vos préférences</p>
      </div>

      <Card>
        <CardHeader><CardTitle className="flex items-center gap-2"><Bell className="h-5 w-5" /> Notifications</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          {[
            { key: 'emailNotifs' as const, label: 'Notifications par email' },
            { key: 'orderNotifs' as const, label: 'Mises à jour commandes' },
            { key: 'paymentNotifs' as const, label: 'Rappels paiement' },
            { key: 'promoNotifs' as const, label: 'Promotions et nouveautés' },
          ].map(item => (
            <div key={item.key} className="flex items-center justify-between">
              <Label>{item.label}</Label>
              <Switch checked={settings[item.key] as boolean} onCheckedChange={() => toggle(item.key)} />
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle className="flex items-center gap-2"><Shield className="h-5 w-5" /> Sécurité</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label>Email du compte</Label>
            <Input value={user?.email || ''} disabled className="mt-1 bg-muted/20" />
          </div>
          <Button variant="outline">Changer le mot de passe</Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle className="flex items-center gap-2"><Globe className="h-5 w-5" /> Langue</CardTitle></CardHeader>
        <CardContent>
          <Select value={settings.language} onValueChange={v => setSettings(prev => ({ ...prev, language: v }))}>
            <SelectTrigger className="w-48"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="fr">Français</SelectItem>
              <SelectItem value="ar">العربية</SelectItem>
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button onClick={handleSave} className="bg-primary hover:bg-primary/90">Enregistrer</Button>
      </div>
    </div>
  );
}
