import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Loader } from '../components/Loader/Loader';

test('loader icon is rendering', () => {
	render(<Loader />);
	const loaderElement = screen.getByText(/🚀/i);
	expect(loaderElement).toBeInTheDocument();
});
