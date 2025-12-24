import { useQueries } from '@tanstack/react-query';
import { Flex } from 'antd';
import { useParams } from 'react-router-dom';

import RelatedResourcesEntry from '../../../components/RelatedResourcesEntry/RelatedResourcesEntry';
import ResourceDetails from '../../../components/ResourceDetails/ResourceDetails';
import { getResourceQueryOptions, useResource } from '../../../hooks/useResource';
import type { Film } from '../../../types/api/film.ts';
import type { Person } from '../../../types/api/person.ts';
import type { Vehicle } from '../../../types/api/vehicle.ts';
import { getIdFromUrl } from '../../../utilities/string-utilities';

const VehicleDetail = () => {
  const { vehicleId } = useParams();
  const { data, isPending, isError } = useResource<Vehicle>('vehicles', vehicleId);

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
      backLink={{ to: '/vehicles', label: 'Vehicles' }}
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

export default VehicleDetail;
