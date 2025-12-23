import { Flex, theme } from 'antd';
import { Link } from 'react-router-dom';
import styles from './HomeNavigationItem.module.css';
import type { ReactNode } from 'react';

interface HomeNavigationItemProps {
  title: string;
  link: string;
  icon: ReactNode;
}
const HomeNavigationItem = ({ title, link, icon }: HomeNavigationItemProps) => {
  const {
    token: { fontSizeLG },
  } = theme.useToken();
  return (
    <Link to={link}>
      <Flex vertical align={'center'} className={styles.container}>
        <div className={styles.iconWrapper}>{icon}</div>
        <span style={{ fontSize: fontSizeLG }}>{title}</span>
      </Flex>
    </Link>
  );
};

export default HomeNavigationItem;
