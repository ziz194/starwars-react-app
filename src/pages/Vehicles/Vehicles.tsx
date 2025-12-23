import type { ColumnsType } from 'antd/es/table';
import type { Vehicle } from '../../types/vehicle';
import { Link } from 'react-router-dom';
import { getIdFromUrl } from '../../utilities/string-utilities';
import ResourceTable from '../../components/ResourceTable/ResourceTable';

const Vehicles = () => {
  const columns: ColumnsType<Vehicle> = [
    {
      title: 'Name',
      dataIndex: 'name',
      render: (_, data) => data.url && <Link to={getIdFromUrl(data.url)!}>{data.name}</Link>,
    },
    { title: 'Model', dataIndex: 'model' },
    { title: 'Manufacturer', dataIndex: 'manufacturer' },
  ];

  return <ResourceTable<Vehicle> title="Vehicles" resource="vehicles" columns={columns} />;
};

export default Vehicles;
