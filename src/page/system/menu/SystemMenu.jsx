import { Helmet } from 'react-helmet';
import { TitleSuffix } from '@/components/Text';

// 页面配置
const config = {
  title: '菜单配置'
};

const SystemMenu = () => {
  return (
    <>
      <Helmet>
        <title>{config.title + TitleSuffix}</title>
      </Helmet>
      <h2>SystemMenu</h2>
    </>
  );
};

export default SystemMenu;
