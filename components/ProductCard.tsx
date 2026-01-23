import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { type Product } from "@shared/schema";
import { AddToCartButton } from "./AddToCartButton";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const images = product.images || [];
  const mainImage = images.length > 0 ? images[0] : null;

  return (
    <div className="group block h-full">
      <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 h-full border border-border/40 hover:border-primary/20 flex flex-col">
        <Link href={`/products/${product.slug}`} className="block">
          <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
            {mainImage ? (
              <img
                src={mainImage}
                alt={product.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gray-100 text-gray-400">
                No Image
              </div>
            )}
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />

            <div className="absolute bottom-4 right-4 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
              <span className="bg-white text-primary rounded-full p-2 shadow-lg inline-flex">
                <ArrowRight size={20} />
              </span>
            </div>
          </div>
        </Link>

        <div className="p-5 flex flex-col flex-grow">
          <Link href={`/products/${product.slug}`} className="block flex-grow">
            <p className="text-xs font-semibold tracking-wider text-primary/60 uppercase mb-2">
              {product.category}
            </p>
            <h3 className="font-serif text-xl font-medium text-foreground mb-2 group-hover:text-primary transition-colors">
              {product.title}
            </h3>
            <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
              {product.description}
            </p>
          </Link>

          <div className="flex items-center justify-between mt-auto pt-4 border-t border-border/50">
            <div className="flex flex-col gap-2">
              <span className="font-medium text-lg text-primary">
                {(product.priceCents / 100).toLocaleString('sr-RS')} {product.currency}
              </span>
              <AddToCartButton
                product={product}
                variant="outline"
                size="sm"
                className="w-full"
              />
            </div>
            <Link href={`/products/${product.slug}`}>
              <span className="text-sm text-primary/70 font-medium underline opacity-0 group-hover:opacity-100 transition-opacity">
                Detaljnije
              </span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
