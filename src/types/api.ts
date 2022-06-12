export interface ApiRensponse<D> {
  data: D;
}

export interface DefaultItem {
  name: string;
  url: string;
}

export interface PokemonAbility {
  ability: DefaultItem;
  is_hidden: boolean;
  slot: number;
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
    type: DefaultItem;
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
}

export interface ListResponse<D = DefaultItem> {
  count: number;
  next: string | null;
  previous: string | null;
  results: D[];
}
