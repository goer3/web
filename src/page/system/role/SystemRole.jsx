import { Helmet } from 'react-helmet';
import { TitleSuffix } from '@/components/Text';
import { PageHeaderBackgroundImage, TagLeftBlackIconImage } from '@/components/Image';
import { Avatar, Button, Col, Drawer, Dropdown, Form, Input, Modal, Popconfirm, Row, Space, Table, Tree, Upload, Typography } from 'antd';
import {
  ApiOutlined,
  ClearOutlined,
  CloudDownloadOutlined,
  CloudUploadOutlined,
  DeleteOutlined,
  DownOutlined,
  EditOutlined,
  FileExcelOutlined,
  InboxOutlined,
  PlusOutlined,
  RedoOutlined,
  SaveOutlined,
  SearchOutlined,
  SisternodeOutlined,
  UsergroupAddOutlined,
  VerticalAlignMiddleOutlined,
  VerticalAlignBottomOutlined,
  HistoryOutlined,
  CopyOutlined
} from '@ant-design/icons';
import { useState } from 'react';
import FormItem from '@/components/Form';
import { GenerateGenderIcon, GenerateMethodTag, GenerateStatusTag } from '@/components/Tag';
import { GetTreeAllKeys, GetTreeNodeChildrenKeys } from '@/components/Tree';

const { Dragger } = Upload;
const { Search } = Input;
const { Paragraph } = Typography;

// 页面配置
const config = {
  title: '角色配置',
  enTitle: 'SYSTEM ROLE CONFIGURATION'
};

// 页面头部信息
const PageHeader = () => {
  return (
    <>
      <div className="dk-page-header" style={{ backgroundImage: `url(${PageHeaderBackgroundImage})` }}>
        <div className="dk-page-header-title">
          <img src={TagLeftBlackIconImage} alt="tag-left-black" />
          <span>{config.title + ' | ' + config.enTitle}</span>
        </div>
        <div className="dk-page-header-body">
          <p>
            系统权限基于 <span style={{ color: '#CC0033' }}>RBAC</span> 基于角色权限控制模型设计，管理员可以精确的对每个角色的每个接口进行权限控制。
          </p>
          <p>超级管理员是系统的最高权限角色，无需单独设置，该角色默认会绕过所有权限控制，所以对于超级管理员的用户管理一定需要谨慎。</p>
        </div>
      </div>
    </>
  );
};

const SystemRole = () => {
  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // 表格相关逻辑
  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // 搜索表单
  const [searchForm] = Form.useForm();
  // 搜索表单展开状态
  const [searchFormExpand, setSearchFormExpand] = useState(false);
  // 搜索表单展开限制
  const searchFormExpandLimit = 4;

  // 树形选择数据
  const treeSelectData = [
    {
      value: 'parent 1-0',
      title: 'parent 1-0',
      children: [
        { value: 'leaf1', title: 'leaf1' },
        { value: 'leaf2', title: 'leaf2' }
      ]
    },
    { value: 'parent 1-1', title: 'parent 1-1' }
  ];

  // 搜索表单 items
  const searchFormItems = [
    { label: '关键字1', name: 'keyword1', type: 'input', allowClear: true, placeholder: '请输入关键字进行检索' },
    {
      label: '关键字2',
      name: 'keyword2',
      type: 'select',
      allowClear: true,
      showSearch: true,
      placeholder: '请选择状态',
      options: [
        { label: '启用', value: 1 },
        { label: '禁用', value: 0 }
      ]
    },
    { label: '关键字3', name: 'keyword3', type: 'textarea', allowClear: true, rows: 1, placeholder: '请输入内容' },
    { label: '关键字4', name: 'keyword4', type: 'password', allowClear: true, placeholder: '请输入密码' },
    { label: '关键字6', name: 'keyword6', type: 'number', addonAfter: '元', addonBefore: '￥', width: '100%', placeholder: '请输入数字' },
    { label: '关键字7', name: 'keyword7', type: 'datePicker', allowClear: true, width: '100%', placeholder: '请选择日期' },
    { label: '关键字8', name: 'keyword8', type: 'timePicker', allowClear: true, width: '100%', placeholder: '请选择时间' },
    { label: '关键字9', name: 'keyword9', type: 'treeSelect', allowClear: true, treeDefaultExpandAll: true, placeholder: '请选择树形选择', treeData: treeSelectData }
  ];

  // 生成搜索表单组件
  const generateSearchFormItemsComponents = () => {
    return searchFormItems.slice(0, searchFormExpand ? searchFormItems.length : searchFormExpandLimit).map((field) => (
      <Col span={6} key={field?.name}>
        {FormItem(field)}
      </Col>
    ));
  };

  // 批量操作菜单
  const multiActionMenus = {
    items: [
      { label: '批量启用', key: 'enable' },
      { label: '批量禁用', key: 'disable', danger: true }
    ],
    onClick: ({ key }) => {
      console.log('点击下拉菜单:', key);
      // 这里可以添加具体的菜单项点击处理逻辑
    }
  };

  // 分页参数
  const [pageSize, setPageSize] = useState(2);
  const [pageNumber, setPageNumber] = useState(1);

  // 数据字段定义
  const columns = [
    // 排序
    { title: 'ID', dataIndex: 'id', key: 'id', width: 100, fixed: 'left', sorter: (a, b) => a.id - b.id },
    { title: '名称', dataIndex: 'name', key: 'name', sorter: (a, b) => a.name.localeCompare(b.name) },
    { title: '唯一标识', dataIndex: 'keyword', key: 'keyword' },
    { title: '描述', dataIndex: 'description', key: 'description' },
    { title: '状态', dataIndex: 'status', key: 'status', render: (text, record) => GenerateStatusTag(record?.status) },
    { title: '创建时间', dataIndex: 'createTime', key: 'createTime' },
    { title: '更新时间', dataIndex: 'updateTime', key: 'updateTime' },
    { title: '创建人', dataIndex: 'createBy', key: 'createBy' },
    { title: '更新人', dataIndex: 'updateBy', key: 'updateBy' },
    {
      title: '操作',
      dataIndex: 'operations',
      key: 'operations',
      width: 250,
      fixed: 'right',
      align: 'center',
      render: (text, record) => (
        <Space>
          <Button className="dk-operation-link" color="primary" variant="link" icon={<EditOutlined />}>
            编辑
          </Button>
          <Button className="dk-operation-link" color="primary" variant="link" icon={<SisternodeOutlined />} onClick={() => setMenuDrawerVisible(true)}>
            菜单
          </Button>
          <Button className="dk-operation-link" color="primary" variant="link" icon={<ApiOutlined />} onClick={() => setApiDrawerVisible(true)}>
            接口
          </Button>
          <Button className="dk-operation-link" color="primary" variant="link" icon={<UsergroupAddOutlined />} onClick={() => setRoleUserDrawerVisible(true)}>
            人员
          </Button>
          <Button
            className="dk-operation-link"
            color="#0052d9"
            variant="link"
            icon={<CopyOutlined />}
            onClick={() => {
              setCopyRoleModalVisible(true);
              copyRoleForm.setFieldsValue({
                copyId: record.id,
                copyName: record.name
              });
            }}
          >
            复制
          </Button>
          <Popconfirm placement="topRight" description="是否确认删除该角色？" onConfirm={() => {}} okText="是" cancelText="否">
            <Button className="dk-operation-link" color="red" variant="link" icon={<DeleteOutlined />}>
              删除
            </Button>
          </Popconfirm>
        </Space>
      )
    }
  ];

  // 测试数据
  const dataSource = [
    {
      id: 1,
      name: '角色1',
      keyword: 'Administrator',
      description: '角色1描述',
      status: 1,
      createTime: '2021-01-01 12:00:00',
      updateTime: '2021-01-01 12:00:00',
      createBy: 'admin',
      updateBy: 'admin'
    },
    { id: 2, name: '角色2', keyword: 'User', description: '角色2描述', status: 2, createTime: '2021-01-01 12:00:00', updateTime: '2021-01-01 12:00:00', createBy: 'admin', updateBy: 'admin' },
    { id: 3, name: '角色3', keyword: 'User', description: '角色2描述', status: 2, createTime: '2021-01-01 12:00:00', updateTime: '2021-01-01 12:00:00', createBy: 'admin', updateBy: 'admin' },
    { id: 4, name: '角色4', keyword: 'User', description: '角色2描述', status: 1, createTime: '2021-01-01 12:00:00', updateTime: '2021-01-01 12:00:00', createBy: 'admin', updateBy: 'admin' },
    { id: 5, name: '角色5', keyword: 'User', description: '角色2描述', status: 1, createTime: '2021-01-01 12:00:00', updateTime: '2021-01-01 12:00:00', createBy: 'admin', updateBy: 'admin' }
  ];

  // 行选择
  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(`选择行Keys: ${selectedRowKeys}`, '选择行: ', selectedRows);
    },
    getCheckboxProps: (record) => ({
      disabled: record.keyword === 'administrator'
    })
  };

  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // 添加角色相关逻辑
  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // 添加角色 Modal
  const [addRoleModalVisible, setAddRoleModalVisible] = useState(false);
  // 添加角色
  const [addRoleForm] = Form.useForm();

  // 添加角色表单
  const addRoleFormItems = [
    { label: '新角色名称', name: 'name', type: 'input', allowClear: true, placeholder: '请输入角色名称', rules: [
      { required: true, message: '请输入角色名称' },
      { pattern: /^\S+$/, message: '角色名称不能包含空格' },
      { min: 2, message: '最少2个字符' },
      { max: 20, message: '最多20个字符' }
    ] },
    { label: '唯一标识', name: 'keyword', extra: '强制使用英文大驼峰式命名，如：SuperAdministrator', type: 'input', allowClear: true, placeholder: '请输入唯一标识', rules: [
      { required: true, message: '请输入唯一标识' },
      { pattern: /^[A-Z][A-Za-z0-9]*$/, message: '格式不正确，应为英文大驼峰式命名' },
      { min: 2, message: '最少2个字符' },
      { max: 50, message: '最多50个字符' }
    ] },
    { label: '描述', name: 'description', type: 'textarea', allowClear: true, rows: 1, placeholder: '请输入描述', rules: [
      { required: true, message: '请输入描述' },
      { min: 2, message: '最少2个字符' },
      { max: 500, message: '最多500个字符' }
    ] }
  ];

  // 生成添加角色表单组件
  const generateAddRoleFormItemsComponents = () => {
    return addRoleFormItems.map((field) => FormItem(field));
  };

  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // 复制角色相关逻辑
  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // 复制角色 Modal
  const [copyRoleModalVisible, setCopyRoleModalVisible] = useState(false);
  // 复制角色
  const [copyRoleForm] = Form.useForm();

  // 复制角色字段
  const copyRoleFormItems = [
    { label: '复制角色ID', name: 'copyId', type: 'input', disabled: true, hidden: false, rules: [{ required: true, message: '请输入角色ID' }] },
    { label: '复制角色名称', name: 'copyName', type: 'input', disabled: true, rules: [{ required: true, message: '请输入角色名称' }] },
    ...addRoleFormItems
  ];

  // 生成复制角色表单组件
  const generateCopyRoleFormItemsComponents = () => {
    return copyRoleFormItems.map((field) => FormItem(field));
  };

  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // 批量导入相关逻辑
  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // 批量导入 Modal
  const [multiImportModalVisible, setMultiImportModalVisible] = useState(false);

  // 批量导入 props
  const multiImportProps = {
    name: 'file',
    accept: '.xlsx',
    multiple: false,
    action: '',
    onChange(info) {
      const { status } = info.file;
      if (status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (status === 'done') {
        message.success(`${info.file.name} 导入成功.`);
      } else if (status === 'error') {
        message.error(`${info.file.name} 导入失败.`);
      }
    },
    onDrop(e) {
      console.log('拖拽文件: ', e.dataTransfer.files);
    }
  };

  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // 菜单授权相关逻辑
  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // 菜单授权 Drawer
  const [menuDrawerVisible, setMenuDrawerVisible] = useState(false);

  // 菜单树数据
  const menuTreeData = [
    {
      title: '菜单1',
      key: 'menu1',
      children: [
        {
          title: '菜单1-1',
          key: 'menu1-1',
          children: [
            { title: '菜单1-1-1', key: 'menu1-1-1' },
            { title: '菜单1-1-2', key: 'menu1-1-2' },
            { title: '菜单1-1-3', key: 'menu1-1-3' }
          ]
        },
        {
          title: '菜单1-2',
          key: 'menu1-2',
          children: [
            { title: '菜单1-2-1', key: 'menu1-2-1' },
            { title: '菜单1-2-2', key: 'menu1-2-2' },
            { title: '菜单1-2-3', key: 'menu1-2-3' }
          ]
        },
        {
          title: '菜单1-3',
          key: 'menu1-3'
        }
      ]
    },
    {
      title: '菜单2',
      key: 'menu2',
      children: [
        { title: '菜单2-1', key: 'menu2-1' },
        { title: '菜单2-2', key: 'menu2-2' },
        { title: '菜单2-3', key: 'menu2-3' }
      ]
    },
    {
      title: '菜单3',
      key: 'menu3'
    },
    {
      title: '菜单4',
      key: 'menu4',
      children: [
        { title: '菜单4-1', key: 'menu4-1' },
        { title: '菜单4-2', key: 'menu4-2' },
        { title: '菜单4-3', key: 'menu4-3' }
      ]
    },
    {
      title: '菜单5',
      key: 'menu5',
      children: [
        { title: '菜单5-1', key: 'menu5-1' },
        { title: '菜单5-2', key: 'menu5-2' },
        { title: '菜单5-3', key: 'menu5-3' }
      ]
    },
    {
      title: '菜单6',
      key: 'menu6',
      children: [
        { title: '菜单6-1', key: 'menu6-1' },
        { title: '菜单6-2', key: 'menu6-2' },
        { title: '菜单6-3', key: 'menu6-3' }
      ]
    },
    {
      title: '菜单7',
      key: 'menu7',
      children: [
        { title: '菜单7-1', key: 'menu7-1' },
        { title: '菜单7-2', key: 'menu7-2' },
        { title: '菜单7-3', key: 'menu7-3' }
      ]
    },
    {
      title: '菜单8',
      key: 'menu8',
      children: [
        { title: '菜单8-1', key: 'menu8-1' },
        { title: '菜单8-2', key: 'menu8-2' },
        { title: '菜单8-3', key: 'menu8-3' }
      ]
    },
    {
      title: '菜单9',
      key: 'menu9',
      children: [
        { title: '菜单9-1', key: 'menu9-1' },
        { title: '菜单9-2', key: 'menu9-2' },
        { title: '菜单9-3', key: 'menu9-3' }
      ]
    },
    {
      title: '菜单10',
      key: 'menu10',
      children: [
        { title: '菜单10-1', key: 'menu10-1' },
        { title: '菜单10-2', key: 'menu10-2' },
        { title: '菜单10-3', key: 'menu10-3' }
      ]
    }
  ];

  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // 接口授权相关逻辑
  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // 接口授权 Drawer
  const [apiDrawerVisible, setApiDrawerVisible] = useState(false);
  // 选中的接口
  const [apiCheckedKeys, setApiCheckedKeys] = useState(['/api/v1/system/user/list', '/api/v1/system/user/detail']);
  // 展开接口树
  const [apiExpandKeys, setApiExpandKeys] = useState([]);

  // 接口树数据
  const apiTreeData = [
    {
      title: '系统管理',
      key: '/api/v1/system',
      method: 'GET',
      isApi: false,
      children: [
        {
          title: '用户相关',
          key: '/api/v1/system/user',
          method: 'GET',
          isApi: false,
          children: [
            {
              title: '用户接口（读）',
              key: '/api/v1/system/user/read-apis',
              method: 'GET',
              isApi: false,
              children: [
                { title: '用户列表', key: '/api/v1/system/user/list', method: 'GET', isApi: true },
                { title: '用户详情', key: '/api/v1/system/user/detail', method: 'GET', isApi: true }
              ]
            },
            {
              title: '用户接口（写）',
              key: '/api/v1/system/user/write-apis',
              method: 'POST',
              isApi: false,
              children: [
                { title: '添加用户', key: '/api/v1/system/user/add', method: 'POST', isApi: true },
                { title: '修改用户', key: '/api/v1/system/user/edit', method: 'PUT', isApi: true },
                { title: '删除用户', key: '/api/v1/system/user/delete', method: 'DELETE', isApi: true }
              ]
            }
          ]
        },
        {
          title: '角色相关',
          key: '/api/v1/system/role',
          method: 'GET',
          isApi: false,
          children: [
            {
              title: '角色接口（读）',
              key: '/api/v1/system/role/read-apis',
              method: 'GET',
              isApi: false,
              children: [
                { title: '角色列表', key: '/api/v1/system/role/list', method: 'GET', isApi: true },
                { title: '角色详情', key: '/api/v1/system/role/detail', method: 'GET', isApi: true }
              ]
            },
            {
              title: '角色接口（写）',
              key: '/api/v1/system/role/write-apis',
              method: 'POST',
              isApi: false,
              children: [
                { title: '添加角色', key: '/api/v1/system/role/add', method: 'POST', isApi: true },
                { title: '修改角色', key: '/api/v1/system/role/edit', method: 'PUT', isApi: true },
                { title: '删除角色', key: '/api/v1/system/role/delete', method: 'DELETE', isApi: true }
              ]
            }
          ]
        }
      ]
    }
  ];

  // 接口树选择
  const onApiCheck = (checkedKeys, info) => {
    setApiCheckedKeys(checkedKeys);
  };

  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // 角色用户相关逻辑
  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // 角色用户分页
  const [roleUserPageSize, setRoleUserPageSize] = useState(2);
  const [roleUserPageNumber, setRoleUserPageNumber] = useState(1);

  // 角色用户 Drawer
  const [roleUserDrawerVisible, setRoleUserDrawerVisible] = useState(false);

  // 角色用户表列
  const roleUserColumns = [
    { title: 'ID', dataIndex: 'id', key: 'id' },
    { title: '头像', dataIndex: 'avatar', key: 'avatar', render: (text, record) => <Avatar size={18} src={record.avatar} /> },
    { title: '用户名', dataIndex: 'username', key: 'username' },
    { title: '姓名', dataIndex: 'name', key: 'name' },
    { title: '性别', dataIndex: 'gender', key: 'gender', render: (text, record) => GenerateGenderIcon(record?.gender) },
    { title: '手机号', dataIndex: 'phone', key: 'phone' },
    { title: '状态', dataIndex: 'status', key: 'status', render: (text, record) => GenerateStatusTag(record?.status) },
    {
      title: '操作',
      dataIndex: 'operations',
      key: 'operations',
      align: 'center',
      render: (text, record) => (
        <Space>
          <Button className="dk-operation-link" color="primary" variant="link" icon={<EditOutlined />}>
            编辑
          </Button>
          <Popconfirm placement="topRight" description="是否确认删除该用户？" onConfirm={() => {}} okText="是" cancelText="否">
            <Button className="dk-operation-link" color="danger" variant="link" icon={<DeleteOutlined />}>
              删除
            </Button>
          </Popconfirm>
        </Space>
      )
    }
  ];

  // 角色用户数据源
  const defaultRoleUserDataSource = [
    { id: 1, avatar: 'https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg', username: 'admin', name: '超管', gender: 1, phone: '13800138000', status: 1 },
    { id: 2, avatar: 'https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg', username: 'user', name: '张三', gender: 2, phone: '13800138001', status: 1 },
    { id: 3, avatar: 'https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg', username: 'user', name: '李四', gender: 2, phone: '13800138002', status: 2 }
  ];
  const [roleUserDataSource, setRoleUserDataSource] = useState(defaultRoleUserDataSource);

  // 用户搜索
  const roleUserSearchHandler = (value) => {
    const filteredDataSource = defaultRoleUserDataSource.filter((item) => item.username.includes(value) || item.name.includes(value) || item.phone.includes(value));
    setRoleUserDataSource(filteredDataSource);
  };

  return (
    <>
      <Helmet>
        <title>{config.title + TitleSuffix}</title>
      </Helmet>
      <div>
        <PageHeader />
        <div className="dk-page-content">
          {/* 搜索 */}
          <div className="dk-page-search">
            <div className="dk-page-search-title">
              <span>搜索</span>
            </div>
            <Form form={searchForm} name="searchForm" colon={false} labelCol={{ span: 6 }} wrapperCol={{ span: 18 }}>
              <Row gutter={20}>
                {generateSearchFormItemsComponents()}
                <Col span={24} key="searchFormActions" style={{ textAlign: 'right' }}>
                  <Space>
                    <Button icon={<SearchOutlined />} htmlType="submit">
                      条件搜索
                    </Button>
                    <Button icon={<ClearOutlined />} onClick={() => {}}>
                      清理条件
                    </Button>
                    {searchFormItems.length > searchFormExpandLimit && (
                      <a
                        style={{ userSelect: 'none' }}
                        onClick={() => {
                          setSearchFormExpand(!searchFormExpand);
                        }}
                      >
                        <DownOutlined rotate={searchFormExpand ? 180 : 0} /> {searchFormExpand ? '收起条件' : '展开更多'}
                      </a>
                    )}
                  </Space>
                </Col>
              </Row>
            </Form>
          </div>
          {/* 主体 */}
          <div className="dk-page-main">
            {/* 操作按钮 */}
            <div className="dk-page-actions">
              <div className="dk-page-actions-left">
                <Space size={10}>
                  <Button type="primary" icon={<PlusOutlined />} onClick={() => setAddRoleModalVisible(true)}>
                    新增角色
                  </Button>
                  <Button icon={<CloudUploadOutlined />} onClick={() => setMultiImportModalVisible(true)}>
                    批量导入
                  </Button>
                  <Dropdown menu={multiActionMenus}>
                    <Button>
                      <Space>
                        <DownOutlined />
                        批量操作
                      </Space>
                    </Button>
                  </Dropdown>
                </Space>
              </div>
              <div className="dk-page-actions-right">
                <Space size={10}>
                  <Button icon={<RedoOutlined />}>刷新列表</Button>
                  <Button icon={<FileExcelOutlined />}>导入模板</Button>
                  <Button icon={<CloudDownloadOutlined />}>导出数据</Button>
                  <Button icon={<HistoryOutlined />}>操作记录</Button>
                </Space>
              </div>
            </div>
            {/* 表格 */}
            <div className="dk-page-table">
              <Table
                rowKey="id"
                columns={columns} // 数据列定义
                dataSource={dataSource} // 数据源
                size="small" // 大小
                bordered={false} // 边框
                rowSelection={{ type: 'checkbox', ...rowSelection }} // 可选择
                expandable={{
                  expandedRowRender: (record) => <div>{record.description}</div>,
                  rowExpandable: (record) => record.keyword !== 'administrator'
                }}
                scroll={dataSource.length > 0 ? { x: 'max-content' } : undefined}
                pagination={{
                  pageSize: pageSize,
                  current: pageNumber,
                  total: dataSource.length,
                  showSizeChanger: true,
                  showQuickJumper: true,
                  hideOnSinglePage: false,
                  showTotal: (total) => `共 ${total} 条`,
                  onChange: (page, pageSize) => {
                    setPageSize(pageSize);
                    setPageNumber(page);
                  }
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* 添加角色 */}
      <Modal title="新增角色" footer={null} maskClosable={false} width={400} open={addRoleModalVisible} onCancel={() => setAddRoleModalVisible(false)}>
        <Form className="dk-modal-form" form={addRoleForm} name="addRoleForm" colon={false} layout="vertical">
          {generateAddRoleFormItemsComponents()}
          <Form.Item>
            <Button block type="primary" onClick={() => {}}>
              提交
            </Button>
          </Form.Item>
        </Form>
      </Modal>

      {/* 复制角色 */}
      <Modal title="复制角色" footer={null} maskClosable={false} width={400} open={copyRoleModalVisible} onCancel={() => setCopyRoleModalVisible(false)}>
        <Form className="dk-modal-form" form={copyRoleForm} name="copyRoleForm" colon={false} layout="vertical">
          {generateCopyRoleFormItemsComponents()}
          <Form.Item>
            <Button block type="primary" onClick={() => {}}>
              提交
            </Button>
          </Form.Item>
        </Form>
      </Modal>

      {/* 批量导入 */}
      <Modal title="角色批量导入" footer={null} maskClosable={false} width={600} open={multiImportModalVisible} onCancel={() => setMultiImportModalVisible(false)}>
        <Dragger {...multiImportProps} className="dk-upload-dragger">
          <div className="dk-upload-drag-icon">
            <InboxOutlined />
          </div>
          <div className="dk-upload-text">点击或拖拽文件到此区域上传</div>
          <div className="dk-upload-hint">请下载模板进行数据导入，如果导入失败，请联系管理员</div>
        </Dragger>
        <Button className="dk-upload-button" block type="primary" onClick={() => {}}>
          批量导入
        </Button>
      </Modal>

      {/* 菜单授权 */}
      <Drawer
        title="菜单授权（超级管理员）"
        open={menuDrawerVisible}
        onClose={() => setMenuDrawerVisible(false)}
        maskClosable={false}
        width={600}
        footer={
          <Button type="primary" icon={<SaveOutlined />}>
            保存菜单授权
          </Button>
        }
      >
        <Tree checkable showLine={true} defaultExpandAll={true} autoExpandParent={true} treeData={menuTreeData} />
      </Drawer>

      {/* 接口授权 */}
      <Drawer
        title="接口授权（超级管理员）"
        open={apiDrawerVisible}
        onClose={() => setApiDrawerVisible(false)}
        maskClosable={false}
        width={800}
        footer={
          <Space>
            <Button danger icon={<SaveOutlined />} onClick={() => {}}>
              保存接口授权
            </Button>
            <Button
              icon={apiExpandKeys.length > 0 ? <VerticalAlignMiddleOutlined /> : <VerticalAlignBottomOutlined />}
              onClick={() => {
                setApiExpandKeys(apiExpandKeys.length > 0 ? [] : GetTreeAllKeys(apiTreeData));
              }}
            >
              {apiExpandKeys.length > 0 ? '收起所有接口' : '展开所有接口'}
            </Button>
          </Space>
        }
      >
        <Tree
          checkable
          showLine={true}
          defaultExpandAll={false}
          expandedKeys={apiExpandKeys}
          autoExpandParent={true}
          treeData={apiTreeData}
          onCheck={onApiCheck}
          onExpand={(expandedKeys, { expanded, node }) => {
            if (!expanded) {
              // 折叠节点时，移除该节点及其所有子节点
              const childKeys = GetTreeNodeChildrenKeys(node);
              setApiExpandKeys(expandedKeys.filter((key) => !childKeys.includes(key)));
            } else {
              setApiExpandKeys(expandedKeys);
            }
          }}
          checkedKeys={apiCheckedKeys}
          className="dk-tree-select"
          titleRender={(node) => (
            <Paragraph copyable={{ text: node.title + '：' + node.key + '：' + node.method }}>
              <span>{node.title}</span>
              <span>{node.isApi ? '：' + node.key + '：' : ''}</span>
              <span>{node.isApi ? GenerateMethodTag(node.method) : ''}</span>
            </Paragraph>
          )}
        />
      </Drawer>

      {/* 角色用户 */}
      <Drawer title="角色用户（超级管理员）" open={roleUserDrawerVisible} onClose={() => setRoleUserDrawerVisible(false)} maskClosable={false} width={600}>
        <div className="dk-page-actions">
          <div className="dk-page-actions-left">
            <Space size={10}>
              <Button type="primary" icon={<PlusOutlined />}>
                新增用户
              </Button>
            </Space>
          </div>
          <div className="dk-page-actions-right">
            <Search placeholder="搜索用户" allowClear onSearch={roleUserSearchHandler} style={{ width: 200 }} />
          </div>
        </div>
        <Table
          rowKey="username"
          columns={roleUserColumns} // 数据列定义
          dataSource={roleUserDataSource} // 数据源
          size="small" // 大小
          bordered={false} // 边框
          scroll={roleUserDataSource.length > 0 ? { x: 'max-content' } : undefined}
          pagination={{
            pageSize: roleUserPageSize,
            current: roleUserPageNumber,
            total: roleUserDataSource.length,
            showSizeChanger: true,
            showQuickJumper: true,
            hideOnSinglePage: false,
            showTotal: (total) => `共 ${total} 条`,
            onChange: (page, pageSize) => {
              setRoleUserPageSize(pageSize);
              setRoleUserPageNumber(page);
            }
          }}
        />
      </Drawer>
    </>
  );
};

export default SystemRole;
