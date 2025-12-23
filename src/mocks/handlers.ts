import { filmHandlers } from './handlers/films';
import { peopleHandlers } from './handlers/people';
import { planetHandlers } from './handlers/planets';
import { starshipHandlers } from './handlers/starships';
import { vehicleHandlers } from './handlers/vehicles';
import { speciesHandlers } from './handlers/species';

export const handlers = [
  ...filmHandlers,
  ...peopleHandlers,
  ...planetHandlers,
  ...starshipHandlers,
  ...vehicleHandlers,
  ...speciesHandlers,
];
