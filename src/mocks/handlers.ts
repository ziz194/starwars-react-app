import { filmHandlers } from './handlers/films';
import { peopleHandlers } from './handlers/people';
import { planetHandlers } from './handlers/planets';
import { speciesHandlers } from './handlers/species';
import { starshipHandlers } from './handlers/starships';
import { vehicleHandlers } from './handlers/vehicles';

export const handlers = [
  ...filmHandlers,
  ...peopleHandlers,
  ...planetHandlers,
  ...starshipHandlers,
  ...vehicleHandlers,
  ...speciesHandlers,
];
