import { useQuery } from '@tanstack/react-query';
import type { Starship } from '../../types/starship';
import type { PaginatedResponse } from '../../types/paginated-response.ts';

const fetchStarships = async (page = 1): Promise<PaginatedResponse<Starship>> => {
  const res = await fetch(`https://swapi.py4e.com/api/starships/?page=${page}`);

  if (!res.ok) {
    throw new Error('Failed to fetch starships');
  }

  return res.json();
};

export const useStarships = (page = 1) => {
  return useQuery({
    queryKey: ['starships', page],
    queryFn: () => fetchStarships(page),
  });
};
