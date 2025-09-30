import { Helmet } from 'react-helmet';
import { TitleSuffix } from '@/components/Text';
import { InternalServerErrorImage } from '@/components/Image';
import { Button } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router';

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
      <div className="dk-error">
        <div className="dk-error-bg" style={{ backgroundImage: `url(${InternalServerErrorImage})` }}>{config.title}</div>
        <div style={{ marginTop: '50px' }}>
          <Button className="dk-error-btn"
            type="primary"
            icon={<ArrowLeftOutlined />}
            onClick={() => navigate('/')}>返回首页</Button>
        </div>
      </div>
    </>
  );
};

export default InternalServerError;
