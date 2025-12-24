import { http, HttpResponse } from 'msw';

import { species } from '../data/species';

export const speciesHandlers = [
  http.get('*/api/species', () => HttpResponse.json({ results: species })),

  http.get('*/api/species/:id', ({ params }) => {
    const sp = species.find((s) => s.url.endsWith(`/${params.id}/`));

    return sp ? HttpResponse.json(sp) : new HttpResponse(null, { status: 404 });
  }),
];
