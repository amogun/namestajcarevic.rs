import { createClient } from '@supabase/supabase-js';
import * as fs from 'fs';
import * as path from 'path';
import * as dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load environment variables
dotenv.config({ path: '.env.local' });

const supabaseUrl = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

const supabase = createClient(supabaseUrl, supabaseKey);

async function importPricing() {
    console.log('Reading CSV file...');
    const csvPath = path.join(__dirname, '../Carevic Cenovnik - Carevic Fix.csv');
    const csvContent = fs.readFileSync(csvPath, 'utf-8');

    const lines = csvContent.split('\n').slice(1); // Skip header
    console.log(`Found ${lines.length} pricing entries`);

    // Get all products first
    const { data: products, error: productsError } = await supabase
        .from('products')
        .select('id, product_name');

    if (productsError) {
        console.error('Error fetching products:', productsError);
        return;
    }

    console.log(`Found ${products?.length} products in database`);

    // Create a map of product names to IDs (normalized)
    const productMap = new Map();
    products?.forEach(p => {
        const normalized = p.product_name.toLowerCase().trim();
        productMap.set(normalized, p.id);
    });

    const pricingData = [];
    let matched = 0;
    let unmatched = 0;

    for (const line of lines) {
        if (!line.trim()) continue;

        // Parse CSV line (handle quoted fields)
        const regex = /(?:^|,)(?:"([^"]*)"|([^",]*))/g;
        const fields = [];
        let match;
        while ((match = regex.exec(line)) !== null) {
            fields.push(match[1] || match[2] || '');
        }

        if (fields.length < 7) continue;

        const [variantName, productName, supplier, priceStr, kategoriaFull, category, quality] = fields;

        // Parse price (remove currency, commas)
        const priceMatch = priceStr.match(/[\d,]+/);
        if (!priceMatch) continue;

        const price = parseFloat(priceMatch[0].replace(/,/g, ''));
        if (isNaN(price)) continue;

        // Try to match product
        const normalizedProductName = productName.toLowerCase().trim();
        const productId = productMap.get(normalizedProductName);

        if (productId) {
            matched++;
            pricingData.push({
                product_id: productId,
                variant_name: variantName.trim(),
                supplier: supplier.trim() || null,
                price_rsd: price,
                category_full: kategoriaFull.trim() || null,
                category: category.trim() || null,
                quality: quality.trim() || null,
            });
        } else {
            unmatched++;
            if (unmatched <= 10) {
                console.log(`No match for: "${productName}"`);
            }
        }
    }

    console.log(`\nMatched: ${matched}, Unmatched: ${unmatched}`);
    console.log(`Inserting ${pricingData.length} pricing records...`);

    // Insert in batches of 100
    const batchSize = 100;
    for (let i = 0; i < pricingData.length; i += batchSize) {
        const batch = pricingData.slice(i, i + batchSize);
        const { error } = await supabase.from('pricing').insert(batch);

        if (error) {
            console.error(`Error inserting batch ${i / batchSize + 1}:`, error);
        } else {
            console.log(`Inserted batch ${i / batchSize + 1} (${batch.length} records)`);
        }
    }

    console.log('Import complete!');
}

importPricing().catch(console.error);
