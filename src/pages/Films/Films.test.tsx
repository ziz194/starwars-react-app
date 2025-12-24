import { render, screen } from '@testing-library/react';
import { beforeEach } from 'vitest';

import Films from '../../pages/Films/Films';
import { TestProviders } from '../../utilities/test-providers.tsx';

describe('Films', () => {
  beforeEach(() => {
    render(<TestProviders component={<Films />} />);
  });
  it('renders films table with mock data correctly', async () => {
    expect(await screen.findAllByRole('row')).toHaveLength(2);
    expect(await screen.findByText('A New Hope')).toBeInTheDocument();
    expect(await screen.findByText('The Empire Strikes Back')).toBeInTheDocument();
  });
  it('should render the dates correctly', async () => {
    expect(await screen.findByText('25.05.1977')).toBeInTheDocument();
    expect(await screen.findByText('21.05.1980')).toBeInTheDocument();
  });
});
