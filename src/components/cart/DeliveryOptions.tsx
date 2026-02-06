import { motion } from 'framer-motion';
import { Truck, Zap, MapPin, Check } from 'lucide-react';
import { useCart, DELIVERY_OPTIONS, DeliveryOption } from '@/contexts/CartContext';
import { formatPrice } from '@/data/mockProducts';

const iconMap = {
  standard: Truck,
  express: Zap,
  pickup: MapPin,
};

const DeliveryOptionsComponent = () => {
  const { deliveryOption, setDeliveryOption } = useCart();

  return (
    <div className="space-y-4">
      <h3 className="font-heading font-semibold text-lg text-foreground flex items-center gap-2">
        <Truck className="w-5 h-5 text-primary" />
        Options de livraison
      </h3>
      
      <div className="space-y-3">
        {DELIVERY_OPTIONS.map((option, index) => {
          const Icon = iconMap[option.id];
          const isSelected = deliveryOption.id === option.id;
          
          return (
            <motion.button
              key={option.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              onClick={() => setDeliveryOption(option)}
              className={`w-full p-4 rounded-xl border-2 transition-all text-left ${
                isSelected
                  ? 'border-primary bg-primary/5'
                  : 'border-border hover:border-primary/50'
              }`}
            >
              <div className="flex items-start gap-4">
                <div className={`p-2 rounded-lg ${isSelected ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}`}>
                  <Icon className="w-5 h-5" />
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium text-foreground">{option.name}</h4>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-primary">
                        {formatPrice(option.price)}
                      </span>
                      {isSelected && (
                        <div className="w-5 h-5 rounded-full bg-primary flex items-center justify-center">
                          <Check className="w-3 h-3 text-primary-foreground" />
                        </div>
                      )}
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    {option.description}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                    <span className="inline-block w-2 h-2 rounded-full bg-accent"></span>
                    Délai estimé: {option.estimatedDays}
                  </p>
                </div>
              </div>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
};

export default DeliveryOptionsComponent;
