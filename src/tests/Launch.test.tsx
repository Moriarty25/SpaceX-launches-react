import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Launch } from '../components/Launch';

test('Launch component is rendering ', () => {
    const mockLaunchProps = {
        name: 'SpaceX',
        date: new Date(),
        rocket: 'id',
    };
    render(
        <Launch
        date={mockLaunchProps.date}
            name={mockLaunchProps.name}
            rocket={mockLaunchProps.rocket}
            details={null}
        />,
    );
    const details = screen.getByText(/'No details about this mission'/i);
    expect(details).toBeNull();
    
});
