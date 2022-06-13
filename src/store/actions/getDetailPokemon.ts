import {
  buildAsyncActions,
  buildAsyncReducers,
  buildAsyncState,
} from '@thecodingmachine/redux-toolkit-wrapper';
import {getDetailPokemon} from '../../services/pokemon';
import {Pokemon} from '../../types/api';
import setPokemonList from './setPokemonList';

type Args = {
  id?: number;
  name?: string;
  callback?: (item: Pokemon) => void;
};

export default {
  initialState: buildAsyncState('getDetailPokemon'),
  action: buildAsyncActions(
    'store/getDetailPokemon',
    async (args: Args, {rejectWithValue, dispatch}) => {
      try {
        const {id, name, callback} = args;
        const {data} = await getDetailPokemon(id, name);
        dispatch(setPokemonList.action([data]));
        callback?.(data);
      } catch (e) {
        return rejectWithValue(e);
      }
    },
  ),
  reducers: buildAsyncReducers({
    loadingKey: 'getDetailPokemon.loading',
    errorKey: 'getDetailPokemon.error',
    itemKey: null,
  }),
};
