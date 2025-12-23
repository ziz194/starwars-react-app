import { Breadcrumb, Flex, Table, Typography } from 'antd';
import { usePeople } from '../../hooks/people/usePeople';
import type { ColumnsType } from 'antd/es/table';
import type { Person } from '../../types/person';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { getIdFromUrl } from '../../utilities/string-utilities';
import * as dayjs from 'dayjs';
import { formatDate } from '../../utilities/string-utilities';

const People = () => {
  const [page, setPage] = useState(1);
  const { data: peopleResponse, isLoading, isError } = usePeople(page);

  const columns: ColumnsType<Person> = [
    {
      title: 'Name',
      dataIndex: 'name',
      render: (_, data) => data.url && <Link to={getIdFromUrl(data.url) || ''}>{data.name}</Link>,
    },
    {
      title: 'Gender',
      dataIndex: 'gender',
      sorter: (a, b) => a.gender.localeCompare(b.gender),
    },
    {
      title: 'Birth Year',
      dataIndex: 'birth_year',
      sorter: (a, b) => a.birth_year.localeCompare(b.birth_year),
    },
    {
      title: 'Height',
      dataIndex: 'height',
      sorter: (a, b) => Number(a.height) - Number(b.height),
    },
    {
      title: 'Mass',
      dataIndex: 'mass',
      sorter: (a, b) => Number(a.mass) - Number(b.mass),
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
    return <Typography.Text type="danger">Failed to load the people.</Typography.Text>;
  }

  return (
    <Flex vertical>
      <Breadcrumb items={[{ title: <Link to="/">Home</Link> }, { title: 'People' }]} />
      <Typography.Title level={1}>People</Typography.Title>

      <Table
        columns={columns}
        dataSource={peopleResponse?.results}
        loading={isLoading}
        rowKey="url"
        pagination={{
          current: page,
          showSizeChanger: false,
          total: peopleResponse?.count,
          onChange: (newPage) => setPage(newPage),
        }}
      />
    </Flex>
  );
};

export default People;
