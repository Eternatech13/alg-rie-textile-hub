import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { Shield, Bell, Eye, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const container = { hidden: {}, show: { transition: { staggerChildren: 0.1 } } };
const item = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { duration: 0.4 } } };

export default function TextileCompanySettings() {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [notifications, setNotifications] = useState({ orders: true, conventions: true, stock: true, reports: true });
  const [visibility, setVisibility] = useState({ publicProfile: true, showCapacity: true });
  const { toast } = useToast();

  const handlePasswordUpdate = () => {
    if (!newPassword || newPassword.length < 6) { toast({ title: "Erreur", description: "Le mot de passe doit contenir au moins 6 caractères.", variant: "destructive" }); return; }
    if (newPassword !== confirmPassword) { toast({ title: "Erreur", description: "Les mots de passe ne correspondent pas.", variant: "destructive" }); return; }
    setNewPassword(""); setConfirmPassword("");
    toast({ title: "Mot de passe mis à jour", description: "Votre mot de passe a été changé avec succès." });
  };

  const toggleNotification = (key: keyof typeof notifications) => {
    setNotifications((prev) => { const updated = { ...prev, [key]: !prev[key] }; toast({ title: updated[key] ? "Notification activée" : "Notification désactivée" }); return updated; });
  };

  const toggleVisibility = (key: keyof typeof visibility) => {
    setVisibility((prev) => { const updated = { ...prev, [key]: !prev[key] }; toast({ title: updated[key] ? "Activé" : "Désactivé" }); return updated; });
  };

  const handleDeleteAccount = () => { setDeleteOpen(false); toast({ title: "Demande envoyée", description: "Votre demande de suppression de compte a été transmise à l'administration." }); };

  const notifItems = [
    { key: "orders" as const, label: "Nouvelles commandes", desc: "Recevoir une notification pour chaque nouvelle commande" },
    { key: "conventions" as const, label: "Demandes de convention", desc: "Être notifié des demandes de collaboration" },
    { key: "stock" as const, label: "Alertes de stock", desc: "Notification quand un produit est en rupture" },
    { key: "reports" as const, label: "Rapports hebdomadaires", desc: "Recevoir un résumé des performances chaque semaine" },
  ];

  return (
    <motion.div className="space-y-6 max-w-3xl" variants={container} initial="hidden" animate="show">
      <motion.h2 variants={item} className="text-2xl font-bold text-foreground">Paramètres</motion.h2>

      <motion.div variants={item}>
        <Card>
          <CardHeader><CardTitle className="flex items-center gap-2"><Shield className="h-5 w-5" /> Sécurité</CardTitle><CardDescription>Gérez la sécurité de votre compte</CardDescription></CardHeader>
          <CardContent className="space-y-4">
            <div><Label>Email actuel</Label><Input value="contact@sotexal.dz" readOnly className="mt-1" /></div>
            <div><Label>Nouveau mot de passe</Label><Input type="password" placeholder="••••••••" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} className="mt-1" /></div>
            <div><Label>Confirmer le mot de passe</Label><Input type="password" placeholder="••••••••" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="mt-1" /></div>
            <Button onClick={handlePasswordUpdate}>Mettre à jour le mot de passe</Button>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div variants={item}>
        <Card>
          <CardHeader><CardTitle className="flex items-center gap-2"><Bell className="h-5 w-5" /> Notifications</CardTitle><CardDescription>Configurez vos préférences de notification</CardDescription></CardHeader>
          <CardContent className="space-y-4">
            {notifItems.map((ni, index) => (
              <motion.div key={ni.key} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 + index * 0.05 }} className="flex items-center justify-between">
                <div><p className="text-sm font-medium text-foreground">{ni.label}</p><p className="text-sm text-muted-foreground">{ni.desc}</p></div>
                <Switch checked={notifications[ni.key]} onCheckedChange={() => toggleNotification(ni.key)} />
              </motion.div>
            ))}
          </CardContent>
        </Card>
      </motion.div>

      <motion.div variants={item}>
        <Card>
          <CardHeader><CardTitle className="flex items-center gap-2"><Eye className="h-5 w-5" /> Visibilité</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between"><div><p className="text-sm font-medium text-foreground">Profil public</p><p className="text-sm text-muted-foreground">Votre société apparaît dans le répertoire</p></div><Switch checked={visibility.publicProfile} onCheckedChange={() => toggleVisibility("publicProfile")} /></div>
            <div className="flex items-center justify-between"><div><p className="text-sm font-medium text-foreground">Afficher les capacités</p><p className="text-sm text-muted-foreground">Montrer les infos de capacité de production</p></div><Switch checked={visibility.showCapacity} onCheckedChange={() => toggleVisibility("showCapacity")} /></div>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div variants={item} whileHover={{ scale: 1.01 }}>
        <Card className="border-destructive/30">
          <CardHeader><CardTitle className="flex items-center gap-2 text-destructive"><Trash2 className="h-5 w-5" /> Zone de danger</CardTitle></CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">La suppression de votre compte est irréversible.</p>
            <Button variant="destructive" onClick={() => setDeleteOpen(true)}>Supprimer le compte</Button>
          </CardContent>
        </Card>
      </motion.div>

      <AlertDialog open={deleteOpen} onOpenChange={setDeleteOpen}>
        <AlertDialogContent><AlertDialogHeader><AlertDialogTitle>Supprimer votre compte ?</AlertDialogTitle><AlertDialogDescription>Cette action est irréversible. Toutes vos données, produits et commandes seront perdues.</AlertDialogDescription></AlertDialogHeader><AlertDialogFooter><AlertDialogCancel>Annuler</AlertDialogCancel><AlertDialogAction onClick={handleDeleteAccount} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">Supprimer définitivement</AlertDialogAction></AlertDialogFooter></AlertDialogContent>
      </AlertDialog>
    </motion.div>
  );
}
