import { render, screen, waitFor } from '@testing-library/react';
import { beforeEach } from 'vitest';
import FilmDetail from './FilmDetail.tsx';
import { TestProviders } from '../../../utilities/test-providers.tsx';
import { server } from '../../../mocks/server.ts';
import { http, HttpResponse } from 'msw';

describe('FilmsDetail', () => {
  beforeEach(() => {
    render(
      <TestProviders
        router={{ route: '/films/1', path: '/films/:filmId' }}
        component={<FilmDetail />}
      />
    );
  });

  it('should render the title', async () => {
    expect(await screen.findByRole('heading', { name: 'A New Hope' })).toBeInTheDocument();
  });

  it('should not render the url prop', async () => {
    await waitFor(() => {
      expect(screen.queryByText('https://swapi.dev/api/films/1/')).toBeNull();
    });
  });

  it('should render the related people correctly', async () => {
    expect(await screen.findByText('Characters')).toBeInTheDocument();
    expect(await screen.findByRole('link', { name: 'Luke Skywalker' })).toHaveAttribute(
      'href',
      '/people/1'
    );
    expect(await screen.findByRole('link', { name: 'Darth Vader' })).toHaveAttribute(
      'href',
      '/people/2'
    );
  });

  it('should render the related planets correctly', async () => {
    expect(await screen.findByText('Planets')).toBeInTheDocument();
    expect(await screen.findByRole('link', { name: 'Tatooine' })).toHaveAttribute(
      'href',
      '/planets/1'
    );
    expect(await screen.findByRole('link', { name: 'Hoth' })).toHaveAttribute('href', '/planets/2');
  });

  it('the breadcrumbs link should navigate to the correct link', async () => {
    expect(await screen.findByRole('link', { name: 'Films' })).toHaveAttribute('href', '/films');
    expect(await screen.findByRole('link', { name: 'Home' })).toHaveAttribute('href', '/');
  });
});

describe('FilmDetail – error state', () => {
  it('shows an error message when film fetch fails', async () => {
    server.use(http.get('*/api/films/:id', () => new HttpResponse(null, { status: 500 })));

    render(
      <TestProviders
        router={{ route: '/films/1', path: '/films/:filmId' }}
        component={<FilmDetail />}
      />
    );
    expect(await screen.findByText(/Failed to load data./i)).toBeInTheDocument();
  });
});
