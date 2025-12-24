import type { ColumnsType } from 'antd/es/table';
import { Link } from 'react-router-dom';

import ResourceTable from '../../components/ResourceTable/ResourceTable';
import type { Vehicle } from '../../types/api/vehicle.ts';
import { getIdFromUrl } from '../../utilities/string-utilities';

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
