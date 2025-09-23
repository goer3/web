import React, { useState } from 'react';
import { DesktopOutlined, AppstoreAddOutlined, UsergroupAddOutlined, AuditOutlined, SlidersOutlined } from '@ant-design/icons';
import { Layout, Menu } from 'antd';
import { Outlet } from 'react-router';
import { ArrowRightIcon, ArrowLeftIcon } from '@/components/icon';
const { Header, Content, Sider } = Layout;
import logo from '@/assets/images/logo/logo.png';

function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label
  };
}

const items = [
  getItem('工作空间', '/dashboard', <DesktopOutlined />),
  getItem('项目管理', '/project', <AppstoreAddOutlined />),
  getItem('用户中心', '/user', <UsergroupAddOutlined />),
  getItem('权限中心', '/permission', <AuditOutlined />, [
    getItem('角色配置', '/permission/role'),
    getItem('菜单配置', '/permission/menu'),
    getItem('接口配置', '/permission/api')
  ]),
  getItem('系统管理', '/system', <SlidersOutlined />, [
    getItem('系统设置', '/system/setting'),
    getItem('操作日志', '/system/operation'),
    getItem('版本信息', '/system/info')
  ]),
];

const AdminLayout = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Layout>
      <Header className="dk-header">
        <img src={logo} alt="logo" className="dk-logo" />
      </Header>
      <Layout className="dk-layout">
        <Sider
          className="dk-sider"
          collapsible
          collapsed={collapsed}
          onCollapse={value => setCollapsed(value)}
          width={220}
          collapsedWidth={50}
          trigger={collapsed ? <ArrowRightIcon /> : <ArrowLeftIcon />}
        >
          <Menu
            className="dk-menu"
            theme="light"
            mode="inline"
            defaultSelectedKeys={['/permission/role']}
            defaultOpenKeys={['/permission']}
            items={items}
          />
        </Sider>
        <Content className="dk-content">
          <div style={{ height: '10000px' }}>Content</div>
        </Content>
      </Layout>
    </Layout>
  );
};
export default AdminLayout;
