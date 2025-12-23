import { useQuery } from '@tanstack/react-query';
import type { PaginatedResponse } from '../../types/paginated-response.ts';
import type { Film } from '../../types/film.ts';

const fetchPlanets = async (page: number): Promise<PaginatedResponse<Film>> => {
  const response = await fetch(`https://swapi.py4e.com/api/planets/?page=${page}`);

  if (!response.ok) {
    throw new Error('Failed to fetch planets');
  }

  return response.json();
};

export const usePlanets = (page: number) => {
  return useQuery<PaginatedResponse<Film>>({
    queryKey: ['planets', page],
    queryFn: () => fetchPlanets(page),
    staleTime: 1000 * 60, // 1 minute
  });
};
