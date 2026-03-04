import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Ruler } from 'lucide-react';

const sizeData = [
  { size: 'XS', chest: '82-86', waist: '62-66', hips: '86-90' },
  { size: 'S', chest: '86-90', waist: '66-70', hips: '90-94' },
  { size: 'M', chest: '90-94', waist: '70-74', hips: '94-98' },
  { size: 'L', chest: '94-98', waist: '74-78', hips: '98-102' },
  { size: 'XL', chest: '98-102', waist: '78-82', hips: '102-106' },
  { size: 'XXL', chest: '102-106', waist: '82-86', hips: '106-110' },
];

export default function SizeGuideModal({ children }: { children: React.ReactNode }) {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Ruler className="h-5 w-5 text-primary" />
            Guide des tailles
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">Toutes les mesures sont en centimètres (cm).</p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-2 px-3 font-medium text-foreground">Taille</th>
                  <th className="text-center py-2 px-3 font-medium text-foreground">Poitrine</th>
                  <th className="text-center py-2 px-3 font-medium text-foreground">Taille</th>
                  <th className="text-center py-2 px-3 font-medium text-foreground">Hanches</th>
                </tr>
              </thead>
              <tbody>
                {sizeData.map(row => (
                  <tr key={row.size} className="border-b border-border last:border-0">
                    <td className="py-2 px-3 font-semibold text-primary">{row.size}</td>
                    <td className="py-2 px-3 text-center text-muted-foreground">{row.chest}</td>
                    <td className="py-2 px-3 text-center text-muted-foreground">{row.waist}</td>
                    <td className="py-2 px-3 text-center text-muted-foreground">{row.hips}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="p-3 rounded-xl bg-muted/20 text-xs text-muted-foreground">
            <p className="font-medium text-foreground mb-1">Comment mesurer ?</p>
            <ul className="space-y-1">
              <li>• <strong>Poitrine :</strong> Tour de poitrine au niveau le plus large</li>
              <li>• <strong>Taille :</strong> Tour de taille naturelle (partie la plus fine)</li>
              <li>• <strong>Hanches :</strong> Tour de hanches au niveau le plus large</li>
            </ul>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
