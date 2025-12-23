import { useQuery } from '@tanstack/react-query';
import type { Person } from '../../types/person';
import type { PaginatedResponse } from '../../types/paginated-response.ts';

const fetchPeople = async (page: number): Promise<PaginatedResponse<Person>> => {
  const res = await fetch(`https://swapi.py4e.com/api/people/?page=${page}`);
  if (!res.ok) {
    throw new Error('Failed to fetch people');
  }
  return res.json();
};

export const usePeople = (page = 1) => {
  return useQuery({
    queryKey: ['people', page],
    queryFn: () => fetchPeople(page),
  });
};
