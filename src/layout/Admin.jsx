import React, { useEffect, useState, useRef } from 'react';
import {
  AppstoreAddOutlined,
  AuditOutlined,
  DesktopOutlined,
  KeyOutlined,
  MailOutlined,
  ManOutlined,
  PhoneOutlined,
  SlidersOutlined,
  UserOutlined,
  ClusterOutlined,
  KubernetesOutlined,
  InboxOutlined,
  BuildOutlined,
  HddOutlined,
  PartitionOutlined,
  BlockOutlined,
  FundOutlined,
  CodepenOutlined,
  FileProtectOutlined,
  CalendarOutlined,
  SearchOutlined
} from '@ant-design/icons';
import { Avatar, Badge, Button, Col, Dropdown, Layout, Menu, Row, Statistic, Typography, Cascader, Space, Select, Input } from 'antd';
import { Outlet, useLocation, useNavigate } from 'react-router';
import { ArrowLeftIcon, ArrowRightIcon } from '@/components/Icon';
import { DefaultAvatarImage, LogoImage } from '@/components/Image';
import { GenerateGenderBadge } from '@/components/Tag';

const { Header, Content, Sider } = Layout;
const { Paragraph } = Typography;

// 本地存储 namespace 相关操作
const defaultNamespace = 'default';
const getLocalStorageNamespace = () => localStorage.getItem('namespace') || defaultNamespace;
const setLocalStorageNamespace = (value) => localStorage.setItem('namespace', value || defaultNamespace);

// 菜单项
const menuList = [
  {
    key: '/dashboard',
    icon: <DesktopOutlined />,
    label: '工作空间'
  },
  {
    key: '/cluster',
    icon: <ClusterOutlined />,
    label: '集群管理',
    children: [
      {
        key: '/cluster/environment',
        label: '环境列表'
      },
      {
        key: '/cluster/join',
        label: '集群接入'
      }
    ]
  },
  {
    key: '/kubernetes',
    icon: <KubernetesOutlined />,
    label: 'Kubernetes',
    children: [
      {
        key: '/kubernetes/overview',
        icon: <FundOutlined />,
        label: '概览'
      },
      {
        key: '/kubernetes/node',
        icon: <BlockOutlined />,
        label: '节点'
      },
      {
        key: '/kubernetes/namespace',
        icon: <InboxOutlined />,
        label: '名称空间'
      },
      {
        key: '/kubernetes/pod',
        icon: <CodepenOutlined />,
        label: 'Pod'
      },
      {
        key: '/kubernetes/workload',
        icon: <BuildOutlined />,
        label: '工作负载'
      },
      {
        key: '/kubernetes/service',
        icon: <AppstoreAddOutlined />,
        label: '服务'
      },
      {
        key: '/kubernetes/ingress',
        icon: <PartitionOutlined />,
        label: '负载均衡'
      },
      {
        key: '/kubernetes/configmap-and-secret',
        icon: <AuditOutlined />,
        label: '配置'
      },
      {
        key: '/kubernetes/storage',
        icon: <HddOutlined />,
        label: '存储'
      }
    ]
  },
  {
    key: '/system',
    icon: <FileProtectOutlined />,
    label: '权限中心',
    children: [
      {
        key: '/system/user',
        label: '用户管理'
      },
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
    icon: <CalendarOutlined />,
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

// 全局选项
const environmentAndClusterOptionData = [
  {
    value: '测试环境',
    label: '测试环境',
    children: [
      {
        value: '测试集群A',
        label: '测试集群A'
      },
      {
        value: '测试集群B',
        label: '测试集群B'
      }
    ]
  },
  {
    value: '开发环境',
    label: '开发环境',
    children: [
      {
        value: '开发集群A',
        label: '开发集群A'
      },
      {
        value: '开发集群B',
        label: '开发集群B'
      }
    ]
  }
];

const namespaceOptionData = [
  {
    value: 'default',
    label: 'default'
  },
  {
    value: 'kube-system',
    label: 'kube-system'
  },
  {
    value: 'kube-public',
    label: 'kube-public'
  }
];

const AdminLayout = () => {
  // 用于标记是否是初始化阶段
  const isInitialMount = useRef(true);
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
  }, [pathname, collapsed]);

  // 侧边栏收缩时触发图表重新调整大小
  useEffect(() => {
    // 监听内容区域的大小变化
    const contentElement = document.querySelector('.dk-content');
    if (!contentElement) return;
    const resizeObserver = new ResizeObserver(() => {
      window.dispatchEvent(new Event('resize'));
    });
    resizeObserver.observe(contentElement);
    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  // 级联选择器状态初始化
  const [cascaderValue, setCascaderValue] = useState(() => {
    // 从 localStorage 读取已有的值，如果存在完整的值，则使用它们
    const environment = localStorage.getItem('environment');
    const cluster = localStorage.getItem('cluster');
    if (environment && cluster) {
      return [environment, cluster];
    }

    // 否则使用默认值并保存到 localStorage，并且设置默认的名称空间
    const defaultValue = [environmentAndClusterOptionData[0].value, environmentAndClusterOptionData[0].children[0].value];
    localStorage.setItem('environment', defaultValue[0]);
    localStorage.setItem('cluster', defaultValue[1]);
    return defaultValue;
  });

  // 级联选择器变化事件，如果集群发生变化，则重置名称空间为默认值
  const onOptionChange = (value) => {
    if (value && value.length === 2) {
      localStorage.setItem('environment', value[0]);
      localStorage.setItem('cluster', value[1]);
      setCascaderValue(value);
    }
  };

  // 级联选择器搜索过滤函数
  const optionFilter = (inputValue, path) => path.some((option) => option.label.toLowerCase().includes(inputValue.toLowerCase()));

  // 初始化 namespace 状态，直接从 localStorage 读取，如果不存在则使用默认值
  const [namespace, setNamespace] = useState(getLocalStorageNamespace);

  // 只有在用户主动切换集群时才重置 namespace，初始化时不触发
  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }
    setLocalStorageNamespace(defaultNamespace);
    setNamespace(defaultNamespace);
  }, [cascaderValue]);

  // namespace 变化时保存到 localStorage
  const onNamespaceChange = (value) => {
    const newValue = value || defaultNamespace;
    setLocalStorageNamespace(newValue);
    setNamespace(newValue);
  };

  return (
    <Layout>
      <Header className="dk-header">
        <Space size="small">
          <div style={{width: "170px", marginRight: "10px"}}>
            <img src={LogoImage} alt="logo" className="dk-logo" />
          </div>
          <Cascader style={{ width: '200px' }} options={environmentAndClusterOptionData} onChange={onOptionChange} placeholder="选择环境/集群" showSearch={{ optionFilter }} value={cascaderValue} />
          <Select options={namespaceOptionData} style={{ width: '200px' }} placeholder="选择命名空间" showSearch value={namespace} onChange={onNamespaceChange} />
          <Input placeholder="全局搜索" prefix={<SearchOutlined />} variant="filled" style={{ width: '300px' }} />
        </Space>
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
          width={200}
          collapsedWidth={50}
          trigger={collapsed ? <ArrowRightIcon /> : <ArrowLeftIcon />}
        >
          <Menu
            className="dk-menu"
            inlineIndent={20}
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
