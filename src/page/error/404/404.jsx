import React from 'react';
import { Button, Result } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router';
import { Helmet } from 'react-helmet';
import { TitleSuffix } from '@/components/Text';

// 页面配置
const config = {
  title: '404'
};

const PageNotFoundError = () => {
  const navigate = useNavigate();
  return (
    <>
      <Helmet>
        <title>{config.title + TitleSuffix}</title>
      </Helmet>
      <Result
        status="404"
        title="404"
        subTitle="页面不存在，请检查页面地址是否正确！"
        extra={
          <Button className="dk-error-btn" type="primary" icon={<ArrowLeftOutlined />} onClick={() => navigate('/')}>
            返回首页
          </Button>
        }
      />
    </>
  );
};

export default PageNotFoundError;
