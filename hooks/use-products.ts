"use client"

import { useQuery, useMutation } from "@tanstack/react-query";
import { api, buildUrl, type errorSchemas } from "@shared/routes";
import { type CreateOrderRequest } from "@shared/schema";

// GET /api/products
export function useProducts(category?: string) {
  return useQuery({
    queryKey: [api.products.list.path, category],
    queryFn: async () => {
      const url = category 
        ? `${api.products.list.path}?category=${encodeURIComponent(category)}`
        : api.products.list.path;
      
      const res = await fetch(url);
      if (!res.ok) throw new Error("Failed to fetch products");
      return api.products.list.responses[200].parse(await res.json());
    },
  });
}

// GET /api/products/:slug
export function useProduct(slug: string) {
  return useQuery({
    queryKey: [api.products.get.path, slug],
    queryFn: async () => {
      const url = buildUrl(api.products.get.path, { slug });
      const res = await fetch(url);
      
      if (res.status === 404) return null;
      if (!res.ok) throw new Error("Failed to fetch product");
      
      return api.products.get.responses[200].parse(await res.json());
    },
    enabled: !!slug,
  });
}

// GET /api/products/categories
export function useCategories() {
  return useQuery({
    queryKey: [api.products.categories.path],
    queryFn: async () => {
      const res = await fetch(api.products.categories.path);
      if (!res.ok) throw new Error("Failed to fetch categories");
      return api.products.categories.responses[200].parse(await res.json());
    },
  });
}

// POST /api/orders
export function useCreateOrder() {
  return useMutation({
    mutationFn: async (data: CreateOrderRequest) => {
      // Ensure numeric types are correct before sending
      const validatedData = api.orders.create.input.parse(data);
      
      const res = await fetch(api.orders.create.path, {
        method: api.orders.create.method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(validatedData),
      });

      if (!res.ok) {
        if (res.status === 400) {
          throw new Error("Molimo proverite podatke u formi.");
        }
        throw new Error("Došlo je do greške prilikom slanja porudžbine.");
      }

      return api.orders.create.responses[201].parse(await res.json());
    },
  });
}
