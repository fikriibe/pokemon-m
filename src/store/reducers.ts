import {buildSlice} from '@thecodingmachine/redux-toolkit-wrapper';
import endpoint from '../config/endpoint';
import {DefaultItem, Pokemon} from '../types/api';
import getListPokemon from './actions/getListPokemon';
import getType from './actions/getType';

export type StateReducer =
  | 'getListPokemon'
  | 'getDetailPokemon'
  | 'getListType';

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

export default buildSlice('store', [getListPokemon, getType], initialState)
  .reducer;
