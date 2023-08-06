import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const launchesApi = createApi({
	reducerPath: 'launchesApi',
	baseQuery: fetchBaseQuery({ baseUrl: 'https://api.spacexdata.com/v4' }),
	endpoints: build => ({
		getLaunches: build.query<any, { page: number; sort: 'ascending' | 'descending' }>({
			query: params => ({
				url: `/launches/query`,
				method: 'POST',
				body: {
					query: {
						date_utc: {
							$gte: '2015-01-01T00:00:00.000Z',
							$lte: '2019-12-31T00:00:00.000Z',
						},
					},
					options: {
						page: params.page,
						sort: {
							date_utc: params.sort,
						},
					},
				},
			}),
			serializeQueryArgs: ({ endpointName }) => {
				return endpointName;
			},
			transformResponse: (response: any, meta, arg) => {
				const onlySuccessfulLaunches = response.docs.filter(
					(launch: { success: boolean }) => launch.success,
				);
				return { ...response, docs: onlySuccessfulLaunches };
			},
			merge: (currentCache, newItems) => {
				if (currentCache.nextPage) {
					currentCache.docs.push(...newItems.docs);
				}
			},
			forceRefetch({ currentArg, previousArg }) {
				// if (currentArg.sort !== previousArg.sort) return false
				return currentArg !== previousArg;
			},
		}),
		getRocket: build.query({
			query: id => `/rockets/${id}`,
		}),
	}),
});

export const { useGetLaunchesQuery, useGetRocketQuery } = launchesApi;
