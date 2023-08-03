import { FC } from 'react';
// import { useGetLaunchesQuery } from '../../store';

type TLaunchProps = {
    name: string;
    date: Date;
    details: string | null;
    rocket?: string
} 

export const Launch: FC<TLaunchProps> = ({name, date, details, rocket}) => {
    // const { data, isLoading, isSuccess } = useGetLaunchesQuery();

	// if (!isSuccess) return;
	// // const date = new Date(launch.date_utc).getUTCDate();
	// // const month = new Date(launch.date_utc).getMonth();
	// // const year = new Date(launch.date_utc).getFullYear();
    // const launchesElements = data.map((launch: any) => {
    // if (!isSuccess) return <div>5</div>;
	// const date = new Date(launch.date_utc).getUTCDate();
	// const month = new Date(launch.date_utc).getMonth();
	// const year = new Date(launch.date_utc).getFullYear();
    //     return(
    //         <div>
	// 		<h1>{launch.name}</h1>
	// 		<div>{launch.details}</div>
	// 		<time>{`${date}.${month}.${year}`}</time>
	// 	</div>
    //     )
    // })

	return (
		<div>
            <h1>{name}</h1>
            <div>{details}</div>
            <time>{'time'}</time>
        </div>
	);
};
