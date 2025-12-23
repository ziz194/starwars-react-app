import { Flex } from 'antd';
import { useParams } from 'react-router-dom';
import { useQueries } from '@tanstack/react-query';
import ResourceDetails from '../../../components/ResourceDetails/ResourceDetails';
import { getIdFromUrl } from '../../../utilities/string-utilities';
import { getResourceQueryOptions, useResource } from '../../../hooks/useResource';
import RelatedResourcesEntry from '../../../components/RelatedResourcesEntry/RelatedResourcesEntry';
import type { Film } from '../../../types/film';
import type { Person } from '../../../types/person';
import type { Starship } from '../../../types/starship.ts';

const StarshipDetail = () => {
  const { starshipId } = useParams();
  const { data, isPending, isError } = useResource<Starship>('starships', starshipId);

  const filmQueries = useQueries({
    queries: (data?.films ?? []).map((url) =>
      getResourceQueryOptions<Film>('films', getIdFromUrl(url))
    ),
  });

  const pilotQueries = useQueries({
    queries: (data?.pilots ?? []).map((url) =>
      getResourceQueryOptions<Person>('people', getIdFromUrl(url))
    ),
  });

  return (
    <ResourceDetails
      title={data?.name}
      data={data}
      isPending={isPending}
      isError={isError}
      backLink={{ to: '/starships', label: 'Starships' }}
    >
      <Flex wrap gap="middle">
        <RelatedResourcesEntry<Film>
          label="Films"
          resource="films"
          queries={filmQueries}
          titleProp="title"
        />
        <RelatedResourcesEntry<Person>
          label="Pilots"
          resource="people"
          queries={pilotQueries}
          titleProp="name"
        />
      </Flex>
    </ResourceDetails>
  );
};

export default StarshipDetail;
