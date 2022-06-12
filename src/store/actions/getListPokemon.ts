import {
  buildAsyncActions,
  buildAsyncReducers,
  buildAsyncState,
} from '@thecodingmachine/redux-toolkit-wrapper';
import axiosClient from '../../services/axios-client';
import {getListPokemon} from '../../services/pokemon';
import {ApiRensponse, Pokemon} from '../../types/api';
import {Reducer} from '../reducers';

export default {
  initialState: buildAsyncState('getListPokemon'),
  action: buildAsyncActions(
    'store/getPokemonList',
    async (args: {}, {rejectWithValue, getState}) => {
      const {pokemon, ...other} = getState() as Reducer;
      console.log(pokemon, other.getListPokemon);
      if (!pokemon.next) {
        throw new Error('No more pokemon');
      }
      try {
        const {
          data: {results, next},
        } = await getListPokemon(pokemon.next);
        const dataPoke = await Promise.all(
          results.map(
            ({url}) =>
              new Promise((resolve, reject) =>
                axiosClient
                  .get<ApiRensponse<Pokemon>>(url)
                  .then(({data}) => resolve(data))
                  .catch(reject),
              ),
          ),
        );
        return {data: [...pokemon.data, ...dataPoke], next};
      } catch (e) {
        return rejectWithValue(e);
      }
    },
  ),
  reducers: buildAsyncReducers({
    loadingKey: 'getListPokemon.loading',
    errorKey: 'getListPokemon.error',
    itemKey: 'pokemon',
  }),
};
