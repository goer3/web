import React from 'react';
import { Button, Result } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router';
import { Helmet } from 'react-helmet';
import { TitleSuffix } from '@/components/Text';

// 页面配置
const config = {
  title: '500'
};

const InternalServerError = () => {
  const navigate = useNavigate();
  return (
    <>
      <Helmet>
        <title>{config.title + TitleSuffix}</title>
      </Helmet>
      <Result
        status="500"
        title="500"
        subTitle="服务器错误，请联系管理员稍后再试！"
        extra={
          <Button className="dk-error-btn" type="primary" icon={<ArrowLeftOutlined />} onClick={() => navigate('/')}>
            返回首页
          </Button>
        }
      />
    </>
  );
};

export default InternalServerError;
