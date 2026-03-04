import { useState } from 'react';
import { Tag, Check, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { mockPromoCodes } from '@/data/mockReviews';
import { useToast } from '@/hooks/use-toast';

interface PromoCodeInputProps {
  subtotal: number;
  onApply: (discount: number, code: string) => void;
  onRemove: () => void;
  appliedCode: string | null;
  appliedDiscount: number;
}

export default function PromoCodeInput({ subtotal, onApply, onRemove, appliedCode, appliedDiscount }: PromoCodeInputProps) {
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const { toast } = useToast();

  const handleApply = () => {
    const trimmed = code.trim().toUpperCase();
    if (!trimmed) return;

    const promo = mockPromoCodes.find(p => p.code === trimmed);
    if (!promo) {
      setError('Code promo invalide');
      return;
    }
    if (subtotal < promo.minAmount) {
      setError(`Minimum de commande : ${promo.minAmount.toLocaleString('fr-DZ')} DA`);
      return;
    }

    const discount = promo.type === 'percent'
      ? Math.round(subtotal * promo.discount / 100)
      : promo.discount;

    setError('');
    onApply(discount, trimmed);
    toast({ title: 'Code promo appliqué !', description: promo.description });
  };

  if (appliedCode) {
    return (
      <div className="flex items-center justify-between p-3 rounded-xl bg-green-50 border border-green-200">
        <div className="flex items-center gap-2">
          <Check className="w-4 h-4 text-green-600" />
          <span className="text-sm font-medium text-green-800">{appliedCode}</span>
          <span className="text-sm text-green-600">(-{appliedDiscount.toLocaleString('fr-DZ')} DA)</span>
        </div>
        <button onClick={onRemove} className="text-green-600 hover:text-green-800">
          <X className="w-4 h-4" />
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Tag className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Code promo"
            value={code}
            onChange={e => { setCode(e.target.value); setError(''); }}
            onKeyDown={e => e.key === 'Enter' && handleApply()}
            className="pl-10"
          />
        </div>
        <Button variant="outline" onClick={handleApply} disabled={!code.trim()}>
          Appliquer
        </Button>
      </div>
      {error && <p className="text-xs text-destructive">{error}</p>}
    </div>
  );
}
