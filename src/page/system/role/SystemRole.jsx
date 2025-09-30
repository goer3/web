import { Helmet } from 'react-helmet';
import { TitleSuffix } from '@/components/Text';
import { PageHeaderBackgroundImage, TagLeftBlackIconImage } from '@/components/Image';
import { Form, Input, Row, Col, Button, Space } from 'antd';
import { SearchOutlined, ClearOutlined, DownOutlined } from '@ant-design/icons';
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
          <p>系统权限基于 <span style={{ color: '#CC0033' }}>RBAC</span> 基于角色权限控制模型设计，管理员可以精确的对每个角色的每个接口进行权限控制。</p>
          <p>超级管理员是系统的最高权限角色，无需单独设置，该角色默认会绕过所有权限控制，所以对于超级管理员的用户管理一定需要谨慎。</p>
        </div>
      </div>
    </>
  );
};

const RoleIndex = () => {
  const [searchForm] = Form.useForm();
  const [searchFormExpand, setSearchFormExpand] = useState(false);
  const searchFormExpandLimit = 4;

  // 搜索表单 items
  const searchFormItems = [
    { label: '关键字1', name: 'keyword1', type: 'input', allowClear: true, placeholder: '请输入关键字进行检索' },
    // { label: '关键字2', name: 'keyword2', type: 'input', allowClear: true, placeholder: '请输入关键字进行检索' },
    // { label: '关键字3', name: 'keyword3', type: 'input', allowClear: true, placeholder: '请输入关键字进行检索' },
    // { label: '关键字4', name: 'keyword4', type: 'input', allowClear: true, placeholder: '请输入关键字进行检索' },
    // { label: '关键字5', name: 'keyword5', type: 'input', allowClear: true, placeholder: '请输入关键字进行检索' },
    // { label: '关键字6', name: 'keyword6', type: 'input', allowClear: true, placeholder: '请输入关键字进行检索' },
    // { label: '关键字7', name: 'keyword7', type: 'input', allowClear: true, placeholder: '请输入关键字进行检索' },
    // { label: '关键字8', name: 'keyword8', type: 'input', allowClear: true, placeholder: '请输入关键字进行检索' },
    { label: '状态', name: 'status', type: 'select', allowClear: true, showSearch: true, mode: 'multiple', placeholder: '请选择状态', options: [{ label: '启用', value: 1 }, { label: '禁用', value: 0 }] },
  ];

  // 生成搜索表单组件
  const generateSearchFormItemsComponents = () => {
    return searchFormItems.slice(0, searchFormExpand ? searchFormItems.length : searchFormExpandLimit).map((field) => (
      <Col span={6} key={field?.name}>
        {FormItem(field)}
      </Col>
    ));
  };

  return (
    <>
      <Helmet>
        <title>{config.title + TitleSuffix}</title>
      </Helmet>
      <div>
        <PageHeader />
        <div className="dk-page-content">
          <div className="dk-page-search">
            <Form form={searchForm} name='searchForm' colon={false} labelCol={{ span: 6 }} wrapperCol={{ span: 18 }}>
              <Row gutter={20}>
                {generateSearchFormItemsComponents()}
                <Col span={24} key="x" style={{ textAlign: 'right' }}>
                  <Space>
                    <Button icon={<SearchOutlined />} htmlType="submit">条件筛选</Button>
                    <Button
                      icon={<ClearOutlined />}
                      onClick={() => { }}
                    >
                      清理条件
                    </Button>
                    {searchFormItems.length > searchFormExpandLimit && (
                      <a style={{ userSelect: 'none' }} onClick={() => {
                        setSearchFormExpand(!searchFormExpand);
                      }}>
                        <DownOutlined rotate={searchFormExpand ? 180 : 0} /> {searchFormExpand ? '收起条件' : '展开更多'}
                      </a>
                    )}
                  </Space>
                </Col>
              </Row>
            </Form>
          </div>
          <div className="dk-page-table">

          </div>
        </div>
      </div>
    </>
  );
};

export default RoleIndex;
