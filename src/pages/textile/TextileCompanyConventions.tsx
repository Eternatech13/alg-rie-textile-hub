import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Check, X, Palette, TrendingUp } from "lucide-react";
import { textileConventions as initialConventions } from "@/data/mockTextileCompanyData";
import { useToast } from "@/hooks/use-toast";

type Convention = typeof initialConventions[0];

export default function TextileCompanyConventions() {
  const [conventions, setConventions] = useState<Convention[]>(initialConventions);
  const { toast } = useToast();

  const statusMap: Record<string, { label: string; variant: "default" | "secondary" | "destructive" | "outline" }> = {
    active: { label: "Active", variant: "default" },
    pending: { label: "En attente", variant: "outline" },
    expired: { label: "Expirée", variant: "secondary" },
  };

  const handleAccept = (id: string) => {
    setConventions((prev) => prev.map((c) => c.id === id ? { ...c, status: "active" as const, startDate: new Date().toISOString().split("T")[0] } : c));
    const conv = conventions.find((c) => c.id === id);
    toast({ title: "Convention acceptée", description: `La collaboration avec ${conv?.designerName} est maintenant active.` });
  };

  const handleReject = (id: string) => {
    setConventions((prev) => prev.filter((c) => c.id !== id));
    const conv = conventions.find((c) => c.id === id);
    toast({ title: "Convention refusée", description: `La demande de ${conv?.designerName} a été refusée.` });
  };

  const active = conventions.filter((c) => c.status === "active");
  const pending = conventions.filter((c) => c.status === "pending");
  const expired = conventions.filter((c) => c.status === "expired");

  const renderConvention = (conv: Convention, showActions = false) => {
    const s = statusMap[conv.status] || { label: conv.status, variant: "outline" as const };
    return (
      <div key={conv.id} className="flex items-center justify-between p-4 rounded-lg border border-border">
        <div className="flex items-center gap-4">
          <Avatar className="h-12 w-12">
            <AvatarImage src={conv.designerAvatar} />
            <AvatarFallback>{conv.designerName.split(" ").map((n) => n[0]).join("")}</AvatarFallback>
          </Avatar>
          <div>
            <p className="font-medium text-foreground">{conv.designerName}</p>
            <div className="flex items-center gap-3 text-sm text-muted-foreground mt-1">
              <span className="flex items-center gap-1"><Palette className="h-3 w-3" /> {conv.designCount} designs</span>
              <span>{conv.revenueShare}% part</span>
              {conv.totalRevenue > 0 && (
                <span className="flex items-center gap-1"><TrendingUp className="h-3 w-3" /> {conv.totalRevenue.toLocaleString()} DA</span>
              )}
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant={s.variant}>{s.label}</Badge>
          {showActions && (
            <>
              <Button size="sm" variant="default" onClick={() => handleAccept(conv.id)}><Check className="mr-1 h-4 w-4" /> Accepter</Button>
              <Button size="sm" variant="outline" onClick={() => handleReject(conv.id)}><X className="mr-1 h-4 w-4" /> Refuser</Button>
            </>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-foreground">Conventions & Designers</h2>

      {pending.length > 0 && (
        <Card className="border-primary/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              Demandes en attente
              <Badge variant="destructive">{pending.length}</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {pending.map((c) => renderConvention(c, true))}
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader><CardTitle>Conventions actives ({active.length})</CardTitle></CardHeader>
        <CardContent className="space-y-3">
          {active.length === 0 ? <p className="text-sm text-muted-foreground">Aucune convention active.</p> : active.map((c) => renderConvention(c))}
        </CardContent>
      </Card>

      {expired.length > 0 && (
        <Card>
          <CardHeader><CardTitle>Conventions expirées ({expired.length})</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            {expired.map((c) => renderConvention(c))}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
