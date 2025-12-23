import { Flex } from 'antd';
import { useParams } from 'react-router-dom';
import type { RouteParams } from '../../../types/route-params.ts';
import { useQueries } from '@tanstack/react-query';
import { getIdFromUrl } from '../../../utilities/string-utilities.ts';
import ResourceDetails from '../../../components/ResourceDetails/ResourceDetails.tsx';
import { getResourceQueryOptions, useResource } from '../../../hooks/useResource.ts';
import type { Person } from '../../../types/person.ts';
import type { Starship } from '../../../types/starship.ts';
import type { Species } from '../../../types/species.ts';
import type { Vehicle } from '../../../types/vehicle.ts';
import type { Planet } from '../../../types/planet.ts';
import RelatedResourcesEntry from '../../../components/RelatedResourcesEntry/RelatedResourcesEntry.tsx';
import type { Film } from '../../../types/film.ts';

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
        />
        <RelatedResourcesEntry<Person>
          queries={characterQueries}
          label={'Characters'}
          resource={'people'}
        />
        <RelatedResourcesEntry<Starship>
          queries={starshipQueries}
          label={'Starships'}
          resource={'starships'}
        />
        <RelatedResourcesEntry<Vehicle>
          queries={vehicleQueries}
          label={'Vehicles'}
          resource={'vehicles'}
        />
        <RelatedResourcesEntry<Species>
          queries={speciesQueries}
          label={'Species'}
          resource={'species'}
        />
      </Flex>
    </ResourceDetails>
  );
};
export default FilmDetail;
