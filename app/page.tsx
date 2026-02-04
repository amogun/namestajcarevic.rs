import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { ProductCard } from "@/components/ProductCard";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Star, Clock, Truck } from "lucide-react";
import { type Product } from "@shared/schema";
import { storage } from "@/lib/storage";

export const revalidate = 3600; // Revalidate every hour

async function getFeaturedProducts() {
  try {
    const products = await storage.getProducts();
    return products.slice(0, 4); // Return first 4 products
  } catch (error) {
    console.error('Error fetching featured products:', error);
    return [];
  }
}

export default async function Home() {
  const featuredProducts = await getFeaturedProducts();

  return (
    <div className="min-h-screen bg-background font-sans">
      <Navigation />

      {/* Hero Section */}
      <section className="relative h-[90vh] flex items-center overflow-hidden">
        {/* Living room interior warm wood tones */}
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=2000&auto=format&fit=crop"
            alt="Modern warm living room"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/20" />
        </div>

        <div className="container mx-auto px-4 md:px-6 relative z-10 text-white">
          <div className="max-w-2xl animate-in fade-in slide-in-from-bottom-8 duration-1000">
            <h1 className="font-serif text-5xl md:text-7xl font-bold mb-6 leading-tight">
              Elegancija koja <br /> oplemenjuje dom
            </h1>
            <p className="text-lg md:text-xl text-white/90 mb-10 font-light leading-relaxed max-w-lg">
              Nameštaj Carevic salon nameštaja donosi vrhunski dizajn i kvalitet u Vaš životni prostor. Tradicija duga 20 godina u srcu Kragujevca.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/catalog">
                <button className="px-8 py-4 bg-white text-primary rounded-full font-semibold hover:bg-brand-beige transition-colors flex items-center justify-center gap-2 shadow-xl hover:shadow-2xl hover:-translate-y-0.5 duration-300">
                  Pogledaj Katalog
                  <ArrowRight size={18} />
                </button>
              </Link>
              <Link href="/about">
                <button className="px-8 py-4 bg-transparent border border-white text-white rounded-full font-semibold hover:bg-white/10 transition-colors backdrop-blur-sm">
                  O Nama
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features / USPs */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-brand-beige rounded-full flex items-center justify-center text-primary mb-6">
                <Star size={32} />
              </div>
              <h3 className="font-serif text-xl font-bold mb-3">Vrhunski Kvalitet</h3>
              <p className="text-muted-foreground">Pažljivo birani materijali i vrhunska izrada za dugotrajnost svakog komada.</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-brand-beige rounded-full flex items-center justify-center text-primary mb-6">
                <Clock size={32} />
              </div>
              <h3 className="font-serif text-xl font-bold mb-3">Dugogodišnja Tradicija</h3>
              <p className="text-muted-foreground">Preko 20 godina iskustva u opremanju domova u Kragujevcu i okolini.</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-brand-beige rounded-full flex items-center justify-center text-primary mb-6">
                <Truck size={32} />
              </div>
              <h3 className="font-serif text-xl font-bold mb-3">Brza Isporuka</h3>
              <p className="text-muted-foreground">Profesionalna i sigurna dostava na Vašu adresu u najkraćem roku.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-24 bg-brand-beige/50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex justify-between items-end mb-12">
            <div>
              <p className="text-primary font-medium tracking-widest uppercase text-sm mb-2">Izdvajamo</p>
              <h2 className="font-serif text-4xl font-bold text-primary">Najprodavaniji Komadi</h2>
            </div>
            <Link href="/catalog">
              <span className="hidden md:flex items-center gap-2 text-primary hover:text-primary/70 transition-colors border-b border-primary/20 pb-1 cursor-pointer">
                Svi proizvodi <ArrowRight size={16} />
              </span>
            </Link>
          </div>

          {featuredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {featuredProducts.map((product: Product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="h-80 bg-gray-200 rounded-xl animate-pulse" />
              ))}
            </div>
          )}

          <div className="mt-12 text-center md:hidden">
            <Link href="/catalog">
              <button className="text-primary font-medium border-b border-primary pb-1">
                Pogledaj sve proizvode
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* About Teaser */}
      <section className="py-24 bg-primary text-white overflow-hidden">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div className="relative">
              <div className="absolute -top-10 -left-10 w-40 h-40 bg-white/5 rounded-full blur-3xl" />
              <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl aspect-[4/3]">
                {/* Showroom interior */}
                <Image
                  src="/showroom.jpg"
                  alt="Nameštaj Carevic Showroom"
                  fill
                  className="object-cover transform hover:scale-105 transition-transform duration-700"
                />
              </div>
            </div>
            <div>
              <h2 className="font-serif text-4xl font-bold mb-6">Više od salona nameštaja</h2>
              <p className="text-white/80 text-lg leading-relaxed mb-8">
                Salon nameštaja "Nameštaj Carevic" je porodična firma koja već dve decenije gradi poverenje sa svojim kupcima. Naša misija je da svaki dom pretvorimo u oazu mira i udobnosti.
              </p>
              <p className="text-white/80 text-lg leading-relaxed mb-8">
                Nalazimo se u Kragujevcu, gde na preko 500m² izložbenog prostora možete pronaći sve što vam je potrebno za opremanje dnevne sobe, spavaće sobe, trpezarije i kancelarije.
              </p>
              <Link href="/about">
                <button className="bg-white text-primary px-8 py-3 rounded-full font-semibold hover:bg-brand-beige transition-colors">
                  Saznajte više o nama
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}