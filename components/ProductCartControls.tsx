'use client';

import { useState } from 'react';
import { Minus, Plus } from 'lucide-react';
import { AddToCartButton } from './AddToCartButton';
import { type Product } from '@/shared/schema';
import { Button } from '@/components/ui/button';

interface ProductCartControlsProps {
  product: Product;
}

export function ProductCartControls({ product }: ProductCartControlsProps) {
  const [quantity, setQuantity] = useState(1);

  const increaseQuantity = () => setQuantity(prev => prev + 1);
  const decreaseQuantity = () => setQuantity(prev => prev > 1 ? prev - 1 : 1);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-muted-foreground">Količina:</span>
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8"
            onClick={decreaseQuantity}
            disabled={quantity <= 1}
          >
            <Minus size={16} />
          </Button>
          <span className="w-8 text-center font-medium">{quantity}</span>
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8"
            onClick={increaseQuantity}
          >
            <Plus size={16} />
          </Button>
        </div>
      </div>

      <AddToCartButton
        product={product}
        quantity={quantity}
        className="w-full py-3 text-base font-medium"
      />
    </div>
  );
}