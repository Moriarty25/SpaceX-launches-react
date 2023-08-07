import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { renderWithProviders } from '../utils/test-utils';
import { Launch } from '../components/Launch';

const mockLaunchProps = {
    name: 'CRS-11',
    date: new Date('2019-12-17T00:10:00.000Z'),
    rocket: '123',
};

describe('Launch component ', () => {
    it('check component is rendering', async () => {
        renderWithProviders(
            <Launch
                date={mockLaunchProps.date}
                name={mockLaunchProps.name}
                rocket={mockLaunchProps.rocket}
                details={null}
            />,
        )

        // Rendering name of mission
        expect(await screen.getByText('CRS-11')).toBeInTheDocument();

        // Rendering message if isn't details
        expect(screen.getByText('No details about this mission')).toBeInTheDocument();
  
        // Rendering correct Date 
        expect(screen.getByText('Tue, 17 Dec 2019 00:10:00 GMT')).toBeInTheDocument();
    });

});
