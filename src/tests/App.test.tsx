import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { renderWithProviders } from '../utils/test-utils';
import { App } from '../App';
import { Button, Dropdown, MenuProps } from 'antd';

const intersectionObserverMock = function () {
	return {
		observe: jest.fn(),
		disconnect: jest.fn(),
		unobserve: jest.fn(),
	};
};
window.IntersectionObserver = jest.fn().mockImplementation(intersectionObserverMock);

describe('Launch component ', () => {
	it('check component is rendering', async () => {
		renderWithProviders(<App />);

		// Rendering name of mission
		expect(screen.getByText('Successful SpaceX launches for 2015-2019')).toBeInTheDocument();

		const sortButton = screen.getByText('descending');

		// Checking sort button is render
		expect(sortButton).toBeInTheDocument();
	});

	it('calls handleDropdownMenuClick when a Button is clicked', () => {
		const handleDropdownMenuClick = jest.fn();
		const items: MenuProps['items'] = [
			{
				label: 'ascending',
				key: '1',
			},
			{
				label: 'descending',
				key: '2',
			},
		];
		const dropdownMenu = {
			items,
			onClick: handleDropdownMenuClick,
		};
		render(
			<Dropdown menu={dropdownMenu}>
				<Button onClick={handleDropdownMenuClick}>sort</Button>
			</Dropdown>,
		);
		const sortBtn = screen.getByText('sort');
		sortBtn.click();
		expect(handleDropdownMenuClick).toBeCalled();
	});
	it('checking loading data', async () => {
		const { getByText, getByAltText, queryByText } = renderWithProviders(<App />);

		// Checking Loading
		expect(queryByText('🚀')).toBeInTheDocument();

		await waitFor(() => {
			const rgxName = new RegExp('JCSat 18 / Kacific 1', 'i');
			const rgxDate = new RegExp('Tue, 17 Dec 2019 00:10:00 GMT', 'i');

			// Checking Successful mission
			expect(getByText(rgxName)).toBeInTheDocument();

			// Checking of Date in the mission
			expect(getByText(rgxDate)).toBeInTheDocument();

			// Checking that the failed mission is not displayed
			expect(queryByText('CRS-7')).not.toBeInTheDocument();
		});
	});
});
