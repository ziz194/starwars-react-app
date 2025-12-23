import { useQuery } from '@tanstack/react-query';
import type { Starship } from '../../types/starship';

const fetchStarship = async (id?: string): Promise<Starship> => {
  if (!id) {
    throw new Error('Starship ID is required');
  }

  const res = await fetch(`https://swapi.py4e.com/api/starships/${id}/`);

  if (!res.ok) {
    throw new Error('Failed to fetch starship');
  }

  return res.json();
};

export const useStarship = (id?: string) => {
  return useQuery({
    queryKey: ['starship', id],
    queryFn: () => fetchStarship(id),
    enabled: !!id,
  });
};

export const getStarshipQueryOptions = (id?: string) => ({
  queryKey: ['starship', id],
  queryFn: () => fetchStarship(id),
  enabled: !!id,
});
