import {
  buildAsyncActions,
  buildAsyncReducers,
  buildAsyncState,
} from '@thecodingmachine/redux-toolkit-wrapper';
import {getListType} from '../../services/pokemon';

export default {
  initialState: buildAsyncState('getListType'),
  action: buildAsyncActions(
    'store/getTypeList',
    async (args: {}, {rejectWithValue}) => {
      try {
        const {data} = await getListType();
        return data;
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
