import {
  buildAsyncActions,
  buildAsyncReducers,
  buildAsyncState,
} from '@thecodingmachine/redux-toolkit-wrapper';
import axiosClient from '../../services/axios-client';
import {getListPokemon} from '../../services/pokemon';
import {ApiRensponse, Pokemon} from '../../types/api';

export default {
  initialState: buildAsyncState('getListPokemon'),
  action: buildAsyncActions(
    'store/getPokemonList',
    async (args: {}, {rejectWithValue}) => {
      try {
        const {
          data: {results, next},
        } = await getListPokemon();
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
        return {data: dataPoke, next};
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
