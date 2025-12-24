import { http, HttpResponse } from 'msw';

import { planets } from '../data/planets';

export const planetHandlers = [
  http.get('*/api/planets', () => HttpResponse.json({ results: planets })),

  http.get('*/api/planets/:id', ({ params }) => {
    const planet = planets.find((p) => p.url.endsWith(`/${params.id}/`));

    return planet ? HttpResponse.json(planet) : new HttpResponse(null, { status: 404 });
  }),
];
