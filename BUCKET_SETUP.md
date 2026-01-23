# Fixing "Bucket not found" Error

## The Problem

You're getting: `{"statusCode":"404","error":"Bucket not found","message":"Bucket not found"}`

This means the bucket `product-images` doesn't exist in your Supabase project, or the name doesn't match.

## Solution: Create the Bucket

### Option 1: Using Supabase Dashboard (Recommended)

1. Go to your Supabase project dashboard
2. Click **Storage** in the left sidebar
3. Click **New bucket**
4. Enter bucket name: `product-images` (or whatever name you prefer)
5. **Important**: Check **"Public bucket"** checkbox
6. Click **Create bucket**

### Option 2: Using SQL Editor

1. Go to **SQL Editor** in your Supabase dashboard
2. Run this SQL:

```sql
-- Create the bucket if it doesn't exist
INSERT INTO storage.buckets (id, name, public)
VALUES ('product-images', 'product-images', true)
ON CONFLICT (id) DO UPDATE SET public = true;
```

### Option 3: Use a Different Bucket Name

If your bucket has a different name (e.g., `product_images` with underscore), you can:

1. **Option A**: Rename your bucket to `product-images` in Supabase dashboard
2. **Option B**: Set environment variable in `.env`:
   ```
   SUPABASE_PRODUCT_IMAGES_BUCKET=your-actual-bucket-name
   ```

## Verify Bucket Exists

1. Go to **Storage** in Supabase dashboard
2. You should see your bucket listed
3. Make sure it shows **"Public"** status
4. Click on the bucket to see files inside

## Verify Bucket is Public

The bucket MUST be public for the URLs to work. Check:

1. Go to **Storage** → Click your bucket
2. Look for **"Public"** badge or check settings
3. If not public, click **Settings** → Enable **"Public bucket"**

## Test the URL

After creating the bucket, test a URL like:
```
https://mtquudfqcieibprrdwzz.supabase.co/storage/v1/object/public/product-images/test.jpg
```

If you get 404, check:
- ✅ Bucket name matches exactly (case-sensitive)
- ✅ Bucket is set to public
- ✅ File path in `product_images.image_path` matches the actual file path in the bucket

## Common Issues

### Issue 1: Bucket name mismatch
- **Code expects**: `product-images` (with hyphen)
- **Your bucket**: Might be `product_images` (with underscore) or different name
- **Fix**: Either rename bucket or set `SUPABASE_PRODUCT_IMAGES_BUCKET` env var

### Issue 2: Bucket not public
- **Symptom**: URLs return 403 Forbidden
- **Fix**: Enable "Public bucket" in bucket settings

### Issue 3: File path mismatch
- **Symptom**: 404 on specific files
- **Fix**: Check that `product_images.image_path` matches the exact file path in Storage

## After Setup

Once the bucket is created and public:
1. Restart your server: `npm run dev`
2. The images should load from the bucket
3. Check browser console for any remaining errors
