import { useRef, useState } from 'react';
import { useGetLaunchesQuery } from './store';
import { Empty, Spin, Typography } from 'antd';
import { useScroll } from './hooks/useScroll';
import { Header, type TSort } from './components/Header';
import { Launch } from './components/Launch';
import { Loader } from './components/Loader';
import { ILaunch } from './models/launchTypes';
import './styles/App.scss';

export const App = () => {
	const [page, setPage] = useState(0);
	const [sort, setSort] = useState<TSort>('descending');
	const { data, isLoading, isFetching, isError } = useGetLaunchesQuery({ page, sort });
	const parentRef = useRef(null);
	const childRef = useRef(null);
	const intersected = useScroll(parentRef, childRef, () => launchesHandler());

	function launchesHandler() {
		setPage(prev => prev + 1);
	}

	const launchesElements =
		data &&
		data.docs.map((launch: ILaunch) => (
			<Launch
				key={launch.id}
				name={launch.name}
				date={launch.date_utc}
				details={launch.details}
				rocket={launch.rocket}
			/>
		));

	return (
		<div className='app'>
			<Header sort={sort} setSort={setSort} setPage={setPage} />
			<main className='launches' ref={parentRef}>
				{isLoading ? <Loader /> : launchesElements}
				<div ref={childRef}>
					{isFetching ? <Spin style={{ padding: 20 }} /> : <>&nbsp;</>}
					{isError && (
						<Empty
							description={
								<Typography.Text strong>Something went wrong</Typography.Text>
							}
						/>
					)}
				</div>
			</main>
		</div>
	);
};
