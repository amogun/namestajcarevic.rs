module.exports = [
"[externals]/next/dist/compiled/next-server/app-route-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-route-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/@opentelemetry/api [external] (next/dist/compiled/@opentelemetry/api, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/@opentelemetry/api", () => require("next/dist/compiled/@opentelemetry/api"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/after-task-async-storage.external.js [external] (next/dist/server/app-render/after-task-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/after-task-async-storage.external.js", () => require("next/dist/server/app-render/after-task-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/fs [external] (fs, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("fs", () => require("fs"));

module.exports = mod;
}),
"[externals]/path [external] (path, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("path", () => require("path"));

module.exports = mod;
}),
"[externals]/os [external] (os, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("os", () => require("os"));

module.exports = mod;
}),
"[externals]/crypto [external] (crypto, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("crypto", () => require("crypto"));

module.exports = mod;
}),
"[project]/lib/supabase.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getSupabase",
    ()=>getSupabase,
    "getSupabaseAdminClient",
    ()=>getSupabaseAdminClient,
    "getSupabaseAnonClient",
    ()=>getSupabaseAnonClient
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$supabase$2d$js$2f$dist$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@supabase/supabase-js/dist/index.mjs [app-route] (ecmascript) <locals>");
// Ensure environment variables are loaded
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$dotenv$2f$config$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/dotenv/config.js [app-route] (ecmascript)");
;
;
// Supabase client for API operations
// Uses service role key for admin operations (bypasses RLS)
// For public operations, use anon key instead
let supabaseAdminClient = null;
let supabaseAnonClient = null;
function getSupabaseAdminClient() {
    if (supabaseAdminClient) {
        return supabaseAdminClient;
    }
    const supabaseUrl = process.env.SUPABASE_URL?.trim();
    const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY?.trim();
    if (!supabaseUrl || !serviceRoleKey) {
        throw new Error('SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY must be set. ' + 'Get these from your Supabase project: Settings > API > service_role key');
    }
    // Service role key bypasses Row Level Security (RLS) - use for admin operations
    supabaseAdminClient = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$supabase$2d$js$2f$dist$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createClient"])(supabaseUrl, serviceRoleKey, {
        auth: {
            autoRefreshToken: false,
            persistSession: false
        }
    });
    return supabaseAdminClient;
}
function getSupabaseAnonClient() {
    if (supabaseAnonClient) {
        return supabaseAnonClient;
    }
    const supabaseUrl = process.env.SUPABASE_URL?.trim();
    const anonKey = process.env.SUPABASE_ANON_KEY?.trim();
    if (!supabaseUrl || !anonKey) {
        throw new Error('SUPABASE_URL and SUPABASE_ANON_KEY must be set. ' + 'Get these from your Supabase project: Settings > API');
    }
    // Anon key respects Row Level Security (RLS) - use for public operations
    supabaseAnonClient = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$supabase$2d$js$2f$dist$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createClient"])(supabaseUrl, anonKey);
    return supabaseAnonClient;
}
function getSupabase() {
    return getSupabaseAdminClient();
}
}),
"[project]/lib/storage.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "SupabaseStorage",
    ()=>SupabaseStorage,
    "storage",
    ()=>storage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/supabase.ts [app-route] (ecmascript)");
;
// Bucket name - can be overridden via environment variable
const PRODUCT_IMAGES_BUCKET = process.env.SUPABASE_PRODUCT_IMAGES_BUCKET || 'product-images';
// Helper function to generate slug from product name or URL
function generateSlug(productName, productUrl) {
    if (productUrl) {
        // Extract slug from URL if available
        const urlParts = productUrl.split('/').filter(Boolean);
        const lastPart = urlParts[urlParts.length - 1];
        if (lastPart) return lastPart;
    }
    // Generate slug from product name
    return productName.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '') // Remove diacritics
    .replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
}
// Helper function to parse price from TEXT to cents (number)
// Handles formats like: "32,900.00 rsd", "32,900.00 rsd – 36,200.00 rsd", etc.
function parsePriceToCents(priceText) {
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
function toPublicBucketUrl(imagePath) {
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
    const encodedPath = cleaned.split('/').map((seg)=>encodeURIComponent(seg)).join('/');
    // Supabase Storage public URL format:
    // https://[PROJECT_REF].supabase.co/storage/v1/object/public/[BUCKET_NAME]/[FILE_PATH]
    const bucketUrl = `${baseUrl}/storage/v1/object/public/${PRODUCT_IMAGES_BUCKET}/${encodedPath}`;
    // Log for debugging
    if ("TURBOPACK compile-time truthy", 1) {
        console.log(`[Storage] Generated bucket URL: ${bucketUrl} (from path: ${imagePath})`);
    }
    return bucketUrl;
}
// Map Supabase product row to frontend Product format
function mapDbProductToProduct(dbProduct) {
    try {
        if (!dbProduct) {
            throw new Error('dbProduct is null or undefined');
        }
        // Prioritize product_images table (bucket-backed) over image_urls
        // Fall back to image_urls if product_images is empty, invalid, or missing
        const hasProductImagesRelation = dbProduct.product_images !== null && dbProduct.product_images !== undefined;
        const fallbackImages = Array.isArray(dbProduct.image_urls) ? dbProduct.image_urls : [];
        let images = [];
        if (hasProductImagesRelation && Array.isArray(dbProduct.product_images) && dbProduct.product_images.length > 0) {
            // Product has product_images records - try to use them
            const bucketImages = dbProduct.product_images.slice().sort((a, b)=>{
                const aMain = a?.is_main ? 1 : 0;
                const bMain = b?.is_main ? 1 : 0;
                if (aMain !== bMain) return bMain - aMain; // main first
                const aPos = typeof a?.position === 'number' ? a.position : 0;
                const bPos = typeof b?.position === 'number' ? b.position : 0;
                return aPos - bPos;
            }).map((img)=>{
                if (!img?.image_path) {
                    console.warn(`[Storage] product_image missing image_path:`, img);
                    return null;
                }
                const imagePath = String(img.image_path).trim();
                if (!imagePath) {
                    return null;
                }
                return toPublicBucketUrl(imagePath);
            }).filter((url)=>url !== null && url.length > 0); // Remove nulls and empty strings
            // If we got valid bucket images, use them
            // Otherwise fall back to image_urls
            if (bucketImages.length > 0) {
                images = bucketImages;
            } else {
                // Bucket images are invalid/empty - fall back to image_urls
                images = fallbackImages;
                if ("TURBOPACK compile-time truthy", 1) {
                    console.log(`[Storage] Product ${dbProduct.id} has product_images but all are invalid, falling back to image_urls`);
                }
            }
        } else {
            // No product_images relation or empty - use image_urls
            images = fallbackImages;
        }
        return {
            id: dbProduct.id,
            slug: generateSlug(dbProduct.product_name, dbProduct.product_url),
            title: dbProduct.product_name || '',
            description: dbProduct.description || '',
            priceCents: parsePriceToCents(dbProduct.price),
            currency: 'RSD',
            images,
            category: dbProduct.category || null,
            dimensions: dbProduct.dimensions || null,
            createdAt: dbProduct.created_at || null,
            materials: dbProduct.materials || null,
            colors: Array.isArray(dbProduct.colors) ? dbProduct.colors : null,
            sku: dbProduct.sku || null,
            availability: dbProduct.availability || null,
            additionalSpecs: dbProduct.additional_specs || null,
            productUrl: dbProduct.product_url || null
        };
    } catch (error) {
        console.error('Error mapping product:', error, 'Product data:', dbProduct);
        throw error;
    }
}
class SupabaseStorage {
    async getProducts(category) {
        try {
            console.log('[Storage] getProducts called, category:', category);
            const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getSupabase"])();
            console.log('[Storage] Supabase client obtained');
            let query = supabase.from('products').select('*, product_images ( image_path, position, is_main )').order('created_at', {
                ascending: false
            });
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
                    hint: error.hint
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
    async getProductBySlug(slug) {
        const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getSupabase"])();
        // Since we don't have a slug column, we try to match by product_url first
        // If product_url contains the slug, use that; otherwise fetch all and filter
        // TODO: Consider adding a slug column to the database for better performance
        // First, try to find by product_url (if it matches the slug pattern)
        const urlSlug = `/proizvod/${slug}`;
        const { data: urlMatch, error: urlError } = await supabase.from('products').select('*, product_images ( image_path, position, is_main )').eq('product_url', urlSlug).maybeSingle();
        if (!urlError && urlMatch) {
            return mapDbProductToProduct(urlMatch);
        }
        // Fallback: fetch all products and filter by generated slug
        // Note: This is less efficient but works if product_url doesn't match
        const { data, error } = await supabase.from('products').select('*, product_images ( image_path, position, is_main )');
        if (error) {
            throw new Error(`Failed to fetch products: ${error.message}`);
        }
        if (!data || data.length === 0) {
            return undefined;
        }
        // Find product by matching generated slug
        const product = data.find((p)=>{
            const generatedSlug = generateSlug(p.product_name, p.product_url);
            return generatedSlug === slug;
        });
        if (!product) {
            return undefined;
        }
        return mapDbProductToProduct(product);
    }
    async getCategories() {
        try {
            const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getSupabase"])();
            const { data, error } = await supabase.from('products').select('category').not('category', 'is', null);
            if (error) {
                throw new Error(`Failed to fetch categories: ${error.message}`);
            }
            // Get unique categories and sort them
            const uniqueCategories = Array.from(new Set((data || []).map((p)=>p.category).filter(Boolean))).sort();
            return uniqueCategories;
        } catch (err) {
            console.error('Error in getCategories:', err);
            throw err;
        }
    }
    async createOrder(orderReq) {
        const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getSupabase"])();
        // 1. Calculate total price and verify products
        let totalCents = 0;
        const itemsToInsert = [];
        for (const item of orderReq.items){
            const { data: product, error: productError } = await supabase.from('products').select('*').eq('id', item.productId).single();
            if (productError || !product) {
                throw new Error(`Product ${item.productId} not found`);
            }
            const mappedProduct = mapDbProductToProduct(product);
            totalCents += mappedProduct.priceCents * item.quantity;
            itemsToInsert.push({
                product_id: item.productId,
                quantity: item.quantity,
                price_cents: mappedProduct.priceCents
            });
        }
        // 2. Insert Order
        const orderData = {
            customer_name: orderReq.customerName,
            email: orderReq.email,
            phone: orderReq.phone,
            address: orderReq.address,
            total_cents: totalCents,
            status: 'pending'
        };
        const { data: order, error: orderError } = await supabase.from('orders').insert(orderData).select().single();
        if (orderError || !order) {
            throw new Error(`Failed to create order: ${orderError?.message || 'Unknown error'}`);
        }
        // 3. Insert Order Items
        const orderItemsData = itemsToInsert.map((item)=>({
                ...item,
                order_id: order.id
            }));
        const { error: itemsError } = await supabase.from('order_items').insert(orderItemsData);
        if (itemsError) {
            // Try to clean up the order if items insertion fails
            await supabase.from('orders').delete().eq('id', order.id);
            throw new Error(`Failed to create order items: ${itemsError.message}`);
        }
        // Supabase returns snake_case which matches the database schema
        // Return order as-is (no conversion needed since Order type matches DB structure)
        return order;
    }
    async createProduct(product) {
        const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getSupabase"])();
        // Map frontend format to DB format
        const productData = {
            product_name: product.title,
            price: product.priceCents ? (product.priceCents / 100).toString() : null,
            description: product.description || null,
            category: product.category || null,
            dimensions: product.dimensions || null,
            image_urls: product.images || [],
            product_url: product.slug ? `/proizvod/${product.slug}` : null
        };
        const { data, error } = await supabase.from('products').insert(productData).select().single();
        if (error || !data) {
            throw new Error(`Failed to create product: ${error?.message || 'Unknown error'}`);
        }
        return mapDbProductToProduct(data);
    }
}
const storage = new SupabaseStorage();
}),
"[project]/app/api/products/category/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "GET",
    ()=>GET
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$storage$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/storage.ts [app-route] (ecmascript)");
;
;
async function GET() {
    try {
        const categories = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$storage$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["storage"].getCategories();
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json(categories);
    } catch (error) {
        console.error('Error fetching categories:', error);
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            message: 'Failed to fetch categories',
            error: errorMessage
        }, {
            status: 500
        });
    }
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__9b48aa61._.js.map