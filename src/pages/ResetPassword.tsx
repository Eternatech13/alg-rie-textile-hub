import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, Loader2, CheckCircle } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export default function ResetPassword() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast({ title: 'Erreur', description: 'Les mots de passe ne correspondent pas.', variant: 'destructive' });
      return;
    }
    setLoading(true);
    const { error } = await supabase.auth.updateUser({ password });
    setLoading(false);
    if (error) {
      toast({ title: 'Erreur', description: error.message, variant: 'destructive' });
    } else {
      setDone(true);
      toast({ title: 'Mot de passe mis à jour' });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5 flex flex-col">
      <Header />
      <main className="flex-1 flex items-center justify-center py-20 px-4 mt-16">
        <div className="w-full max-w-md">
          {done ? (
            <div className="text-center">
              <CheckCircle className="w-16 h-16 mx-auto text-green-600 mb-4" />
              <h1 className="text-2xl font-heading font-bold text-foreground mb-2">Mot de passe réinitialisé</h1>
              <p className="text-muted-foreground mb-6">Vous pouvez maintenant vous connecter.</p>
              <Button onClick={() => navigate('/connexion-client')} className="bg-primary hover:bg-primary/90">Se connecter</Button>
            </div>
          ) : (
            <>
              <div className="text-center mb-8">
                <Lock className="w-12 h-12 mx-auto text-primary mb-3" />
                <h1 className="text-2xl font-heading font-bold text-foreground mb-2">Nouveau mot de passe</h1>
                <p className="text-muted-foreground text-sm">Entrez votre nouveau mot de passe</p>
              </div>
              <Card className="shadow-xl border-0">
                <CardContent className="pt-6 pb-6 px-6">
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <Label>Nouveau mot de passe</Label>
                      <Input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Min. 6 caractères" className="mt-1" required minLength={6} />
                    </div>
                    <div>
                      <Label>Confirmer</Label>
                      <Input type="password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} placeholder="Confirmez" className="mt-1" required />
                      {confirmPassword && password !== confirmPassword && <p className="text-sm text-destructive mt-1">Les mots de passe ne correspondent pas</p>}
                    </div>
                    <Button type="submit" disabled={loading || password.length < 6 || password !== confirmPassword} className="w-full bg-primary hover:bg-primary/90">
                      {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                      Réinitialiser
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
