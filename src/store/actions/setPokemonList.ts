import {createAction} from '@reduxjs/toolkit';
import {Pokemon} from '../../types/api';
import {removeDuplicate} from '../../utils/arrayHelper';
import {Reducer} from '../reducers';

export default {
  initialState: {},
  action: createAction('store/setPokemon', function set(data: Pokemon[]) {
    return {payload: data};
  }),
  reducers: (state: Reducer, {payload}: {payload: Pokemon[]}) => {
    state.pokemon.data = removeDuplicate<Pokemon>(
      [...state.pokemon.data, ...payload],
      ({id}) => id,
    );
  },
};
