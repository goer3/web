import { Helmet } from 'react-helmet';
import { TitleSuffix } from '@/components/Text';

// 页面配置
const config = {
  title: '用户分组'
};

const UserGroupIndex = () => {
  return (
    <>
      <Helmet>
        <title>{config.title + TitleSuffix}</title>
      </Helmet>
      <h2>UserGroupIndex</h2>
    </>
  );
};

export default UserGroupIndex;
