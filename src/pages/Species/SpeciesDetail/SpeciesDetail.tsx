import { Flex } from 'antd';
import { Link, useParams } from 'react-router-dom';
import { useQueries } from '@tanstack/react-query';
import ResourceDetails from '../../../components/ResourceDetails/ResourceDetails';
import { getIdFromUrl } from '../../../utilities/string-utilities';
import { getResourceQueryOptions, useResource } from '../../../hooks/useResource';
import RelatedResourcesEntry from '../../../components/RelatedResourcesEntry/RelatedResourcesEntry';
import type { Film } from '../../../types/film';
import type { Person } from '../../../types/person';
import type { Planet } from '../../../types/planet';
import type { Species } from '../../../types/species.ts';
import DataEntry from '../../../components/DataEntry/DataEntry.tsx';

const SpeciesDetail = () => {
  const { speciesId } = useParams();
  const { data, isPending, isError } = useResource<Species>('species', speciesId);

  const filmQueries = useQueries({
    queries: (data?.films ?? []).map((url) =>
      getResourceQueryOptions<Film>('films', getIdFromUrl(url))
    ),
  });

  const peopleQueries = useQueries({
    queries: (data?.people ?? []).map((url) =>
      getResourceQueryOptions<Person>('people', getIdFromUrl(url))
    ),
  });

  const { data: homeWorld } = useResource<Planet>(
    'planets',
    data?.homeworld ? getIdFromUrl(data?.homeworld) : undefined
  );

  return (
    <ResourceDetails
      title={data?.name}
      data={data}
      isPending={isPending}
      isError={isError}
      backLink={{ to: 'species', label: 'Species' }}
      hiddenProps={['homeworld']}
    >
      <DataEntry
        label={'Home world'}
        value={
          homeWorld ? (
            <Link to={`/planets/${getIdFromUrl(homeWorld?.url)}`}>{homeWorld?.name}</Link>
          ) : undefined
        }
      />
      <Flex wrap gap="middle">
        <RelatedResourcesEntry<Film>
          label="Films"
          resource="films"
          queries={filmQueries}
          titleProp="title"
        />
        <RelatedResourcesEntry<Person>
          label="People"
          resource="people"
          queries={peopleQueries}
          titleProp="name"
        />
      </Flex>
    </ResourceDetails>
  );
};

export default SpeciesDetail;
