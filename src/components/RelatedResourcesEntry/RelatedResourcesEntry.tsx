import type { UseQueryResult } from '@tanstack/react-query';
import { Spin } from 'antd';
import { Link } from 'react-router-dom';

import type { ResourceType } from '../../types/resource-type';
import { getIdFromUrl } from '../../utilities/string-utilities';
import DataEntry from '../DataEntry/DataEntry';

interface RelatedResourcesEntryProps<T extends { url: string }> {
  queries: UseQueryResult<T, Error>[];
  label: string;
  resource: ResourceType;
  titleProp: keyof T;
}

const RelatedResourcesEntry = <T extends { url: string }>({
  queries,
  resource,
  label,
  titleProp,
}: RelatedResourcesEntryProps<T>) => {
  const isLoading = queries.some((query) => query.isPending);

  const links = queries
    .map((query) => {
      const url = query.data?.url;
      const title = query.data?.[titleProp];

      if (!url || !title) return null;
      if (typeof title === 'string') {
        return (
          <Link key={url} to={`/${resource}/${getIdFromUrl(url)}`}>
            {title}
          </Link>
        );
      }
    })
    .filter(Boolean);

  return <DataEntry label={label} value={isLoading ? <Spin /> : links.length > 0 ? links : '-'} />;
};

export default RelatedResourcesEntry;
