import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, Grid3X3, List, PlusCircle, Eye, Edit, Trash2 } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Link } from 'react-router-dom';
import { mockDesigns } from '@/data/mockDesignerData';

const statusConfig: Record<string, { label: string; class: string }> = {
  draft: { label: 'Brouillon', class: 'bg-muted/30 text-muted-foreground' },
  pending: { label: 'En attente', class: 'bg-yellow-100 text-yellow-800' },
  approved: { label: 'Approuvé', class: 'bg-green-100 text-green-800' },
  rejected: { label: 'Rejeté', class: 'bg-red-100 text-red-800' },
};

export default function DesignerDesigns() {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const filtered = mockDesigns.filter(d => {
    const matchSearch = d.name.toLowerCase().includes(search.toLowerCase()) || d.category.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === 'all' || d.status === statusFilter;
    return matchSearch && matchStatus;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-heading font-bold text-foreground">Mes Designs</h1>
          <p className="text-muted-foreground text-sm">{mockDesigns.length} designs au total</p>
        </div>
        <Link to="/designer/designs/nouveau">
          <Button className="bg-primary hover:bg-primary/90">
            <PlusCircle className="mr-2 h-4 w-4" /> Nouveau Design
          </Button>
        </Link>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Rechercher un design..." value={search} onChange={e => setSearch(e.target.value)} className="pl-10" />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-full sm:w-48">
            <Filter className="mr-2 h-4 w-4" />
            <SelectValue placeholder="Statut" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tous les statuts</SelectItem>
            <SelectItem value="draft">Brouillon</SelectItem>
            <SelectItem value="pending">En attente</SelectItem>
            <SelectItem value="approved">Approuvé</SelectItem>
            <SelectItem value="rejected">Rejeté</SelectItem>
          </SelectContent>
        </Select>
        <div className="flex border border-border rounded-lg">
          <Button variant={viewMode === 'grid' ? 'default' : 'ghost'} size="icon" onClick={() => setViewMode('grid')} className="rounded-r-none">
            <Grid3X3 className="h-4 w-4" />
          </Button>
          <Button variant={viewMode === 'list' ? 'default' : 'ghost'} size="icon" onClick={() => setViewMode('list')} className="rounded-l-none">
            <List className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-muted-foreground">Aucun design trouvé</p>
        </div>
      ) : viewMode === 'grid' ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((design, i) => (
            <motion.div key={design.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
              <Card className="card-hover overflow-hidden group">
                <div className="relative aspect-[4/3] bg-muted/10">
                  <img src={design.images[0]} alt={design.name} className="w-full h-full object-cover" />
                  <div className="absolute top-3 right-3">
                    <Badge className={statusConfig[design.status].class}>{statusConfig[design.status].label}</Badge>
                  </div>
                  <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/40 transition-all flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100">
                    <Button size="icon" variant="secondary" className="h-9 w-9 rounded-full"><Eye className="h-4 w-4" /></Button>
                    <Button size="icon" variant="secondary" className="h-9 w-9 rounded-full"><Edit className="h-4 w-4" /></Button>
                    <Button size="icon" variant="destructive" className="h-9 w-9 rounded-full"><Trash2 className="h-4 w-4" /></Button>
                  </div>
                </div>
                <CardContent className="p-4">
                  <h3 className="font-medium text-foreground">{design.name}</h3>
                  <p className="text-xs text-muted-foreground mt-1">{design.category} &gt; {design.subcategory}</p>
                  <div className="flex items-center justify-between mt-3">
                    <span className="font-bold text-primary">{design.suggestedPrice.toLocaleString('fr-DZ')} DA</span>
                    {design.salesCount > 0 && (
                      <span className="text-xs text-muted-foreground">{design.salesCount} ventes</span>
                    )}
                  </div>
                  {design.textileCompany && (
                    <p className="text-xs text-accent mt-2 truncate">🏭 {design.textileCompany}</p>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="space-y-2">
          {filtered.map((design, i) => (
            <motion.div key={design.id} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }}>
              <Card className="card-hover">
                <CardContent className="p-4 flex items-center gap-4">
                  <img src={design.images[0]} alt={design.name} className="w-16 h-16 rounded-lg object-cover shrink-0" />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <h3 className="font-medium text-foreground truncate">{design.name}</h3>
                      <Badge className={statusConfig[design.status].class}>{statusConfig[design.status].label}</Badge>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">{design.category} &gt; {design.subcategory}</p>
                    {design.textileCompany && <p className="text-xs text-accent mt-1">🏭 {design.textileCompany}</p>}
                  </div>
                  <div className="text-right shrink-0 hidden sm:block">
                    <p className="font-bold text-primary">{design.suggestedPrice.toLocaleString('fr-DZ')} DA</p>
                    <p className="text-xs text-muted-foreground">{design.salesCount} ventes</p>
                  </div>
                  <div className="flex gap-1 shrink-0">
                    <Button size="icon" variant="ghost" className="h-8 w-8"><Eye className="h-4 w-4" /></Button>
                    <Button size="icon" variant="ghost" className="h-8 w-8"><Edit className="h-4 w-4" /></Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
