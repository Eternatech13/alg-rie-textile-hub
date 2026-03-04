import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Check, X, Palette, TrendingUp } from "lucide-react";
import { textileConventions as initialConventions } from "@/data/mockTextileCompanyData";
import { useToast } from "@/hooks/use-toast";

type Convention = typeof initialConventions[0];

const container = { hidden: {}, show: { transition: { staggerChildren: 0.1 } } };
const item = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { duration: 0.4 } } };

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
      <motion.div
        key={conv.id}
        layout
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 20, height: 0, marginBottom: 0, transition: { duration: 0.3 } }}
        whileHover={{ scale: 1.01 }}
        className="flex items-center justify-between p-4 rounded-lg border border-border"
      >
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
              {conv.totalRevenue > 0 && <span className="flex items-center gap-1"><TrendingUp className="h-3 w-3" /> {conv.totalRevenue.toLocaleString()} DA</span>}
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <motion.span key={conv.status} initial={{ scale: 0.8 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 500 }}>
            <Badge variant={s.variant}>{s.label}</Badge>
          </motion.span>
          {showActions && (
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="flex gap-2">
              <Button size="sm" variant="default" onClick={() => handleAccept(conv.id)}><Check className="mr-1 h-4 w-4" /> Accepter</Button>
              <Button size="sm" variant="outline" onClick={() => handleReject(conv.id)}><X className="mr-1 h-4 w-4" /> Refuser</Button>
            </motion.div>
          )}
        </div>
      </motion.div>
    );
  };

  return (
    <motion.div className="space-y-6" variants={container} initial="hidden" animate="show">
      <motion.h2 variants={item} className="text-2xl font-bold text-foreground">Conventions & Designers</motion.h2>

      <AnimatePresence mode="popLayout">
        {pending.length > 0 && (
          <motion.div variants={item} key="pending-card">
            <Card className="border-primary/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">Demandes en attente <Badge variant="destructive">{pending.length}</Badge></CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <AnimatePresence mode="popLayout">
                  {pending.map((c) => renderConvention(c, true))}
                </AnimatePresence>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div variants={item}>
        <Card>
          <CardHeader><CardTitle>Conventions actives ({active.length})</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            <AnimatePresence mode="popLayout">
              {active.length === 0 ? <p className="text-sm text-muted-foreground">Aucune convention active.</p> : active.map((c) => renderConvention(c))}
            </AnimatePresence>
          </CardContent>
        </Card>
      </motion.div>

      {expired.length > 0 && (
        <motion.div variants={item}>
          <Card>
            <CardHeader><CardTitle>Conventions expirées ({expired.length})</CardTitle></CardHeader>
            <CardContent className="space-y-3">{expired.map((c) => renderConvention(c))}</CardContent>
          </Card>
        </motion.div>
      )}
    </motion.div>
  );
}
