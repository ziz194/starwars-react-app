import { render, screen } from '@testing-library/react';
import { beforeEach } from 'vitest';

import Planets from '../../pages/Planets/Planets';
import { TestProviders } from '../../utilities/test-providers.tsx';

describe('Planets', () => {
  beforeEach(() => {
    render(<TestProviders component={<Planets />} />);
  });

  it('renders planets table with mock data correctly', async () => {
    expect(await screen.findAllByRole('row')).toHaveLength(2);
    expect(await screen.findByText('Tatooine')).toBeInTheDocument();
    expect(await screen.findByText('Hoth')).toBeInTheDocument();
  });
});
