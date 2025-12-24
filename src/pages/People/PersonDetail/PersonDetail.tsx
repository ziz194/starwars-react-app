import { useQueries } from '@tanstack/react-query';
import { Flex } from 'antd';
import { Link, useParams } from 'react-router-dom';

import DataEntry from '../../../components/DataEntry/DataEntry.tsx';
import RelatedResourcesEntry from '../../../components/RelatedResourcesEntry/RelatedResourcesEntry.tsx';
import ResourceDetails from '../../../components/ResourceDetails/ResourceDetails.tsx';
import { getResourceQueryOptions, useResource } from '../../../hooks/useResource';
import type { Film } from '../../../types/api/film.ts';
import type { Person } from '../../../types/api/person.ts';
import type { Planet } from '../../../types/api/planet.ts';
import type { Species } from '../../../types/api/species.ts';
import type { Starship } from '../../../types/api/starship.ts';
import type { Vehicle } from '../../../types/api/vehicle.ts';
import { getIdFromUrl } from '../../../utilities/string-utilities';

const PersonDetail = () => {
  const { personId } = useParams();
  const { data: person, isPending, isError } = useResource<Person>('people', personId);

  const filmQueries = useQueries({
    queries: (person?.films ?? []).map((url) =>
      getResourceQueryOptions<Film>('films', getIdFromUrl(url))
    ),
  });

  const vehicleQueries = useQueries({
    queries: (person?.vehicles ?? []).map((url) =>
      getResourceQueryOptions<Vehicle>('vehicles', getIdFromUrl(url))
    ),
  });

  const starshipQueries = useQueries({
    queries: (person?.starships ?? []).map((url) =>
      getResourceQueryOptions<Starship>('starships', getIdFromUrl(url))
    ),
  });

  const speciesQueries = useQueries({
    queries: (person?.species ?? []).map((url) =>
      getResourceQueryOptions<Species>('species', getIdFromUrl(url))
    ),
  });

  const { data: homeWorld } = useResource<Planet>(
    'planets',
    person?.homeworld ? getIdFromUrl(person?.homeworld) : undefined
  );

  return (
    <ResourceDetails
      title={person?.name}
      data={person}
      isPending={isPending}
      isError={isError}
      backLink={{ to: '/people', label: 'People' }}
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
        <RelatedResourcesEntry<Vehicle>
          label="Vehicles"
          resource="vehicles"
          queries={vehicleQueries}
          titleProp="name"
        />
        <RelatedResourcesEntry<Starship>
          label="Starships"
          resource="starships"
          queries={starshipQueries}
          titleProp="name"
        />
        <RelatedResourcesEntry<Species>
          label="Species"
          resource="species"
          queries={speciesQueries}
          titleProp="name"
        />
      </Flex>
    </ResourceDetails>
  );
};

export default PersonDetail;
