import { Breadcrumb, Flex, Table, Typography } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useResourceList } from '../../hooks/useResourceList';
import type { ResourceType } from '../../types/resource-type.ts';

interface Props<T> {
  title: string;
  resource: ResourceType;
  columns: ColumnsType<T>;
}

const ResourceTable = <T extends { url?: string }>({ title, resource, columns }: Props<T>) => {
  const [page, setPage] = useState(1);
  const { data, isPending, isError } = useResourceList<T>(resource, page);

  if (isError) {
    return <Typography.Text type="danger">Failed to load {title.toLowerCase()}.</Typography.Text>;
  }

  return (
    <Flex vertical>
      <Breadcrumb items={[{ title: <Link to="/">Home</Link> }, { title }]} />

      <Typography.Title level={1}>{title}</Typography.Title>

      <Table
        columns={columns}
        dataSource={data?.results}
        loading={isPending}
        rowKey="url"
        pagination={{
          current: page,
          showSizeChanger: false,
          total: data?.count,
          onChange: setPage,
        }}
      />
    </Flex>
  );
};

export default ResourceTable;
