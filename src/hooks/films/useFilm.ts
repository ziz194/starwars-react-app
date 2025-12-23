import { useQuery } from '@tanstack/react-query';
import type { Film } from '../../types/film.ts';

const fetchFilm = async (id: string): Promise<Film> => {
  const res = await fetch(`https://swapi.py4e.com/api/films/${id}/`);
  if (!res.ok) {
    throw new Error('Failed to fetch film');
  }
  return res.json();
};

export const useFilm = (id?: string) => {
  return useQuery<Film, Error>({
    queryKey: ['film', id],
    queryFn: () => fetchFilm(id!),
    enabled: !!id, // prevents running if id is undefined
    staleTime: 1000 * 60, // 10 minutes
  });
};
