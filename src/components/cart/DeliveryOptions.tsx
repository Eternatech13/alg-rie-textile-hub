import { motion } from 'framer-motion';
import { Truck, Zap, MapPin, Check, ChevronDown } from 'lucide-react';
import { useState } from 'react';
import { useCart, DELIVERY_OPTIONS, DeliveryOption } from '@/contexts/CartContext';
import { formatPrice } from '@/data/mockProducts';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';

const iconMap = {
  standard: Truck,
  express: Zap,
  pickup: MapPin,
};

const DeliveryOptionsComponent = () => {
  const { deliveryOption, setDeliveryOption } = useCart();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <CollapsibleTrigger className="w-full flex items-center justify-between p-4 hover:bg-muted/50 rounded-xl transition-colors">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-primary/10">
            <Truck className="w-5 h-5 text-primary" />
          </div>
          <div className="text-left">
            <h3 className="font-heading font-semibold text-base text-foreground">
              Options de livraison
            </h3>
            <p className="text-sm text-muted-foreground">
              {deliveryOption.name} - {formatPrice(deliveryOption.price)}
            </p>
          </div>
        </div>
        <ChevronDown className={`w-5 h-5 text-muted-foreground transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </CollapsibleTrigger>
      
      <CollapsibleContent className="pt-4 space-y-3">
        {DELIVERY_OPTIONS.map((option, index) => {
          const Icon = iconMap[option.id];
          const isSelected = deliveryOption.id === option.id;
          
          return (
            <motion.button
              key={option.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              onClick={() => setDeliveryOption(option)}
              className={`w-full p-3 rounded-lg border transition-all text-left ${
                isSelected
                  ? 'border-primary bg-primary/5'
                  : 'border-border hover:border-primary/50'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className={`p-1.5 rounded-lg ${isSelected ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}`}>
                  <Icon className="w-4 h-4" />
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium text-sm text-foreground">{option.name}</h4>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-sm text-primary">
                        {formatPrice(option.price)}
                      </span>
                      {isSelected && (
                        <div className="w-4 h-4 rounded-full bg-primary flex items-center justify-center">
                          <Check className="w-2.5 h-2.5 text-primary-foreground" />
                        </div>
                      )}
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {option.estimatedDays}
                  </p>
                </div>
              </div>
            </motion.button>
          );
        })}
      </CollapsibleContent>
    </Collapsible>
  );
};

export default DeliveryOptionsComponent;
