import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Handshake, AlertTriangle, DollarSign, CheckCheck } from "lucide-react";
import { textileNotifications as initialNotifications } from "@/data/mockTextileCompanyData";
import { useToast } from "@/hooks/use-toast";

const iconMap: Record<string, React.ElementType> = {
  order: ShoppingCart,
  convention: Handshake,
  alert: AlertTriangle,
  payment: DollarSign,
};

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
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-foreground">Notifications</h2>
        {unreadCount > 0 && (
          <Button variant="outline" size="sm" onClick={markAllRead}>
            <CheckCheck className="mr-2 h-4 w-4" /> Tout marquer comme lu
          </Button>
        )}
      </div>

      <Card>
        <CardContent className="pt-6 space-y-2">
          {notifications.map((notif) => {
            const Icon = iconMap[notif.type] || ShoppingCart;
            return (
              <div
                key={notif.id}
                className={`flex items-start gap-4 p-4 rounded-lg transition-colors cursor-pointer hover:bg-muted/50 ${notif.read ? "bg-background" : "bg-primary/5 border border-primary/10"}`}
                onClick={() => toggleRead(notif.id)}
              >
                <div className={`h-10 w-10 rounded-full flex items-center justify-center shrink-0 ${notif.read ? "bg-muted" : "bg-primary/10"}`}>
                  <Icon className={`h-5 w-5 ${notif.read ? "text-muted-foreground" : "text-primary"}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className={`text-sm font-medium ${notif.read ? "text-muted-foreground" : "text-foreground"}`}>{notif.title}</p>
                    {!notif.read && <Badge variant="destructive" className="h-2 w-2 p-0 rounded-full" />}
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">{notif.message}</p>
                  <p className="text-xs text-muted-foreground mt-2">{notif.date}</p>
                </div>
              </div>
            );
          })}
        </CardContent>
      </Card>
    </div>
  );
}
