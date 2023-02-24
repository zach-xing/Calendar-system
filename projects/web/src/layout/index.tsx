import React from 'react';
import { Layout } from 'antd';
import { useNavigate } from 'react-router-dom';
import CustomHeader from './Header';
import CustomSider from './Sider';
import styles from './layout.module.scss';
import { isLogined } from '../utils/auth';

const { Header, Content, Sider } = Layout;

/**
 * 日历 page
 */
const LayoutComp: React.FC<{ children: React.ReactNode }> = (props) => {
  const navigate = useNavigate();

  React.useEffect(() => {
    if (!isLogined()) {
      navigate('/login');
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Layout className={styles.root}>
      {/* header 部分 */}
      <Header className={styles.header} style={{ backgroundColor: 'white' }}>
        <CustomHeader />
      </Header>

      <Layout className={styles.body}>
        <Sider width={300} className={styles.sider}>
          <CustomSider />
        </Sider>
        <Layout>
          <Content className={styles.content}>{props.children}</Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default LayoutComp;
