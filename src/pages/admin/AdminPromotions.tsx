import { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Trash2, Power } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';
import { mockAdminPromoCodes, AdminPromoCode } from '@/data/mockAdminData';

export default function AdminPromotions() {
  const { toast } = useToast();
  const [codes, setCodes] = useState(mockAdminPromoCodes);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [newCode, setNewCode] = useState({ code: '', discount: '', type: 'percent' as 'percent' | 'fixed', minAmount: '', maxUses: '', endDate: '' });

  const addCode = () => {
    if (!newCode.code || !newCode.discount || !newCode.maxUses || !newCode.endDate) return;
    setCodes(prev => [...prev, {
      id: `pc_${Date.now()}`, code: newCode.code.toUpperCase(), discount: Number(newCode.discount),
      type: newCode.type, minAmount: Number(newCode.minAmount) || 0, maxUses: Number(newCode.maxUses),
      usedCount: 0, startDate: new Date().toISOString().split('T')[0], endDate: newCode.endDate, isActive: true,
    }]);
    setNewCode({ code: '', discount: '', type: 'percent', minAmount: '', maxUses: '', endDate: '' });
    setDialogOpen(false);
    toast({ title: 'Code promo créé' });
  };

  const toggleActive = (id: string) => {
    setCodes(prev => prev.map(c => c.id === id ? { ...c, isActive: !c.isActive } : c));
  };

  const remove = (id: string) => {
    setCodes(prev => prev.filter(c => c.id !== id));
    toast({ title: 'Code supprimé' });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-heading font-bold text-foreground">Codes Promo</h1>
          <p className="text-muted-foreground text-sm">{codes.length} codes • {codes.filter(c => c.isActive).length} actifs</p>
        </div>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild><Button><Plus className="mr-2 h-4 w-4" /> Nouveau code</Button></DialogTrigger>
          <DialogContent>
            <DialogHeader><DialogTitle>Créer un code promo</DialogTitle></DialogHeader>
            <div className="space-y-4">
              <div><Label>Code</Label><Input value={newCode.code} onChange={e => setNewCode(p => ({ ...p, code: e.target.value }))} placeholder="EX: PROMO20" /></div>
              <div className="grid grid-cols-2 gap-3">
                <div><Label>Réduction</Label><Input type="number" value={newCode.discount} onChange={e => setNewCode(p => ({ ...p, discount: e.target.value }))} /></div>
                <div><Label>Type</Label>
                  <Select value={newCode.type} onValueChange={v => setNewCode(p => ({ ...p, type: v as 'percent' | 'fixed' }))}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent><SelectItem value="percent">Pourcentage (%)</SelectItem><SelectItem value="fixed">Fixe (DA)</SelectItem></SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div><Label>Montant min (DA)</Label><Input type="number" value={newCode.minAmount} onChange={e => setNewCode(p => ({ ...p, minAmount: e.target.value }))} /></div>
                <div><Label>Utilisations max</Label><Input type="number" value={newCode.maxUses} onChange={e => setNewCode(p => ({ ...p, maxUses: e.target.value }))} /></div>
              </div>
              <div><Label>Date de fin</Label><Input type="date" value={newCode.endDate} onChange={e => setNewCode(p => ({ ...p, endDate: e.target.value }))} /></div>
              <Button onClick={addCode} className="w-full">Créer</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="space-y-3">
        {codes.map((code, i) => {
          const usagePercent = (code.usedCount / code.maxUses) * 100;
          return (
            <motion.div key={code.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.03 }}>
              <Card className={!code.isActive ? 'opacity-60' : ''}>
                <CardContent className="p-4">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-mono font-bold text-foreground">{code.code}</span>
                        <Badge variant="outline">{code.type === 'percent' ? `-${code.discount}%` : `-${code.discount} DA`}</Badge>
                        <Badge className={code.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}>
                          {code.isActive ? 'Actif' : 'Inactif'}
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground">Min: {code.minAmount.toLocaleString('fr-DZ')} DA • {code.startDate} → {code.endDate}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <Progress value={usagePercent} className="h-2 flex-1" />
                        <span className="text-xs text-muted-foreground">{code.usedCount}/{code.maxUses}</span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" onClick={() => toggleActive(code.id)}><Power className="h-4 w-4" /></Button>
                      <Button size="sm" variant="outline" className="text-destructive" onClick={() => remove(code.id)}><Trash2 className="h-4 w-4" /></Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
