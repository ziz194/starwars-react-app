import { useQuery } from '@tanstack/react-query';
import type { PaginatedResponse } from '../../types/paginated-response.ts';
import type { Film } from '../../types/film.ts';

const fetchFilms = async (page: number): Promise<PaginatedResponse<Film>> => {
  const response = await fetch(`https://swapi.py4e.com/api/films/?page=${page}`);

  if (!response.ok) {
    throw new Error('Failed to fetch films');
  }

  return response.json();
};

export const useFilms = (page: number) => {
  return useQuery<PaginatedResponse<Film>>({
    queryKey: ['films', page],
    queryFn: () => fetchFilms(page),
    staleTime: 1000 * 60, // 1 minute
  });
};
