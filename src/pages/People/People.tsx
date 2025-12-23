import type { ColumnsType } from 'antd/es/table';
import type { Person } from '../../types/person';
import { Link } from 'react-router-dom';
import { getIdFromUrl } from '../../utilities/string-utilities';
import ResourceTable from '../../components/ResourceTable/ResourceTable';

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
