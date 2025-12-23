import { Breadcrumb, Flex, Spin, Typography } from 'antd';
import { Link, useParams } from 'react-router-dom';
import { usePerson } from '../../../hooks/people/usePerson';
import type { RouteParams } from '../../../types/route-params';
import DataEntry from '../../../components/DataEntry/DataEntry';
import { useQueries } from '@tanstack/react-query';
import { getFilmQueryOptions } from '../../../hooks/films/useFilm';
import { getIdFromUrl } from '../../../utilities/string-utilities';

const PersonDetail = () => {
  const { personId } = useParams<RouteParams>();
  const { data: person, isLoading, isError } = usePerson(personId);

  const filmsQuery = useQueries({
    queries: (person?.films ?? []).map((url: string) => {
      return getFilmQueryOptions(getIdFromUrl(url));
    }),
  });

  const hiddenColumns = ['name', 'url'];

  if (isLoading) return <Spin />;

  if (isError) {
    return <Typography.Text type="danger">Failed to load the person data.</Typography.Text>;
  }

  return (
    <Flex vertical gap="middle">
      <Breadcrumb
        items={[
          { title: <Link to="/">Home</Link> },
          { title: <Link to="/people">People</Link> },
          { title: person?.name },
        ]}
      />

      <Typography.Title level={1}>{person?.name}</Typography.Title>

      <Flex wrap="wrap" gap="middle">
        {Object.entries(person || {}).map(
          ([key, value]) =>
            !Array.isArray(value) &&
            !hiddenColumns.includes(key) && <DataEntry key={key} dataKey={key} value={value} />
        )}
      </Flex>

      <Flex wrap="wrap" gap="middle">
        <DataEntry
          dataKey="Films"
          value={filmsQuery.map(
            (query) =>
              query.data?.url && (
                <Link to={`/films/${getIdFromUrl(query.data.url)}`}>{query.data.title}</Link>
              )
          )}
        />
      </Flex>
    </Flex>
  );
};

export default PersonDetail;
