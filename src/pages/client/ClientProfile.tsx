import { useState } from 'react';
import { Camera, Save, Shield, CheckCircle, Clock } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';

export default function ClientProfile() {
  const { profile, user } = useAuth();
  const { toast } = useToast();

  const [form, setForm] = useState({
    firstName: profile?.first_name || '',
    lastName: profile?.last_name || '',
    phone: profile?.phone || '',
    ccpNumber: profile?.ccp_number || '',
  });

  const updateForm = (field: string, value: string) => setForm(prev => ({ ...prev, [field]: value }));

  const handleSave = () => {
    toast({ title: 'Profil mis à jour', description: 'Vos informations ont été enregistrées.' });
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-heading font-bold text-foreground">Mon Profil</h1>
        <p className="text-muted-foreground text-sm">Gérez vos informations personnelles</p>
      </div>

      {/* CCP Status */}
      {profile && !profile.ccp_validated && (
        <Alert className="border-accent/30 bg-accent/10">
          <Clock className="h-4 w-4 text-accent" />
          <AlertDescription>
            Votre numéro CCP est en cours de validation. Les facilités de paiement seront disponibles après vérification.
          </AlertDescription>
        </Alert>
      )}

      {/* Avatar */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center gap-6">
            <div className="relative">
              <div className="w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center">
                <span className="text-2xl font-bold text-primary">
                  {profile?.first_name?.[0]}{profile?.last_name?.[0]}
                </span>
              </div>
              <button className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-md">
                <Camera className="h-4 w-4" />
              </button>
            </div>
            <div>
              <h2 className="text-xl font-semibold text-foreground">{profile?.first_name} {profile?.last_name}</h2>
              <p className="text-sm text-muted-foreground">{user?.email}</p>
              <div className="flex gap-2 mt-2">
                <Badge className={profile?.ccp_validated ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}>
                  {profile?.ccp_validated ? <><CheckCircle className="mr-1 h-3 w-3" /> CCP Validé</> : <><Clock className="mr-1 h-3 w-3" /> CCP en attente</>}
                </Badge>
                {profile?.is_independent ? (
                  <Badge variant="outline">Client indépendant</Badge>
                ) : (
                  <Badge className="bg-primary/10 text-primary">Client société</Badge>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Personal info */}
      <Card>
        <CardHeader><CardTitle>Informations personnelles</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <Label>Prénom</Label>
              <Input value={form.firstName} onChange={e => updateForm('firstName', e.target.value)} className="mt-1" />
            </div>
            <div>
              <Label>Nom</Label>
              <Input value={form.lastName} onChange={e => updateForm('lastName', e.target.value)} className="mt-1" />
            </div>
          </div>
          <div>
            <Label>Email</Label>
            <Input value={user?.email || ''} disabled className="mt-1 bg-muted/20" />
            <p className="text-xs text-muted-foreground mt-1">L'email ne peut pas être modifié</p>
          </div>
          <div>
            <Label>Téléphone</Label>
            <Input value={form.phone} onChange={e => updateForm('phone', e.target.value)} className="mt-1" />
          </div>
        </CardContent>
      </Card>

      {/* CCP */}
      <Card>
        <CardHeader><CardTitle className="flex items-center gap-2"><Shield className="h-5 w-5" /> Informations CCP</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label>Numéro CCP</Label>
            <Input value={form.ccpNumber} onChange={e => updateForm('ccpNumber', e.target.value)} className="mt-1" />
          </div>
          <p className="text-xs text-muted-foreground">
            Votre CCP doit être validé pour accéder aux facilités de paiement Sallate Bladi.
          </p>
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button onClick={handleSave} className="bg-primary hover:bg-primary/90">
          <Save className="mr-2 h-4 w-4" /> Enregistrer
        </Button>
      </div>
    </div>
  );
}
