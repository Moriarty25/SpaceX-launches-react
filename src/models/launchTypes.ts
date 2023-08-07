export interface ILaunch {
	id: string;
	name: string;
	date_utc: Date;
	details: string | null;
	rocket: string;
	success: boolean;
}

export interface ILaunchData {
	docs: ILaunch[];
	hasNextPage: boolean;
	hasPrevPage: boolean;
	limit: number;
	nextPage: number | null;
	page: number;
	pagingCounter: number;
	prevPage: number | null;
	totalDocs: number;
	totalPages: number;
}
