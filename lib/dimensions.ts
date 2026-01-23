/**
 * Normalizes different dimension JSON structures into a consistent format
 * Handles various formats:
 * - Simple: { width: "100cm", height: "200cm" }
 * - Nested: { dimensions: { width: "100cm" }, size: { height: "200cm" } }
 * - Array: [{ key: "width", value: "100cm" }, { label: "Height", value: "200cm" }]
 * - Object with units: { width: { value: 100, unit: "cm" }, height: { value: 200, unit: "cm" } }
 */
export interface DimensionItem {
  label: string;
  value: string;
}

export function normalizeDimensions(dimensions: any): DimensionItem[] {
  // Handle null, undefined, or non-object values
  if (!dimensions) {
    if (process.env.NODE_ENV === 'development') {
      console.log('[normalizeDimensions] No dimensions provided');
    }
    return [];
  }

  if (process.env.NODE_ENV === 'development') {
    console.log('[normalizeDimensions] Input:', dimensions, 'Type:', typeof dimensions, 'IsArray:', Array.isArray(dimensions));
  }

  // Handle array format: [{ key: "width", value: "100cm" }, { label: "Height", value: "200cm" }]
  if (Array.isArray(dimensions)) {
    return dimensions
      .filter(item => item && typeof item === 'object')
      .map(item => {
        const label = item.label || item.key || item.name || 'Dimension';
        const value = item.value || item.measurement || '';
        return { label: String(label), value: String(value) };
      })
      .filter(item => item.value);
  }

  // Handle non-object types
  if (typeof dimensions !== 'object') {
    return [];
  }

  const result: DimensionItem[] = [];

  // Handle variants structure: { variants: [{ name: "Standard", depth: 220, width: 280, height: 97, ... }] }
  if (dimensions.variants && Array.isArray(dimensions.variants)) {
    if (process.env.NODE_ENV === 'development') {
      console.log('[normalizeDimensions] Handling variants structure');
    }

    dimensions.variants.forEach((variant: any, variantIndex: number) => {
      if (!variant || typeof variant !== 'object') return;

      const variantName = variant.name || `Variant ${variantIndex + 1}`;

      // Extract main dimensions
      const mainDimensions = ['width', 'height', 'depth', 'length', 'weight', 'diameter'];

      mainDimensions.forEach(dimension => {
        if (variant[dimension] !== null && variant[dimension] !== undefined) {
          const label = variant.name
            ? `${formatLabel(dimension)} (${variant.name})`
            : formatLabel(dimension);
          result.push({
            label,
            value: `${variant[dimension]} cm`
          });
        }
      });

      // Handle sleepingSurface if present
      if (variant.sleepingSurface && typeof variant.sleepingSurface === 'object') {
        const surface = variant.sleepingSurface;
        if (surface.width !== null && surface.width !== undefined) {
          result.push({
            label: variant.name ? `Širina ležišta (${variant.name})` : 'Širina ležišta',
            value: `${surface.width} cm`
          });
        }
        if (surface.depth !== null && surface.depth !== undefined) {
          result.push({
            label: variant.name ? `Dubina ležišta (${variant.name})` : 'Dubina ležišta',
            value: `${surface.depth} cm`
          });
        }
      }

      // Handle any other dimensions in the variant
      Object.entries(variant).forEach(([key, value]) => {
        if (key !== 'name' && key !== 'sleepingSurface' && !mainDimensions.includes(key) &&
            value !== null && value !== undefined && typeof value === 'number') {
          const label = variant.name
            ? `${formatLabel(key)} (${variant.name})`
            : formatLabel(key);
          result.push({
            label,
            value: `${value} cm`
          });
        }
      });
    });

    if (result.length > 0) {
      if (process.env.NODE_ENV === 'development') {
        console.log('[normalizeDimensions] Variants result:', result);
      }
      return result;
    }
  }

  // Handle nested objects: { dimensions: { width: "100cm" }, size: { height: "200cm" } }
  // Flatten nested structures
  function flatten(obj: any, prefix = ''): void {
    if (!obj || typeof obj !== 'object' || Array.isArray(obj)) {
      return;
    }

    for (const [key, value] of Object.entries(obj)) {
      const fullKey = prefix ? `${prefix}_${key}` : key;

      if (value === null || value === undefined) {
        continue;
      }

      // Handle object with value/unit structure: { width: { value: 100, unit: "cm" } }
      if (typeof value === 'object' && !Array.isArray(value)) {
        if ('value' in value && 'unit' in value) {
          result.push({
            label: formatLabel(fullKey),
            value: `${value.value}${value.unit || ''}`
          });
        } else if ('value' in value) {
          result.push({
            label: formatLabel(fullKey),
            value: String(value.value)
          });
        } else {
          // Recursively flatten nested objects
          flatten(value, fullKey);
        }
      } else if (typeof value === 'string' || typeof value === 'number') {
        // Simple key-value pair - this is the most common case
        result.push({
          label: formatLabel(fullKey),
          value: String(value)
        });
      }
    }
  }

  flatten(dimensions);

  if (process.env.NODE_ENV === 'development') {
    console.log('[normalizeDimensions] Result:', result);
  }

  return result;
}

/**
 * Formats dimension keys into readable labels
 * Examples: "width" -> "Širina", "height" -> "Visina", "depth" -> "Dubina"
 */
function formatLabel(key: string): string {
  const labelMap: Record<string, string> = {
    width: 'Širina',
    height: 'Visina',
    depth: 'Dubina',
    length: 'Dužina',
    weight: 'Težina',
    diameter: 'Prečnik',
    radius: 'Poluprečnik',
    circumference: 'Obim',
  };

  const lowerKey = key.toLowerCase().replace(/[_-]/g, ' ');

  // Check if it's a known dimension
  if (labelMap[lowerKey]) {
    return labelMap[lowerKey];
  }

  // Capitalize first letter of each word
  return lowerKey
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}