import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, CheckCircle, XCircle, Ban, RotateCcw } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { mockAdminCompanies, AdminTextileCompany } from '@/data/mockAdminData';

const statusConfig: Record<string, { label: string; class: string }> = {
  pending: { label: 'En attente', class: 'bg-yellow-100 text-yellow-800' },
  approved: { label: 'Approuvée', class: 'bg-green-100 text-green-800' },
  rejected: { label: 'Rejetée', class: 'bg-red-100 text-red-800' },
  suspended: { label: 'Suspendue', class: 'bg-gray-100 text-gray-800' },
};

export default function AdminTextileCompanies() {
  const { toast } = useToast();
  const [companies, setCompanies] = useState(mockAdminCompanies);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const filtered = companies.filter(c => {
    const matchSearch = c.name.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === 'all' || c.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const updateStatus = (id: string, status: AdminTextileCompany['status']) => {
    setCompanies(prev => prev.map(c => c.id === id ? { ...c, status, approvedAt: status === 'approved' ? new Date().toISOString().split('T')[0] : c.approvedAt } : c));
    toast({ title: `Société ${status === 'approved' ? 'approuvée' : status === 'rejected' ? 'rejetée' : 'mise à jour'}` });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-heading font-bold text-foreground">Sociétés Textiles</h1>
        <p className="text-muted-foreground text-sm">{companies.length} sociétés • {companies.filter(c => c.status === 'pending').length} candidatures en attente</p>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Rechercher..." value={search} onChange={e => setSearch(e.target.value)} className="pl-10" />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-full sm:w-48"><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Toutes</SelectItem>
            <SelectItem value="pending">En attente</SelectItem>
            <SelectItem value="approved">Approuvées</SelectItem>
            <SelectItem value="rejected">Rejetées</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-3">
        {filtered.map((company, i) => {
          const config = statusConfig[company.status];
          return (
            <motion.div key={company.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.03 }}>
              <Card>
                <CardContent className="p-4">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <p className="font-medium text-foreground">{company.name}</p>
                        <Badge variant={company.type === 'public' ? 'default' : 'secondary'}>{company.type === 'public' ? 'Publique' : 'Privée'}</Badge>
                        <Badge className={config.class}>{config.label}</Badge>
                      </div>
                      <p className="text-xs text-muted-foreground">{company.email} • {company.phone} • {company.wilaya}</p>
                      <p className="text-xs text-muted-foreground">
                        Capacité : {company.capacity} • {company.productsCount} produits
                        {company.certifications.length > 0 && ` • ${company.certifications.join(', ')}`}
                      </p>
                    </div>
                    <div className="flex gap-2 shrink-0 flex-wrap">
                      {company.status === 'pending' && (
                        <>
                          <Button size="sm" onClick={() => updateStatus(company.id, 'approved')} className="bg-green-600 hover:bg-green-700 text-white">
                            <CheckCircle className="mr-1 h-4 w-4" /> Approuver
                          </Button>
                          <Button size="sm" variant="destructive" onClick={() => updateStatus(company.id, 'rejected')}>
                            <XCircle className="mr-1 h-4 w-4" /> Rejeter
                          </Button>
                        </>
                      )}
                      {company.status === 'approved' && (
                        <Button size="sm" variant="outline" onClick={() => updateStatus(company.id, 'suspended')}>
                          <Ban className="mr-1 h-4 w-4" /> Suspendre
                        </Button>
                      )}
                      {company.status === 'suspended' && (
                        <Button size="sm" variant="outline" onClick={() => updateStatus(company.id, 'approved')}>
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
