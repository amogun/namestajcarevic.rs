# Vercel Deployment Guide

This guide will help you deploy your Next.js application to Vercel.

## Prerequisites

1. A Vercel account (sign up at [vercel.com](https://vercel.com))
2. Your GitHub repository connected to Vercel
3. Your Supabase project configured

## Step 1: Connect Your Repository

1. Go to [vercel.com](https://vercel.com) and sign in
2. Click **"Add New Project"**
3. Import your GitHub repository: `amogun/namestajcarevic.rs`
4. Vercel will automatically detect it's a Next.js project

## Step 2: Configure Environment Variables

In your Vercel project settings, add the following environment variables:

### Required Environment Variables

```
SUPABASE_URL=https://mtquudfqcieibprrdwzz.supabase.co
SUPABASE_ANON_KEY=your-anon-key-here
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here
```

### Database Connection (Choose One)

**Option 1: Connection Pooler (Recommended for Vercel)**
```
SUPABASE_POOLER_URL=postgresql://postgres.[PROJECT-REF]:[PASSWORD]@aws-0-[REGION].pooler.supabase.com:6543/postgres
```

**Option 2: Direct Connection**
```
SUPABASE_DB_URL=postgresql://postgres:[PASSWORD]@db.[PROJECT-REF].supabase.co:5432/postgres
```

**Option 3: Generic Database URL**
```
DATABASE_URL=postgresql://postgres:[PASSWORD]@db.[PROJECT-REF].supabase.co:5432/postgres
```

### Optional Environment Variables

```
NEXT_PUBLIC_SITE_URL=https://your-domain.vercel.app
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your-google-maps-api-key
EMAIL_SMTP=smtp://user:pass@smtp.example.com:587
SALON_EMAIL=your-email@example.com
```

### How to Add Environment Variables in Vercel

1. Go to your project in Vercel dashboard
2. Click **Settings** → **Environment Variables**
3. Add each variable:
   - **Key**: The variable name (e.g., `SUPABASE_URL`)
   - **Value**: The actual value
   - **Environment**: Select all (Production, Preview, Development)
4. Click **Save**

## Step 3: Configure Build Settings

Vercel will automatically detect Next.js, but you can verify:

- **Framework Preset**: Next.js
- **Build Command**: `npm run build` (auto-detected)
- **Output Directory**: `.next` (auto-detected)
- **Install Command**: `npm install` (auto-detected)

## Step 4: Deploy

1. Click **"Deploy"** button
2. Vercel will:
   - Install dependencies
   - Run the build command
   - Deploy your application
3. Your site will be live at: `https://your-project-name.vercel.app`

## Step 5: Custom Domain (Optional)

1. Go to **Settings** → **Domains**
2. Add your custom domain (e.g., `namestajcarevic.rs`)
3. Follow Vercel's DNS configuration instructions
4. Update `NEXT_PUBLIC_SITE_URL` to your custom domain

## Important Notes

### Database Connection

- **Use Connection Pooler** (`SUPABASE_POOLER_URL`) for Vercel deployments
- The pooler handles connection limits better for serverless functions
- Direct connections may hit connection limits with Vercel's serverless architecture

### Environment Variables

- **Never commit** `.env` files to git
- All environment variables must be set in Vercel dashboard
- Use different values for Production, Preview, and Development if needed

### Build Optimizations

- The project is configured with `output: 'standalone'` for optimal Vercel deployment
- Images are optimized automatically by Next.js Image component
- Static assets are served from Vercel's CDN

### Troubleshooting

**Build Fails with "npm install" error:**
1. Check the build logs in Vercel dashboard for specific error messages
2. Common issues:
   - **Native module compilation failures**: The `.npmrc` file is configured to handle optional dependencies gracefully
   - **Node version**: Ensure Vercel is using Node 18+ (set in Vercel project settings → General → Node.js Version)
   - **Package conflicts**: Try clearing the build cache in Vercel settings
3. If `bufferutil` fails: This is an optional dependency and won't affect functionality. The `.npmrc` file should prevent this from failing the build.
4. If issues persist:
   - Go to Vercel project settings → General
   - Clear build cache
   - Redeploy

**Build Fails - Missing Environment Variables:**
- Check that all required environment variables are set
- Verify your Supabase credentials are correct
- Check build logs in Vercel dashboard for specific missing variable names

**Database Connection Errors:**
- Ensure you're using the Connection Pooler URL (`SUPABASE_POOLER_URL`) for Vercel
- Check that your Supabase project allows connections from Vercel's IPs
- Verify database password is correct
- Connection pooler format: `postgresql://postgres.[PROJECT-REF]:[PASSWORD]@aws-0-[REGION].pooler.supabase.com:6543/postgres`

**Runtime Errors:**
- Check function logs in Vercel dashboard
- Verify all environment variables are set correctly
- Ensure Supabase RLS policies allow your operations
- Check that `NEXT_PUBLIC_SITE_URL` matches your Vercel deployment URL

## Next Steps

1. Set up automatic deployments from your `main` branch
2. Configure preview deployments for pull requests
3. Set up monitoring and analytics
4. Configure custom domain and SSL

## Support

- [Vercel Documentation](https://vercel.com/docs)
- [Next.js Deployment](https://nextjs.org/docs/deployment)
- [Supabase with Vercel](https://supabase.com/docs/guides/getting-started/tutorials/with-nextjs)
