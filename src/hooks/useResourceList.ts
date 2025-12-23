import { useQuery } from '@tanstack/react-query';
import { fetchList } from '../api/fetch-resource.ts';
import type { ResourceType } from '../types/resource-type.ts';

export const useResourceList = <T>(resource: ResourceType, page = 1) => {
  return useQuery({
    queryKey: [resource, page],
    queryFn: () => fetchList<T>(resource, page),
  });
};
