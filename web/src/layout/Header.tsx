import React from 'react';
import { DownOutlined } from '@ant-design/icons';
import { Dropdown, Space, Image, Layout, Modal } from 'antd';
import logo from '../assets/logo.png';
import styles from './layout.module.scss';

const HeaderComp = () => {
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <Layout.Header
        className={styles.header}
        style={{ backgroundColor: 'white' }}
      >
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
      </Layout.Header>

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
    </>
  );
};

export default HeaderComp;
