import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { ProductCard } from "@/components/ProductCard";
import { CatalogFilter } from "@/components/CatalogFilter";
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
  const searchQuery = typeof resolvedSearchParams.search === 'string' ? resolvedSearchParams.search.trim().toLowerCase() : '';

  // Fetch data server-side
  const [products, categories] = await Promise.all([
    getProducts(categoryParam),
    getCategories()
  ]);

  // Apply search filter server-side
  const filteredProducts = searchQuery
    ? products.filter((product: any) => {
        const title = (product.title || '').toLowerCase();
        const description = (product.description || '').toLowerCase();
        const category = (product.category || '').toLowerCase();
        return (
          title.includes(searchQuery) ||
          description.includes(searchQuery) ||
          category.includes(searchQuery)
        );
      })
    : products;

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

      {/* Filters - Client Component */}
      <CatalogFilter
        categories={categoryOptions}
        selectedCategory={selectedCategory}
        totalProducts={filteredProducts.length}
        allProducts={products.map((p: any) => ({
          id: p.id,
          title: p.title || '',
          category: p.category || null,
        }))}
      />

      {/* Products Grid */}
      <div className="container mx-auto px-4 md:px-6 py-12">
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredProducts.map((product: any) => (
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