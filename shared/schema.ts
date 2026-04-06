import { pgTable, text, integer, timestamp, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";
import { relations } from "drizzle-orm";

// Note: These Drizzle schemas are for type inference only
// The actual database uses UUID for all IDs, but Drizzle doesn't directly support UUID
// We'll use text() for UUID fields and handle conversion in the application layer
export const products = pgTable("products", {
  id: text("id").primaryKey(), // UUID in DB, stored as text
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
  id: text("id").primaryKey(), // UUID in DB, stored as text
  customerName: text("customer_name").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  address: text("address").notNull(),
  totalCents: integer("total_cents").notNull(),
  status: text("status").default("pending").notNull(), // pending, confirmed, shipped
  deliveryDate: text("delivery_date").$type<string | null>(), // Optional delivery date
  notes: text("notes").$type<string | null>(), // Optional customer notes
  createdAt: timestamp("created_at").defaultNow(),
});

export const orderItems = pgTable("order_items", {
  id: text("id").primaryKey(), // UUID in DB, stored as text
  orderId: text("order_id").notNull(), // UUID foreign key
  productId: text("product_id").notNull(), // UUID foreign key
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

export const contactMessages = pgTable("contact_messages", {
  id: text("id").primaryKey(), // UUID in DB, stored as text
  name: text("name").notNull(),
  email: text("email").notNull(),
  message: text("message").notNull(),
  status: text("status").default("unread").notNull(), // unread, read, replied
  createdAt: timestamp("created_at").defaultNow(),
});

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

// Types matching actual Supabase schema (UUIDs are strings)
export type Order = {
  id: string; // UUID
  customer_name: string;
  email: string;
  phone: string;
  address: string;
  total_cents: number;
  status: string;
  delivery_date: string | null;
  notes: string | null;
  created_at: string | null;
};

export type OrderItem = {
  id: string; // UUID
  order_id: string; // UUID
  product_id: string; // UUID
  quantity: number;
  price_cents: number;
  created_at: string | null;
};
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

// Contact message schema
export const createContactMessageSchema = z.object({
  name: z.string().min(2, "Ime mora imati bar 2 karaktera"),
  email: z.string().email("Unesite validan email"),
  message: z.string().min(10, "Poruka mora imati bar 10 karaktera"),
});

export type CreateContactMessageRequest = z.infer<typeof createContactMessageSchema>;

export type ContactMessage = {
  id: string; // UUID
  name: string;
  email: string;
  message: string;
  status: string;
  created_at: string | null;
};

export type BlogPost = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string; // Markdown
  cover_image: string | null;
  author: string;
  category: string | null;
  tags: string[] | null;
  published: boolean;
  published_at: string | null;
  created_at: string | null;
  updated_at: string | null;
};
