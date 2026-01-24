import { z } from "zod";
import { products, createOrderSchema } from "./schema";

export const errorSchemas = {
  validation: z.object({
    message: z.string(),
    field: z.string().optional(),
  }),
  notFound: z.object({
    message: z.string(),
  }),
  internal: z.object({
    message: z.string(),
  }),
};

export const api = {
  products: {
    list: {
      method: "GET" as const,
      path: "/api/products",
      input: z.object({
        category: z.string().optional(),
      }).optional(),
      responses: {
        200: z.array(z.custom<typeof products.$inferSelect>()),
      },
    },
    get: {
      method: "GET" as const,
      path: "/api/products/:slug",
      responses: {
        200: z.custom<typeof products.$inferSelect>(),
        404: errorSchemas.notFound,
      },
    },
    categories: {
      method: "GET" as const,
      path: "/api/products/category",
      responses: {
        200: z.array(z.string()),
      },
    },
  },
  orders: {
    create: {
      method: "POST" as const,
      path: "/api/orders",
      input: createOrderSchema,
      responses: {
        201: z.object({ success: z.boolean(), orderId: z.string() }), // UUID is a string
        400: errorSchemas.validation,
        500: errorSchemas.internal,
      },
    },
  },
};

export function buildUrl(path: string, params?: Record<string, string | number>): string {
  let url = path;
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (url.includes(`:${key}`)) {
        url = url.replace(`:${key}`, String(value));
      }
    });
  }
  return url;
}
