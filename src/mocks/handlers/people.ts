import { http, HttpResponse } from 'msw';

import { people } from '../data/people';

export const peopleHandlers = [
  http.get('*/api/people', () => HttpResponse.json({ results: people })),

  http.get('*/api/people/:id', ({ params }) => {
    const person = people.find((p) => p.url.endsWith(`/${params.id}/`));

    return person ? HttpResponse.json(person) : new HttpResponse(null, { status: 404 });
  }),
];
