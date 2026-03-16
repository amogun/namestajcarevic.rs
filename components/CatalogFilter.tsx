"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect, useRef, useCallback } from "react";
import { Search, SlidersHorizontal } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface CatalogFilterProps {
  categories: { value: string; label: string }[];
  selectedCategory: string;
  totalProducts: number;
  allProducts: {
    id: string | number;
    title: string;
    category: string | null;
  }[];
}

export function CatalogFilter({
  categories,
  selectedCategory,
  totalProducts,
}: CatalogFilterProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(
    searchParams.get("search") || ""
  );
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const navigateWithParams = useCallback(
    (category: string, search: string) => {
      const params = new URLSearchParams();
      if (category && category !== "all") {
        params.set("category", category);
      }
      if (search.trim()) {
        params.set("search", search.trim());
      }
      const queryString = params.toString();
      router.push(`/catalog${queryString ? `?${queryString}` : ""}`);
    },
    [router]
  );

  const handleCategoryChange = (value: string) => {
    navigateWithParams(value, searchQuery);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);

    // Debounce navigation to avoid excessive requests
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }
    debounceRef.current = setTimeout(() => {
      navigateWithParams(selectedCategory, query);
    }, 400);
  };

  // Cleanup debounce on unmount
  useEffect(() => {
    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
    };
  }, []);

  return (
    <div className="sticky top-20 z-30 bg-white/95 backdrop-blur-sm border-b border-border/50 shadow-sm">
      <div className="container mx-auto px-4 md:px-6 py-6">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          {/* Search */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Pretraži proizvode..."
              className="pl-10"
              value={searchQuery}
              onChange={handleSearchChange}
            />
          </div>

          {/* Category Filter */}
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="h-4 w-4 text-muted-foreground" />
            <Select
              value={selectedCategory}
              onValueChange={handleCategoryChange}
            >
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Izaberite kategoriju" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Results count */}
          <div className="text-sm text-muted-foreground">
            {totalProducts} proizvoda
          </div>
        </div>
      </div>
    </div>
  );
}
