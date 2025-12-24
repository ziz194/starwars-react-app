import { render, screen } from '@testing-library/react';
import { beforeEach } from 'vitest';

import { TestProviders } from '../../../utilities/test-providers.tsx';
import PersonDetail from './PersonDetail.tsx';

describe('PersonDetail', () => {
  beforeEach(() => {
    render(
      <TestProviders
        router={{ route: '/people/1', path: '/people/:personId' }}
        component={<PersonDetail />}
      />
    );
  });

  it('should render the name', async () => {
    expect(await screen.findByRole('heading', { name: 'Luke Skywalker' })).toBeInTheDocument();
  });

  it('should render related films', async () => {
    expect(await screen.findByText('Films')).toBeInTheDocument();
    expect(await screen.findByRole('link', { name: 'A New Hope' })).toHaveAttribute(
      'href',
      '/films/1'
    );
  });

  it('should render homeworld correctly', async () => {
    expect(await screen.findByRole('link', { name: 'Tatooine' })).toHaveAttribute(
      'href',
      '/planets/1'
    );
  });
});
