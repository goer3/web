import { Helmet } from 'react-helmet';
import { TitleSuffix } from '@/components/Text';
import { PageHeaderBackgroundImage, TagLeftBlackIconImage } from '@/components/Image';
import { Form, Input, Row, Col } from 'antd';

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
                <Col span={6}>
                  <Form.Item label="关键字" name='keyword'>
                    <Input placeholder='请输入关键字进行检索' />
                  </Form.Item>
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
