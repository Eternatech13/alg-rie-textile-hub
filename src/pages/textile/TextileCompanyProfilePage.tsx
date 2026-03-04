import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Building2, MapPin, Phone, Mail, Globe, Award, Edit, Save, X } from "lucide-react";
import { textileCompanyInfo as initialInfo } from "@/data/mockTextileCompanyData";
import { useToast } from "@/hooks/use-toast";

const container = { hidden: {}, show: { transition: { staggerChildren: 0.1 } } };
const item = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { duration: 0.4 } } };

export default function TextileCompanyProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [info, setInfo] = useState(initialInfo);
  const [form, setForm] = useState(initialInfo);
  const { toast } = useToast();

  const startEdit = () => { setForm({ ...info }); setIsEditing(true); };
  const cancelEdit = () => { setForm({ ...info }); setIsEditing(false); };
  const saveEdit = () => { setInfo({ ...form }); setIsEditing(false); toast({ title: "Profil mis à jour", description: "Les informations de la société ont été enregistrées." }); };

  return (
    <motion.div className="space-y-6" variants={container} initial="hidden" animate="show">
      <motion.div variants={item} className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-foreground">Profil de la société</h2>
        <AnimatePresence mode="wait">
          {isEditing ? (
            <motion.div key="editing" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="flex gap-2">
              <Button variant="outline" onClick={cancelEdit}><X className="mr-2 h-4 w-4" /> Annuler</Button>
              <Button onClick={saveEdit}><Save className="mr-2 h-4 w-4" /> Enregistrer</Button>
            </motion.div>
          ) : (
            <motion.div key="view" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
              <Button onClick={startEdit}><Edit className="mr-2 h-4 w-4" /> Modifier</Button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      <motion.div variants={item} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader><CardTitle>Informations générales</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <motion.div animate={isEditing ? { borderColor: "hsl(var(--primary))" } : {}} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div><Label>Nom de la société</Label><Input value={isEditing ? form.name : info.name} readOnly={!isEditing} onChange={(e) => setForm({ ...form, name: e.target.value })} className="mt-1" /></div>
                <div><Label>Type</Label><Input value={info.type === "public" ? "Publique" : "Privée"} readOnly className="mt-1" /></div>
              </div>
              <div><Label>Description</Label><Textarea value={isEditing ? form.description : info.description} readOnly={!isEditing} onChange={(e) => setForm({ ...form, description: e.target.value })} className="mt-1" rows={3} /></div>
              <div className="grid grid-cols-2 gap-4">
                <div><Label>Téléphone</Label><Input value={isEditing ? form.phone : info.phone} readOnly={!isEditing} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="mt-1" /></div>
                <div><Label>Email</Label><Input value={isEditing ? form.email : info.email} readOnly={!isEditing} onChange={(e) => setForm({ ...form, email: e.target.value })} className="mt-1" /></div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div><Label>Site web</Label><Input value={isEditing ? form.website : info.website} readOnly={!isEditing} onChange={(e) => setForm({ ...form, website: e.target.value })} className="mt-1" /></div>
                <div><Label>Adresse</Label><Input value={isEditing ? form.address : info.address} readOnly={!isEditing} onChange={(e) => setForm({ ...form, address: e.target.value })} className="mt-1" /></div>
              </div>
            </motion.div>
          </CardContent>
        </Card>

        <motion.div variants={container} className="space-y-4">
          <motion.div variants={item}><Card><CardHeader><CardTitle>Contact</CardTitle></CardHeader><CardContent className="space-y-3">
            <div className="flex items-center gap-2 text-sm"><Phone className="h-4 w-4 text-muted-foreground" /><span className="text-foreground">{info.phone}</span></div>
            <div className="flex items-center gap-2 text-sm"><Mail className="h-4 w-4 text-muted-foreground" /><span className="text-foreground">{info.email}</span></div>
            <div className="flex items-center gap-2 text-sm"><Globe className="h-4 w-4 text-muted-foreground" /><span className="text-foreground">{info.website}</span></div>
            <div className="flex items-center gap-2 text-sm"><MapPin className="h-4 w-4 text-muted-foreground" /><span className="text-foreground">{info.address}</span></div>
          </CardContent></Card></motion.div>

          <motion.div variants={item}><Card><CardHeader><CardTitle className="flex items-center gap-2"><Award className="h-5 w-5" /> Certifications</CardTitle></CardHeader><CardContent><div className="flex flex-wrap gap-2">{info.certifications.map((c) => <Badge key={c} variant="secondary">{c}</Badge>)}</div></CardContent></Card></motion.div>

          <motion.div variants={item}><Card><CardHeader><CardTitle>Domaines d'activité</CardTitle></CardHeader><CardContent><div className="flex flex-wrap gap-2">{info.domains.map((d) => <Badge key={d} variant="outline">{d}</Badge>)}</div></CardContent></Card></motion.div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
