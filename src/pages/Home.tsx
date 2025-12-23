import { Flex, theme } from 'antd';
import { Typography } from 'antd';
import StarwarsLogo from '../assets/starwars-logo.svg?react';
import FilmsIcon from '../assets/darth-vader.svg?react';
import SpeciesIcon from '../assets/species.svg?react';
import PeopleIcon from '../assets/people.svg?react';
import SpaceshipsIcon from '../assets/spaceship.svg?react';
import PlanetsIcon from '../assets/planets.svg?react';
import VehiclesIcon from '../assets/vehicle.svg?react';
import HomeNavigationItem from '../components/HomeNavigationItem/HomeNavigationItem.tsx';

const Home = () => {
  const {
    token: { marginXXL },
  } = theme.useToken();

  return (
    <Flex justify={'center'} vertical align={'center'}>
      <StarwarsLogo height={200} width={400} />
      <Typography.Title level={3} style={{ marginBottom: marginXXL }}>
        Welcome to the Star Wars database
      </Typography.Title>
      <Flex gap={'large'} style={{ width: '100%' }} wrap={'wrap'} justify={'center'}>
        <HomeNavigationItem title={'Films'} link={'films'} icon={<FilmsIcon />} />
        <HomeNavigationItem title={'Planets'} link={'planets'} icon={<PlanetsIcon />} />
        <HomeNavigationItem title={'People'} link={'people'} icon={<PeopleIcon />} />
        <HomeNavigationItem title={'Starships'} link={'starships'} icon={<SpaceshipsIcon />} />
        <HomeNavigationItem title={'Vehicles'} link={'vehicles'} icon={<VehiclesIcon />} />
        <HomeNavigationItem title={'Species'} link={'species'} icon={<SpeciesIcon />} />
      </Flex>
    </Flex>
  );
};

export default Home;
