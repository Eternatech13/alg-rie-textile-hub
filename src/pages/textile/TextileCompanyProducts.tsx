import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { Plus, Search, Edit, Trash2 } from "lucide-react";
import { textileProducts as initialProducts, productionUnits } from "@/data/mockTextileCompanyData";
import { useToast } from "@/hooks/use-toast";

type Product = typeof initialProducts[0];

export default function TextileCompanyProducts() {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [search, setSearch] = useState("");
  const [filterUnit, setFilterUnit] = useState("all");
  const [addOpen, setAddOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [form, setForm] = useState({ name: "", category: "Textile professionnel", unitId: productionUnits[0]?.id || "", price: "0", stock: "0", variants: "1" });
  const { toast } = useToast();

  const categories = ["Textile professionnel", "Textile médical", "Textile traditionnel"];

  const resetForm = () => setForm({ name: "", category: "Textile professionnel", unitId: productionUnits[0]?.id || "", price: "0", stock: "0", variants: "1" });

  const filtered = products.filter((p) => {
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase());
    const matchUnit = filterUnit === "all" || p.unitId === filterUnit;
    return matchSearch && matchUnit;
  });

  const statusMap: Record<string, { label: string; variant: "default" | "secondary" | "destructive" | "outline" }> = {
    active: { label: "Actif", variant: "default" },
    out_of_stock: { label: "Rupture", variant: "destructive" },
    draft: { label: "Brouillon", variant: "outline" },
  };

  const handleAdd = () => {
    if (!form.name.trim()) { toast({ title: "Erreur", description: "Le nom est requis.", variant: "destructive" }); return; }
    const unit = productionUnits.find((u) => u.id === form.unitId);
    const newProduct: Product = {
      id: `tp-${Date.now()}`,
      name: form.name,
      category: form.category,
      unitId: form.unitId,
      unitName: unit?.name || "",
      price: parseInt(form.price) || 0,
      stock: parseInt(form.stock) || 0,
      status: "draft",
      variants: parseInt(form.variants) || 1,
      sales: 0,
      image: "/placeholder.svg",
    };
    setProducts((prev) => [...prev, newProduct]);
    setAddOpen(false);
    resetForm();
    toast({ title: "Produit ajouté", description: `"${newProduct.name}" a été créé en brouillon.` });
  };

  const openEdit = (p: Product) => {
    setSelectedProduct(p);
    setForm({ name: p.name, category: p.category, unitId: p.unitId, price: p.price.toString(), stock: p.stock.toString(), variants: p.variants.toString() });
    setEditOpen(true);
  };

  const handleEdit = () => {
    if (!selectedProduct || !form.name.trim()) return;
    const unit = productionUnits.find((u) => u.id === form.unitId);
    setProducts((prev) => prev.map((p) => p.id === selectedProduct.id ? { ...p, name: form.name, category: form.category, unitId: form.unitId, unitName: unit?.name || p.unitName, price: parseInt(form.price) || p.price, stock: parseInt(form.stock) || p.stock, variants: parseInt(form.variants) || p.variants, status: parseInt(form.stock) === 0 ? "out_of_stock" : p.status === "out_of_stock" ? "active" : p.status } : p));
    setEditOpen(false);
    toast({ title: "Produit modifié", description: `"${form.name}" a été mis à jour.` });
  };

  const openDelete = (p: Product) => { setSelectedProduct(p); setDeleteOpen(true); };

  const handleDelete = () => {
    if (!selectedProduct) return;
    setProducts((prev) => prev.filter((p) => p.id !== selectedProduct.id));
    setDeleteOpen(false);
    toast({ title: "Produit supprimé", description: `"${selectedProduct.name}" a été supprimé.` });
  };

  const renderFormFields = () => (
    <div className="space-y-4">
      <div><Label>Nom du produit</Label><Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="mt-1" /></div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label>Catégorie</Label>
          <Select value={form.category} onValueChange={(v) => setForm({ ...form, category: v })}>
            <SelectTrigger className="mt-1"><SelectValue /></SelectTrigger>
            <SelectContent>{categories.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}</SelectContent>
          </Select>
        </div>
        <div>
          <Label>Unité de production</Label>
          <Select value={form.unitId} onValueChange={(v) => setForm({ ...form, unitId: v })}>
            <SelectTrigger className="mt-1"><SelectValue /></SelectTrigger>
            <SelectContent>{productionUnits.map((u) => <SelectItem key={u.id} value={u.id}>{u.name}</SelectItem>)}</SelectContent>
          </Select>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-4">
        <div><Label>Prix (DA)</Label><Input type="number" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} className="mt-1" /></div>
        <div><Label>Stock</Label><Input type="number" value={form.stock} onChange={(e) => setForm({ ...form, stock: e.target.value })} className="mt-1" /></div>
        <div><Label>Variantes</Label><Input type="number" value={form.variants} onChange={(e) => setForm({ ...form, variants: e.target.value })} className="mt-1" /></div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-foreground">Produits</h2>
        <Button onClick={() => { resetForm(); setAddOpen(true); }}><Plus className="mr-2 h-4 w-4" /> Ajouter un produit</Button>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Rechercher un produit..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-10" />
            </div>
            <Select value={filterUnit} onValueChange={setFilterUnit}>
              <SelectTrigger className="w-[200px]"><SelectValue placeholder="Toutes les unités" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Toutes les unités</SelectItem>
                {productionUnits.map((u) => <SelectItem key={u.id} value={u.id}>{u.name}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Produit</TableHead>
                <TableHead>Catégorie</TableHead>
                <TableHead>Unité</TableHead>
                <TableHead className="text-right">Prix</TableHead>
                <TableHead className="text-right">Stock</TableHead>
                <TableHead className="text-right">Ventes</TableHead>
                <TableHead>Statut</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((product) => {
                const s = statusMap[product.status] || { label: product.status, variant: "outline" as const };
                return (
                  <TableRow key={product.id}>
                    <TableCell className="font-medium">{product.name}</TableCell>
                    <TableCell className="text-muted-foreground">{product.category}</TableCell>
                    <TableCell className="text-muted-foreground">{product.unitName}</TableCell>
                    <TableCell className="text-right">{product.price.toLocaleString()} DA</TableCell>
                    <TableCell className="text-right">{product.stock}</TableCell>
                    <TableCell className="text-right">{product.sales}</TableCell>
                    <TableCell><Badge variant={s.variant}>{s.label}</Badge></TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => openEdit(product)}><Edit className="h-4 w-4" /></Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive" onClick={() => openDelete(product)}><Trash2 className="h-4 w-4" /></Button>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Dialog open={addOpen} onOpenChange={setAddOpen}>
        <DialogContent><DialogHeader><DialogTitle>Ajouter un produit</DialogTitle></DialogHeader>{renderFormFields()}<DialogFooter><Button variant="outline" onClick={() => setAddOpen(false)}>Annuler</Button><Button onClick={handleAdd}>Ajouter</Button></DialogFooter></DialogContent>
      </Dialog>
      <Dialog open={editOpen} onOpenChange={setEditOpen}>
        <DialogContent><DialogHeader><DialogTitle>Modifier le produit</DialogTitle></DialogHeader>{renderFormFields()}<DialogFooter><Button variant="outline" onClick={() => setEditOpen(false)}>Annuler</Button><Button onClick={handleEdit}>Enregistrer</Button></DialogFooter></DialogContent>
      </Dialog>
      <AlertDialog open={deleteOpen} onOpenChange={setDeleteOpen}>
        <AlertDialogContent>
          <AlertDialogHeader><AlertDialogTitle>Supprimer le produit ?</AlertDialogTitle><AlertDialogDescription>Le produit "{selectedProduct?.name}" sera définitivement supprimé.</AlertDialogDescription></AlertDialogHeader>
          <AlertDialogFooter><AlertDialogCancel>Annuler</AlertDialogCancel><AlertDialogAction onClick={handleDelete} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">Supprimer</AlertDialogAction></AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
