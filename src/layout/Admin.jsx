import React, { useEffect, useState } from 'react';
import { AppstoreAddOutlined, AuditOutlined, DesktopOutlined, KeyOutlined, MailOutlined, ManOutlined, PhoneOutlined, SlidersOutlined, UsergroupAddOutlined, UserOutlined } from '@ant-design/icons';
import { Avatar, Badge, Button, Col, Dropdown, Layout, Menu, Row, Statistic, Typography } from 'antd';
import { Outlet, useLocation, useNavigate } from 'react-router';
import { ArrowLeftIcon, ArrowRightIcon } from '@/components/Icon';
import { DefaultAvatarImage, LogoImage } from '@/components/Image';
import { GenerateGenderBadge } from '@/components/Tag';

const { Header, Content, Sider } = Layout;
const { Paragraph } = Typography;

// 菜单项
const menuList = [
  {
    key: '/dashboard',
    icon: <DesktopOutlined />,
    label: '工作空间'
  },
  {
    key: '/project',
    icon: <AppstoreAddOutlined />,
    label: '项目管理'
  },
  {
    key: '/user',
    icon: <UsergroupAddOutlined />,
    label: '用户中心',
    children: [
      {
        key: '/user/list',
        label: '用户列表'
      },
      {
        key: '/user/group',
        label: '用户分组'
      }
    ]
  },
  {
    key: '/system',
    icon: <AuditOutlined />,
    label: '权限中心',
    children: [
      {
        key: '/system/role',
        label: '角色配置'
      },
      {
        key: '/system/menu',
        label: '菜单配置'
      },
      {
        key: '/system/api',
        label: '接口配置'
      },
      {
        key: '/system/setting',
        label: '系统配置'
      }
    ]
  },
  {
    key: '/information',
    icon: <SlidersOutlined />,
    label: '版本信息'
  }
];

// 获取当前指定路径的所有父级菜单key列表，如果当前是顶级菜单，则返回当前菜单key列表
const getParentMenuKeyList = (path) => {
  // 如果路径为空或无效，返回空数组
  if (!path) return [];

  // 将路径按 '/' 分割，过滤掉空字符串
  const pathSegments = path.split('/').filter((segment) => segment !== '');

  // 如果只有一个段，说明是顶级菜单，返回当前key列表
  if (pathSegments.length === 1) return [path];

  // 构建父级key列表
  const parentKeys = [];
  let currentPath = '';

  // 遍历路径段，构建每个层级的完整路径
  for (let i = 0; i < pathSegments.length; i++) {
    currentPath += '/' + pathSegments[i];
    parentKeys.push(currentPath);
  }

  return parentKeys;
};

// 下拉用户信息
const dropdownUserInfoPopupRender = () => {
  return (
    <div className="dk-dropdown-userinfo">
      <div className="dk-dropdown-userinfo-account">
        <Badge size="small" count={<ManOutlined style={{ backgroundColor: '#0052D9' }} />} offset={[-10, 35]}>
          <Avatar src={DefaultAvatarImage} size={40} />
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
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [collapsed, setCollapsed] = useState(false);

  // 根据当前路径初始化菜单状态
  const [openKeys, setOpenKeys] = useState(() => getParentMenuKeyList(pathname));
  const [selectedKeys, setSelectedKeys] = useState(() => [pathname]);

  // 如果 pathname 发生变化，则更新选中菜单和展开菜单
  useEffect(() => {
    setSelectedKeys([pathname]);
    setOpenKeys(getParentMenuKeyList(pathname));
  }, [pathname]);

  return (
    <Layout>
      <Header className="dk-header">
        <img src={LogoImage} alt="logo" className="dk-logo" />
        <Dropdown className="dk-dropdown-user" popupRender={dropdownUserInfoPopupRender}>
          <Badge size="small" count={GenerateGenderBadge(1)} offset={[-5, 22]}>
            <Avatar className="dk-header-avatar" src={DefaultAvatarImage} size={26} />
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
          <Menu
            className="dk-menu"
            theme="light"
            mode="inline"
            selectedKeys={selectedKeys}
            openKeys={openKeys}
            items={menuList}
            onOpenChange={(keys) => setOpenKeys(keys)}
            onClick={({ key }) => navigate(key)}
          />
        </Sider>
        <Content className="dk-content">
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default AdminLayout;
