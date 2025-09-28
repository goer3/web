import { Helmet } from 'react-helmet';
import { TitleSuffix } from '@/components/Text';
import { Layout, Space, Form, Input, Checkbox, Button, Flex, Divider } from 'antd';
import { LoginBackgroundImage, LogoImage } from '@/components/Image';
import { GithubOutlined, DingdingOutlined } from '@ant-design/icons';

const { Header, Content, Footer } = Layout;

// 页面配置
const config = {
  title: '用户登录'
};

const LoginIndex = () => {
  return (
    <>
      <Helmet>
        <title>{config.title + TitleSuffix}</title>
      </Helmet>
      <Layout className="dk-login" style={{
        backgroundImage: `url(${LoginBackgroundImage})`,
        height: '100vh',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}>
        <Header style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          backgroundColor: 'transparent',
          padding: '0 50px',
          height: '80px'
        }}>
          <img src={LogoImage} alt="logo" style={{ height: '30px', userSelect: 'none' }} />
          <div>
            <Space size={15}>
              <a href="https://www.baidu.com" target="_blank" style={{ color: '#000000' }} className="dk-login-github"><GithubOutlined /></a>
            </Space>
          </div>
        </Header>
        <Content style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: 'calc(100vh - 180px)'
        }}>
          <div style={{
            width: '350px',
            border: '1px solid #0000001a',
            padding: '50px 25px 30px 25px',
            boxShadow: '0 0 10px 0 rgba(0, 0, 0, 0.1)',
            backgroundColor: '#ffffff'
          }}>
            <div style={{ textAlign: 'center', marginBottom: '20px' }}>
              <img src={LogoImage} alt="logo" style={{ height: '20px', userSelect: 'none' }} />
            </div>
            <Divider plain style={{ color: '#00000050', letterSpacing: '2px' }}>欢迎回来，立即登录</Divider>
            <div>
              <Form
                name="login"
                initialValues={{ remember: true }}
                onFinish={() => { }}
                layout='vertical'
              >
                <Form.Item
                  label="账号"
                  name="username"
                  rules={[{ required: true, message: '请输入用户名 / 手机号 / 邮箱' }]}
                >
                  <Input placeholder="支持使用用户名 / 手机号 / 邮箱登录" />
                </Form.Item>
                <Form.Item
                  label="密码"
                  name="password"
                  rules={[{ required: true, message: '请输入密码' }]}
                >
                  <Input type="password" placeholder="密码" />
                </Form.Item>
                <Form.Item
                  label="验证码"
                  name="code"
                  rules={[{ required: true, message: '请输入验证码' }]}
                >
                  <Input placeholder="请输入双因子认证验证码（未绑定则随便输入）" />
                </Form.Item>
                <Form.Item>
                  <Flex justify="space-between" align="center">
                    <Form.Item name="remember" valuePropName="checked" noStyle>
                      <Checkbox>记住我</Checkbox>
                    </Form.Item>
                    <a href="">忘记密码？</a>
                  </Flex>
                </Form.Item>
                <Form.Item>
                  <Button block type="primary" htmlType="submit">
                    登录
                  </Button>
                </Form.Item>
                <Divider plain style={{ color: '#00000050', letterSpacing: '2px' }}>切换登录方式</Divider>
                <Form.Item>
                  <Button block htmlType="submit" type="default">
                    <DingdingOutlined /> 使用钉钉扫码登录
                  </Button>
                </Form.Item>
              </Form>
              <div style={{ textAlign: 'right', marginTop: '20px', fontSize: '11px', color: '#00000050' }}>版本号：1.0.0</div>
            </div>
          </div>
        </Content>
        <Footer style={{
          textAlign: 'center',
          backgroundColor: 'transparent',
          height: '100px'
        }}>
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

export default LoginIndex;
