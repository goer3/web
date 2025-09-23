import React, { useState } from 'react';
import { DesktopOutlined, AppstoreAddOutlined, UsergroupAddOutlined, AuditOutlined, SlidersOutlined, ManOutlined } from '@ant-design/icons';
import { Layout, Menu, Dropdown, Avatar, Badge } from 'antd';
import { Outlet } from 'react-router';
import { ArrowRightIcon, ArrowLeftIcon } from '@/components/icon';
const { Header, Content, Sider } = Layout;
import LogoImage from '@/assets/images/logo/logo.png';
import AvatarImage from '@/assets/images/avatar/default.png';

function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label
  };
}

// 菜单项
const menuItems = [
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
  ])
];

// 下拉用户信息
const dropdownUserInfoPopupRender = () => {
  return (
    <div className="dk-dropdown-userinfo">
      <div className="dk-dropdown-userinfo-account">
        <Badge size="small" count={<ManOutlined style={{ backgroundColor: '#165dff' }} />} offset={[-10, 35]}>
          <Avatar src={AvatarImage} size={40} />
        </Badge>
        <div className="dk-account-info">
          <div className="dk-account-name">吴彦祖</div>
          <div className="dk-account-item">超级管理员 | 手机：13888888888</div>
        </div>
      </div>
    </div>
  );
};

const AdminLayout = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Layout>
      <Header className="dk-header">
        <img src={LogoImage} alt="logo" className="dk-logo" />
        <Dropdown className="dk-dropdown-user" popupRender={dropdownUserInfoPopupRender} open={true}>
          <Badge size="small" count={<ManOutlined style={{ backgroundColor: '#165dff' }} />} offset={[-5, 22]}>
            <Avatar className="dk-header-avatar" src={AvatarImage} size={26} />
          </Badge>
        </Dropdown>
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
            items={menuItems}
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
