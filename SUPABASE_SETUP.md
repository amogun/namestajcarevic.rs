# Supabase Setup Guide

This guide will help you set up your website to use Supabase API as the database backend.

## Prerequisites

1. A Supabase account (sign up at [supabase.com](https://supabase.com))
2. A Supabase project created

## Step 1: Create a Supabase Project

1. Go to [supabase.com](https://supabase.com) and sign in
2. Click "New Project"
3. Fill in your project details:
   - **Name**: Your project name
   - **Database Password**: Choose a strong password (save this!)
   - **Region**: Choose the closest region to your users
4. Click "Create new project" and wait for it to be ready (~2 minutes)

## Step 2: Get Your Supabase API Keys

1. In your Supabase project dashboard, go to **Settings** → **API**
2. You'll find three important values:
   - **Project URL**: `https://[PROJECT-REF].supabase.co`
   - **anon public key**: Your public API key (safe to use in client-side code)
   - **service_role key**: Your admin API key (keep secret! Only use server-side)

3. Copy all three values - you'll need them for your `.env` file

**Important Security Note**: 
- The `anon` key respects Row Level Security (RLS) policies
- The `service_role` key bypasses RLS - **never expose it in client-side code**
- We use `service_role` key in the server for admin operations

## Step 3: Configure Environment Variables

1. Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```

2. Open `.env` and set your Supabase API keys:
   ```
   SUPABASE_URL=https://your-project-ref.supabase.co
   SUPABASE_ANON_KEY=your-anon-key-here
   SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here
   ```

   **Important**: 
   - Replace `your-project-ref` with your project reference ID (from the Project URL)
   - Replace `your-anon-key-here` with your anon public key
   - Replace `your-service-role-key-here` with your service_role key
   - **Never commit your `.env` file** - it contains sensitive keys

## Step 4: Create Database Tables

You have two options to create the database tables:

### Option A: Using Supabase Dashboard (Recommended)

1. Go to your Supabase project dashboard
2. Click **SQL Editor** in the left sidebar
3. Click **New query**
4. Run this SQL to create the tables:

```sql
-- Create products table
CREATE TABLE IF NOT EXISTS products (
  id SERIAL PRIMARY KEY,
  slug TEXT NOT NULL UNIQUE,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  price_cents INTEGER NOT NULL,
  currency TEXT NOT NULL DEFAULT 'RSD',
  images JSONB NOT NULL,
  category TEXT NOT NULL,
  dimensions JSONB,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Create orders table
CREATE TABLE IF NOT EXISTS orders (
  id SERIAL PRIMARY KEY,
  customer_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  address TEXT NOT NULL,
  total_cents INTEGER NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT NOW()
);

-- Create order_items table
CREATE TABLE IF NOT EXISTS order_items (
  id SERIAL PRIMARY KEY,
  order_id INTEGER NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  product_id INTEGER NOT NULL REFERENCES products(id),
  quantity INTEGER NOT NULL,
  price_cents INTEGER NOT NULL
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_products_category ON products(category);
CREATE INDEX IF NOT EXISTS idx_products_slug ON products(slug);
CREATE INDEX IF NOT EXISTS idx_order_items_order_id ON order_items(order_id);
CREATE INDEX IF NOT EXISTS idx_order_items_product_id ON order_items(product_id);
```

5. Click **Run** to execute the SQL

### Option B: Using Drizzle Migrations (Alternative)

If you prefer using migrations, you'll need to set up a database connection string:

1. Get your database connection string from **Settings** → **Database** → **Connection string** → **URI**
2. Add it to your `.env`:
   ```
   SUPABASE_DB_URL=postgresql://postgres:[PASSWORD]@db.[PROJECT-REF].supabase.co:5432/postgres
   ```
3. Run migrations:
   ```bash
   npm run db:push
   ```

## Step 5: Verify Setup

1. Start your development server:
   ```bash
   npm run dev
   ```

2. The server will automatically seed the database with sample products on first run

3. Check your Supabase dashboard → **Table Editor** to see the tables and data

## How It Works

This application uses Supabase's REST API via the `@supabase/supabase-js` client library:

- **Server-side operations** use the `service_role` key (bypasses RLS for admin operations)
- **Client-side operations** (if added later) would use the `anon` key (respects RLS)
- All database operations go through Supabase's PostgREST API
- No direct PostgreSQL connections needed for runtime operations

## Future Features

With Supabase API, you can easily add:
- **Authentication**: User sign-up, login, OAuth providers
- **Storage**: Upload and serve product images
- **Real-time**: Live updates for orders, inventory, etc.
- **Edge Functions**: Serverless functions for complex operations

## Troubleshooting

### API Connection Issues

- **Error: "Invalid API key"**
  - Double-check your `SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` in `.env`
  - Make sure you copied the full keys without extra spaces
  - Verify the keys in **Settings** → **API** in your Supabase dashboard

- **Error: "Failed to fetch" or network errors**
  - Check your internet connection
  - Verify your Supabase project is active (not paused)
  - Check if your Supabase URL is correct (should end with `.supabase.co`)

- **Error: "relation does not exist"**
  - Make sure you've created the database tables (Step 4)
  - Check the table names match exactly (case-sensitive)
  - Verify tables exist in Supabase dashboard → **Table Editor**

### API Response Errors

- **Error: "new row violates row-level security policy"**
  - This means RLS is enabled on your tables
  - Either disable RLS for these tables (Settings → Database → Policies)
  - Or create appropriate RLS policies
  - The `service_role` key should bypass RLS, so this shouldn't happen

- **Error: "column does not exist"**
  - Check that column names match (Supabase uses snake_case: `price_cents`, not `priceCents`)
  - The code automatically converts between camelCase and snake_case

## Security Notes

- **Never commit your `.env` file** - it contains sensitive API keys
- The `.env` file is already in `.gitignore`
- **Never expose `SUPABASE_SERVICE_ROLE_KEY`** in client-side code - it bypasses all security
- Use environment variables in your hosting platform (Vercel, Railway, etc.) instead of `.env` files in production
- The `service_role` key should only be used server-side
- Consider setting up Row Level Security (RLS) policies for additional security

## Next Steps

- Set up Row Level Security (RLS) policies in Supabase if needed
- Configure backups in Supabase dashboard
- Set up monitoring and alerts
- Consider using Supabase Storage for product images
- Add authentication using Supabase Auth if needed
