import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Check, X, Palette, TrendingUp } from "lucide-react";
import { textileConventions } from "@/data/mockTextileCompanyData";

export default function TextileCompanyConventions() {
  const statusMap: Record<string, { label: string; variant: "default" | "secondary" | "destructive" | "outline" }> = {
    active: { label: "Active", variant: "default" },
    pending: { label: "En attente", variant: "outline" },
    expired: { label: "Expirée", variant: "secondary" },
  };

  const active = textileConventions.filter((c) => c.status === "active");
  const pending = textileConventions.filter((c) => c.status === "pending");
  const expired = textileConventions.filter((c) => c.status === "expired");

  const renderConvention = (conv: typeof textileConventions[0], showActions = false) => {
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
              <Button size="sm" variant="default"><Check className="mr-1 h-4 w-4" /> Accepter</Button>
              <Button size="sm" variant="outline"><X className="mr-1 h-4 w-4" /> Refuser</Button>
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
        <Card className="border-yellow-500/30">
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
          {active.map((c) => renderConvention(c))}
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
