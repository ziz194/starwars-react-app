import { http, HttpResponse } from 'msw';
import { films } from '../data/films';

export const filmHandlers = [
  http.get('*/api/films', () => HttpResponse.json({ results: films })),

  http.get('*/api/films/:id', ({ params }) => {
    const film = films.find((f) => f.url.endsWith(`/${params.id}/`));

    return film ? HttpResponse.json(film) : new HttpResponse(null, { status: 404 });
  }),
];
