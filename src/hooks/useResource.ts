import { useQuery } from '@tanstack/react-query';

import { fetchOne } from '../api/fetch-resource.ts';
import type { ResourceType } from '../types/resource-type.ts';

export const getResourceQueryOptions = <T>(resource: ResourceType, id?: string) => ({
  queryKey: [resource, id],
  queryFn: () => fetchOne<T>(resource, id),
  enabled: !!id,
  staleTime: 5 * 60 * 1000,
});

export const useResource = <T>(resource: ResourceType, id?: string) => {
  return useQuery(getResourceQueryOptions<T>(resource, id));
};
