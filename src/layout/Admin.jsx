import React, { useState } from 'react';
import { DesktopOutlined, AppstoreAddOutlined, UsergroupAddOutlined, AuditOutlined, SlidersOutlined, ManOutlined, PhoneOutlined, UserOutlined, KeyOutlined, MailOutlined } from '@ant-design/icons';
import { Layout, Menu, Dropdown, Avatar, Badge, Typography, Button, Row, Col, Divider, Statistic } from 'antd';
import { Outlet } from 'react-router';
import { ArrowRightIcon, ArrowLeftIcon } from '@/components/icon';
import LogoImage from '@/assets/images/logo/logo.png';
import AvatarImage from '@/assets/images/avatar/male_3.svg';

const { Header, Content, Sider } = Layout;
const { Paragraph } = Typography;

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
  getItem('权限中心', '/permission', <AuditOutlined />, [getItem('角色配置', '/permission/role'), getItem('菜单配置', '/permission/menu'), getItem('接口配置', '/permission/api')]),
  getItem('系统管理', '/system', <SlidersOutlined />, [getItem('系统设置', '/system/setting'), getItem('操作日志', '/system/operation'), getItem('版本信息', '/system/info')])
];

// 下拉用户信息
const dropdownUserInfoPopupRender = () => {
  return (
    <div className="dk-dropdown-userinfo">
      <div className="dk-dropdown-userinfo-account">
        <Badge size="small" count={<ManOutlined style={{ backgroundColor: '#0052D9' }} />} offset={[-10, 35]}>
          <Avatar src={AvatarImage} size={40} />
        </Badge>
        <div className="dk-account-info">
          <div className="dk-account-name">吴彦祖</div>
          <div className="dk-account-item">
            超级管理员 | <PhoneOutlined /> <Paragraph copyable>13888888888</Paragraph>
          </div>
        </div>
      </div>
      <Row className="dk-dropdown-userinfo-btn-group">
        <Col span={8}>
          <Button className="dk-dropdown-userinfo-btn-left" block type="link" icon={<UserOutlined />} flex={1}>
            用户资料
          </Button>
        </Col>
        <Col span={8}>
          <Button className="dk-dropdown-userinfo-btn-center" block type="link" icon={<KeyOutlined />} flex={1}>
            修改密码
          </Button>
        </Col>
        <Col span={8}>
          <Button className="dk-dropdown-userinfo-btn-right" block type="link" icon={<MailOutlined />} flex={1}>
            消息通知
          </Button>
        </Col>
      </Row>
      <Row className="dk-dropdown-userinfo-statistic">
        <Col span={8}>
          <Statistic title="工龄（天）" value={365} />
        </Col>
        <Col span={8}>
          <Statistic title="待办事项" value={12} />
        </Col>
        <Col span={8}>
          <Statistic title="消息通知" value={128} />
        </Col>
      </Row>
      <div>
        <Button type="primary" block>
          退出登录
        </Button>
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
        <Dropdown className="dk-dropdown-user" popupRender={dropdownUserInfoPopupRender}>
          <Badge size="small" count={<ManOutlined style={{ backgroundColor: '#0052D9' }} />} offset={[-5, 22]}>
            <Avatar className="dk-header-avatar" src={AvatarImage} size={26} />
          </Badge>
        </Dropdown>
      </Header>
      <Layout className="dk-layout">
        <Sider
          className="dk-sider"
          collapsible
          collapsed={collapsed}
          onCollapse={(value) => setCollapsed(value)}
          width={220}
          collapsedWidth={50}
          trigger={collapsed ? <ArrowRightIcon /> : <ArrowLeftIcon />}
        >
          <Menu className="dk-menu" theme="light" mode="inline" defaultSelectedKeys={['/permission/role']} defaultOpenKeys={['/permission']} items={menuItems} />
        </Sider>
        <Content className="dk-content">
          <div style={{ height: '3000px' }}>Content</div>
        </Content>
      </Layout>
    </Layout>
  );
};
export default AdminLayout;
