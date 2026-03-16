import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { ProductCard } from "@/components/ProductCard";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { type Product } from "@shared/schema";
import { storage } from "@/lib/storage";
import { CATEGORIES, getCategoryBySlug } from "@/lib/categoryConfig";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

export const revalidate = 1800; // Revalidate every 30 minutes

// Generate static paths for all categories
export async function generateStaticParams() {
  return CATEGORIES.map((cat) => ({
    slug: cat.slug,
  }));
}

// Generate dynamic metadata per category
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);

  if (!category) {
    return { title: "Kategorija nije pronađena" };
  }

  return {
    title: `${category.displayName} - Nameštaj Carevic Kragujevac`,
    description: category.description,
    keywords: `${category.name}, nameštaj, Kragujevac, salon nameštaja, ${category.name} Kragujevac, kupi ${category.name}`,
    openGraph: {
      title: `${category.displayName} - Nameštaj Carevic`,
      description: category.description,
      type: "website",
      images: [{ url: category.image, width: 1200, height: 630 }],
    },
    alternates: {
      canonical: `/kategorija/${category.slug}`,
    },
  };
}

async function getCategoryProducts(categoryName: string) {
  try {
    const products = await storage.getProducts(categoryName);
    return products;
  } catch (error) {
    console.error("Error fetching category products:", error);
    return [];
  }
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);

  if (!category) {
    notFound();
  }

  const products = await getCategoryProducts(category.name);

  return (
    <div className="min-h-screen bg-background font-sans">
      <Navigation />

      {/* Hero Section */}
      <section className="relative h-[50vh] min-h-[360px] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src={category.image}
            alt={category.displayName}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/30" />
        </div>

        <div className="container mx-auto px-4 md:px-6 relative z-10 text-white">
          <div className="max-w-2xl">
            <nav className="flex items-center gap-2 text-sm text-white/70 mb-4">
              <Link href="/" className="hover:text-white transition-colors">
                Početna
              </Link>
              <span>/</span>
              <Link
                href="/catalog"
                className="hover:text-white transition-colors"
              >
                Katalog
              </Link>
              <span>/</span>
              <span className="text-white">{category.displayName}</span>
            </nav>
            <h1 className="font-serif text-4xl md:text-6xl font-bold mb-4">
              {category.displayName}
            </h1>
            <p className="text-lg md:text-xl text-white/90 font-light leading-relaxed max-w-lg">
              {category.shortDescription}
            </p>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex justify-between items-center mb-10">
            <p className="text-muted-foreground">
              {products.length}{" "}
              {products.length === 1 ? "proizvod" : "proizvoda"}
            </p>
            <Link
              href="/catalog"
              className="flex items-center gap-2 text-primary hover:text-primary/70 transition-colors text-sm"
            >
              <ArrowLeft size={16} />
              Nazad na katalog
            </Link>
          </div>

          {products.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {products.map((product: Product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <div className="max-w-md mx-auto">
                <h3 className="font-serif text-2xl font-bold text-primary mb-4">
                  Trenutno nema proizvoda
                </h3>
                <p className="text-muted-foreground mb-6">
                  U ovoj kategoriji trenutno nema dostupnih proizvoda. Pogledajte
                  naš kompletan katalog.
                </p>
                <Link href="/catalog">
                  <button className="bg-primary text-primary-foreground px-6 py-3 rounded-full font-medium hover:bg-primary/90 transition-colors flex items-center gap-2 mx-auto">
                    Pogledaj katalog
                    <ArrowRight size={16} />
                  </button>
                </Link>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Other Categories */}
      <section className="py-16 bg-brand-beige/30">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="font-serif text-3xl font-bold text-primary mb-10 text-center">
            Ostale kategorije
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {CATEGORIES.filter((c) => c.slug !== slug).map((cat) => (
              <Link
                key={cat.slug}
                href={`/kategorija/${cat.slug}`}
                className="group relative rounded-xl overflow-hidden aspect-[4/3] shadow-md hover:shadow-xl transition-shadow"
              >
                <Image
                  src={cat.image}
                  alt={cat.displayName}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                <span className="absolute bottom-3 left-3 right-3 text-white font-serif font-semibold text-sm md:text-base">
                  {cat.displayName}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
