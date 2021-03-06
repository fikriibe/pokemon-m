import {buildSlice} from '@thecodingmachine/redux-toolkit-wrapper';
import endpoint from '../config/endpoint';
import {DefaultItem, Pokemon} from '../types/api';
import getDataFromUrl from './actions/getDataFromUrl';
import getListPokemon from './actions/getListPokemon';
import getType from './actions/getType';
import setPokemonList from './actions/setPokemonList';

export type StateReducer =
  | 'getListPokemon'
  | 'getDetailPokemon'
  | 'getListType'
  | 'getDataFromUrl';

type ReducerState = {
  [key in StateReducer]?: {
    loading: boolean;
    error: any;
  };
};

export interface Reducer extends ReducerState {
  pokemon: {
    data: Pokemon[];
    next: string | null;
  };
  types: DefaultItem[];
}

const initialState = {
  pokemon: {
    data: [],
    next: endpoint.pokemon,
  },
  types: [],
};

export default buildSlice(
  'store',
  [getListPokemon, getType, getDataFromUrl, setPokemonList],
  initialState,
).reducer;
