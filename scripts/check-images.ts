import { storage } from "../lib/storage";

async function run() {
  const products = await storage.getProducts();
  let missingCount = 0;
  let notFoundCount = 0;

  console.log(`Checking ${products.length} products...`);
  
  for (const product of products) {
    if (!product.images || product.images.length === 0) {
      console.log(`Product "${product.title}" has NO images!`);
      missingCount++;
    } else {
      for (const img of product.images) {
        if (!img.startsWith('http')) {
          console.log(`Product "${product.title}" has invalid image URL: ${img}`);
          missingCount++;
        } else {
          // Check if it exists
          try {
            const res = await fetch(img, { method: "HEAD" });
            if (!res.ok) {
              console.log(`[${res.status}] NOT FOUND: "${product.title}" -> ${img}`);
              notFoundCount++;
            }
          } catch (e) {
            console.log(`[FETCH ERROR] "${product.title}" -> ${img} -> ${e.message}`);
            notFoundCount++;
          }
        }
      }
    }
  }
  console.log(`Done checking. Missing URL fields: ${missingCount}, Broken links: ${notFoundCount}`);
}

run();
