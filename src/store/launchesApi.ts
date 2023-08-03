import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const launchesApi = createApi({
	reducerPath: 'launchesApi',
	baseQuery: fetchBaseQuery({ baseUrl: 'https://api.spacexdata.com/v5/launches/' }),
	endpoints: build => ({
		getLaunches: build.mutation<any, void>({
			query: (body) => ({
				url: `query`,
				method: 'POST',
                body: {
                    "query": {
                        "date_utc": {
                          "$gte": "2015-01-01T00:00:00.000Z",
                          "$lte": "2019-12-31T00:00:00.000Z"
                        }
                     }
                }      
			}),
		}),
	}),
});

export const { useGetLaunchesMutation } = launchesApi;
