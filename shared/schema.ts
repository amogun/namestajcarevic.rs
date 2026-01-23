import { pgTable, text, serial, integer, boolean, timestamp, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";
import { relations } from "drizzle-orm";

export const products = pgTable("products", {
  id: serial("id").primaryKey(),
  slug: text("slug").notNull().unique(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  priceCents: integer("price_cents").notNull(),
  currency: text("currency").default("RSD").notNull(),
  images: jsonb("images").$type<string[]>().notNull(),
  category: text("category").notNull(),
  dimensions: jsonb("dimensions").$type<Record<string, string>>(), // e.g. { width: "100cm", height: "200cm" }
  createdAt: timestamp("created_at").defaultNow(),
});

export const orders = pgTable("orders", {
  id: serial("id").primaryKey(),
  customerName: text("customer_name").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  address: text("address").notNull(),
  totalCents: integer("total_cents").notNull(),
  status: text("status").default("pending").notNull(), // pending, confirmed, shipped
  createdAt: timestamp("created_at").defaultNow(),
});

export const orderItems = pgTable("order_items", {
  id: serial("id").primaryKey(),
  orderId: integer("order_id").notNull(), // Foreign key handled in code or DB
  productId: integer("product_id").notNull(),
  quantity: integer("quantity").notNull(),
  priceCents: integer("price_cents").notNull(),
});

export const orderRelations = relations(orders, ({ many }) => ({
  items: many(orderItems),
}));

export const orderItemRelations = relations(orderItems, ({ one }) => ({
  order: one(orders, {
    fields: [orderItems.orderId],
    references: [orders.id],
  }),
  product: one(products, {
    fields: [orderItems.productId],
    references: [products.id],
  }),
}));

// Schemas
export const insertProductSchema = createInsertSchema(products).omit({ id: true, createdAt: true });
export const insertOrderSchema = createInsertSchema(orders).omit({ id: true, createdAt: true, status: true, totalCents: true }); // total calculated server side
export const insertOrderItemSchema = createInsertSchema(orderItems).omit({ id: true });

// Types - Updated to match actual Supabase schema
// Your DB has: product_name, price (TEXT), image_urls (TEXT[]), UUID id
// Frontend expects: title, priceCents, images, slug
export type Product = {
  id: string; // UUID from DB
  slug: string; // Generated from product_name or product_url
  title: string; // Maps from product_name
  description: string | null;
  priceCents: number; // Parsed from price TEXT
  currency: string; // Default "RSD"
  images: string[]; // Maps from image_urls
  category: string | null;
  dimensions: Record<string, string> | null; // JSONB
  createdAt: string | null;
  // Additional fields from your DB
  materials?: string | null;
  colors?: string[] | null;
  sku?: string | null;
  availability?: string | null;
  additionalSpecs?: Record<string, any> | null; // Maps from additional_specs
  productUrl?: string | null; // Maps from product_url
};

export type Order = typeof orders.$inferSelect;
export type OrderItem = typeof orderItems.$inferSelect;
export type InsertProduct = z.infer<typeof insertProductSchema>;

// Input for creating an order (includes items)
export const createOrderSchema = insertOrderSchema.extend({
  items: z.array(z.object({
    productId: z.string(), // UUID from Supabase
    quantity: z.number().min(1),
  })),
  deliveryDate: z.string().optional(),
  notes: z.string().optional(),
});

export type CreateOrderRequest = z.infer<typeof createOrderSchema>;
