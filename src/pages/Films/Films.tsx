import { Breadcrumb, Flex, Table, Typography } from 'antd';
import { useFilms } from '../../hooks/films/useFilms.ts';
import type { ColumnsType } from 'antd/es/table';
import type { Film } from '../../types/film.ts';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { formatDate, getIdFromUrl } from '../../utilities/string-utilities.ts';
import * as dayjs from 'dayjs';

const Films = () => {
  const [page, setPage] = useState(1);
  const { data: filmsResponse, isLoading, isError } = useFilms(page);

  const columns: ColumnsType<Film> = [
    {
      title: 'Title',
      dataIndex: 'title',
      render: (_, data) => data.url && <Link to={getIdFromUrl(data.url) || ''}>{data.title}</Link>,
    },
    {
      title: 'Episode',
      dataIndex: 'episode_id',
      key: 'episode_id',
      sorter: (a, b) => a.episode_id - b.episode_id,
    },
    {
      title: 'Director',
      dataIndex: 'director',
      key: 'director',
      sorter: (a, b) => a.director.localeCompare(b.director),
    },
    {
      title: 'Producer',
      dataIndex: 'producer',
      key: 'producer',
      sorter: (a, b) => a.producer.localeCompare(b.producer),
    },
    {
      title: 'Release Date',
      dataIndex: 'release_date',
      key: 'release_date',
      sorter: (a, b) => dayjs(a.release_date).valueOf() - dayjs(b.release_date).valueOf(),
      render: (value: string) => formatDate(value),
    },
    {
      title: 'Created',
      dataIndex: 'created',
      key: 'created',
      sorter: (a, b) => dayjs(a.created).valueOf() - dayjs(b.created).valueOf(),
      render: (value: string) => formatDate(value),
    },
    {
      title: 'Last Edited',
      dataIndex: 'edited',
      key: 'edited',
      sorter: (a, b) => dayjs(a.edited).valueOf() - dayjs(b.edited).valueOf(),
      render: (value: string) => formatDate(value),
    },
  ];

  if (isError) return <Typography.Text type={'danger'}>Failed to load the films.</Typography.Text>;

  return (
    <Flex vertical>
      <Breadcrumb items={[{ title: <Link to={'/'}>Home</Link> }, { title: 'Films' }]} />
      <Typography.Title level={1}>Films</Typography.Title>
      <Table
        columns={columns}
        dataSource={filmsResponse?.results}
        loading={isLoading}
        rowKey={'url'}
        pagination={{
          current: page,
          total: filmsResponse?.count,
          onChange: (newPage) => setPage(newPage),
        }}
      />
    </Flex>
  );
};
export default Films;
