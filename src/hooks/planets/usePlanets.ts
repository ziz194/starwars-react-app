import { useQuery } from '@tanstack/react-query';
import type { PaginatedResponse } from '../../types/paginated-response.ts';
import type { Planet } from '../../types/planet.ts';

const fetchPlanets = async (page: number): Promise<PaginatedResponse<Planet>> => {
  const response = await fetch(`https://swapi.py4e.com/api/planets/?page=${page}`);

  if (!response.ok) {
    throw new Error('Failed to fetch planets');
  }

  return response.json();
};

export const usePlanets = (page: number) => {
  return useQuery<PaginatedResponse<Planet>>({
    queryKey: ['planets', page],
    queryFn: () => fetchPlanets(page),
    staleTime: 1000 * 60, // 1 minute
  });
};
