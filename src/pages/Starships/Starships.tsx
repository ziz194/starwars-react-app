import type { ColumnsType } from 'antd/es/table';
import type { Starship } from '../../types/starship';
import { Link } from 'react-router-dom';
import { getIdFromUrl } from '../../utilities/string-utilities';
import ResourceTable from '../../components/ResourceTable/ResourceTable';

const Starships = () => {
  const columns: ColumnsType<Starship> = [
    {
      title: 'Name',
      dataIndex: 'name',
      render: (_, data) => data.url && <Link to={getIdFromUrl(data.url)!}>{data.name}</Link>,
    },
    { title: 'Model', dataIndex: 'model' },
    { title: 'Manufacturer', dataIndex: 'manufacturer' },
  ];

  return <ResourceTable<Starship> title="Starships" resource="starships" columns={columns} />;
};

export default Starships;
