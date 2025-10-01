import { Helmet } from 'react-helmet';
import { TitleSuffix } from '@/components/Text';
import { PageHeaderBackgroundImage, TagLeftBlackIconImage } from '@/components/Image';
import { Form, Row, Col, Button, Space, Dropdown, Table } from 'antd';
import {
  SearchOutlined,
  ClearOutlined,
  DownOutlined,
  PlusOutlined,
  RedoOutlined,
  CloudDownloadOutlined,
  CloudUploadOutlined,
  FileExcelOutlined,
  EditOutlined,
  DeleteOutlined
} from '@ant-design/icons';
import { useState } from 'react';
import FormItem from '@/components/Form';

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

const RoleIndex = () => {
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

  // 数据字段定义
  const columns = [
    { title: 'ID', dataIndex: 'id', key: 'id', width: 100, fixed: 'left' },
    { title: '名称', dataIndex: 'name', key: 'name' },
    { title: '唯一标识', dataIndex: 'keyword', key: 'keyword' },
    { title: '描述', dataIndex: 'description', key: 'description' },
    { title: '状态', dataIndex: 'status', key: 'status' },
    { title: '创建时间', dataIndex: 'createTime', key: 'createTime' },
    { title: '更新时间', dataIndex: 'updateTime', key: 'updateTime' },
    { title: '创建人', dataIndex: 'createBy', key: 'createBy' },
    { title: '更新人', dataIndex: 'updateBy', key: 'updateBy' },
    {
      title: '操作',
      dataIndex: 'operations',
      key: 'operations',
      width: 150,
      fixed: 'right',
      align: 'center',
      render: (text, record) => (
        <Space>
          <Button className="dk-operation-link" color="primary" variant="link" icon={<EditOutlined />}>
            编辑
          </Button>
          <Button className="dk-operation-link" color="red" variant="link" icon={<DeleteOutlined />}>
            删除
          </Button>
        </Space>
      )
    }
  ];

  // 测试数据
  const dataSource = [
    {
      id: 1,
      name: '角色1',
      keyword: 'administrator',
      description: '角色1描述',
      status: '启用',
      createTime: '2021-01-01 12:00:00',
      updateTime: '2021-01-01 12:00:00',
      createBy: 'admin',
      updateBy: 'admin'
    },
    { id: 2, name: '角色2', keyword: 'user', description: '角色2描述', status: '禁用', createTime: '2021-01-01 12:00:00', updateTime: '2021-01-01 12:00:00', createBy: 'admin', updateBy: 'admin' }
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
            <Form form={searchForm} name="searchForm" colon={false} labelCol={{ span: 6 }} wrapperCol={{ span: 18 }}>
              <Row gutter={20}>
                {generateSearchFormItemsComponents()}
                <Col span={24} key="searchFormActions" style={{ textAlign: 'right' }}>
                  <Space>
                    <Button icon={<SearchOutlined />} htmlType="submit">
                      条件筛选
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
                  <Button type="primary" icon={<PlusOutlined />}>
                    新增角色
                  </Button>
                  <Button icon={<CloudUploadOutlined />}>批量导入</Button>
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
                scroll={{ x: 'max-content' }}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RoleIndex;
