import { Flex, Typography } from 'antd';
import { Link } from 'react-router-dom';

import StarwarsLogo from '../assets/starwars-logo.svg?react';

const NotFound = () => {
  return (
    <Flex justify={'center'} vertical align={'center'} style={{ height: '100%' }}>
      <StarwarsLogo height={200} width={400} />
      <Typography.Title level={3}>
        Could not find the page you are looking for, go back to the <Link to={'/'}>Home page</Link>
      </Typography.Title>
    </Flex>
  );
};

export default NotFound;
