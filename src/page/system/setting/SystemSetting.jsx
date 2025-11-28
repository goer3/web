import { Helmet } from 'react-helmet';
import { TitleSuffix } from '@/components/Text';

// 页面配置
const config = {
  title: '系统设置'
};

const SystemSetting = () => {
  return (
    <>
      <Helmet>
        <title>{config.title + TitleSuffix}</title>
      </Helmet>
      <h2>SystemSetting</h2>
    </>
  );
};

export default SystemSetting;
