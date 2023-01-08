import React from 'react';
import { Layout, Menu, Image, Divider } from 'antd';
import { useNavigate } from 'react-router-dom';
import type { IRoute } from '@/router';
import { routes } from '@/router';
import { ExportOutlined, SettingOutlined } from '@ant-design/icons';

interface MenuItemType {
  key: string;
  label: React.ReactNode;
  title: string;
  icon: React.ReactNode;
  children?: MenuItemType[];
}

/**
 * 自定义 Layout 中的 Sider
 */
const Sider: React.FC = () => {
  const navigate = useNavigate();
  const [menuItem, setMenuItem] = React.useState<MenuItemType[]>([]);
  const [selectedKey, setSelectedKey] = React.useState('/');

  React.useEffect(() => {
    setMenuItem(getMenuItemEls());
  }, routes);

  // 菜单项的元素
  const getMenuItemEls = React.useCallback(() => {
    const bar = (routeArr: IRoute[]) => {
      const newArr: MenuItemType[] = routeArr.map((v) => {
        const newItem: MenuItemType = {
          key: v.path,
          label: v.title,
          title: v.title,
          icon: v.icon,
        };
        if (v.children && v.children.length !== 0) {
          newItem.children = bar(v.children);
        }
        return newItem;
      });
      return newArr;
    };
    return bar(routes);
  }, []);

  // 点击菜单中的某一项
  const onSelectMenu = ({ key }: any) => {
    setSelectedKey(key);
    navigate(key);
  };

  return (
    <Layout.Sider theme="light" width="240">
      <Image width={240} src={`https://picsum.photos/240/100`} />
      <Menu
        mode="inline"
        selectedKeys={[selectedKey]}
        onSelect={onSelectMenu}
        items={menuItem}
      />
      <Divider />
      <Menu
        mode="inline"
        style={{ position: 'absolute', bottom: 0 }}
        items={[
          {
            key: 'setting',
            label: 'Setting',
            icon: <SettingOutlined />,
          },
          {
            key: 'logout',
            label: 'Log Out',
            icon: <ExportOutlined />,
          },
        ]}
      />
    </Layout.Sider>
  );
};

export default Sider;
