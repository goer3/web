import { Helmet } from 'react-helmet';
import { TitleSuffix } from '@/components/Text';
import { Button, Checkbox, ConfigProvider, Divider, Flex, Form, Input } from 'antd';
import { LogoImage } from '@/components/Image';
import { DingdingOutlined } from '@ant-design/icons';

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
      <ConfigProvider
        theme={{
          token: {
            controlHeight: 30
          },
          components: {
            Input: {
              inputFontSize: 14,
              lineHeight: '28.7px'
            },
            Button: {
              contentFontSize: 14
            },
            Form: {
              labelFontSize: 14
            }
          }
        }}
      >
        <div
          style={{
            width: '350px',
            border: '1px solid #0000001a',
            padding: '50px 25px 30px 25px',
            boxShadow: '0 0 10px 0 rgba(0, 0, 0, 0.1)',
            backgroundColor: '#ffffff'
          }}
        >
          <div style={{ textAlign: 'center', marginBottom: '20px' }}>
            <img src={LogoImage} alt="logo" style={{ height: '22px', userSelect: 'none' }} />
          </div>
          <Divider plain style={{ color: '#00000050', letterSpacing: '2px' }}>
            欢迎回来，立即登录
          </Divider>
          <div>
            <Form name="login" initialValues={{ remember: true }} onFinish={() => {}} layout="vertical">
              <Form.Item label="账号" name="username" rules={[{ required: true, message: '请输入用户名 / 手机号 / 邮箱' }]}>
                <Input placeholder="支持使用用户名 / 手机号 / 邮箱登录" />
              </Form.Item>
              <Form.Item label="密码" name="password" rules={[{ required: true, message: '请输入密码' }]}>
                <Input.Password placeholder="密码" />
              </Form.Item>
              <Form.Item label="验证码" name="code" rules={[{ required: true, message: '请输入验证码' }]}>
                <Input placeholder="双因子认证验证码（未绑定则随便输入）" />
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
              <Divider plain style={{ color: '#00000050', letterSpacing: '2px' }}>
                切换登录方式
              </Divider>
              <Form.Item>
                <Button block htmlType="submit" type="default">
                  <DingdingOutlined /> 使用钉钉扫码登录
                </Button>
              </Form.Item>
            </Form>
            <div style={{ textAlign: 'right', marginTop: '20px', fontSize: '11px', color: '#00000050' }}>版本号：1.0.0</div>
          </div>
        </div>
      </ConfigProvider>
    </>
  );
};

export default LoginIndex;
