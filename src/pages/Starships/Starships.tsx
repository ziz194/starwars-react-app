import { Breadcrumb, Flex, Table, Typography } from 'antd';
import { useStarships } from '../../hooks/starships/useStarships';
import type { ColumnsType } from 'antd/es/table';
import type { Starship } from '../../types/starship';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { getIdFromUrl, formatDate } from '../../utilities/string-utilities';
import * as dayjs from 'dayjs';

const Starships = () => {
  const [page, setPage] = useState(1);
  const { data: starshipsResponse, isLoading, isError } = useStarships(page);

  const columns: ColumnsType<Starship> = [
    {
      title: 'Name',
      dataIndex: 'name',
      render: (_, data) => data.url && <Link to={getIdFromUrl(data.url) || ''}>{data.name}</Link>,
    },
    {
      title: 'Model',
      dataIndex: 'model',
      sorter: (a, b) => a.model.localeCompare(b.model),
    },
    {
      title: 'Manufacturer',
      dataIndex: 'manufacturer',
      sorter: (a, b) => a.manufacturer.localeCompare(b.manufacturer),
    },
    {
      title: 'Crew',
      dataIndex: 'crew',
      sorter: (a, b) => Number(a.crew) - Number(b.crew),
    },
    {
      title: 'Passengers',
      dataIndex: 'passengers',
      sorter: (a, b) => Number(a.passengers) - Number(b.passengers),
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
    return <Typography.Text type="danger">Failed to load the starships.</Typography.Text>;
  }

  return (
    <Flex vertical>
      <Breadcrumb items={[{ title: <Link to="/">Home</Link> }, { title: 'Starships' }]} />

      <Typography.Title level={1}>Starships</Typography.Title>

      <Table
        columns={columns}
        dataSource={starshipsResponse?.results}
        loading={isLoading}
        rowKey="url"
        pagination={{
          current: page,
          showSizeChanger: false,
          total: starshipsResponse?.count,
          onChange: (newPage) => setPage(newPage),
        }}
      />
    </Flex>
  );
};

export default Starships;
