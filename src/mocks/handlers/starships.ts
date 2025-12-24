import { http, HttpResponse } from 'msw';

import { starships } from '../data/starships';

export const starshipHandlers = [
  http.get('*/api/starships', () => HttpResponse.json({ results: starships })),

  http.get('*/api/starships/:id', ({ params }) => {
    const ship = starships.find((s) => s.url.endsWith(`/${params.id}/`));

    return ship ? HttpResponse.json(ship) : new HttpResponse(null, { status: 404 });
  }),
];
