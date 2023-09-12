import { Outlet, useNavigate } from "react-router-dom";
import "./sidebarManager.css";
import { UserOutlined } from "@ant-design/icons";
import { Breadcrumb, Layout, Menu } from "antd";
import React from "react";
import { ItemType, MenuItemType } from "antd/es/menu/hooks/useItems";
import { KEY_ITEM_MENU } from "../../constants/sidebarMenu";

const { Sider, Content } = Layout;

function SidebarManager() {
  const navigate = useNavigate();
  const items: ItemType<MenuItemType>[] = [
    {
      label: "User",
      icon: React.createElement(UserOutlined),
      key: KEY_ITEM_MENU.USER,
      onClick: () => {
        navigate("user");
      },
    },
  ];

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider breakpoint="lg" collapsedWidth="0">
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["1"]}
          items={items}
        />
      </Sider>
      <Layout style={{ padding: "0 24px 24px" }}>
        <Breadcrumb
          style={{ margin: "16px 0" }}
          items={[{ title: "Manager" }, { title: "User" }]}
        />
        <Content>
          <div
            className="site-layout-background"
            style={{ padding: 24, minHeight: 360 }}
          >
            <Outlet />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
}

export default SidebarManager;
