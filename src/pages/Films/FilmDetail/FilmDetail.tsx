import { useQueries } from '@tanstack/react-query';
import { Flex } from 'antd';
import { useParams } from 'react-router-dom';

import RelatedResourcesEntry from '../../../components/RelatedResourcesEntry/RelatedResourcesEntry.tsx';
import ResourceDetails from '../../../components/ResourceDetails/ResourceDetails.tsx';
import { getResourceQueryOptions, useResource } from '../../../hooks/useResource.ts';
import type { Film } from '../../../types/api/film.ts';
import type { Person } from '../../../types/api/person.ts';
import type { Planet } from '../../../types/api/planet.ts';
import type { Species } from '../../../types/api/species.ts';
import type { Starship } from '../../../types/api/starship.ts';
import type { Vehicle } from '../../../types/api/vehicle.ts';
import type { RouteParams } from '../../../types/route-params.ts';
import { getIdFromUrl } from '../../../utilities/string-utilities.ts';

const FilmDetail = () => {
  const { filmId } = useParams<RouteParams>();
  const { data: film, isPending, isError } = useResource<Film>('films', filmId);

  const planetQueries = useQueries({
    queries: (film?.planets ?? []).map((url: string) => {
      return getResourceQueryOptions<Planet>('planets', getIdFromUrl(url));
    }),
  });

  const characterQueries = useQueries({
    queries: (film?.characters ?? []).map((url: string) => {
      return getResourceQueryOptions<Person>('people', getIdFromUrl(url));
    }),
  });

  const starshipQueries = useQueries({
    queries: (film?.starships ?? []).map((url: string) => {
      return getResourceQueryOptions<Starship>('starships', getIdFromUrl(url));
    }),
  });

  const speciesQueries = useQueries({
    queries: (film?.species ?? []).map((url: string) => {
      return getResourceQueryOptions<Species>('species', getIdFromUrl(url));
    }),
  });

  const vehicleQueries = useQueries({
    queries: (film?.vehicles ?? []).map((url: string) => {
      return getResourceQueryOptions<Vehicle>('vehicles', getIdFromUrl(url));
    }),
  });

  return (
    <ResourceDetails
      isPending={isPending}
      isError={isError}
      backLink={{ to: '/films', label: 'Films' }}
      title={film?.title}
      data={film}
      hiddenProps={['title']}
    >
      <Flex wrap={'wrap'} gap={'middle'}>
        <RelatedResourcesEntry<Planet>
          queries={planetQueries}
          label={'Planets'}
          resource={'planets'}
          titleProp="name"
        />
        <RelatedResourcesEntry<Person>
          queries={characterQueries}
          label={'Characters'}
          resource={'people'}
          titleProp="name"
        />
        <RelatedResourcesEntry<Starship>
          queries={starshipQueries}
          label={'Starships'}
          resource={'starships'}
          titleProp="name"
        />
        <RelatedResourcesEntry<Vehicle>
          queries={vehicleQueries}
          label={'Vehicles'}
          resource={'vehicles'}
          titleProp="name"
        />
        <RelatedResourcesEntry<Species>
          queries={speciesQueries}
          label={'Species'}
          resource={'species'}
          titleProp="name"
        />
      </Flex>
    </ResourceDetails>
  );
};
export default FilmDetail;
