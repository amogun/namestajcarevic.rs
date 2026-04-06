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

      <div className="pt-32 pb-12 bg-brand-beige/30">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="font-serif text-4xl md:text-5xl font-bold text-primary mb-4">
              Blog
            </h1>
            <p className="text-muted-foreground text-lg">
              Saveti, vodiči i inspiracija za uređenje vašeg doma.
            </p>
          </div>
        </div>
      </div>

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
