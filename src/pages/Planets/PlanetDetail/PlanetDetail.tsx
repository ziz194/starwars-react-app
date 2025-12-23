import { Breadcrumb, Flex, Spin, Typography } from 'antd';
import { Link, useParams } from 'react-router-dom';
import { usePlanet } from '../../../hooks/planets/usePlanet';
import type { RouteParams } from '../../../types/route-params';
import DataEntry from '../../../components/DataEntry/DataEntry';
import { getIdFromUrl } from '../../../utilities/string-utilities.ts';
import { useQueries } from '@tanstack/react-query';
import { getFilmQueryOptions } from '../../../hooks/films/useFilm.ts';
import { getPersonQueryOptions } from '../../../hooks/people/usePerson.ts';

const PlanetDetail = () => {
  const { planetId } = useParams<RouteParams>();
  const { data: planet, isLoading, isError } = usePlanet(planetId);

  const filmQueries = useQueries({
    queries: (planet?.films ?? []).map((url: string) => {
      return getFilmQueryOptions(getIdFromUrl(url));
    }),
  });

  const peopleQueries = useQueries({
    queries: (planet?.residents ?? []).map((url: string) => {
      return getPersonQueryOptions(getIdFromUrl(url));
    }),
  });

  const hiddenColumns = ['name', 'url'];

  if (isLoading) return <Spin />;

  if (isError) {
    return <Typography.Text type="danger">Failed to load the planet data.</Typography.Text>;
  }

  return (
    <Flex vertical gap="middle">
      <Breadcrumb
        items={[
          { title: <Link to="/">Home</Link> },
          { title: <Link to="/planets">Planets</Link> },
          { title: planet?.name },
        ]}
      />

      <Typography.Title level={1}>{planet?.name}</Typography.Title>

      <Flex wrap="wrap" gap="middle">
        {Object.entries(planet || {}).map(
          ([key, value]) =>
            !Array.isArray(value) &&
            !hiddenColumns.includes(key) && <DataEntry key={key} dataKey={key} value={value} />
        )}
      </Flex>
      <Flex wrap={'wrap'} gap={'middle'}>
        <DataEntry
          dataKey={'Films'}
          value={filmQueries.map((query) => {
            return (
              query.data?.url && (
                <Link to={`/films/${getIdFromUrl(query.data?.url)}`}>{query.data?.title}</Link>
              )
            );
          })}
        />
        <DataEntry
          dataKey={'Residents'}
          value={peopleQueries.map((query) => {
            return (
              query.data?.url && (
                <Link to={`/people/${getIdFromUrl(query.data?.url)}`}>{query.data?.name}</Link>
              )
            );
          })}
        />
      </Flex>
    </Flex>
  );
};

export default PlanetDetail;
