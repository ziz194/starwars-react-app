import { Breadcrumb, Flex, Table, Typography } from 'antd';
import { usePlanets } from '../../hooks/planets/usePlanets';
import type { ColumnsType } from 'antd/es/table';
import type { Planet } from '../../types/planet';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { getIdFromUrl } from '../../utilities/string-utilities';
import * as dayjs from 'dayjs';
import { formatDate } from '../../utilities/string-utilities';

const Planets = () => {
  const [page, setPage] = useState(1);
  const { data: planetsResponse, isLoading, isError } = usePlanets(page);

  const columns: ColumnsType<Planet> = [
    {
      title: 'Name',
      dataIndex: 'name',
      render: (_, data) => data.url && <Link to={getIdFromUrl(data.url) || ''}>{data.name}</Link>,
    },
    {
      title: 'Climate',
      dataIndex: 'climate',
      sorter: (a, b) => a.climate.localeCompare(b.climate),
    },
    {
      title: 'Terrain',
      dataIndex: 'terrain',
      sorter: (a, b) => a.terrain.localeCompare(b.terrain),
    },
    {
      title: 'Population',
      dataIndex: 'population',
      sorter: (a, b) => Number(a.population) - Number(b.population),
    },
    {
      title: 'Created',
      dataIndex: 'created',
      sorter: (a, b) => dayjs(a.created).valueOf() - dayjs(b.created).valueOf(),
      render: (value: string) => formatDate(value),
    },
    {
      title: 'Last Edited',
      dataIndex: 'edited',
      sorter: (a, b) => dayjs(a.edited).valueOf() - dayjs(b.edited).valueOf(),
      render: (value: string) => formatDate(value),
    },
  ];

  if (isError) {
    return <Typography.Text type="danger">Failed to load the planets.</Typography.Text>;
  }

  return (
    <Flex vertical>
      <Breadcrumb items={[{ title: <Link to="/">Home</Link> }, { title: 'Planets' }]} />
      <Typography.Title level={1}>Planets</Typography.Title>

      <Table
        columns={columns}
        dataSource={planetsResponse?.results}
        loading={isLoading}
        rowKey="url"
        pagination={{
          current: page,
          showSizeChanger: false,
          total: planetsResponse?.count,
          onChange: (newPage) => setPage(newPage),
        }}
      />
    </Flex>
  );
};

export default Planets;
