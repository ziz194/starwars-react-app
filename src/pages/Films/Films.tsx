import type { ColumnsType } from 'antd/es/table';
import * as dayjs from 'dayjs';
import { Link } from 'react-router-dom';

import ResourceTable from '../../components/ResourceTable/ResourceTable.tsx';
import type { Film } from '../../types/api/film.ts';
import { formatDate, getIdFromUrl } from '../../utilities/string-utilities.ts';

const Films = () => {
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

  return <ResourceTable<Film> title="Film" resource="films" columns={columns} />;
};
export default Films;
