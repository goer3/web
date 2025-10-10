import { Layout, Space } from 'antd';
import { LoginBackgroundImage, LogoImage } from '@/components/Image';
import { GithubOutlined } from '@ant-design/icons';
import { Outlet } from 'react-router';

const { Header, Content, Footer } = Layout;

const LoginAndErrorLayout = () => {
  return (
    <>
      <Layout
        className="dk-login"
        style={{
          backgroundImage: `url(${LoginBackgroundImage})`,
          height: '100vh',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        <Header
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            backgroundColor: 'transparent',
            padding: '0 50px',
            height: '80px'
          }}
        >
          <img src={LogoImage} alt="logo" style={{ height: '30px', userSelect: 'none' }} />
          <div>
            <Space size={15}>
              <a href="https://www.baidu.com" target="_blank" style={{ color: '#000000' }} className="dk-login-github">
                <GithubOutlined />
              </a>
            </Space>
          </div>
        </Header>
        <Content
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: 'calc(100vh - 180px)'
          }}
        >
          <Outlet />
        </Content>
        <Footer
          style={{
            textAlign: 'center',
            backgroundColor: 'transparent',
            height: '100px'
          }}
        >
          <Space style={{ marginBottom: '15px' }}>
            <a href="">关于我们</a>
            <a href="">联系我们</a>
            <a href="">隐私政策</a>
            <a href="">服务条款</a>
            <a href="">版权声明</a>
          </Space>
          <div>© 2025 版权所有，备案号：粤ICP备2025000000号</div>
        </Footer>
      </Layout>
    </>
  );
};

export default LoginAndErrorLayout;
