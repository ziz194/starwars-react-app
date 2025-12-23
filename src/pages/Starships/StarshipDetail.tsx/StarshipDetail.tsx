import { Breadcrumb, Flex, Spin, Typography } from 'antd';
import { Link, useParams } from 'react-router-dom';
import { useStarship } from '../../../hooks/starships/useStarship';
import type { RouteParams } from '../../../types/route-params';
import DataEntry from '../../../components/DataEntry/DataEntry';
import { getIdFromUrl } from '../../../utilities/string-utilities';
import { useQueries } from '@tanstack/react-query';
import { getFilmQueryOptions } from '../../../hooks/films/useFilm';
import { getPersonQueryOptions } from '../../../hooks/people/usePerson';

const StarshipDetail = () => {
  const { starshipId } = useParams<RouteParams>();
  const { data: starship, isLoading, isError } = useStarship(starshipId);

  const filmQueries = useQueries({
    queries: (starship?.films ?? []).map((url: string) => getFilmQueryOptions(getIdFromUrl(url))),
  });

  const peopleQueries = useQueries({
    queries: (starship?.pilots ?? []).map((url: string) =>
      getPersonQueryOptions(getIdFromUrl(url))
    ),
  });

  const hiddenColumns = ['name', 'url'];

  if (isLoading) return <Spin />;

  if (isError) {
    return <Typography.Text type="danger">Failed to load the starship data.</Typography.Text>;
  }

  return (
    <Flex vertical gap="middle">
      <Breadcrumb
        items={[
          { title: <Link to="/">Home</Link> },
          { title: <Link to="/starships">Starships</Link> },
          { title: starship?.name },
        ]}
      />

      <Typography.Title level={1}>{starship?.name}</Typography.Title>

      <Flex wrap="wrap" gap="middle">
        {Object.entries(starship || {}).map(
          ([key, value]) =>
            !Array.isArray(value) &&
            !hiddenColumns.includes(key) && <DataEntry key={key} dataKey={key} value={value} />
        )}
      </Flex>

      <Flex wrap="wrap" gap="middle">
        <DataEntry
          dataKey="Films"
          value={filmQueries.map(
            (query) =>
              query.data?.url && (
                <Link to={`/films/${getIdFromUrl(query.data.url)}`}>{query.data.title}</Link>
              )
          )}
        />
        <DataEntry
          dataKey="Pilots"
          value={peopleQueries.map(
            (query) =>
              query.data?.url && (
                <Link to={`/people/${getIdFromUrl(query.data.url)}`}>{query.data.name}</Link>
              )
          )}
        />
      </Flex>
    </Flex>
  );
};

export default StarshipDetail;
