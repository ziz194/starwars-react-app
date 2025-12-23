import type { ColumnsType } from 'antd/es/table';
import { Link } from 'react-router-dom';
import { getIdFromUrl } from '../../utilities/string-utilities';
import ResourceTable from '../../components/ResourceTable/ResourceTable';
import type { Planet } from '../../types/api/planet.ts';

const Planets = () => {
  const columns: ColumnsType<Planet> = [
    {
      title: 'Name',
      dataIndex: 'name',
      render: (_, data) => data.url && <Link to={getIdFromUrl(data.url)!}>{data.name}</Link>,
    },
    { title: 'Climate', dataIndex: 'climate' },
    { title: 'Population', dataIndex: 'population' },
  ];

  return <ResourceTable<Planet> title="Planets" resource="planets" columns={columns} />;
};

export default Planets;
