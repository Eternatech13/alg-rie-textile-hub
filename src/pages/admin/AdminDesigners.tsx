import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, CheckCircle, XCircle, Ban, RotateCcw, ExternalLink } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { mockAdminDesigners, AdminDesigner } from '@/data/mockAdminData';

const statusConfig: Record<string, { label: string; class: string }> = {
  pending: { label: 'En attente', class: 'bg-yellow-100 text-yellow-800' },
  approved: { label: 'Approuvé', class: 'bg-green-100 text-green-800' },
  rejected: { label: 'Rejeté', class: 'bg-red-100 text-red-800' },
  suspended: { label: 'Suspendu', class: 'bg-gray-100 text-gray-800' },
};

export default function AdminDesigners() {
  const { toast } = useToast();
  const [designers, setDesigners] = useState(mockAdminDesigners);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const filtered = designers.filter(d => {
    const matchSearch = d.name.toLowerCase().includes(search.toLowerCase()) || d.email.includes(search.toLowerCase());
    const matchStatus = statusFilter === 'all' || d.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const updateStatus = (id: string, status: AdminDesigner['status']) => {
    setDesigners(prev => prev.map(d => d.id === id ? { ...d, status, approvedAt: status === 'approved' ? new Date().toISOString().split('T')[0] : d.approvedAt } : d));
    toast({ title: `Designer ${status === 'approved' ? 'approuvé' : status === 'rejected' ? 'rejeté' : 'mis à jour'}` });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-heading font-bold text-foreground">Gestion des Designers</h1>
        <p className="text-muted-foreground text-sm">{designers.length} designers • {designers.filter(d => d.status === 'pending').length} candidatures en attente</p>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Rechercher..." value={search} onChange={e => setSearch(e.target.value)} className="pl-10" />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-full sm:w-48"><SelectValue placeholder="Statut" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tous</SelectItem>
            <SelectItem value="pending">En attente</SelectItem>
            <SelectItem value="approved">Approuvés</SelectItem>
            <SelectItem value="rejected">Rejetés</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-3">
        {filtered.map((designer, i) => {
          const config = statusConfig[designer.status];
          return (
            <motion.div key={designer.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.03 }}>
              <Card>
                <CardContent className="p-4">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <p className="font-medium text-foreground">{designer.name}</p>
                        <Badge className={config.class}>{config.label}</Badge>
                      </div>
                      <p className="text-xs text-muted-foreground">{designer.email} • {designer.phone}</p>
                      <p className="text-xs text-muted-foreground">
                        Spécialité : {designer.specialty} • {designer.collectionsCount} collections • {designer.revenue.toLocaleString('fr-DZ')} DA revenus
                      </p>
                      <p className="text-xs text-muted-foreground">Candidature : {new Date(designer.appliedAt).toLocaleDateString('fr-FR')}</p>
                    </div>
                    <div className="flex gap-2 shrink-0 flex-wrap">
                      {designer.status === 'pending' && (
                        <>
                          <Button size="sm" onClick={() => updateStatus(designer.id, 'approved')} className="bg-green-600 hover:bg-green-700 text-white">
                            <CheckCircle className="mr-1 h-4 w-4" /> Approuver
                          </Button>
                          <Button size="sm" variant="destructive" onClick={() => updateStatus(designer.id, 'rejected')}>
                            <XCircle className="mr-1 h-4 w-4" /> Rejeter
                          </Button>
                        </>
                      )}
                      {designer.status === 'approved' && (
                        <Button size="sm" variant="outline" onClick={() => updateStatus(designer.id, 'suspended')}>
                          <Ban className="mr-1 h-4 w-4" /> Suspendre
                        </Button>
                      )}
                      {designer.status === 'suspended' && (
                        <Button size="sm" variant="outline" onClick={() => updateStatus(designer.id, 'approved')}>
                          <RotateCcw className="mr-1 h-4 w-4" /> Réactiver
                        </Button>
                      )}
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
