import React from 'react';
import { Layout, Skeleton } from 'antd';
import Sider from './Sider';
import styles from './layout.module.less';

const { Content } = Layout;

interface IProps {
  children: JSX.Element | JSX.Element[];
}

const LayoutPage: React.FC<IProps> = ({ children }) => {
  return (
    <Layout>
      <Sider />
      <Layout className={styles.layoutBody}>
        <React.Suspense fallback={<Skeleton active />}>
          <Content>{children}</Content>
        </React.Suspense>
      </Layout>
    </Layout>
  );
};

export default LayoutPage;
