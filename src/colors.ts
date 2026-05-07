export interface Color {
  name: string;
  hex: string;
}

// Order follows ISO 13406-2 dead-pixel test convention:
// black (hot pixels) → white (dead pixels) → R/G/B (subpixel channels)
// → cyan/magenta/yellow (subpixel pairs) → gray (mid-tone)
export const COLORS: readonly Color[] = [
  { name: 'Black',   hex: '#000000' },
  { name: 'White',   hex: '#ffffff' },
  { name: 'Red',     hex: '#ff0000' },
  { name: 'Green',   hex: '#00ff00' },
  { name: 'Blue',    hex: '#0000ff' },
  { name: 'Cyan',    hex: '#00ffff' },
  { name: 'Magenta', hex: '#ff00ff' },
  { name: 'Yellow',  hex: '#ffff00' },
  { name: 'Gray',    hex: '#808080' },
] as const;
