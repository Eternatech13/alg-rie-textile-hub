import { useState } from 'react';
import { motion } from 'framer-motion';
import { Star, CheckCircle, XCircle, AlertTriangle } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { mockAdminReviews, AdminReview } from '@/data/mockAdminData';

export default function AdminReviews() {
  const { toast } = useToast();
  const [reviews, setReviews] = useState(mockAdminReviews);
  const [filter, setFilter] = useState('all');

  const filtered = reviews.filter(r => {
    if (filter === 'all') return true;
    if (filter === 'reported') return r.reported;
    return r.status === filter;
  });

  const updateStatus = (id: string, status: AdminReview['status']) => {
    setReviews(prev => prev.map(r => r.id === id ? { ...r, status, reported: false } : r));
    toast({ title: `Avis ${status === 'approved' ? 'approuvé' : 'rejeté'}` });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-heading font-bold text-foreground">Modération des Avis</h1>
        <p className="text-muted-foreground text-sm">{reviews.length} avis • {reviews.filter(r => r.status === 'pending').length} en attente • {reviews.filter(r => r.reported).length} signalés</p>
      </div>

      <Select value={filter} onValueChange={setFilter}>
        <SelectTrigger className="w-48"><SelectValue /></SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Tous</SelectItem>
          <SelectItem value="pending">En attente</SelectItem>
          <SelectItem value="reported">Signalés</SelectItem>
          <SelectItem value="approved">Approuvés</SelectItem>
        </SelectContent>
      </Select>

      <div className="space-y-3">
        {filtered.map((review, i) => (
          <motion.div key={review.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.03 }}>
            <Card className={review.reported ? 'border-destructive/30' : ''}>
              <CardContent className="p-4">
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 flex-wrap mb-1">
                      <p className="font-medium text-foreground">{review.productName}</p>
                      {review.reported && <Badge variant="destructive"><AlertTriangle className="mr-1 h-3 w-3" /> Signalé</Badge>}
                      <Badge className={review.status === 'approved' ? 'bg-green-100 text-green-800' : review.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'}>
                        {review.status === 'approved' ? 'Approuvé' : review.status === 'pending' ? 'En attente' : 'Rejeté'}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-sm text-muted-foreground">{review.userName}</span>
                      <div className="flex items-center gap-0.5 text-accent">
                        {[...Array(5)].map((_, idx) => <Star key={idx} className={`w-3 h-3 ${idx < review.rating ? 'fill-current' : ''}`} />)}
                      </div>
                      <span className="text-xs text-muted-foreground">{new Date(review.date).toLocaleDateString('fr-FR')}</span>
                    </div>
                    <p className="text-sm text-muted-foreground">{review.comment}</p>
                  </div>
                  {review.status === 'pending' && (
                    <div className="flex gap-2 shrink-0">
                      <Button size="sm" onClick={() => updateStatus(review.id, 'approved')} className="bg-green-600 hover:bg-green-700 text-white">
                        <CheckCircle className="mr-1 h-4 w-4" /> Approuver
                      </Button>
                      <Button size="sm" variant="destructive" onClick={() => updateStatus(review.id, 'rejected')}>
                        <XCircle className="mr-1 h-4 w-4" /> Rejeter
                      </Button>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
