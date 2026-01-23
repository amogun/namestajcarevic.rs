import { NextResponse } from 'next/server';

export async function GET() {
  const robotsTxt = `User-agent: *
Allow: /

# Block access to admin and API routes (optional)
Disallow: /api/
Disallow: /admin/

# Allow access to CSS, JS, and image files
Allow: *.css
Allow: *.js
Allow: *.png
Allow: *.jpg
Allow: *.jpeg
Allow: *.gif
Allow: *.svg
Allow: *.ico

# Sitemap
Sitemap: https://yourdomain.com/sitemap.xml

# Crawl-delay (optional, for slower bots)
Crawl-delay: 1`;

  return new NextResponse(robotsTxt, {
    headers: {
      'Content-Type': 'text/plain',
    },
  });
}