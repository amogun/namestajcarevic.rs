import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { ProductCartControls } from "@/components/ProductCartControls";
import { ArrowLeft, Check, Truck, Shield } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { normalizeDimensions } from "@/lib/dimensions";
import { ProductImageGallery } from "@/components/ProductImageGallery";
import { storage } from "@/lib/storage";

export const revalidate = 3600; // Revalidate every hour

async function getProduct(slug: string) {
  try {
    const product = await storage.getProductBySlug(slug);
    return product || null;
  } catch (error) {
    console.error('Error fetching product:', error);
    return null;
  }
}

interface ProductDetailPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({ params }: ProductDetailPageProps) {
  const { slug } = await params;
  const product = await getProduct(slug);

  if (!product) {
    return {
      title: 'Proizvod nije pronađen - Nameštaj Carevic',
    };
  }

  return {
    title: `${product.title} - Nameštaj Carevic`,
    description: product.description || `Pogledajte ${product.title} u našem katalogu. Kvalitetan nameštaj po povoljnim cenama.`,
    openGraph: {
      title: `${product.title} - Nameštaj Carevic`,
      description: product.description || `Pogledajte ${product.title} u našem katalogu.`,
      images: product.images?.[0] ? [{ url: product.images[0] }] : [],
    },
  };
}

// Generate structured data for product
function generateProductStructuredData(product: any) {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://namestajcarevic.rs';

  return {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": product.title,
    "description": product.description,
    "image": product.images?.map((img: string) => img.startsWith('http') ? img : `${baseUrl}${img}`) || [],
    "brand": {
      "@type": "Brand",
      "name": "Nameštaj Carevic"
    },
    "manufacturer": {
      "@type": "Organization",
      "name": "Nameštaj Carevic"
    },
    "category": product.category,
    "offers": {
      "@type": "Offer",
      "price": product.priceCents ? (product.priceCents / 100).toFixed(2) : "0.00",
      "priceCurrency": product.currency || "RSD",
      "availability": "https://schema.org/InStock",
      "seller": {
        "@type": "Organization",
        "name": "Nameštaj Carevic"
      }
    },
    ...(product.dimensions && {
      "additionalProperty": Object.entries(product.dimensions).map(([key, value]) => ({
        "@type": "PropertyValue",
        "name": key,
        "value": value
      }))
    }),
    ...(product.materials && {
      "material": product.materials
    }),
    ...(product.colors && {
      "color": Array.isArray(product.colors) ? product.colors.join(", ") : product.colors
    })
  };
}

// Generate breadcrumb structured data
function generateBreadcrumbStructuredData(product: any) {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://namestajcarevic.rs';

  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Početna",
        "item": baseUrl
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Katalog",
        "item": `${baseUrl}/catalog`
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": product.title,
        "item": `${baseUrl}/products/${product.slug}`
      }
    ]
  };
}

export default async function ProductDetailPage({ params }: ProductDetailPageProps) {
  const { slug } = await params;
  const product = await getProduct(slug);

  if (!product) {
    notFound();
  }

  const productStructuredData = generateProductStructuredData(product);
  const breadcrumbStructuredData = generateBreadcrumbStructuredData(product);

  // Normalize dimensions to handle different JSON structures
  const normalizedDimensions = normalizeDimensions(product.dimensions);

  return (
    <div className="min-h-screen bg-background font-sans">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(productStructuredData),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbStructuredData),
        }}
      />
      <Navigation />

      {/* Breadcrumb */}
      <div className="pt-24 pb-6 bg-brand-beige/20">
        <div className="container mx-auto px-4 md:px-6">
          <Link
            href="/catalog"
            className="inline-flex items-center gap-2 text-primary hover:text-primary/70 transition-colors mb-4"
          >
            <ArrowLeft size={16} />
            Nazad na katalog
          </Link>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-6 pb-12 pt-0">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            <ProductImageGallery images={product.images || []} title={product.title} />

            {/* Dimensions */}
            {normalizedDimensions.length > 0 && (
              <div className="bg-brand-beige/40 rounded-xl p-6 border border-border/50">
                <h3 className="font-serif text-lg font-bold text-primary mb-4">Dimenzije</h3>
                <div className="grid grid-cols-1 gap-3">
                  {normalizedDimensions.map((dimension, index) => (
                    <div key={index} className="flex justify-between items-center py-2">
                      <span className="text-sm text-muted-foreground">{dimension.label}</span>
                      <span className="font-medium">{dimension.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-8">
            <h1 className="font-serif text-3xl md:text-4xl font-bold text-primary">
              {product.title}
            </h1>
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-2xl font-bold text-primary">
                  {product.priceCents ? `${(product.priceCents / 100).toLocaleString('sr-RS')} RSD` : 'Cena na upit'}
                </span>
                {product.category && (
                  <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium">
                    {product.category}
                  </span>
                )}
              </div>

              {product.description && (
                <p className="text-muted-foreground text-lg leading-relaxed">
                  {product.description}
                </p>
              )}
            </div>

            {/* Additional Details */}
            {(product.materials || product.colors) && (
              <div>
                <h3 className="font-serif text-xl font-bold text-primary mb-4">Detalji</h3>
                <div className="space-y-3">
                  {product.materials && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Materijal:</span>
                      <span className="font-medium">{product.materials}</span>
                    </div>
                  )}
                  {product.colors && Array.isArray(product.colors) && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Boje:</span>
                      <span className="font-medium">{product.colors.join(', ')}</span>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Features */}
            <div className="flex flex-col gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-3">
                <Check size={18} className="text-green-600" />
                <span>Dostupno na lageru</span>
              </div>
              <div className="flex items-center gap-3">
                <Truck size={18} className="text-primary" />
                <span>Besplatna isporuka za Kragujevac</span>
              </div>
              <div className="flex items-center gap-3">
                <Shield size={18} className="text-primary" />
                <span>Garancija 2 godine</span>
              </div>
            </div>

            {/* Add to Cart */}
            <div className="pt-8 border-t border-border">
              <ProductCartControls product={product} />
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}