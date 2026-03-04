import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Eye } from "lucide-react";
import { textileOrders as initialOrders } from "@/data/mockTextileCompanyData";
import { useToast } from "@/hooks/use-toast";

type OrderStatus = "pending" | "in_production" | "shipped" | "delivered";
interface Order { id: string; clientName: string; clientType: "institution" | "individual"; items: number; total: number; status: OrderStatus; unitId: string; unitName: string; date: string; deadline: string; }

const allStatuses = ["pending", "in_production", "shipped", "delivered"] as const;
const statusMap: Record<string, { label: string; variant: "default" | "secondary" | "destructive" | "outline" }> = {
  pending: { label: "En attente", variant: "outline" },
  in_production: { label: "En production", variant: "default" },
  shipped: { label: "Expédiée", variant: "secondary" },
  delivered: { label: "Livrée", variant: "secondary" },
};

const container = { hidden: {}, show: { transition: { staggerChildren: 0.08 } } };
const item = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { duration: 0.4 } } };

export default function TextileCompanyOrders() {
  const [orders, setOrders] = useState<Order[]>(initialOrders as Order[]);
  const [filterStatus, setFilterStatus] = useState("all");
  const [detailOpen, setDetailOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const { toast } = useToast();

  const filtered = orders.filter((o) => filterStatus === "all" || o.status === filterStatus);

  const openDetail = (order: Order) => { setSelectedOrder(order); setDetailOpen(true); };

  const changeStatus = (orderId: string, newStatus: string) => {
    setOrders((prev) => prev.map((o) => o.id === orderId ? { ...o, status: newStatus as Order["status"] } : o));
    setSelectedOrder((prev) => prev && prev.id === orderId ? { ...prev, status: newStatus as Order["status"] } : prev);
    const s = statusMap[newStatus];
    toast({ title: "Statut mis à jour", description: `Commande ${orderId} → ${s?.label || newStatus}` });
  };

  return (
    <motion.div className="space-y-6" variants={container} initial="hidden" animate="show">
      <motion.h2 variants={item} className="text-2xl font-bold text-foreground">Commandes reçues</motion.h2>

      <motion.div variants={item}>
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Liste des commandes</CardTitle>
              <Select value={filterStatus} onValueChange={setFilterStatus}><SelectTrigger className="w-[180px]"><SelectValue placeholder="Tous les statuts" /></SelectTrigger><SelectContent><SelectItem value="all">Tous les statuts</SelectItem>{allStatuses.map((st) => <SelectItem key={st} value={st}>{statusMap[st].label}</SelectItem>)}</SelectContent></Select>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>N° Commande</TableHead><TableHead>Client</TableHead><TableHead>Type</TableHead><TableHead>Unité</TableHead><TableHead className="text-right">Articles</TableHead><TableHead className="text-right">Total</TableHead><TableHead>Date limite</TableHead><TableHead>Statut</TableHead><TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <AnimatePresence mode="popLayout">
                  {filtered.map((order, index) => {
                    const s = statusMap[order.status] || { label: order.status, variant: "outline" as const };
                    return (
                      <motion.tr
                        key={order.id}
                        layout
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20, transition: { duration: 0.2 } }}
                        transition={{ delay: index * 0.04 }}
                        className="border-b transition-colors hover:bg-muted/50"
                      >
                        <TableCell className="font-medium">{order.id}</TableCell>
                        <TableCell>{order.clientName}</TableCell>
                        <TableCell><Badge variant="outline">{order.clientType === "institution" ? "Institution" : "Particulier"}</Badge></TableCell>
                        <TableCell className="text-muted-foreground">{order.unitName}</TableCell>
                        <TableCell className="text-right">{order.items}</TableCell>
                        <TableCell className="text-right font-medium">{order.total.toLocaleString()} DA</TableCell>
                        <TableCell className="text-muted-foreground">{order.deadline}</TableCell>
                        <TableCell>
                          <motion.span key={order.status} initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: "spring", stiffness: 500 }}>
                            <Badge variant={s.variant}>{s.label}</Badge>
                          </motion.span>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => openDetail(order)}><Eye className="h-4 w-4" /></Button>
                        </TableCell>
                      </motion.tr>
                    );
                  })}
                </AnimatePresence>
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </motion.div>

      <Dialog open={detailOpen} onOpenChange={setDetailOpen}>
        <DialogContent className="max-w-lg">
          {detailOpen && selectedOrder && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
              <DialogHeader><DialogTitle>Détail commande {selectedOrder.id}</DialogTitle></DialogHeader>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div><span className="text-muted-foreground">Client</span><p className="font-medium text-foreground">{selectedOrder.clientName}</p></div>
                  <div><span className="text-muted-foreground">Type</span><p className="font-medium text-foreground">{selectedOrder.clientType === "institution" ? "Institution" : "Particulier"}</p></div>
                  <div><span className="text-muted-foreground">Unité</span><p className="font-medium text-foreground">{selectedOrder.unitName}</p></div>
                  <div><span className="text-muted-foreground">Articles</span><p className="font-medium text-foreground">{selectedOrder.items}</p></div>
                  <div><span className="text-muted-foreground">Total</span><p className="font-medium text-foreground">{selectedOrder.total.toLocaleString()} DA</p></div>
                  <div><span className="text-muted-foreground">Date</span><p className="font-medium text-foreground">{selectedOrder.date}</p></div>
                  <div><span className="text-muted-foreground">Date limite</span><p className="font-medium text-foreground">{selectedOrder.deadline}</p></div>
                </div>
                <div>
                  <span className="text-sm text-muted-foreground mb-2 block">Changer le statut</span>
                  <Select value={selectedOrder.status} onValueChange={(v) => changeStatus(selectedOrder.id, v)}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent>{allStatuses.map((st) => <SelectItem key={st} value={st}>{statusMap[st].label}</SelectItem>)}</SelectContent></Select>
                </div>
              </div>
            </motion.div>
          )}
        </DialogContent>
      </Dialog>
    </motion.div>
  );
}
