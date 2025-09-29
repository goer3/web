import { Helmet } from 'react-helmet';
import { TitleSuffix } from '@/components/Text';
import { PageHeaderBackgroundImage, TagLeftBlackIconImage } from '@/components/Image';

// 页面配置
const config = {
  title: '角色配置',
  enTitle: 'SYSTEM ROLE CONFIGURATION'
};

const RoleIndex = () => {
  return (
    <>
      <Helmet>
        <title>{config.title + TitleSuffix}</title>
      </Helmet>
      <div>
        <div className="dk-page-header" style={{ backgroundImage: `url(${PageHeaderBackgroundImage})` }}>
          <div className="dk-page-header-title">
            <img src={TagLeftBlackIconImage} alt="tag-left-black" />
            <span>{config.title + ' | ' + config.enTitle}</span>
          </div>
          <div className="dk-page-header-body">
            <p>系统权限基于 <span style={{ color: '#eb255d' }}>RBAC</span> 基于角色权限控制模型设计，管理员可以精确的对每个角色的每个接口进行权限控制。</p>
            <p>超级管理员是系统的最高权限角色，无需单独设置，该角色默认会绕过所有权限控制，所以对于超级管理员的用户管理一定需要谨慎。</p>
          </div>
        </div>
        <div className="dk-page-content">
          角色列表
        </div>
      </div>
    </>
  );
};

export default RoleIndex;
