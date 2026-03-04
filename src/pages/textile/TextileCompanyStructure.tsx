import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { Building2, MapPin, Users, Package, ShoppingCart, Plus, Edit, Power } from "lucide-react";
import { textileCompanyInfo, productionUnits as initialUnits } from "@/data/mockTextileCompanyData";
import { useToast } from "@/hooks/use-toast";

type Unit = typeof initialUnits[0];

const wilayas = ["Alger", "Oran", "Constantine", "Tlemcen", "Annaba", "Sétif", "Blida", "Béjaïa"];
const specialties = ["Textile professionnel", "Textile médical", "Textile traditionnel", "Textile technique"];

export default function TextileCompanyStructure() {
  const [units, setUnits] = useState<Unit[]>(initialUnits);
  const [addOpen, setAddOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [toggleOpen, setToggleOpen] = useState(false);
  const [selectedUnit, setSelectedUnit] = useState<Unit | null>(null);
  const [form, setForm] = useState({ name: "", location: "", wilaya: "Alger", specialty: "Textile professionnel", monthlyCapacity: "5000", employeeCount: "100" });
  const { toast } = useToast();

  const resetForm = () => setForm({ name: "", location: "", wilaya: "Alger", specialty: "Textile professionnel", monthlyCapacity: "5000", employeeCount: "100" });

  const handleAdd = () => {
    if (!form.name.trim()) { toast({ title: "Erreur", description: "Le nom est requis.", variant: "destructive" }); return; }
    const newUnit: Unit = {
      id: `unit-${Date.now()}`,
      name: form.name,
      location: form.location,
      wilaya: form.wilaya,
      specialty: form.specialty,
      monthlyCapacity: parseInt(form.monthlyCapacity) || 5000,
      currentLoad: 0,
      employeeCount: parseInt(form.employeeCount) || 100,
      status: "active",
      productsCount: 0,
      ordersCount: 0,
    };
    setUnits((prev) => [...prev, newUnit]);
    setAddOpen(false);
    resetForm();
    toast({ title: "Unité ajoutée", description: `"${newUnit.name}" a été créée avec succès.` });
  };

  const openEdit = (unit: Unit) => {
    setSelectedUnit(unit);
    setForm({ name: unit.name, location: unit.location, wilaya: unit.wilaya, specialty: unit.specialty, monthlyCapacity: unit.monthlyCapacity.toString(), employeeCount: unit.employeeCount.toString() });
    setEditOpen(true);
  };

  const handleEdit = () => {
    if (!selectedUnit || !form.name.trim()) return;
    setUnits((prev) => prev.map((u) => u.id === selectedUnit.id ? { ...u, name: form.name, location: form.location, wilaya: form.wilaya, specialty: form.specialty, monthlyCapacity: parseInt(form.monthlyCapacity) || u.monthlyCapacity, employeeCount: parseInt(form.employeeCount) || u.employeeCount } : u));
    setEditOpen(false);
    toast({ title: "Unité modifiée", description: `"${form.name}" a été mise à jour.` });
  };

  const openToggle = (unit: Unit) => { setSelectedUnit(unit); setToggleOpen(true); };

  const handleToggle = () => {
    if (!selectedUnit) return;
    const newStatus = selectedUnit.status === "active" ? "inactive" : "active";
    setUnits((prev) => prev.map((u) => u.id === selectedUnit.id ? { ...u, status: newStatus as "active" | "inactive" } : u));
    setToggleOpen(false);
    toast({ title: newStatus === "active" ? "Unité activée" : "Unité désactivée", description: `"${selectedUnit.name}" est maintenant ${newStatus === "active" ? "active" : "inactive"}.` });
  };

  const renderFormFields = () => (
    <div className="space-y-4">
      <div><Label>Nom de l'unité</Label><Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="mt-1" placeholder="Ex: Unité Sétif" /></div>
      <div><Label>Adresse</Label><Input value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} className="mt-1" placeholder="Ex: Zone Industrielle, Sétif" /></div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label>Wilaya</Label>
          <Select value={form.wilaya} onValueChange={(v) => setForm({ ...form, wilaya: v })}>
            <SelectTrigger className="mt-1"><SelectValue /></SelectTrigger>
            <SelectContent>{wilayas.map((w) => <SelectItem key={w} value={w}>{w}</SelectItem>)}</SelectContent>
          </Select>
        </div>
        <div>
          <Label>Spécialité</Label>
          <Select value={form.specialty} onValueChange={(v) => setForm({ ...form, specialty: v })}>
            <SelectTrigger className="mt-1"><SelectValue /></SelectTrigger>
            <SelectContent>{specialties.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}</SelectContent>
          </Select>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div><Label>Capacité mensuelle</Label><Input type="number" value={form.monthlyCapacity} onChange={(e) => setForm({ ...form, monthlyCapacity: e.target.value })} className="mt-1" /></div>
        <div><Label>Nombre d'employés</Label><Input type="number" value={form.employeeCount} onChange={(e) => setForm({ ...form, employeeCount: e.target.value })} className="mt-1" /></div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-foreground">Structure & Unités de production</h2>
        <Button onClick={() => { resetForm(); setAddOpen(true); }}><Plus className="mr-2 h-4 w-4" /> Ajouter une unité</Button>
      </div>

      <Card className="border-primary/20 bg-primary/5">
        <CardContent className="pt-6">
          <div className="flex items-start gap-4">
            <div className="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
              <Building2 className="w-8 h-8 text-primary" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-xl font-bold text-foreground">{textileCompanyInfo.name}</h3>
              <p className="text-sm text-muted-foreground mb-2">{textileCompanyInfo.type === "public" ? "Entreprise publique" : "Entreprise privée"} · Fondée en {textileCompanyInfo.foundedYear}</p>
              <div className="flex flex-wrap gap-2">
                {textileCompanyInfo.domains.map((d) => <Badge key={d} variant="secondary">{d}</Badge>)}
              </div>
              <div className="flex gap-6 mt-3 text-sm text-muted-foreground">
                <span className="flex items-center gap-1"><MapPin className="h-4 w-4" />{textileCompanyInfo.wilaya}</span>
                <span className="flex items-center gap-1"><Users className="h-4 w-4" />{textileCompanyInfo.employeeCount} employés</span>
                <span className="flex items-center gap-1"><Building2 className="h-4 w-4" />{units.length} unités</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {units.map((unit) => {
          const loadPercent = Math.round((unit.currentLoad / unit.monthlyCapacity) * 100);
          return (
            <Card key={unit.id} className={unit.status === "inactive" ? "opacity-60" : ""}>
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-base">{unit.name}</CardTitle>
                    <p className="text-sm text-muted-foreground flex items-center gap-1 mt-1"><MapPin className="h-3 w-3" /> {unit.wilaya}</p>
                  </div>
                  <div className="flex gap-1">
                    <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => openEdit(unit)}><Edit className="h-4 w-4" /></Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => openToggle(unit)}><Power className="h-4 w-4" /></Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Badge variant="outline">{unit.specialty}</Badge>
                  <Badge variant={unit.status === "active" ? "default" : "secondary"} className="ml-2">{unit.status === "active" ? "Actif" : "Inactif"}</Badge>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1"><span className="text-muted-foreground">Capacité utilisée</span><span className="font-medium text-foreground">{loadPercent}%</span></div>
                  <Progress value={loadPercent} className="h-2" />
                  <p className="text-xs text-muted-foreground mt-1">{unit.currentLoad.toLocaleString()} / {unit.monthlyCapacity.toLocaleString()} unités/mois</p>
                </div>
                <div className="grid grid-cols-3 gap-3 pt-2 border-t border-border">
                  <div className="text-center"><p className="text-lg font-bold text-foreground">{unit.employeeCount}</p><p className="text-xs text-muted-foreground">Employés</p></div>
                  <div className="text-center"><p className="text-lg font-bold text-foreground">{unit.productsCount}</p><p className="text-xs text-muted-foreground">Produits</p></div>
                  <div className="text-center"><p className="text-lg font-bold text-foreground">{unit.ordersCount}</p><p className="text-xs text-muted-foreground">Commandes</p></div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Add Dialog */}
      <Dialog open={addOpen} onOpenChange={setAddOpen}>
        <DialogContent>
          <DialogHeader><DialogTitle>Ajouter une unité de production</DialogTitle></DialogHeader>
          {renderFormFields()}
          <DialogFooter><Button variant="outline" onClick={() => setAddOpen(false)}>Annuler</Button><Button onClick={handleAdd}>Ajouter</Button></DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Dialog */}
      <Dialog open={editOpen} onOpenChange={setEditOpen}>
        <DialogContent>
          <DialogHeader><DialogTitle>Modifier l'unité</DialogTitle></DialogHeader>
          {renderFormFields()}
          <DialogFooter><Button variant="outline" onClick={() => setEditOpen(false)}>Annuler</Button><Button onClick={handleEdit}>Enregistrer</Button></DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Toggle Confirm */}
      <AlertDialog open={toggleOpen} onOpenChange={setToggleOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{selectedUnit?.status === "active" ? "Désactiver" : "Activer"} l'unité ?</AlertDialogTitle>
            <AlertDialogDescription>
              {selectedUnit?.status === "active"
                ? `L'unité "${selectedUnit?.name}" ne pourra plus recevoir de commandes.`
                : `L'unité "${selectedUnit?.name}" sera de nouveau opérationnelle.`}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter><AlertDialogCancel>Annuler</AlertDialogCancel><AlertDialogAction onClick={handleToggle}>Confirmer</AlertDialogAction></AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
