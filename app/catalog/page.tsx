import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { ProductCard } from "@/components/ProductCard";
import { Search, SlidersHorizontal } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Link from "next/link";
import { storage } from '@/lib/storage';

export const revalidate = 1800; // Revalidate every 30 minutes

export const metadata = {
  title: 'Katalog Nameštaja - Nameštaj Carevic Kragujevac',
  description: 'Pregledajte naš kompletan katalog nameštaja. Dnevna soba, spavaća soba, trpezarija i kancelarijski nameštaj po povoljnim cenama u Kragujevcu.',
  keywords: 'katalog nameštaja, nameštaj Kragujevac, kupi nameštaj, salon nameštaja, nameštaj katalog',
  openGraph: {
    title: 'Katalog Nameštaja - Nameštaj Carevic',
    description: 'Pregledajte naš kompletan katalog kvalitetnog nameštaja za dom i kancelariju.',
    type: 'website',
  },
};

async function getProducts(category?: string) {
  try {
    const products = await storage.getProducts(category);
    return products;
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
}

async function getCategories() {
  try {
    const categories = await storage.getCategories();
    return categories;
  } catch (error) {
    console.error('Error fetching categories:', error);
    return [];
  }
}

interface CatalogPageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function CatalogPage({ searchParams }: CatalogPageProps) {
  const resolvedSearchParams = await searchParams;
  const categoryParam = typeof resolvedSearchParams.category === 'string' ? resolvedSearchParams.category : undefined;

  // Fetch data server-side
  const [products, categories] = await Promise.all([
    getProducts(categoryParam),
    getCategories()
  ]);

  // Build categories list with "all" option
  const categoryOptions = [
    { value: "all", label: "Sve kategorije" },
    ...categories.map((cat: string) => ({ value: cat, label: cat })),
  ];

  const selectedCategory = categoryParam || "all";

  return (
    <div className="min-h-screen bg-background font-sans">
      <Navigation />

      {/* Header */}
      <div className="pt-32 pb-12 bg-brand-beige/30">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="font-serif text-4xl md:text-5xl font-bold text-primary mb-4">Katalog Proizvoda</h1>
            <p className="text-muted-foreground text-lg">
              Pronađite savršen nameštaj za vaš dom iz naše pažljivo odabrane kolekcije.
            </p>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="sticky top-20 z-30 bg-white/95 backdrop-blur-sm border-b border-border/50 shadow-sm">
        <div className="container mx-auto px-4 md:px-6 py-6">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Pretraži proizvode..."
                className="pl-10"
                disabled // Client-side search disabled for ISR - could be implemented with client component
              />
            </div>

            {/* Category Filter */}
            <div className="flex items-center gap-2">
              <SlidersHorizontal className="h-4 w-4 text-muted-foreground" />
              <Select defaultValue={selectedCategory}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Izaberite kategoriju" />
                </SelectTrigger>
                <SelectContent>
                  {categoryOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      <Link href={option.value === "all" ? "/catalog" : `/catalog?category=${option.value}`}>
                        {option.label}
                      </Link>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Results count */}
            <div className="text-sm text-muted-foreground">
              {products.length} proizvoda
            </div>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="container mx-auto px-4 md:px-6 py-12">
        {products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {products.map((product: any) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="max-w-md mx-auto">
              <h3 className="font-serif text-2xl font-bold text-primary mb-4">Nema proizvoda</h3>
              <p className="text-muted-foreground mb-6">
                Nismo pronašli proizvode koji odgovaraju vašim kriterijumima.
              </p>
              <Link href="/catalog">
                <button className="bg-primary text-primary-foreground px-6 py-2 rounded-lg font-medium hover:bg-primary/90 transition-colors">
                  Prikaži sve proizvode
                </button>
              </Link>
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}