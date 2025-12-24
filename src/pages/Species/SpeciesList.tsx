import type { ColumnsType } from 'antd/es/table';
import { Link } from 'react-router-dom';

import ResourceTable from '../../components/ResourceTable/ResourceTable';
import type { Species } from '../../types/api/species.ts';
import { getIdFromUrl } from '../../utilities/string-utilities';

const SpeciesList = () => {
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

export default SpeciesList;
