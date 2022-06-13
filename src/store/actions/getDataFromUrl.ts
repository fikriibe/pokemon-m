import {
  buildAsyncActions,
  buildAsyncReducers,
  buildAsyncState,
} from '@thecodingmachine/redux-toolkit-wrapper';
import {BASE_URL} from '../../config/endpoint';
import axiosClient from '../../services/axios-client';

type Args = {
  url: string;
  callback?: (data: any) => void;
};

export default {
  initialState: buildAsyncState('getDataFromUrl'),
  action: buildAsyncActions(
    'store/getDataFromUrl',
    async (args: Args, {rejectWithValue}) => {
      const {url, callback} = args;
      try {
        const {data} = await axiosClient.get(url.replace(BASE_URL, ''));
        callback?.(data);
        return null;
      } catch (e) {
        return rejectWithValue(e);
      }
    },
  ),
  reducers: buildAsyncReducers({
    loadingKey: 'getDataFromUrl.loading',
    errorKey: 'getDataFromUrl.error',
    itemKey: null,
  }),
};
