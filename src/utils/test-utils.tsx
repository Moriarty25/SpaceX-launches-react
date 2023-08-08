import { launchesApi } from '../store/launchesApi';
import React, { PropsWithChildren } from 'react';
import { render } from '@testing-library/react';
import type { RenderOptions } from '@testing-library/react';
import { configureStore } from '@reduxjs/toolkit';
import type { PreloadedState } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';

import { store, type RootState } from '../store';

interface ExtendedRenderOptions extends Omit<RenderOptions, 'queries'> {
	preloadedState?: PreloadedState<RootState>;
	store?: any;
}

export function renderWithProviders(
	ui: React.ReactElement,
	{
		store = configureStore({
			reducer: {
				[launchesApi.reducerPath]: launchesApi.reducer,
			},
			middleware: getDefaultMiddleware =>
				getDefaultMiddleware().concat(launchesApi.middleware),
		}),
		...renderOptions
	}: ExtendedRenderOptions = {},
) {
	const Wrapper = ({ children }: PropsWithChildren<{}>): JSX.Element => {
		return <Provider store={store}>{children}</Provider>;
	};

	// Return an object with the store and all of RTL's query functions
	return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
}

export const StoreProvider = ({ children }: { children?: React.ReactNode }) => (
	<Provider store={store}>{children}</Provider>
);
