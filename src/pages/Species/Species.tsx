import type { ColumnsType } from 'antd/es/table';
import type { Species } from '../../types/species';
import { Link } from 'react-router-dom';
import { getIdFromUrl } from '../../utilities/string-utilities';
import ResourceTable from '../../components/ResourceTable/ResourceTable';

const Species = () => {
  const columns: ColumnsType<Species> = [
    {
      title: 'Name',
      dataIndex: 'name',
      render: (_, data) => data.url && <Link to={getIdFromUrl(data.url)!}>{data.name}</Link>,
    },
    { title: 'Classification', dataIndex: 'classification' },
    { title: 'Language', dataIndex: 'language' },
  ];

  return <ResourceTable<Species> title="Species" resource="species" columns={columns} />;
};

export default Species;
