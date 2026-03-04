import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Phone, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';

export default function SupportWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [name, setName] = useState('');
  const [sent, setSent] = useState(false);
  const { toast } = useToast();

  const handleSend = () => {
    if (!message.trim() || !name.trim()) return;
    setSent(true);
    toast({ title: 'Message envoyé', description: 'Notre équipe vous répondra sous 24h.' });
    setTimeout(() => { setSent(false); setMessage(''); setName(''); setIsOpen(false); }, 3000);
  };

  return (
    <>
      {/* Floating button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-primary text-primary-foreground shadow-lg flex items-center justify-center"
      >
        {isOpen ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
      </motion.button>

      {/* Chat panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-24 right-6 z-50 w-80 bg-card rounded-2xl border border-border shadow-xl overflow-hidden"
          >
            <div className="bg-primary p-4">
              <h3 className="font-heading font-semibold text-primary-foreground">Support Client</h3>
              <p className="text-sm text-primary-foreground/80">Nous sommes là pour vous aider</p>
            </div>

            {sent ? (
              <div className="p-6 text-center">
                <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-3">
                  <Send className="w-6 h-6 text-green-600" />
                </div>
                <p className="font-medium text-foreground">Message envoyé !</p>
                <p className="text-sm text-muted-foreground mt-1">Réponse sous 24h</p>
              </div>
            ) : (
              <div className="p-4 space-y-3">
                <Input
                  placeholder="Votre nom"
                  value={name}
                  onChange={e => setName(e.target.value)}
                />
                <Textarea
                  placeholder="Votre message..."
                  value={message}
                  onChange={e => setMessage(e.target.value)}
                  rows={3}
                />
                <Button className="w-full" onClick={handleSend} disabled={!message.trim() || !name.trim()}>
                  <Send className="w-4 h-4 mr-2" /> Envoyer
                </Button>
                <div className="flex justify-center gap-4 pt-2 border-t border-border">
                  <a href="tel:+213555000000" className="flex items-center gap-1 text-xs text-muted-foreground hover:text-primary">
                    <Phone className="w-3 h-3" /> 0555 000 000
                  </a>
                  <a href="mailto:support@salaatebladi.dz" className="flex items-center gap-1 text-xs text-muted-foreground hover:text-primary">
                    <Mail className="w-3 h-3" /> Email
                  </a>
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
