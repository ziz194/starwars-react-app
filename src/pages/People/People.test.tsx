import { render, screen } from '@testing-library/react';
import { beforeEach } from 'vitest';

import People from '../../pages/People/People';
import { TestProviders } from '../../utilities/test-providers.tsx';

describe('People', () => {
  beforeEach(() => {
    render(<TestProviders component={<People />} />);
  });

  it('renders people table with mock data correctly', async () => {
    expect(await screen.findAllByRole('row')).toHaveLength(2);
    expect(await screen.findByText('Luke Skywalker')).toBeInTheDocument();
    expect(await screen.findByText('Darth Vader')).toBeInTheDocument();
  });
});
