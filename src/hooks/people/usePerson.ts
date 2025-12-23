import { useQuery } from '@tanstack/react-query';
import type { Person } from '../../types/person';

const fetchPerson = async (id?: string): Promise<Person> => {
  if (!id) {
    throw new Error('Person ID is required');
  }

  const res = await fetch(`https://swapi.py4e.com/api/people/${id}/`);
  if (!res.ok) {
    throw new Error('Failed to fetch person');
  }
  return res.json();
};

export const usePerson = (id?: string) => {
  return useQuery({
    queryKey: ['person', id],
    queryFn: () => fetchPerson(id),
    enabled: !!id,
  });
};

export const getPersonQueryOptions = (id?: string) => ({
  queryKey: ['person', id],
  queryFn: () => fetchPerson(id),
  enabled: !!id,
});
