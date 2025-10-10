import React from 'react';
import { Button, Result } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router';
import { Helmet } from 'react-helmet';
import { TitleSuffix } from '@/components/Text';

// 页面配置
const config = {
  title: '403'
};

const PermissionDeniedError = () => {
  const navigate = useNavigate();
  return (
    <>
      <Helmet>
        <title>{config.title + TitleSuffix}</title>
      </Helmet>
      <Result
        status="403"
        title="403"
        subTitle="权限不足，当前用户角色无权访问该页面！"
        extra={
          <Button className="dk-error-btn" type="primary" icon={<ArrowLeftOutlined />} onClick={() => navigate('/')}>
            返回首页
          </Button>
        }
      />
    </>
  );
};

export default PermissionDeniedError;
