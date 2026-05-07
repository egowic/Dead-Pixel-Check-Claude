export interface Color {
  name: string;
  hex: string;
}

export const COLORS: readonly Color[] = [
  { name: 'Red',     hex: '#ff0000' },
  { name: 'Green',   hex: '#00ff00' },
  { name: 'Blue',    hex: '#0000ff' },
  { name: 'White',   hex: '#ffffff' },
  { name: 'Black',   hex: '#000000' },
  { name: 'Cyan',    hex: '#00ffff' },
  { name: 'Magenta', hex: '#ff00ff' },
  { name: 'Yellow',  hex: '#ffff00' },
  { name: 'Gray',    hex: '#808080' },
] as const;
