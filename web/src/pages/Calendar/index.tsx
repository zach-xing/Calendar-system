import React from 'react';
import { Layout, Image, Space, Dropdown, Modal } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import styles from './index.module.scss';
import logo from '../../assets/logo.png';
import SiderComp from './components/Sider';
import ContentComp from './components/Content';
import { isLogined } from '../../utils/auth';

const { Header, Content, Sider } = Layout;

/**
 * 日历 page
 */
export default function Calendar() {
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);

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
        <div>
          <Image
            src={logo}
            alt="logo"
            className={styles.logo}
            preview={false}
          />
          <span style={{ fontSize: 18, marginLeft: 10 }}>日历</span>
        </div>
        <div>
          <Dropdown
            trigger={['click']}
            menu={{
              items: [
                {
                  label: <div onClick={() => setOpen(true)}>设置</div>,
                  key: '0',
                },
                {
                  type: 'divider',
                },
                {
                  label: <span style={{ color: 'red' }}>退出登录</span>,
                  key: '1',
                },
              ],
            }}
          >
            {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
            <a onClick={(e) => e.preventDefault()}>
              <Space>
                Zeekg
                <DownOutlined />
              </Space>
            </a>
          </Dropdown>
        </div>
      </Header>

      <Layout className={styles.body}>
        <Sider width={300} className={styles.sider}>
          <SiderComp />
        </Sider>
        <Layout>
          <Content className={styles.content}>
            <ContentComp />
          </Content>
        </Layout>
      </Layout>

      <Modal
        title="Modal 1000px width"
        centered
        open={open}
        onOk={() => setOpen(false)}
        onCancel={() => setOpen(false)}
        width={'100vw'}
      >
        <p>some contents...</p>
        <p>some contents...</p>
        <p>some contents...</p>
      </Modal>
    </Layout>
  );
}
