import { Helmet } from 'react-helmet';
import { TitleSuffix } from '@/components/Text';

// 页面配置
const config = {
  title: '项目管理'
};

const ProjectIndex = () => {
  return (
    <>
      <Helmet>
        <title>{config.title + TitleSuffix}</title>
      </Helmet>
      <h2>ProjectIndex</h2>
    </>
  );
};

export default ProjectIndex;
