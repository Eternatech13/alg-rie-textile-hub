import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Upload, X, Plus } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Progress } from '@/components/ui/progress';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

const categories = ['Femme', 'Homme', 'Enfant', 'Professionnel', 'Traditionnel'];
const subcategories: Record<string, string[]> = {
  Femme: ['Robes', 'Hijabs', 'Accessoires', 'Ensembles', 'Manteaux'],
  Homme: ['Costumes', 'Chemises', 'Traditionnel', 'Pantalons'],
  Enfant: ['Uniformes', 'Casual', 'Cérémonie'],
  Professionnel: ['Médical', 'Uniforme', 'Sécurité'],
  Traditionnel: ['Gandoura', 'Karakou', 'Burnous', 'Djellaba'],
};
const colors = ['Blanc', 'Noir', 'Bleu', 'Rouge', 'Vert', 'Beige', 'Marron', 'Gris', 'Rose', 'Jaune'];
const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL'];

export default function NewDesign() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [step, setStep] = useState(1);
  const totalSteps = 4;

  const [form, setForm] = useState({
    name: '', description: '', category: '', subcategory: '',
    suggestedPrice: '', images: [] as string[],
    selectedColors: [] as string[], selectedSizes: [] as string[],
    textileCompany: '', conventionBased: false, portfolioLink: '',
  });

  const updateForm = (field: string, value: any) => setForm(prev => ({ ...prev, [field]: value }));
  const toggleArray = (field: 'selectedColors' | 'selectedSizes', value: string) => {
    setForm(prev => ({
      ...prev,
      [field]: prev[field].includes(value) ? prev[field].filter(v => v !== value) : [...prev[field], value],
    }));
  };

  const handleSubmit = () => {
    toast({ title: 'Design soumis !', description: 'Votre design est en attente de validation.' });
    navigate('/designer/designs');
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => navigate('/designer/designs')}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div>
          <h1 className="text-2xl font-heading font-bold text-foreground">Nouveau Design</h1>
          <p className="text-muted-foreground text-sm">Étape {step} sur {totalSteps}</p>
        </div>
      </div>

      <Progress value={(step / totalSteps) * 100} className="h-2" />

      <motion.div key={step} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3 }}>
        {step === 1 && (
          <Card>
            <CardHeader><CardTitle>Informations générales</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Nom du design *</Label>
                <Input value={form.name} onChange={e => updateForm('name', e.target.value)} placeholder="Ex: Robe Kabyle Moderne" />
              </div>
              <div>
                <Label>Description *</Label>
                <Textarea value={form.description} onChange={e => updateForm('description', e.target.value)} placeholder="Décrivez votre design..." rows={4} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Catégorie *</Label>
                  <Select value={form.category} onValueChange={v => { updateForm('category', v); updateForm('subcategory', ''); }}>
                    <SelectTrigger><SelectValue placeholder="Choisir" /></SelectTrigger>
                    <SelectContent>{categories.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}</SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Sous-catégorie *</Label>
                  <Select value={form.subcategory} onValueChange={v => updateForm('subcategory', v)} disabled={!form.category}>
                    <SelectTrigger><SelectValue placeholder="Choisir" /></SelectTrigger>
                    <SelectContent>{(subcategories[form.category] || []).map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}</SelectContent>
                  </Select>
                </div>
              </div>
              <div>
                <Label>Prix suggéré (DA) *</Label>
                <Input type="number" value={form.suggestedPrice} onChange={e => updateForm('suggestedPrice', e.target.value)} placeholder="Ex: 8500" />
              </div>
            </CardContent>
          </Card>
        )}

        {step === 2 && (
          <Card>
            <CardHeader><CardTitle>Images & Visuels</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div className="border-2 border-dashed border-border rounded-xl p-8 text-center hover:border-primary/50 transition-colors cursor-pointer">
                <Upload className="h-10 w-10 mx-auto text-muted-foreground mb-3" />
                <p className="text-sm font-medium text-foreground">Glissez vos images ici</p>
                <p className="text-xs text-muted-foreground mt-1">PNG, JPG jusqu'à 5MB • Max 8 images</p>
                <Button variant="outline" className="mt-4" size="sm"><Plus className="mr-1 h-4 w-4" /> Choisir des fichiers</Button>
              </div>
              {form.images.length > 0 && (
                <div className="grid grid-cols-4 gap-2">
                  {form.images.map((img, i) => (
                    <div key={i} className="relative aspect-square rounded-lg overflow-hidden bg-muted">
                      <img src={img} alt="" className="w-full h-full object-cover" />
                      <button onClick={() => updateForm('images', form.images.filter((_, idx) => idx !== i))} className="absolute top-1 right-1 bg-destructive text-destructive-foreground rounded-full p-0.5">
                        <X className="h-3 w-3" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
              <div>
                <Label>Lien portfolio externe (optionnel)</Label>
                <Input value={form.portfolioLink} onChange={e => updateForm('portfolioLink', e.target.value)} placeholder="https://..." />
              </div>
            </CardContent>
          </Card>
        )}

        {step === 3 && (
          <Card>
            <CardHeader><CardTitle>Tailles & Couleurs</CardTitle></CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label className="mb-3 block">Tailles disponibles *</Label>
                <div className="flex flex-wrap gap-2">
                  {sizes.map(size => (
                    <Button key={size} variant={form.selectedSizes.includes(size) ? 'default' : 'outline'} size="sm" onClick={() => toggleArray('selectedSizes', size)}>
                      {size}
                    </Button>
                  ))}
                </div>
              </div>
              <div>
                <Label className="mb-3 block">Couleurs disponibles *</Label>
                <div className="flex flex-wrap gap-2">
                  {colors.map(color => (
                    <Button key={color} variant={form.selectedColors.includes(color) ? 'default' : 'outline'} size="sm" onClick={() => toggleArray('selectedColors', color)}>
                      {color}
                    </Button>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {step === 4 && (
          <Card>
            <CardHeader><CardTitle>Production & Convention</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3">
                <Checkbox checked={form.conventionBased} onCheckedChange={v => updateForm('conventionBased', v)} />
                <Label>Ce design sera produit dans le cadre d'une convention</Label>
              </div>
              {form.conventionBased && (
                <div>
                  <Label>Société textile partenaire</Label>
                  <Select value={form.textileCompany} onValueChange={v => updateForm('textileCompany', v)}>
                    <SelectTrigger><SelectValue placeholder="Choisir la société" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="eatit">EATIT Draâ Ben Khedda</SelectItem>
                      <SelectItem value="texalg">Texalg Relizane</SelectItem>
                      <SelectItem value="soitex">Soitex Bouira</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}
              {/* Summary */}
              <div className="mt-6 p-4 rounded-xl bg-primary/5 border border-primary/20 space-y-2">
                <h4 className="font-heading font-semibold text-foreground">Récapitulatif</h4>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <span className="text-muted-foreground">Nom :</span><span className="text-foreground">{form.name || '—'}</span>
                  <span className="text-muted-foreground">Catégorie :</span><span className="text-foreground">{form.category} &gt; {form.subcategory || '—'}</span>
                  <span className="text-muted-foreground">Prix :</span><span className="text-foreground">{form.suggestedPrice ? `${Number(form.suggestedPrice).toLocaleString('fr-DZ')} DA` : '—'}</span>
                  <span className="text-muted-foreground">Tailles :</span><span className="text-foreground">{form.selectedSizes.join(', ') || '—'}</span>
                  <span className="text-muted-foreground">Couleurs :</span><span className="text-foreground">{form.selectedColors.join(', ') || '—'}</span>
                  <span className="text-muted-foreground">Convention :</span><span className="text-foreground">{form.conventionBased ? 'Oui' : 'Non'}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </motion.div>

      {/* Navigation */}
      <div className="flex justify-between">
        <Button variant="outline" onClick={() => setStep(Math.max(1, step - 1))} disabled={step === 1}>Précédent</Button>
        {step < totalSteps ? (
          <Button onClick={() => setStep(step + 1)} className="bg-primary hover:bg-primary/90">Suivant</Button>
        ) : (
          <Button onClick={handleSubmit} className="bg-accent hover:bg-accent/90 text-accent-foreground">Soumettre le design</Button>
        )}
      </div>
    </div>
  );
}
