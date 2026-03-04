import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Handshake, AlertTriangle, DollarSign, CheckCheck } from "lucide-react";
import { textileNotifications as initialNotifications } from "@/data/mockTextileCompanyData";
import { useToast } from "@/hooks/use-toast";

const iconMap: Record<string, React.ElementType> = { order: ShoppingCart, convention: Handshake, alert: AlertTriangle, payment: DollarSign };

const container = { hidden: {}, show: { transition: { staggerChildren: 0.06 } } };
const item = { hidden: { opacity: 0, y: 15 }, show: { opacity: 1, y: 0, transition: { duration: 0.35 } } };

export default function TextileCompanyNotifications() {
  const [notifications, setNotifications] = useState(initialNotifications);
  const { toast } = useToast();
  const unreadCount = notifications.filter((n) => !n.read).length;

  const markAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    toast({ title: "Notifications", description: "Toutes les notifications ont été marquées comme lues." });
  };

  const toggleRead = (id: string) => {
    setNotifications((prev) => prev.map((n) => n.id === id ? { ...n, read: !n.read } : n));
  };

  return (
    <motion.div className="space-y-6" variants={container} initial="hidden" animate="show">
      <motion.div variants={item} className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-foreground">Notifications</h2>
        {unreadCount > 0 && (
          <Button variant="outline" size="sm" onClick={markAllRead}><CheckCheck className="mr-2 h-4 w-4" /> Tout marquer comme lu</Button>
        )}
      </motion.div>

      <motion.div variants={item}>
        <Card>
          <CardContent className="pt-6 space-y-2">
            <AnimatePresence mode="popLayout">
              {notifications.map((notif) => {
                const Icon = iconMap[notif.type] || ShoppingCart;
                return (
                  <motion.div
                    key={notif.id}
                    layout
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    whileHover={{ scale: 1.01 }}
                    className={`flex items-start gap-4 p-4 rounded-lg transition-colors cursor-pointer hover:bg-muted/50 ${notif.read ? "bg-background" : "bg-primary/5 border border-primary/10"}`}
                    onClick={() => toggleRead(notif.id)}
                  >
                    <motion.div
                      animate={{ scale: notif.read ? 1 : [1, 1.1, 1] }}
                      transition={{ duration: 0.3 }}
                      className={`h-10 w-10 rounded-full flex items-center justify-center shrink-0 ${notif.read ? "bg-muted" : "bg-primary/10"}`}
                    >
                      <Icon className={`h-5 w-5 ${notif.read ? "text-muted-foreground" : "text-primary"}`} />
                    </motion.div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <p className={`text-sm font-medium ${notif.read ? "text-muted-foreground" : "text-foreground"}`}>{notif.title}</p>
                        <AnimatePresence>
                          {!notif.read && (
                            <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }} transition={{ type: "spring", stiffness: 500 }}>
                              <Badge variant="destructive" className="h-2 w-2 p-0 rounded-full" />
                            </motion.span>
                          )}
                        </AnimatePresence>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">{notif.message}</p>
                      <p className="text-xs text-muted-foreground mt-2">{notif.date}</p>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
}
