import { Breadcrumb, Flex, Spin, Typography } from 'antd';
import { Link, useParams } from 'react-router-dom';
import { useFilm } from '../../../hooks/films/useFilm.ts';
import type { RouteParams } from '../../../types/route-params.ts';
import DataEntry from '../../../components/DataEntry/DataEntry.tsx';
import { useQueries } from '@tanstack/react-query';
import { getPlanetQueryOptions } from '../../../hooks/planets/usePlanet.ts';
import { getIdFromUrl } from '../../../utilities/string-utilities.ts';

const FilmDetail = () => {
  const { filmId } = useParams<RouteParams>();
  const { data: film, isLoading, isError } = useFilm(filmId);

  const planetQueries = useQueries({
    queries: (film?.planets ?? []).map((url: string) => {
      return getPlanetQueryOptions(getIdFromUrl(url));
    }),
  });

  const hiddenColumns = ['title', 'url'];

  if (isLoading) return <Spin />;

  if (isError)
    return <Typography.Text type={'danger'}>Failed to load the film data.</Typography.Text>;

  return (
    <Flex vertical gap={'middle'}>
      <Breadcrumb
        items={[
          { title: <Link to={'/'}>Home</Link> },
          { title: <Link to={'/films'}>Films</Link> },
          { title: film?.title },
        ]}
      />
      <Typography.Title level={1}>{film?.title}</Typography.Title>
      <Flex wrap={'wrap'} gap={'middle'}>
        {Object.entries(film || {}).map(
          ([key, value]) =>
            !Array.isArray(value) &&
            !hiddenColumns.includes(key) && <DataEntry key={key} dataKey={key} value={value} />
        )}
      </Flex>
      <Flex wrap={'wrap'} gap={'middle'}>
        <DataEntry
          dataKey={'Planets'}
          value={planetQueries.map((query) => {
            return (
              query.data?.url && (
                <Link to={`/planets/${getIdFromUrl(query.data?.url)}`}>{query.data?.name}</Link>
              )
            );
          })}
        />
      </Flex>
    </Flex>
  );
};
export default FilmDetail;
