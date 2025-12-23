import { http, HttpResponse } from 'msw';
import { vehicles } from '../data/vehicles';

export const vehicleHandlers = [
  http.get('*/api/vehicles', () => HttpResponse.json({ results: vehicles })),

  http.get('*/api/vehicles/:id', ({ params }) => {
    const vehicle = vehicles.find((v) => v.url.endsWith(`/${params.id}/`));

    return vehicle ? HttpResponse.json(vehicle) : new HttpResponse(null, { status: 404 });
  }),
];
