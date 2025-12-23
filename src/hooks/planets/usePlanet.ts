import { useQuery } from '@tanstack/react-query';
import type { Planet } from '../../types/planet.ts';

const fetchPlanet = async (id: string): Promise<Planet> => {
  const res = await fetch(`https://swapi.py4e.com/api/planets/${id}/`);
  if (!res.ok) {
    throw new Error('Failed to fetch planet');
  }
  return res.json();
};
export const getPlanetQueryOptions = (id?: string) => ({
  queryKey: ['planet', id],
  queryFn: () => fetchPlanet(id!),
  staleTime: 1000 * 60,
});
export const usePlanet = (id: string | undefined) => {
  return useQuery<Planet, Error>(getPlanetQueryOptions(id!));
};
