import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Building2, MapPin, Phone, Mail, Globe, Award, Edit } from "lucide-react";
import { textileCompanyInfo } from "@/data/mockTextileCompanyData";

export default function TextileCompanyProfilePage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-foreground">Profil de la société</h2>
        <Button><Edit className="mr-2 h-4 w-4" /> Modifier</Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader><CardTitle>Informations générales</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div><Label>Nom de la société</Label><Input value={textileCompanyInfo.name} readOnly className="mt-1" /></div>
              <div><Label>Type</Label><Input value={textileCompanyInfo.type === "public" ? "Publique" : "Privée"} readOnly className="mt-1" /></div>
            </div>
            <div><Label>Description</Label><Textarea value={textileCompanyInfo.description} readOnly className="mt-1" rows={3} /></div>
            <div className="grid grid-cols-2 gap-4">
              <div><Label>Année de fondation</Label><Input value={textileCompanyInfo.foundedYear.toString()} readOnly className="mt-1" /></div>
              <div><Label>Nombre d'employés</Label><Input value={textileCompanyInfo.employeeCount.toString()} readOnly className="mt-1" /></div>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-4">
          <Card>
            <CardHeader><CardTitle>Contact</CardTitle></CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center gap-2 text-sm"><Phone className="h-4 w-4 text-muted-foreground" /><span className="text-foreground">{textileCompanyInfo.phone}</span></div>
              <div className="flex items-center gap-2 text-sm"><Mail className="h-4 w-4 text-muted-foreground" /><span className="text-foreground">{textileCompanyInfo.email}</span></div>
              <div className="flex items-center gap-2 text-sm"><Globe className="h-4 w-4 text-muted-foreground" /><span className="text-foreground">{textileCompanyInfo.website}</span></div>
              <div className="flex items-center gap-2 text-sm"><MapPin className="h-4 w-4 text-muted-foreground" /><span className="text-foreground">{textileCompanyInfo.address}</span></div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle className="flex items-center gap-2"><Award className="h-5 w-5" /> Certifications</CardTitle></CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {textileCompanyInfo.certifications.map((c) => (
                  <Badge key={c} variant="secondary">{c}</Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle>Domaines d'activité</CardTitle></CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {textileCompanyInfo.domains.map((d) => (
                  <Badge key={d} variant="outline">{d}</Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
