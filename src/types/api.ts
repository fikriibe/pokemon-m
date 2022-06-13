export interface ApiRensponse<D> {
  data: D;
}

export interface DefaultItem<T = string> {
  name: T;
  url: string;
}

export type TypePokemon =
  | 'normal'
  | 'fighting'
  | 'flying'
  | 'poison'
  | 'ground'
  | 'rock'
  | 'bug'
  | 'ghost'
  | 'steel'
  | 'fire'
  | 'water'
  | 'grass'
  | 'electric'
  | 'psychic'
  | 'ice'
  | 'dragon'
  | 'dark'
  | 'fairy'
  | 'unknown';

export interface PokemonAbility {
  ability: DefaultItem;
  is_hidden: boolean;
  slot: number;
}

export interface PokemonStats {
  base_stat: number;
  effort: number;
  stat: DefaultItem;
}
export interface Pokemon {
  abilities: PokemonAbility[];
  base_experience: number;
  forms: DefaultItem[];
  game_indices: {
    game_index: number;
    version: DefaultItem;
  }[];
  height: number;
  weight: number;
  held_items: any[];
  id: number;
  is_default: boolean;
  location_area_encounters: string;
  moves: any[];
  name: string;
  order: number;
  types: {
    slot: number;
    type: DefaultItem<TypePokemon>;
  }[];
  sprites: {
    back_default: string | null;
    back_female: string | null;
    back_shiny: string | null;
    back_shiny_female: string | null;
    front_default: string | null;
    front_female: string | null;
    front_shiny: string | null;
    front_shiny_female: string | null;
  };
  stats: PokemonStats[];
}

export interface ListResponse<D = DefaultItem> {
  count: number;
  next: string | null;
  previous: string | null;
  results: D[];
}
