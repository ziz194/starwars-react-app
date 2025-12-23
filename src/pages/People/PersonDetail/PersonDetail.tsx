import { Link, useParams } from 'react-router-dom';
import { useQueries } from '@tanstack/react-query';
import { getIdFromUrl } from '../../../utilities/string-utilities';
import { getResourceQueryOptions, useResource } from '../../../hooks/useResource';
import type { Film } from '../../../types/film';
import ResourceDetails from '../../../components/ResourceDetails/ResourceDetails.tsx';
import DataEntry from '../../../components/DataEntry/DataEntry.tsx';
import { Flex } from 'antd';
import RelatedResourcesEntry from '../../../components/RelatedResourcesEntry/RelatedResourcesEntry.tsx';
import type { Vehicle } from '../../../types/vehicle.ts';
import type { Species } from '../../../types/species.ts';
import type { Starship } from '../../../types/starship.ts';
import type { Person } from '../../../types/person.ts';
import type { Planet } from '../../../types/planet.ts';

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
        />
        <RelatedResourcesEntry<Starship>
          label="Starships"
          resource="starships"
          queries={starshipQueries}
        />
        <RelatedResourcesEntry<Species>
          label="Species"
          resource="species"
          queries={speciesQueries}
        />
      </Flex>
    </ResourceDetails>
  );
};

export default PersonDetail;
