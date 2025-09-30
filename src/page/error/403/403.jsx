import { Helmet } from 'react-helmet';
import { TitleSuffix } from '@/components/Text';
import { PermissionDeniedImage } from '@/components/Image';
import { Button } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router';

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
      <div className="dk-error">
        <div className="dk-error-bg" style={{ backgroundImage: `url(${PermissionDeniedImage})` }}></div>
        <div className="dk-error-title">{config.title}</div>
        <div className="dk-error-desc">权限不足，请联系管理员！</div>
        <div style={{ marginTop: '20px' }}>
          <Button className="dk-error-btn"
            type="primary"
            icon={<ArrowLeftOutlined />}
            onClick={() => navigate('/')}>返回首页</Button>
        </div>
      </div>
    </>
  );
};

export default PermissionDeniedError;
