export interface CategoryConfig {
  slug: string;
  name: string;         // DB category value
  displayName: string;  // UI display name
  description: string;  // SEO meta description
  shortDescription: string; // Homepage card text
  image: string;        // Representative image URL
}

export const CATEGORIES: CategoryConfig[] = [
  {
    slug: "dvosedi",
    name: "Dvosedi",
    displayName: "Dvosedi",
    description: "Elegantni dvosedi za udobnu dnevnu sobu - širok izbor modela i boja u salonu Nameštaj Carević, Kragujevac.",
    shortDescription: "Elegantni dvosedi za udobnu dnevnu sobu",
    image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=1200&auto=format&fit=crop",
  },
  {
    slug: "fotelje",
    name: "Fotelje",
    displayName: "Fotelje",
    description: "Komforne fotelje za opuštanje - pronađite savršenu fotelju u salonu Nameštaj Carević, Kragujevac.",
    shortDescription: "Komforne fotelje za opuštanje",
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=1200&auto=format&fit=crop",
  },
  {
    slug: "kreveti",
    name: "Kreveti",
    displayName: "Kreveti",
    description: "Kvalitetni kreveti za savršen san - francuski ležajevi i moderni kreveti u salonu Nameštaj Carević, Kragujevac.",
    shortDescription: "Kvalitetni kreveti za savršen san",
    image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=1200&auto=format&fit=crop",
  },
  {
    slug: "tdf-garniture",
    name: "TDF Garniture",
    displayName: "TDF Garniture",
    description: "Kompleti trosed, dvosed i fotelja - TDF garniture po povoljnim cenama u salonu Nameštaj Carević, Kragujevac.",
    shortDescription: "Trosed, dvosed i fotelja garniture",
    image: "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?q=80&w=1200&auto=format&fit=crop",
  },
  {
    slug: "trosedi",
    name: "Trosedi",
    displayName: "Trosedi",
    description: "Prostrani trosedi za celu porodicu - moderni i klasični modeli u salonu Nameštaj Carević, Kragujevac.",
    shortDescription: "Prostrani trosedi za celu porodicu",
    image: "https://images.unsplash.com/photo-1550254478-ead40cc54513?q=80&w=1200&auto=format&fit=crop",
  },
  {
    slug: "ugaone-garniture",
    name: "Ugaone garniture",
    displayName: "Ugaone garniture",
    description: "Funkcionalne ugaone garniture za svaki prostor - širok izbor u salonu Nameštaj Carević, Kragujevac.",
    shortDescription: "Funkcionalne ugaone garniture za svaki prostor",
    image: "https://images.unsplash.com/photo-1540574163026-643ea20ade25?q=80&w=1200&auto=format&fit=crop",
  },
];

export function getCategoryBySlug(slug: string): CategoryConfig | undefined {
  return CATEGORIES.find((c) => c.slug === slug);
}
