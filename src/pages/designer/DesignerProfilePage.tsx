import { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Camera, Save, MapPin, Briefcase, Globe } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';

const specialties = ['Mode traditionnelle', 'Mode moderne', 'Textile professionnel', 'Textile médical', 'Accessoires'];

export default function DesignerProfilePage() {
  const { profile } = useAuth();
  const { toast } = useToast();

  const [form, setForm] = useState({
    brandName: 'Atelier Créatif DZ',
    bio: 'Designer textile passionné par la valorisation du patrimoine vestimentaire algérien à travers des créations modernes et authentiques.',
    city: 'Alger',
    wilaya: 'Alger',
    experience: '5',
    website: 'https://portfolio.example.com',
    instagram: '@ateliercreatifdz',
    selectedSpecialties: ['Mode traditionnelle', 'Mode moderne'],
  });

  const updateForm = (field: string, value: any) => setForm(prev => ({ ...prev, [field]: value }));
  const toggleSpecialty = (s: string) => {
    setForm(prev => ({
      ...prev,
      selectedSpecialties: prev.selectedSpecialties.includes(s) ? prev.selectedSpecialties.filter(x => x !== s) : [...prev.selectedSpecialties, s],
    }));
  };

  const handleSave = () => {
    toast({ title: 'Profil mis à jour', description: 'Vos modifications ont été enregistrées.' });
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-heading font-bold text-foreground">Mon Profil</h1>
        <p className="text-muted-foreground text-sm">Gérez vos informations publiques de designer</p>
      </div>

      {/* Avatar */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center gap-6">
            <div className="relative">
              <div className="w-24 h-24 rounded-2xl bg-primary/10 flex items-center justify-center">
                <span className="text-3xl font-bold text-primary">
                  {profile?.first_name?.[0]}{profile?.last_name?.[0]}
                </span>
              </div>
              <button className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-md hover:bg-primary/90 transition-colors">
                <Camera className="h-4 w-4" />
              </button>
            </div>
            <div>
              <h2 className="text-xl font-semibold text-foreground">{profile?.first_name} {profile?.last_name}</h2>
              <p className="text-sm text-muted-foreground">Designer • Membre depuis 2025</p>
              <Badge className="mt-2 bg-green-100 text-green-800">Profil vérifié</Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Brand info */}
      <Card>
        <CardHeader><CardTitle className="flex items-center gap-2"><Briefcase className="h-5 w-5" /> Informations professionnelles</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label>Nom de marque / Nom artistique</Label>
            <Input value={form.brandName} onChange={e => updateForm('brandName', e.target.value)} />
          </div>
          <div>
            <Label>Bio / Description</Label>
            <Textarea value={form.bio} onChange={e => updateForm('bio', e.target.value)} rows={4} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Wilaya</Label>
              <Input value={form.wilaya} onChange={e => updateForm('wilaya', e.target.value)} />
            </div>
            <div>
              <Label>Ville</Label>
              <Input value={form.city} onChange={e => updateForm('city', e.target.value)} />
            </div>
          </div>
          <div>
            <Label>Années d'expérience</Label>
            <Input type="number" value={form.experience} onChange={e => updateForm('experience', e.target.value)} />
          </div>
        </CardContent>
      </Card>

      {/* Specialties */}
      <Card>
        <CardHeader><CardTitle>Spécialités</CardTitle></CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {specialties.map(s => (
              <Button key={s} variant={form.selectedSpecialties.includes(s) ? 'default' : 'outline'} size="sm" onClick={() => toggleSpecialty(s)}>
                {s}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Links */}
      <Card>
        <CardHeader><CardTitle className="flex items-center gap-2"><Globe className="h-5 w-5" /> Liens</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label>Site web / Portfolio</Label>
            <Input value={form.website} onChange={e => updateForm('website', e.target.value)} placeholder="https://..." />
          </div>
          <div>
            <Label>Instagram</Label>
            <Input value={form.instagram} onChange={e => updateForm('instagram', e.target.value)} placeholder="@votrenom" />
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button onClick={handleSave} className="bg-primary hover:bg-primary/90">
          <Save className="mr-2 h-4 w-4" /> Enregistrer les modifications
        </Button>
      </div>
    </div>
  );
}
