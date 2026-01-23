# 🚀 SEO Deployment Guide - Nameštaj Carevic

## Pre-Deployment Checklist ✅

### 1. Update Domain References
Replace `https://yourdomain.com` with your actual domain in these files:

**Files to update:**
- `app/layout.tsx` (metadataBase)
- `components/StructuredData.tsx`
- `app/sitemap.xml/route.ts`
- `app/robots.txt/route.ts`
- `app/products/[slug]/page.tsx`

**Command to find all instances:**
```bash
grep -r "yourdomain.com" .
```

### 2. Environment Variables Setup
Create `.env.local` with:
```env
NEXT_PUBLIC_API_URL=https://yourdomain.com
# Add your Supabase credentials
SUPABASE_URL=your_supabase_url
SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
SUPABASE_POOLER_URL=your_pooler_url
DATABASE_URL=your_database_url
SUPABASE_PRODUCT_IMAGES_BUCKET=product-images
```

### 3. Domain Configuration
- Point your domain DNS to your hosting provider
- Set up SSL certificate (Let's Encrypt or hosting provider)
- Configure www/non-www redirect preference

### 4. Build Test
```bash
npm run build
npm run start
```
Test all pages load correctly and structured data appears.

---

## Post-Deployment SEO Setup 🚀

### 1. Google Search Console Setup
**URL:** https://search.google.com/search-console

#### Steps:
1. **Add Property** → URL prefix: `https://yourdomain.com`
2. **Verify Ownership** → Choose HTML tag method
3. **Copy meta tag** from Search Console
4. **Add to `app/layout.tsx`** in verification section:
   ```tsx
   verification: {
     google: 'your-verification-code-here',
   }
   ```
5. **Submit Sitemap**: `https://yourdomain.com/sitemap.xml`

### 2. Google Business Profile Setup
**URL:** https://www.google.com/business/

#### Required Information:
- Business Name: Nameštaj Carevic
- Address: Božidara Milosavljevica 12, Kragujevac
- Phone: +381 64 119 31 83
- Website: https://yourdomain.com
- Category: Furniture Store
- Hours: Mon-Fri 10:00-19:00, Sat 10:00-14:00

#### Post-Setup:
- Upload business photos
- Add products/services
- Respond to reviews
- Post updates regularly

### 3. Bing Webmaster Tools
**URL:** https://www.bing.com/webmasters

#### Steps:
1. Add property: `https://yourdomain.com`
2. Verify with meta tag
3. Submit sitemap: `https://yourdomain.com/sitemap.xml`

### 4. Yandex Webmaster (Optional)
**URL:** https://webmaster.yandex.com

For additional Russian/Serbian search coverage.

---

## Local SEO Optimization 📍

### 1. Google My Business Optimization
- **Complete business profile** with all details
- **Add high-quality photos** (interior, products, exterior)
- **Services**: List all furniture categories
- **Attributes**: Family-friendly, credit cards accepted, etc.
- **Posts**: Regular updates about new products, sales, events

### 2. Local Citations
Create consistent business listings on:
- **Facebook Business**
- **Instagram Business**
- **Yelp** (if available in Serbia)
- **Yellow Pages**
- **Local directories**

**Consistent Information:**
- Business Name: Nameštaj Carevic
- Address: Božidara Milosavljevica 12, Kragujevac
- Phone: +381 64 119 31 83
- Website: https://yourdomain.com

### 3. Local Keywords Research
**Primary Keywords:**
- nameštaj Kragujevac
- salon nameštaja Kragujevac
- kupi nameštaj Kragujevac
- nameštaj Beograd (secondary)

**Long-tail Keywords:**
- kvalitetan nameštaj Kragujevac
- nameštaj za dnevnu sobu
- trpezarijski sto Kragujevac

---

## Content & Technical SEO 📝

### 1. Google Analytics Setup
**URL:** https://analytics.google.com

1. Create property
2. Get tracking ID: `GA_MEASUREMENT_ID`
3. Add to `app/layout.tsx`:
   ```tsx
   import { GoogleAnalytics } from '@next/third-parties/google'

   export default function RootLayout({ children }) {
     return (
       <html lang="sr">
         <body>
           {children}
           <GoogleAnalytics gaId="GA_MEASUREMENT_ID" />
         </body>
       </html>
     )
   }
   ```

### 2. Schema Markup Testing
**URL:** https://search.google.com/test/rich-results

Test these pages:
- Homepage (LocalBusiness schema)
- Product pages (Product + BreadcrumbList schema)
- Verify all structured data is valid

### 3. Page Speed Optimization
**URL:** https://pagespeed.web.dev

- **Optimize images** (WebP format, lazy loading)
- **Minify CSS/JS** (Next.js does this automatically)
- **Enable compression** (Gzip/Brotli on server)
- **CDN setup** (Vercel/Netlify provide this)

### 4. Mobile Optimization
- **Test on mobile devices**
- **Check touch targets** (44px minimum)
- **Test forms** on mobile
- **Verify maps embed** works on mobile

---

## Monitoring & Maintenance 📊

### 1. Regular Monitoring (Weekly)

#### Google Search Console:
- **Indexing status** - Check for crawl errors
- **Search performance** - Monitor impressions, clicks, CTR
- **Rich results** - Ensure structured data is working
- **Mobile usability** - Fix any mobile issues

#### Google Analytics:
- **Traffic sources** - Where visitors come from
- **Popular pages** - Which products are viewed most
- **Conversion tracking** - Set up order completion goals
- **User behavior** - Time on site, bounce rate

### 2. Content Updates (Monthly)

#### Product Updates:
- **New products** - Add to database and update sitemap
- **Price changes** - Update structured data
- **Stock status** - Mark out-of-stock items
- **Product photos** - High-quality images

#### Content Freshness:
- **Blog posts** (if added) - Regular furniture tips
- **About page** - Update business information
- **Contact details** - Keep current

### 3. Technical Maintenance (Quarterly)

#### SEO Audits:
- **Broken links** - Check with Screaming Frog
- **Page speed** - Monitor Core Web Vitals
- **Mobile issues** - Test on new devices
- **Schema validation** - Test structured data

#### Backlinks:
- **Local partnerships** - Interior designers, real estate
- **Industry associations** - Furniture industry groups
- **Local media** - Press releases, local news

---

## Performance Benchmarks 🎯

### Core Web Vitals (Target Scores):
- **LCP** (Largest Contentful Paint): <2.5s
- **FID** (First Input Delay): <100ms
- **CLS** (Cumulative Layout Shift): <0.1

### SEO Metrics (3-month goals):
- **Organic traffic**: 500+ monthly visitors
- **Local pack ranking**: Top 3 for "nameštaj Kragujevac"
- **Page load speed**: <3 seconds
- **Mobile score**: 90+ (Google PageSpeed)

---

## Emergency SEO Fixes 🔧

### If Google Can't Crawl:
1. Check robots.txt: `https://yourdomain.com/robots.txt`
2. Verify sitemap: `https://yourdomain.com/sitemap.xml`
3. Test with Google Search Console URL inspection

### If Structured Data Issues:
1. Use Rich Results Test tool
2. Check for JSON syntax errors
3. Verify domain placeholders are updated

### If Local Rankings Low:
1. Update Google Business Profile regularly
2. Get more local citations
3. Encourage customer reviews
4. Local content creation

---

## Quick Checklist Summary 📋

### ✅ Pre-Launch:
- [ ] Update all domain references
- [ ] Set up environment variables
- [ ] Test build locally
- [ ] Configure DNS/SSL

### ✅ Post-Launch (Week 1):
- [ ] Google Search Console setup
- [ ] Google Business Profile
- [ ] Bing Webmaster Tools
- [ ] Schema markup testing

### ✅ Ongoing (Monthly):
- [ ] Monitor Search Console
- [ ] Update Google My Business
- [ ] Check page speed
- [ ] Content updates

### ✅ Quarterly Reviews:
- [ ] SEO audit
- [ ] Competitor analysis
- [ ] Content strategy review
- [ ] Technical improvements

---

## Support Resources 📚

### Tools:
- **Google Search Console**: Monitor indexing and search performance
- **Google Analytics**: Track user behavior and conversions
- **Google PageSpeed Insights**: Monitor performance
- **Screaming Frog**: Technical SEO audits
- **Ahrefs/SEMrush**: Keyword research and backlink analysis

### Learning Resources:
- **Google SEO Starter Guide**: https://developers.google.com/search/docs
- **Schema.org Documentation**: https://schema.org
- **Local SEO Guide**: https://developers.google.com/search/docs/appearance/local-business

### Professional Help:
- **SEO Agencies**: For advanced optimization
- **Local SEO Specialists**: For Kragujevac market
- **Web Developers**: For technical implementations

---

## Success Metrics 📈

### 1 Month After Launch:
- Site indexed in Google
- Local search visibility
- Basic analytics setup
- Structured data working

### 3 Months After Launch:
- 50+ organic visitors monthly
- Local search ranking improvement
- Customer reviews on GBP
- Performance optimization complete

### 6 Months After Launch:
- 200+ organic visitors monthly
- Top local search rankings
- Established online presence
- Regular content updates

---

**Remember:** SEO is a long-term strategy. Focus on providing value to customers and Google will reward you with better rankings. Consistency and quality content are key! 🎯