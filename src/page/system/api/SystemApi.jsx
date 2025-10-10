import { Helmet } from 'react-helmet';
import { TitleSuffix } from '@/components/Text';

// 页面配置
const config = {
  title: '接口配置'
};

const APIIndex = () => {
  return (
    <>
      <Helmet>
        <title>{config.title + TitleSuffix}</title>
      </Helmet>
      <h2>APIIndex</h2>
    </>
  );
};

export default APIIndex;
