import { configureStore } from '@reduxjs/toolkit';
import { launchesApi } from './launchesApi';

export const store = configureStore({
	reducer: {
		[launchesApi.reducerPath]: launchesApi.reducer,
	},
	middleware: getDefaultMiddleware => getDefaultMiddleware().concat(launchesApi.middleware),
});
