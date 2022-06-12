import {
  buildAsyncActions,
  buildAsyncReducers,
  buildAsyncState,
} from '@thecodingmachine/redux-toolkit-wrapper';
import {getListType} from '../../services/pokemon';

export default {
  initialState: buildAsyncState('getListType'),
  action: buildAsyncActions(
    'store/getListType',
    async (args: {}, {rejectWithValue}) => {
      try {
        const {
          data: {results},
        } = await getListType();
        return results;
      } catch (e) {
        return rejectWithValue(e);
      }
    },
  ),
  reducers: buildAsyncReducers({
    loadingKey: 'getListType.loading',
    errorKey: 'getListType.error',
    itemKey: 'types',
  }),
};
