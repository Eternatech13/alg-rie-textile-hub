import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Bell } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';
import { mockAdminNotifications, AdminNotification } from '@/data/mockAdminData';

const targetLabels: Record<string, string> = {
  all: 'Tous', clients: 'Clients', designers: 'Designers', companies: 'Sociétés',
};

export default function AdminNotifications() {
  const { toast } = useToast();
  const [notifications, setNotifications] = useState(mockAdminNotifications);
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [target, setTarget] = useState<'all' | 'clients' | 'designers' | 'companies'>('all');

  const sendNotification = () => {
    if (!title.trim() || !message.trim()) return;
    const newNotif: AdminNotification = {
      id: `an_${Date.now()}`, title: title.trim(), message: message.trim(),
      target, sentAt: new Date().toISOString().split('T')[0], readCount: 0,
      totalCount: target === 'all' ? 1254 : target === 'clients' ? 980 : target === 'designers' ? 15 : 8,
    };
    setNotifications(prev => [newNotif, ...prev]);
    setTitle(''); setMessage('');
    toast({ title: 'Notification envoyée', description: `Envoyée à ${targetLabels[target]}` });
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-heading font-bold text-foreground">Notifications</h1>

      <Card>
        <CardHeader><CardTitle>Envoyer une notification</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div><Label>Titre</Label><Input value={title} onChange={e => setTitle(e.target.value)} placeholder="Titre de la notification" /></div>
            <div><Label>Cible</Label>
              <Select value={target} onValueChange={v => setTarget(v as typeof target)}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous les utilisateurs</SelectItem>
                  <SelectItem value="clients">Clients uniquement</SelectItem>
                  <SelectItem value="designers">Designers uniquement</SelectItem>
                  <SelectItem value="companies">Sociétés uniquement</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div><Label>Message</Label><Textarea value={message} onChange={e => setMessage(e.target.value)} placeholder="Contenu..." rows={3} /></div>
          <Button onClick={sendNotification} disabled={!title.trim() || !message.trim()}><Send className="mr-2 h-4 w-4" /> Envoyer</Button>
        </CardContent>
      </Card>

      <h2 className="text-lg font-heading font-semibold text-foreground">Historique</h2>
      <div className="space-y-3">
        {notifications.map((notif, i) => (
          <motion.div key={notif.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.03 }}>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <Bell className="h-4 w-4 text-primary" />
                      <p className="font-medium text-foreground">{notif.title}</p>
                      <Badge variant="outline">{targetLabels[notif.target]}</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">{notif.message}</p>
                    <div className="flex items-center gap-2">
                      <Progress value={(notif.readCount / notif.totalCount) * 100} className="h-2 flex-1 max-w-xs" />
                      <span className="text-xs text-muted-foreground">{notif.readCount}/{notif.totalCount} lus</span>
                    </div>
                  </div>
                  <span className="text-xs text-muted-foreground shrink-0">{new Date(notif.sentAt).toLocaleDateString('fr-FR')}</span>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
