import { getSupabase } from './supabase';
import type { Product, InsertProduct, Order, CreateOrderRequest, ContactMessage, CreateContactMessageRequest } from '../shared/schema';

// Bucket name - can be overridden via environment variable
const PRODUCT_IMAGES_BUCKET = process.env.SUPABASE_PRODUCT_IMAGES_BUCKET || 'product-images';

// Helper function to generate slug from product name or URL
function generateSlug(productName: string, productUrl?: string | null): string {
  if (productUrl) {
    // Extract slug from URL if available
    const urlParts = productUrl.split('/').filter(Boolean);
    const lastPart = urlParts[urlParts.length - 1];
    if (lastPart) return lastPart;
  }

  // Generate slug from product name
  return productName
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Remove diacritics
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

// Helper function to parse price from TEXT to cents (number)
// Handles formats like: "32,900.00 rsd", "32,900.00 rsd – 36,200.00 rsd", etc.
function parsePriceToCents(priceText: string | null | undefined): number {
  if (!priceText) return 0;

  // Handle price ranges (take the first/lower price)
  // Format: "32,900.00 rsd – 36,200.00 rsd" -> extract "32,900.00"
  let priceStr = priceText;

  // If there's a dash/range separator, take the first part
  if (priceStr.includes('–') || priceStr.includes('-')) {
    priceStr = priceStr.split(/[–-]/)[0].trim();
  }

  // Remove currency text and other non-numeric characters except digits, commas, and decimal point
  // Keep digits, commas, and decimal points
  const cleaned = priceStr.replace(/[^\d.,]/g, '');

  // Handle different formats: "125000.00", "125,000.00", "125000", etc.
  const normalized = cleaned.replace(/,/g, '');
  const parsed = parseFloat(normalized);

  if (isNaN(parsed)) {
    console.warn(`Failed to parse price: "${priceText}"`);
    return 0;
  }

  // Convert to cents (assuming price is in main currency unit)
  // e.g., "32,900.00" -> 3290000 cents
  return Math.round(parsed * 100);
}

function toPublicBucketUrl(imagePath: string): string {
  // Already a full URL - return as-is
  if (/^https?:\/\//i.test(imagePath)) {
    return imagePath;
  }

  const base = process.env.SUPABASE_URL?.trim();
  if (!base) {
    console.warn('SUPABASE_URL not set, cannot generate bucket URL');
    return imagePath;
  }

  // Remove trailing slash from base URL if present
  const baseUrl = base.replace(/\/+$/, '');

  // Clean the image path: remove leading slashes and bucket name if already included
  let cleaned = imagePath.replace(/^\/+/, '');

  // Remove bucket name from path if it's already there (e.g., "product-images/D/file.png" -> "D/file.png")
  const bucketPrefix = `${PRODUCT_IMAGES_BUCKET}/`;
  if (cleaned.toLowerCase().startsWith(bucketPrefix.toLowerCase())) {
    cleaned = cleaned.substring(bucketPrefix.length);
  }

  // Encode each path segment properly
  const encodedPath = cleaned
    .split('/')
    .map((seg) => encodeURIComponent(seg))
    .join('/');

  // Supabase Storage public URL format:
  // https://[PROJECT_REF].supabase.co/storage/v1/object/public/[BUCKET_NAME]/[FILE_PATH]
  const bucketUrl = `${baseUrl}/storage/v1/object/public/${PRODUCT_IMAGES_BUCKET}/${encodedPath}`;

  // Log for debugging
  if (process.env.NODE_ENV === 'development') {
    console.log(`[Storage] Generated bucket URL: ${bucketUrl} (from path: ${imagePath})`);
  }

  return bucketUrl;
}

// Map Supabase product row to frontend Product format
function mapDbProductToProduct(dbProduct: any): Product {
  try {
    if (!dbProduct) {
      throw new Error('dbProduct is null or undefined');
    }

    // Prioritize product_images table (bucket-backed) over image_urls
    // Fall back to image_urls if product_images is empty, invalid, or missing
    const hasProductImagesRelation = dbProduct.product_images !== null && dbProduct.product_images !== undefined;
    const fallbackImages = Array.isArray(dbProduct.image_urls) ? dbProduct.image_urls : [];

    let images: string[] = [];

    if (hasProductImagesRelation && Array.isArray(dbProduct.product_images) && dbProduct.product_images.length > 0) {
      // Product has product_images records - try to use them
      const bucketImages = dbProduct.product_images
        .slice()
        .sort((a: any, b: any) => {
          const aMain = a?.is_main ? 1 : 0;
          const bMain = b?.is_main ? 1 : 0;
          if (aMain !== bMain) return bMain - aMain; // main first
          const aPos = typeof a?.position === 'number' ? a.position : 0;
          const bPos = typeof b?.position === 'number' ? b.position : 0;
          return aPos - bPos;
        })
        .map((img: any) => {
          if (!img?.image_path) {
            console.warn(`[Storage] product_image missing image_path:`, img);
            return null;
          }
          const imagePath = String(img.image_path).trim();
          if (!imagePath) {
            return null;
          }
          return toPublicBucketUrl(imagePath);
        })
        .filter((url: string | null): url is string => url !== null && url.length > 0); // Remove nulls and empty strings

      // If we got valid bucket images, use them
      // Otherwise fall back to image_urls
      if (bucketImages.length > 0) {
        images = bucketImages;
      } else {
        // Bucket images are invalid/empty - fall back to image_urls
        images = fallbackImages;
        if (process.env.NODE_ENV === 'development') {
          console.log(`[Storage] Product ${dbProduct.id} has product_images but all are invalid, falling back to image_urls`);
        }
      }
    } else {
      // No product_images relation or empty - use image_urls
      images = fallbackImages;
    }

    return {
      id: dbProduct.id,
      slug: dbProduct.slug || generateSlug(dbProduct.product_name, dbProduct.product_url),
      title: dbProduct.product_name || '',
      description: dbProduct.description || '',
      priceCents: parsePriceToCents(dbProduct.price),
      currency: 'RSD', // Default currency
      images,
      category: dbProduct.category || null,
      dimensions: dbProduct.dimensions || null,
      createdAt: dbProduct.created_at || null,
      materials: dbProduct.materials || null,
      colors: Array.isArray(dbProduct.colors) ? dbProduct.colors : null,
      sku: dbProduct.sku || null,
      availability: dbProduct.availability || null,
      additionalSpecs: dbProduct.additional_specs || null,
      productUrl: dbProduct.product_url || null,
    };
  } catch (error) {
    console.error('Error mapping product:', error, 'Product data:', dbProduct);
    throw error;
  }
}

export interface IStorage {
  getProducts(category?: string): Promise<Product[]>;
  getProductBySlug(slug: string): Promise<Product | undefined>;
  getProductsByIds(ids: string[]): Promise<Product[]>;
  getCategories(): Promise<string[]>;
  createOrder(order: CreateOrderRequest): Promise<Order>;
  createContactMessage(message: CreateContactMessageRequest): Promise<ContactMessage>;
  // For seeding
  createProduct(product: InsertProduct): Promise<Product>;
}

export class SupabaseStorage implements IStorage {
  async getProducts(category?: string): Promise<Product[]> {
    try {
      console.log('[Storage] getProducts called, category:', category);
      const supabase = getSupabase();
      console.log('[Storage] Supabase client obtained');

      let query = supabase
        .from('products')
        .select('*, product_images ( image_path, position, is_main )')
        .order('created_at', { ascending: false });

      if (category) {
        query = query.eq('category', category);
      }

      console.log('[Storage] Executing query...');
      const { data, error } = await query;
      console.log('[Storage] Query completed, error:', error ? error.message : 'none', 'data length:', data?.length || 0);

      if (error) {
        console.error('Supabase query error:', {
          message: error.message,
          code: error.code,
          details: error.details,
          hint: error.hint,
        });
        throw new Error(`Failed to fetch products: ${error.message} (code: ${error.code})`);
      }

      // Map DB products to frontend format
      console.log('[Storage] Mapping products...');
      try {
        const mapped = (data || []).map(mapDbProductToProduct);
        console.log('[Storage] Successfully mapped', mapped.length, 'products');
        return mapped;
      } catch (mappingError) {
        console.error('Error mapping products:', mappingError);
        console.error('Mapping error stack:', mappingError instanceof Error ? mappingError.stack : 'No stack');
        throw new Error(`Failed to map products: ${mappingError instanceof Error ? mappingError.message : 'Unknown error'}`);
      }
    } catch (err) {
      console.error('Error in getProducts:', err);
      console.error('Error stack:', err instanceof Error ? err.stack : 'No stack');
      throw err;
    }
  }

  async getProductBySlug(slug: string): Promise<Product | undefined> {
    const supabase = getSupabase();

    const { data, error } = await supabase
      .from('products')
      .select('*, product_images ( image_path, position, is_main )')
      .eq('slug', slug)
      .maybeSingle();

    if (error) {
      console.error('Error fetching product by slug:', error);
      throw new Error(`Failed to fetch product: ${error.message}`);
    }

    if (!data) {
      return undefined;
    }

    return mapDbProductToProduct(data);
  }

  async getProductsByIds(ids: string[]): Promise<Product[]> {
    if (!ids.length) return [];

    const supabase = getSupabase();
    console.log('[Storage] Fetching products by IDs:', ids);

    const { data, error } = await supabase
      .from('products')
      .select('*, product_images ( image_path, position, is_main )')
      .in('id', ids);

    if (error) {
      console.error('Error fetching products by IDs:', error);
      throw new Error(`Failed to fetch products: ${error.message}`);
    }

    return (data || []).map(mapDbProductToProduct);
  }

  async getCategories(): Promise<string[]> {
    try {
      const supabase = getSupabase();
      const { data, error } = await supabase
        .from('products')
        .select('category')
        .not('category', 'is', null);

      if (error) {
        throw new Error(`Failed to fetch categories: ${error.message}`);
      }

      // Get unique categories and sort them
      const uniqueCategories = Array.from(
        new Set((data || []).map((p) => p.category).filter(Boolean))
      ).sort() as string[];

      return uniqueCategories;
    } catch (err) {
      console.error('Error in getCategories:', err);
      throw err;
    }
  }

  async createOrder(orderReq: CreateOrderRequest): Promise<Order> {
    const supabase = getSupabase();
    // 1. Calculate total price and verify products
    let totalCents = 0;
    const itemsToInsert = [];

    for (const item of orderReq.items) {
      const { data: product, error: productError } = await supabase
        .from('products')
        .select('*')
        .eq('id', item.productId)
        .single();

      if (productError || !product) {
        throw new Error(`Product ${item.productId} not found`);
      }

      const mappedProduct = mapDbProductToProduct(product);
      totalCents += mappedProduct.priceCents * item.quantity;
      itemsToInsert.push({
        product_id: item.productId,
        quantity: item.quantity,
        price_cents: mappedProduct.priceCents,
      });
    }

    // 2. Insert Order
    const orderData = {
      customer_name: orderReq.customerName,
      email: orderReq.email,
      phone: orderReq.phone,
      address: orderReq.address,
      total_cents: totalCents,
      status: 'pending',
      delivery_date: orderReq.deliveryDate || null,
      notes: orderReq.notes || null,
    };

    const { data: order, error: orderError } = await supabase
      .from('orders')
      .insert(orderData)
      .select()
      .single();

    if (orderError || !order) {
      throw new Error(`Failed to create order: ${orderError?.message || 'Unknown error'}`);
    }

    // 3. Insert Order Items
    const orderItemsData = itemsToInsert.map((item) => ({
      ...item,
      order_id: order.id,
    }));

    const { error: itemsError } = await supabase
      .from('order_items')
      .insert(orderItemsData);

    if (itemsError) {
      // Try to clean up the order if items insertion fails
      await supabase.from('orders').delete().eq('id', order.id);
      throw new Error(`Failed to create order items: ${itemsError.message}`);
    }

    // Supabase returns snake_case which matches the database schema
    // Return order as-is (no conversion needed since Order type matches DB structure)
    return order as Order;
  }

  async createContactMessage(messageReq: CreateContactMessageRequest): Promise<ContactMessage> {
    const supabase = getSupabase();

    const messageData = {
      name: messageReq.name,
      email: messageReq.email,
      message: messageReq.message,
      status: 'unread',
    };

    const { data: message, error: messageError } = await supabase
      .from('contact_messages')
      .insert(messageData)
      .select()
      .single();

    if (messageError || !message) {
      throw new Error(`Failed to create contact message: ${messageError?.message || 'Unknown error'}`);
    }

    return message as ContactMessage;
  }

  async createProduct(product: InsertProduct): Promise<Product> {
    const supabase = getSupabase();

    // Map frontend format to DB format
    const productData = {
      product_name: product.title,
      price: product.priceCents ? (product.priceCents / 100).toString() : null,
      description: product.description || null,
      category: product.category || null,
      dimensions: product.dimensions || null,
      image_urls: product.images || [],
      product_url: product.slug ? `/proizvod/${product.slug}` : null,
    };

    const { data, error } = await supabase
      .from('products')
      .insert(productData)
      .select()
      .single();

    if (error || !data) {
      throw new Error(`Failed to create product: ${error?.message || 'Unknown error'}`);
    }

    return mapDbProductToProduct(data);
  }
}

export const storage = new SupabaseStorage();