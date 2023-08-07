import { useRef, useState } from 'react';
import { launchesApi, useGetLaunchesQuery } from './store';
import { Button, Dropdown, Empty, Space, Spin, Typography, message } from 'antd';
import { SortAscendingOutlined, SortDescendingOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { useAppDispatch } from './hooks/redux';
import { useScroll } from './hooks/useScroll';
import { Launch } from './components/Launch';
import { Loader } from './components/Loader';
import { ILaunch } from './models/launchTypes';
import './styles/App.scss';

export const App = () => {
	const [page, setPage] = useState(0);
	const [sort, setSort] = useState<'ascending' | 'descending'>('descending');
	const { data, isLoading, isFetching, isError } = useGetLaunchesQuery({ page, sort });
	const parentRef = useRef(null);
	const childRef = useRef(null);
	const dispatch = useAppDispatch();
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

	const items: MenuProps['items'] = [
		{
			label: 'ascending',
			key: '1',
			icon: <SortAscendingOutlined />,
		},
		{
			label: 'descending',
			key: '2',
			icon: <SortDescendingOutlined />,
		},
	];

	const handleDropdownMenuClick: MenuProps['onClick'] = e => {
		const typeOfSorting = e.key === '1' ? 'ascending' : 'descending';
		dispatch(launchesApi.util.resetApiState());
		setSort(typeOfSorting);
		setPage(1);
		message.info(`Sorting in ${typeOfSorting} order`);
	};

	const dropdownMenu = {
		items,
		onClick: handleDropdownMenuClick,
	};

	return (
		<div className='app'>
			<header className='header'>
				<Typography.Title level={3}>
					Successful SpaceX launches for 2015-2019
				</Typography.Title>
				<div className='sort'>
					<Typography.Text style={{ fontSize: 16 }}>Sort by time:</Typography.Text>
					<Dropdown menu={dropdownMenu}>
						<Button>
							<Space>{sort}</Space>
						</Button>
					</Dropdown>
				</div>
			</header>
			<main className='launches' ref={parentRef}>
				{isLoading ? <Loader /> : launchesElements}
				<div ref={childRef}>
					{isFetching ? <Spin style={{ padding: 20 }} /> : <>&nbsp;</>}
					{isError && <Empty description={
						<Typography.Text strong>Something went wrong</Typography.Text>
						} />}
				</div>
			</main>
		</div>
	);
};
