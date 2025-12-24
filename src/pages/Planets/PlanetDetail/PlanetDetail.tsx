import { useQueries } from '@tanstack/react-query';
import { Flex } from 'antd';
import { useParams } from 'react-router-dom';

import RelatedResourcesEntry from '../../../components/RelatedResourcesEntry/RelatedResourcesEntry';
import ResourceDetails from '../../../components/ResourceDetails/ResourceDetails';
import { getResourceQueryOptions, useResource } from '../../../hooks/useResource';
import type { Film } from '../../../types/api/film.ts';
import type { Person } from '../../../types/api/person.ts';
import type { Planet } from '../../../types/api/planet.ts';
import { getIdFromUrl } from '../../../utilities/string-utilities';

const PlanetDetail = () => {
  const { planetId } = useParams();
  const { data, isPending, isError } = useResource<Planet>('planets', planetId);

  const filmQueries = useQueries({
    queries: (data?.films ?? []).map((url) =>
      getResourceQueryOptions<Film>('films', getIdFromUrl(url))
    ),
  });

  const residentQueries = useQueries({
    queries: (data?.residents ?? []).map((url) =>
      getResourceQueryOptions<Person>('people', getIdFromUrl(url))
    ),
  });

  return (
    <ResourceDetails
      title={data?.name}
      data={data}
      isPending={isPending}
      isError={isError}
      backLink={{ to: '/planets', label: 'Planets' }}
    >
      <Flex wrap gap="middle">
        <RelatedResourcesEntry<Film>
          label="Films"
          resource="films"
          queries={filmQueries}
          titleProp="title"
        />
        <RelatedResourcesEntry<Person>
          label="Residents"
          resource="people"
          titleProp="name"
          queries={residentQueries}
        />
      </Flex>
    </ResourceDetails>
  );
};

export default PlanetDetail;
