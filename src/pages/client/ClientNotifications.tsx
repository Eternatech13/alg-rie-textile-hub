import { useState } from 'react';
import { motion } from 'framer-motion';
import { Bell, CheckCheck, ShoppingBag, CreditCard, Truck, Tag, Info } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { mockClientNotifications, ClientNotification } from '@/data/mockClientData';

const typeConfig: Record<string, { icon: typeof Bell; color: string }> = {
  order: { icon: ShoppingBag, color: 'text-blue-600 bg-blue-100' },
  payment: { icon: CreditCard, color: 'text-green-600 bg-green-100' },
  delivery: { icon: Truck, color: 'text-purple-600 bg-purple-100' },
  promo: { icon: Tag, color: 'text-accent bg-accent/10' },
  system: { icon: Info, color: 'text-muted-foreground bg-muted/20' },
};

export default function ClientNotifications() {
  const [notifications, setNotifications] = useState<ClientNotification[]>(mockClientNotifications);
  const unreadCount = notifications.filter(n => !n.read).length;

  const markAllRead = () => setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  const markRead = (id: string) => setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-heading font-bold text-foreground">Notifications</h1>
          <p className="text-muted-foreground text-sm">{unreadCount} non lue{unreadCount > 1 ? 's' : ''}</p>
        </div>
        {unreadCount > 0 && (
          <Button variant="outline" size="sm" onClick={markAllRead}>
            <CheckCheck className="mr-2 h-4 w-4" /> Tout marquer comme lu
          </Button>
        )}
      </div>

      <div className="space-y-2">
        {notifications.map((notif, i) => {
          const config = typeConfig[notif.type];
          const Icon = config.icon;
          return (
            <motion.div key={notif.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.03 }}>
              <Card className={`card-hover cursor-pointer ${!notif.read ? 'border-primary/30 bg-primary/5' : ''}`} onClick={() => markRead(notif.id)}>
                <CardContent className="p-4 flex items-start gap-4">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${config.color}`}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <h3 className={`text-sm ${!notif.read ? 'font-semibold' : 'font-medium'} text-foreground`}>{notif.title}</h3>
                      {!notif.read && <div className="w-2 h-2 rounded-full bg-primary shrink-0" />}
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">{notif.message}</p>
                    <p className="text-xs text-muted-foreground/60 mt-2">{new Date(notif.date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
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
