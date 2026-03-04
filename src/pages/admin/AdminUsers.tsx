import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, CheckCircle, XCircle, Ban, RotateCcw, Eye } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { mockAdminUsers, AdminUser } from '@/data/mockAdminData';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';

export default function AdminUsers() {
  const { toast } = useToast();
  const [users, setUsers] = useState(mockAdminUsers);
  const [search, setSearch] = useState('');
  const [ccpFilter, setCcpFilter] = useState('all');

  const filtered = users.filter(u => {
    const q = search.toLowerCase();
    const matchSearch = u.firstName.toLowerCase().includes(q) || u.lastName.toLowerCase().includes(q) || u.email.includes(q);
    const matchCcp = ccpFilter === 'all' || (ccpFilter === 'pending' ? !u.ccpValidated : u.ccpValidated);
    return matchSearch && matchCcp;
  });

  const validateCCP = (id: string) => {
    setUsers(prev => prev.map(u => u.id === id ? { ...u, ccpValidated: true } : u));
    toast({ title: 'CCP validé', description: 'Le compte CCP a été validé avec succès.' });
  };

  const toggleSuspend = (id: string) => {
    setUsers(prev => prev.map(u => u.id === id ? { ...u, status: u.status === 'active' ? 'suspended' as const : 'active' as const } : u));
    toast({ title: 'Statut mis à jour' });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-heading font-bold text-foreground">Gestion des Utilisateurs</h1>
        <p className="text-muted-foreground text-sm">{users.length} utilisateurs • {users.filter(u => !u.ccpValidated).length} CCP en attente</p>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Rechercher..." value={search} onChange={e => setSearch(e.target.value)} className="pl-10" />
        </div>
        <Select value={ccpFilter} onValueChange={setCcpFilter}>
          <SelectTrigger className="w-full sm:w-48"><SelectValue placeholder="Statut CCP" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tous</SelectItem>
            <SelectItem value="pending">CCP en attente</SelectItem>
            <SelectItem value="validated">CCP validé</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-3">
        {filtered.map((user, i) => (
          <motion.div key={user.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.03 }}>
            <Card className={user.status === 'suspended' ? 'opacity-60' : ''}>
              <CardContent className="p-4">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                  <div className="flex items-center gap-3 flex-1">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                      <span className="text-sm font-semibold text-primary">{user.firstName[0]}{user.lastName[0]}</span>
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <p className="font-medium text-foreground">{user.firstName} {user.lastName}</p>
                        <Badge className={user.ccpValidated ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}>
                          {user.ccpValidated ? 'CCP Validé' : 'CCP En attente'}
                        </Badge>
                        {user.status === 'suspended' && <Badge variant="destructive">Suspendu</Badge>}
                      </div>
                      <p className="text-xs text-muted-foreground">{user.email} • {user.phone}</p>
                      <p className="text-xs text-muted-foreground">
                        CCP: {user.ccpNumber} • {user.isIndependent ? 'Indépendant' : `Société: ${user.partnerCompany}`}
                        • {user.ordersCount} commandes • {user.totalSpent.toLocaleString('fr-DZ')} DA dépensés
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-2 shrink-0">
                    {!user.ccpValidated && (
                      <Button size="sm" onClick={() => validateCCP(user.id)} className="bg-green-600 hover:bg-green-700 text-white">
                        <CheckCircle className="mr-1 h-4 w-4" /> Valider CCP
                      </Button>
                    )}
                    <Button size="sm" variant="outline" onClick={() => toggleSuspend(user.id)}>
                      {user.status === 'active' ? <><Ban className="mr-1 h-4 w-4" /> Suspendre</> : <><RotateCcw className="mr-1 h-4 w-4" /> Réactiver</>}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
