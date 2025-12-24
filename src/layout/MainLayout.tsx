import { Layout } from 'antd';
const { Content } = Layout;
import { Outlet } from 'react-router-dom';

import NavigationBar from './NavigationBar.tsx';

const MainLayout = () => {
  return (
    <Layout style={{ height: '100%' }}>
      <NavigationBar />
      <Layout style={{ width: '100%' }}>
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
