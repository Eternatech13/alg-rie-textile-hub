import { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Search, Edit2, Trash2, Power } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';

interface PartnerCompany {
  id: string;
  name: string;
  code: string;
  isActive: boolean;
  employeesCount: number;
  createdAt: string;
}

const initialData: PartnerCompany[] = [
  { id: 'pc1', name: 'CHU Mustapha', code: 'CHU-MUS', isActive: true, employeesCount: 45, createdAt: '2025-11-01' },
  { id: 'pc2', name: 'SONELGAZ', code: 'SONEL', isActive: true, employeesCount: 120, createdAt: '2025-12-15' },
  { id: 'pc3', name: 'Algérie Poste', code: 'APOSTE', isActive: true, employeesCount: 78, createdAt: '2026-01-10' },
  { id: 'pc4', name: 'SONATRACH', code: 'SONA', isActive: false, employeesCount: 200, createdAt: '2026-02-01' },
];

export default function AdminPartnerCompanies() {
  const { toast } = useToast();
  const [companies, setCompanies] = useState(initialData);
  const [search, setSearch] = useState('');
  const [newName, setNewName] = useState('');
  const [newCode, setNewCode] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);

  const filtered = companies.filter(c => c.name.toLowerCase().includes(search.toLowerCase()) || c.code.toLowerCase().includes(search.toLowerCase()));

  const addCompany = () => {
    if (!newName.trim() || !newCode.trim()) return;
    setCompanies(prev => [...prev, { id: `pc_${Date.now()}`, name: newName.trim(), code: newCode.trim().toUpperCase(), isActive: true, employeesCount: 0, createdAt: new Date().toISOString().split('T')[0] }]);
    setNewName(''); setNewCode(''); setDialogOpen(false);
    toast({ title: 'Société partenaire ajoutée' });
  };

  const toggleActive = (id: string) => {
    setCompanies(prev => prev.map(c => c.id === id ? { ...c, isActive: !c.isActive } : c));
    toast({ title: 'Statut mis à jour' });
  };

  const remove = (id: string) => {
    setCompanies(prev => prev.filter(c => c.id !== id));
    toast({ title: 'Société supprimée' });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-heading font-bold text-foreground">Sociétés Partenaires</h1>
          <p className="text-muted-foreground text-sm">{companies.length} sociétés conventionnées</p>
        </div>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button><Plus className="mr-2 h-4 w-4" /> Ajouter</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader><DialogTitle>Nouvelle société partenaire</DialogTitle></DialogHeader>
            <div className="space-y-4">
              <div><Label>Nom</Label><Input value={newName} onChange={e => setNewName(e.target.value)} placeholder="Ex: CHU Bab El Oued" /></div>
              <div><Label>Code</Label><Input value={newCode} onChange={e => setNewCode(e.target.value)} placeholder="Ex: CHU-BEO" /></div>
              <Button onClick={addCompany} disabled={!newName.trim() || !newCode.trim()} className="w-full">Ajouter</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input placeholder="Rechercher..." value={search} onChange={e => setSearch(e.target.value)} className="pl-10" />
      </div>

      <div className="space-y-3">
        {filtered.map((company, i) => (
          <motion.div key={company.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.03 }}>
            <Card className={!company.isActive ? 'opacity-60' : ''}>
              <CardContent className="p-4 flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <p className="font-medium text-foreground">{company.name}</p>
                    <Badge variant="outline" className="font-mono">{company.code}</Badge>
                    <Badge className={company.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}>
                      {company.isActive ? 'Active' : 'Inactive'}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">{company.employeesCount} employés inscrits • Depuis {new Date(company.createdAt).toLocaleDateString('fr-FR')}</p>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" onClick={() => toggleActive(company.id)}>
                    <Power className="h-4 w-4" />
                  </Button>
                  <Button size="sm" variant="outline" className="text-destructive" onClick={() => remove(company.id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
