import { Breadcrumb, Flex, Spin, Typography } from 'antd';
import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';

import DataEntry from '../DataEntry/DataEntry';

interface ResourceDetailProps<T> {
  title?: string;
  data?: T;
  isPending: boolean;
  isError: boolean;
  backLink: { to: string; label: string };
  hiddenProps?: string[];
  children?: ReactNode;
}

const ResourceDetail = <T,>({
  title,
  data,
  isPending,
  isError,
  backLink,
  hiddenProps,
  children,
}: ResourceDetailProps<T>) => {
  if (isPending) return <Spin />;

  if (isError) {
    return <Typography.Text type="danger">Failed to load data.</Typography.Text>;
  }

  return (
    <Flex vertical gap="middle">
      <Breadcrumb
        items={[
          { title: <Link to="/">Home</Link> },
          { title: <Link to={backLink.to}>{backLink.label}</Link> },
          { title },
        ]}
      />

      <Typography.Title level={1}>{title}</Typography.Title>

      <Flex wrap="wrap" gap="middle">
        {Object.entries(data || {}).map(
          ([key, value]) =>
            typeof value === 'string' &&
            !['url', 'name'].includes(key) &&
            !hiddenProps?.includes(key) && <DataEntry key={key} label={key} value={value} />
        )}
      </Flex>

      {children}
    </Flex>
  );
};

export default ResourceDetail;
