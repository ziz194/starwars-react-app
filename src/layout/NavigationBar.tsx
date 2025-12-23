import { Flex, Menu, theme } from 'antd';
import { useState } from 'react';
import { Layout } from 'antd';
import StarwarsLogo from '../assets/starwars-logo.svg?react';
import useBreakpoint from 'antd/es/grid/hooks/useBreakpoint';
import { useLocation, useNavigate } from 'react-router-dom';
import FilmsIcon from '../assets/darth-vader.svg?react';
import SpeciesIcon from '../assets/species.svg?react';
import PeopleIcon from '../assets/people.svg?react';
import SpaceshipsIcon from '../assets/spaceship.svg?react';
import PlanetsIcon from '../assets/planets.svg?react';
import VehiclesIcon from '../assets/vehicle.svg?react';
import Icon from '@ant-design/icons';

const NavigationBar = () => {
  const {
    token: { colorBorder, paddingMD },
  } = theme.useToken();
  const screens = useBreakpoint();

  const [collapsed, setCollapsed] = useState<boolean>(!!screens.xs);
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <Layout.Sider
      collapsible
      collapsed={collapsed}
      breakpoint={'md'}
      onBreakpoint={(broken) => setCollapsed(broken)}
      onCollapse={(value) => setCollapsed(value)}
      style={{ background: '#000', paddingTop: paddingMD, borderRight: `1px solid ${colorBorder}` }}
    >
      <Flex justify={'center'}>
        <StarwarsLogo
          height={60}
          width={collapsed ? 60 : 200}
          onClick={() => navigate('/')}
          style={{ cursor: 'pointer' }}
        />
      </Flex>
      <Menu
        theme="dark"
        mode="inline"
        onClick={(item) => navigate(item.key)}
        selectedKeys={location.pathname.split('/')}
        items={[
          {
            key: 'films',
            label: 'Films',
            icon: <Icon component={FilmsIcon} />,
          },
          {
            key: 'people',
            label: 'People',
            icon: <Icon component={PeopleIcon} />,
          },
          {
            key: 'planets',
            label: 'Planets',
            icon: <Icon component={PlanetsIcon} />,
          },
          {
            key: 'starships',
            label: 'Starships',
            icon: <Icon component={SpaceshipsIcon} />,
          },
          {
            key: 'species',
            label: 'Species',
            icon: <Icon component={SpeciesIcon} />,
          },
          {
            key: 'vehicles',
            label: 'Vehicles',
            icon: <Icon component={VehiclesIcon} />,
          },
        ]}
      />
    </Layout.Sider>
  );
};

export default NavigationBar;
