import { render, screen } from '@testing-library/react';
import { beforeEach } from 'vitest';

import { TestProviders } from '../../../utilities/test-providers.tsx';
import PlanetDetail from './PlanetDetail.tsx';

describe('PlanetDetail', () => {
  beforeEach(() => {
    render(
      <TestProviders
        router={{ route: '/planets/1', path: '/planets/:planetId' }}
        component={<PlanetDetail />}
      />
    );
  });

  it('should render the planet name', async () => {
    expect(await screen.findByRole('heading', { name: 'Tatooine' })).toBeInTheDocument();
  });

  it('should render residents correctly', async () => {
    expect(await screen.findByRole('link', { name: 'Luke Skywalker' })).toHaveAttribute(
      'href',
      '/people/1'
    );
  });

  it('should render related films correctly', async () => {
    expect(await screen.findByText('Films')).toBeInTheDocument();
    const newHopeLink = await screen.findByRole('link', { name: 'A New Hope' });
    const empireLink = await screen.findByRole('link', {
      name: 'The Empire Strikes Back',
    });
    expect(newHopeLink).toHaveAttribute('href', '/films/1');
    expect(empireLink).toHaveAttribute('href', '/films/2');
  });
});
