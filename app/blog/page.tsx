import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { storage } from "@/lib/storage";
import type { BlogPost } from "@/shared/schema";
import Link from "next/link";
import Image from "next/image";

export const revalidate = 3600;

export const metadata = {
  title: "Blog - Nameštaj Carevic | Saveti i inspiracija za dom",
  description:
    "Saveti za uređenje doma, vodiči za kupovinu nameštaja i inspiracija za dnevnu sobu, spavaću sobu i trpezariju.",
  alternates: { canonical: "/blog" },
  openGraph: {
    title: "Blog - Nameštaj Carevic",
    description:
      "Saveti za uređenje doma, vodiči za kupovinu nameštaja i inspiracija.",
    type: "website",
    images: [{ url: "/home-showroom.jpg", width: 1200, height: 630 }],
  },
};

function formatDate(dateStr: string | null) {
  if (!dateStr) return "";
  return new Date(dateStr).toLocaleDateString("sr-RS", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default async function BlogPage() {
  let posts: BlogPost[] = [];
  try {
    posts = await storage.getBlogPosts();
  } catch {
    posts = [];
  }

  return (
    <div className="min-h-screen bg-background font-sans">
      <Navigation />

      {/* Hero */}
      <section className="relative h-[90vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=2000&auto=format&fit=crop"
            alt="Uređenje doma — Nameštaj Carevic blog"
            fill
            className="object-cover"
            priority
            unoptimized
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/65 to-black/25" />
        </div>
        <div className="container mx-auto px-4 md:px-6 relative z-10 text-white">
          <div className="max-w-2xl">
            <p className="text-sm uppercase tracking-widest text-white/70 mb-4 font-medium">
              Nameštaj Carevic
            </p>
            <h1 className="font-serif text-5xl md:text-7xl font-bold mb-6 leading-tight">
              Saveti i inspiracija za vaš dom
            </h1>
            <p className="text-lg md:text-xl text-white/85 font-light leading-relaxed max-w-lg">
              Vodiči za kupovinu, ideje za uređenje i saveti za održavanje nameštaja — sve na jednom mestu.
            </p>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 md:px-6 py-16">
        {posts.length === 0 ? (
          <div className="text-center py-16 text-muted-foreground">
            <p className="text-lg">Uskoro — prvi članci su u pripremi.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <Link
                key={post.id}
                href={`/blog/${post.slug}`}
                className="group flex flex-col bg-white rounded-2xl overflow-hidden border border-border/50 shadow-sm hover:shadow-md transition-shadow"
              >
                {post.cover_image ? (
                  <div className="relative aspect-[16/9] overflow-hidden">
                    <Image
                      src={post.cover_image}
                      alt={post.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                      unoptimized
                    />
                  </div>
                ) : (
                  <div className="aspect-[16/9] bg-brand-beige/40 flex items-center justify-center">
                    <span className="text-primary/30 font-serif text-2xl">NC</span>
                  </div>
                )}

                <div className="flex flex-col flex-1 p-6">
                  <div className="flex items-center gap-3 mb-3">
                    {post.category && (
                      <span className="text-xs font-medium uppercase tracking-widest text-primary/70 bg-primary/5 px-2 py-1 rounded-full">
                        {post.category}
                      </span>
                    )}
                    <span className="text-xs text-muted-foreground ml-auto">
                      {formatDate(post.published_at)}
                    </span>
                  </div>

                  <h2 className="font-serif text-xl font-bold text-primary mb-3 group-hover:text-primary/80 transition-colors leading-snug">
                    {post.title}
                  </h2>

                  <p className="text-muted-foreground text-sm leading-relaxed flex-1">
                    {post.excerpt}
                  </p>

                  <span className="mt-4 text-sm font-medium text-primary group-hover:underline">
                    Pročitaj više →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
