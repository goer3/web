import { Helmet } from 'react-helmet';
import { TitleSuffix } from '@/components/Text';
import { PageNotFoundImage } from '@/components/Image';
import { Button } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router';

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
      <div className="dk-error">
        <div className="dk-error-bg" style={{ backgroundImage: `url(${PageNotFoundImage})` }}></div>
        <div className="dk-error-title">{config.title}</div>
        <div className="dk-error-desc">页面不存在，请检查地址是否正确！</div>
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

export default PageNotFoundError;
