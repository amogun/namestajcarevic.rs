import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { storage } from "@/lib/storage";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import ReactMarkdown from "react-markdown";
import { ArrowLeft } from "lucide-react";

export const revalidate = 3600;

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  try {
    const posts = await storage.getBlogPosts();
    return posts.map((p) => ({ slug: p.slug }));
  } catch {
    return [];
  }
}

export async function generateMetadata({ params }: BlogPostPageProps) {
  const { slug } = await params;
  let post;
  try {
    post = await storage.getBlogPostBySlug(slug);
  } catch {
    return { title: "Blog - Nameštaj Carevic" };
  }

  if (!post) return { title: "Blog - Nameštaj Carevic" };

  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL || "https://namestajcarevic.rs";
  const ogImage = post.cover_image
    ? { url: post.cover_image, width: 1200, height: 630, alt: post.title }
    : { url: "/home-showroom.jpg", width: 1200, height: 630, alt: post.title };

  return {
    title: `${post.title} - Nameštaj Carevic`,
    description: post.excerpt,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.published_at || undefined,
      modifiedTime: post.updated_at || undefined,
      authors: [post.author],
      images: [ogImage],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: [ogImage.url],
    },
  };
}

function formatDate(dateStr: string | null) {
  if (!dateStr) return "";
  return new Date(dateStr).toLocaleDateString("sr-RS", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function generateArticleSchema(post: any, baseUrl: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    author: {
      "@type": "Organization",
      name: post.author,
      url: baseUrl,
    },
    publisher: {
      "@type": "Organization",
      name: "Nameštaj Carevic",
      url: baseUrl,
      logo: {
        "@type": "ImageObject",
        url: `${baseUrl}/logo.png`,
      },
    },
    datePublished: post.published_at,
    dateModified: post.updated_at || post.published_at,
    image: post.cover_image || `${baseUrl}/home-showroom.jpg`,
    url: `${baseUrl}/blog/${post.slug}`,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${baseUrl}/blog/${post.slug}`,
    },
  };
}

function generateBreadcrumbSchema(post: any, baseUrl: string) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Početna", item: baseUrl },
      {
        "@type": "ListItem",
        position: 2,
        name: "Blog",
        item: `${baseUrl}/blog`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: post.title,
        item: `${baseUrl}/blog/${post.slug}`,
      },
    ],
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;

  let post;
  try {
    post = await storage.getBlogPostBySlug(slug);
  } catch {
    notFound();
  }

  if (!post) notFound();

  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL || "https://namestajcarevic.rs";

  return (
    <div className="min-h-screen bg-background font-sans">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateArticleSchema(post, baseUrl)),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateBreadcrumbSchema(post, baseUrl)),
        }}
      />
      <Navigation />

      <div className="pt-24 pb-6 bg-brand-beige/20">
        <div className="container mx-auto px-4 md:px-6">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-primary hover:text-primary/70 transition-colors mb-4"
          >
            <ArrowLeft size={16} />
            Nazad na blog
          </Link>
        </div>
      </div>

      <article className="container mx-auto px-4 md:px-6 pb-16 max-w-3xl">
        <header className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            {post.category && (
              <span className="text-xs font-medium uppercase tracking-widest text-primary/70 bg-primary/5 px-2 py-1 rounded-full">
                {post.category}
              </span>
            )}
            <span className="text-sm text-muted-foreground">
              {formatDate(post.published_at)}
            </span>
            <span className="text-sm text-muted-foreground">·</span>
            <span className="text-sm text-muted-foreground">{post.author}</span>
          </div>

          <h1 className="font-serif text-3xl md:text-5xl font-bold text-primary mb-6 leading-tight">
            {post.title}
          </h1>

          <p className="text-muted-foreground text-xl leading-relaxed">
            {post.excerpt}
          </p>
        </header>

        {post.cover_image && (
          <div className="relative aspect-[16/9] rounded-2xl overflow-hidden mb-10">
            <Image
              src={post.cover_image}
              alt={post.title}
              fill
              className="object-cover"
              priority
              unoptimized
            />
          </div>
        )}

        <div className="prose prose-lg prose-slate max-w-none prose-headings:font-serif prose-headings:text-primary prose-a:text-primary prose-strong:text-primary">
          <ReactMarkdown>{post.content}</ReactMarkdown>
        </div>

        {post.tags && post.tags.length > 0 && (
          <div className="mt-12 pt-8 border-t border-border flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs bg-brand-beige/60 text-primary px-3 py-1 rounded-full"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}
      </article>

      <Footer />
    </div>
  );
}
