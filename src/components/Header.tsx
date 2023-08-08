import { FC } from 'react';
import { SortAscendingOutlined, SortDescendingOutlined } from '@ant-design/icons';
import { Button, Dropdown, MenuProps, Space, Typography, message } from 'antd';
import { useAppDispatch } from '../hooks/redux';
import { launchesApi } from '../store/launchesApi';

export type TSort = 'ascending' | 'descending';

interface IHeaderProps {
	sort: TSort;
	setSort: (typeOfSorting: TSort) => void;
	setPage: (page: number) => void;
}

export const Header: FC<IHeaderProps> = ({ sort, setSort, setPage }) => {
	const dispatch = useAppDispatch();

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
		<header className='header'>
			<Typography.Title level={3}>Successful SpaceX launches for 2015-2019</Typography.Title>
			<div className='sort'>
				<Typography.Text style={{ fontSize: 16 }}>Sort by time:</Typography.Text>
				<Dropdown menu={dropdownMenu}>
					<Button>
						<Space>{sort}</Space>
					</Button>
				</Dropdown>
			</div>
		</header>
	);
};
