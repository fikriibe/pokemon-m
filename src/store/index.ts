import {configureStore} from '@reduxjs/toolkit';
import reducers from './reducers';
export const store = configureStore({
  reducer: reducers,
  middleware: getDefaultMiddleware => {
    const middleware = getDefaultMiddleware();
    if (__DEV__) {
      const createDebugger = require('redux-flipper').default;
      middleware.push(createDebugger());
    }
    return middleware;
  },
});
