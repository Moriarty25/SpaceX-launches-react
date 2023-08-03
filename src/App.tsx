import { useEffect } from 'react';
import { Launch } from './components/Launch';
import { useGetLaunchesMutation } from './store';

export const App = () => {
	const [getLaunches, {data}] = useGetLaunchesMutation();
	
	const body = {
		"query": {
		  "date_utc": {
			"$gte": "2017-06-22T00:00:00.000Z",
			"$lte": "2017-06-25T00:00:00.000Z"
		  }
	   }
	  }
	function spaceXHandler() {
		let promise = fetch('https://api.spacexdata.com/v5/launches/query', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json;charset=utf-8'
			  },
			  body: JSON.stringify(body)
		})
	}

	return (
		<>
			<div onClick={()=>getLaunches()}>Hi, guys!</div>
			{/* <Launch/> */}
			{/* {launchesElements(data, isSuccess)} */}
			<button onClick={spaceXHandler}>Space</button>
		</>
	);
};
