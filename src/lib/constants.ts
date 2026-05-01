export const TYPE_COLORS: Record<string, { bg: string; text: string }> = {
  normal:   { bg: '#9FA19F', text: '#fff' },
  fire:     { bg: '#E62829', text: '#fff' },
  water:    { bg: '#2980EF', text: '#fff' },
  electric: { bg: '#FAC000', text: '#333' },
  grass:    { bg: '#3FA129', text: '#fff' },
  ice:      { bg: '#3DCEF3', text: '#fff' },
  fighting: { bg: '#FF8000', text: '#fff' },
  poison:   { bg: '#9141CB', text: '#fff' },
  ground:   { bg: '#915121', text: '#fff' },
  flying:   { bg: '#81B9EF', text: '#fff' },
  psychic:  { bg: '#EF4179', text: '#fff' },
  bug:      { bg: '#91A119', text: '#fff' },
  rock:     { bg: '#AFA981', text: '#fff' },
  ghost:    { bg: '#704170', text: '#fff' },
  dragon:   { bg: '#5060E1', text: '#fff' },
  dark:     { bg: '#624D4E', text: '#fff' },
  steel:    { bg: '#60A1B8', text: '#fff' },
  fairy:    { bg: '#EF70EF', text: '#fff' },
};

export const ALL_TYPES = Object.keys(TYPE_COLORS);

export const ACCENT = '#CC0000';
export const PAGE_SIZE = 20;
export const TOTAL_POKEMON = 151;
