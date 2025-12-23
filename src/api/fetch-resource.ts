import type { ResourceType } from '../types/resource-type.ts';

export const fetchList = async <T>(
  resource: ResourceType,
  page = 1
): Promise<{ count: number; results: T[] }> => {
  const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/${resource}/?page=${page}`);
  if (!res.ok) throw new Error(`Failed to fetch ${resource}`);
  return res.json();
};

export const fetchOne = async <T>(resource: ResourceType, id?: string): Promise<T> => {
  if (!id) throw new Error('ID is required');

  const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/${resource}/${id}/`);
  if (!res.ok) throw new Error(`Failed to fetch ${resource}`);
  return res.json();
};
