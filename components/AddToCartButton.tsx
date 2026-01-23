'use client';

import { useState } from 'react';
import { ShoppingCart, Check } from 'lucide-react';
import { useCart } from '@/hooks/use-cart';
import { type Product } from '@/shared/schema';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

interface AddToCartButtonProps {
  product: Product;
  quantity?: number;
  variant?: 'default' | 'outline' | 'secondary' | 'ghost' | 'destructive';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  className?: string;
  showText?: boolean;
}

export function AddToCartButton({
  product,
  quantity = 1,
  variant = 'default',
  size = 'default',
  className = '',
  showText = true
}: AddToCartButtonProps) {
  const { addItem, isInCart } = useCart();
  const { toast } = useToast();
  const [isAdding, setIsAdding] = useState(false);

  const handleAddToCart = () => {
    setIsAdding(true);

    // Simulate a brief loading state
    setTimeout(() => {
      addItem(product, quantity);
      setIsAdding(false);

      toast({
        title: "Dodano u korpu!",
        description: `${product.title} je dodat u vašu korpu.`,
        duration: 2000,
      });
    }, 300);
  };

  const isAlreadyInCart = isInCart(product.id);

  return (
    <Button
      onClick={handleAddToCart}
      disabled={isAdding}
      variant={isAlreadyInCart ? 'secondary' : variant}
      size={size}
      className={className}
    >
      {isAdding ? (
        <div className="animate-spin rounded-full h-4 w-4 border-2 border-current border-t-transparent" />
      ) : isAlreadyInCart ? (
        <>
          <Check size={16} className="mr-2" />
          {showText && "U korpi"}
        </>
      ) : (
        <>
          <ShoppingCart size={16} className="mr-2" />
          {showText && "Dodaj u korpu"}
        </>
      )}
    </Button>
  );
}