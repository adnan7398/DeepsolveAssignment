export interface Pokemon {
  id: number;
  name: string;
  types: string[];
  sprite: string;
  height: number;
  weight: number;
  stats: { name: string; value: number }[];
  abilities: { name: string; isHidden: boolean }[];
}

export type Theme = 'light' | 'dark';
export type GridSize = 'normal' | 'compact';
