import React, { useEffect } from "react";
import { Layout, Menu, Image, Divider } from "antd";
import { useNavigate, useLocation } from "react-router-dom";
import type { IRoute } from "@/router";
import { routes } from "@/router";
import { ExportOutlined, SettingOutlined } from "@ant-design/icons";
import LogoComp from "@/assets/logo-full.png";

interface MenuItemType {
  key: string;
  label: React.ReactNode;
  title: string;
  icon: React.ReactNode;
  children?: MenuItemType[];
}

const getMenuItemEls = (routes: IRoute[]) => {
  const newArr: MenuItemType[] = routes.map((v) => {
    const newItem: MenuItemType = {
      key: v.path,
      label: v.title,
      title: v.title,
      icon: v.icon,
    };
    return newItem;
  });
  return newArr;
};

/**
 * 自定义 Layout 中的 Sider
 */
const Sider: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [menuItem, setMenuItem] = React.useState<MenuItemType[]>(
    getMenuItemEls(routes)
  );
  const [selectedKey, setSelectedKey] = React.useState("/");

  useEffect(() => {
    setSelectedKey(location.pathname);
  }, [location.pathname]);

  // 点击菜单中的某一项
  const onSelectMenu = ({ key }: any) => {
    navigate(key);
  };

  return (
    <Layout.Sider theme='light' width='240'>
      <Image width={240} height={100} src={LogoComp} preview={false} />
      <Menu
        mode='inline'
        selectedKeys={[selectedKey]}
        onSelect={onSelectMenu}
        items={menuItem}
      />
      <Divider />
      {/* <Menu
        mode='inline'
        style={{ position: "absolute", bottom: 0 }}
        items={[
          {
            key: "setting",
            label: "Setting",
            icon: <SettingOutlined />,
          },
          {
            key: "logout",
            label: "Log Out",
            icon: <ExportOutlined />,
          },
        ]}
      /> */}
    </Layout.Sider>
  );
};

export default Sider;
