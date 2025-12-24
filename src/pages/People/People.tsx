import type { ColumnsType } from 'antd/es/table';
import { Link } from 'react-router-dom';

import ResourceTable from '../../components/ResourceTable/ResourceTable';
import type { Person } from '../../types/api/person.ts';
import { getIdFromUrl } from '../../utilities/string-utilities';

const People = () => {
  const columns: ColumnsType<Person> = [
    {
      title: 'Name',
      dataIndex: 'name',
      render: (_, data) => data.url && <Link to={getIdFromUrl(data.url)!}>{data.name}</Link>,
    },
    { title: 'Gender', dataIndex: 'gender' },
    { title: 'Birth Year', dataIndex: 'birth_year' },
  ];

  return <ResourceTable<Person> title="People" resource="people" columns={columns} />;
};

export default People;
