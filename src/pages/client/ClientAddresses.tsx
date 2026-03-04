import { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Plus, Edit, Trash2, Star } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { mockClientAddresses, ClientAddress } from '@/data/mockClientData';

export default function ClientAddresses() {
  const { toast } = useToast();
  const [addresses, setAddresses] = useState<ClientAddress[]>(mockClientAddresses);
  const [editAddress, setEditAddress] = useState<ClientAddress | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const [form, setForm] = useState<Partial<ClientAddress>>({
    label: '', fullName: '', phone: '', address: '', city: '', wilaya: '', postalCode: '', isDefault: false,
  });

  const openNew = () => {
    setEditAddress(null);
    setForm({ label: '', fullName: '', phone: '', address: '', city: '', wilaya: '', postalCode: '', isDefault: false });
    setIsDialogOpen(true);
  };

  const openEdit = (addr: ClientAddress) => {
    setEditAddress(addr);
    setForm(addr);
    setIsDialogOpen(true);
  };

  const handleSave = () => {
    if (editAddress) {
      setAddresses(prev => prev.map(a => a.id === editAddress.id ? { ...a, ...form } as ClientAddress : a));
      toast({ title: 'Adresse modifiée' });
    } else {
      const newAddr: ClientAddress = { ...form, id: `addr_${Date.now()}` } as ClientAddress;
      setAddresses(prev => [...prev, newAddr]);
      toast({ title: 'Adresse ajoutée' });
    }
    setIsDialogOpen(false);
  };

  const handleDelete = (id: string) => {
    setAddresses(prev => prev.filter(a => a.id !== id));
    toast({ title: 'Adresse supprimée' });
  };

  const setDefault = (id: string) => {
    setAddresses(prev => prev.map(a => ({ ...a, isDefault: a.id === id })));
    toast({ title: 'Adresse par défaut mise à jour' });
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-heading font-bold text-foreground">Mes Adresses</h1>
          <p className="text-muted-foreground text-sm">{addresses.length} adresse{addresses.length > 1 ? 's' : ''} enregistrée{addresses.length > 1 ? 's' : ''}</p>
        </div>
        <Button onClick={openNew} className="bg-primary hover:bg-primary/90">
          <Plus className="mr-2 h-4 w-4" /> Ajouter
        </Button>
      </div>

      <div className="space-y-3">
        {addresses.map((addr, i) => (
          <motion.div key={addr.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
            <Card className={`card-hover ${addr.isDefault ? 'border-primary/30 bg-primary/5' : ''}`}>
              <CardContent className="p-5">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                      <MapPin className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-foreground">{addr.label}</h3>
                        {addr.isDefault && <Badge className="bg-primary/10 text-primary text-xs">Par défaut</Badge>}
                      </div>
                      <p className="text-sm text-foreground mt-1">{addr.fullName}</p>
                      <p className="text-sm text-muted-foreground">{addr.address}</p>
                      <p className="text-sm text-muted-foreground">{addr.city}, {addr.wilaya} {addr.postalCode}</p>
                      <p className="text-sm text-muted-foreground">{addr.phone}</p>
                    </div>
                  </div>
                  <div className="flex gap-1">
                    {!addr.isDefault && (
                      <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setDefault(addr.id)} title="Définir par défaut">
                        <Star className="h-4 w-4" />
                      </Button>
                    )}
                    <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => openEdit(addr)}>
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive" onClick={() => handleDelete(addr.id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editAddress ? 'Modifier l\'adresse' : 'Nouvelle adresse'}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 mt-4">
            <div>
              <Label>Libellé (ex: Maison, Bureau)</Label>
              <Input value={form.label || ''} onChange={e => setForm(prev => ({ ...prev, label: e.target.value }))} className="mt-1" />
            </div>
            <div>
              <Label>Nom complet</Label>
              <Input value={form.fullName || ''} onChange={e => setForm(prev => ({ ...prev, fullName: e.target.value }))} className="mt-1" />
            </div>
            <div>
              <Label>Téléphone</Label>
              <Input value={form.phone || ''} onChange={e => setForm(prev => ({ ...prev, phone: e.target.value }))} className="mt-1" />
            </div>
            <div>
              <Label>Adresse</Label>
              <Input value={form.address || ''} onChange={e => setForm(prev => ({ ...prev, address: e.target.value }))} className="mt-1" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Ville</Label>
                <Input value={form.city || ''} onChange={e => setForm(prev => ({ ...prev, city: e.target.value }))} className="mt-1" />
              </div>
              <div>
                <Label>Wilaya</Label>
                <Input value={form.wilaya || ''} onChange={e => setForm(prev => ({ ...prev, wilaya: e.target.value }))} className="mt-1" />
              </div>
            </div>
            <div>
              <Label>Code postal</Label>
              <Input value={form.postalCode || ''} onChange={e => setForm(prev => ({ ...prev, postalCode: e.target.value }))} className="mt-1" />
            </div>
            <Button onClick={handleSave} className="w-full bg-primary hover:bg-primary/90">
              {editAddress ? 'Modifier' : 'Ajouter'}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
