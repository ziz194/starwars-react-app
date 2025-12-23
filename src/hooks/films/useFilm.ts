import { useQuery } from '@tanstack/react-query';
import type { Film } from '../../types/film.ts';

const fetchFilm = async (id: string): Promise<Film> => {
  const res = await fetch(`https://swapi.py4e.com/api/films/${id}/`);
  if (!res.ok) {
    throw new Error('Failed to fetch film');
  }
  return res.json();
};

export const getFilmQueryOptions = (id?: string) => ({
  queryKey: ['film', id],
  queryFn: () => fetchFilm(id!),
  staleTime: 1000 * 60,
});

export const useFilm = (id?: string) => {
  return useQuery<Film, Error>(getFilmQueryOptions(id));
};
