import {Reducer, StateReducer} from './reducers';

export const getPokemons = (state: Reducer) => state.pokemon.data;

export const getPokemon = (id: number) => (state: Reducer) =>
  state.pokemon.data.find(pokemon => pokemon.id === id);

export const getLoadingState = (key: StateReducer) => (state: Reducer) =>
  state[key]?.loading ?? false;

export const getType = (state: Reducer) => state.types;
