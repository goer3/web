import { createRoot } from 'react-dom/client';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/locale/zh_CN'; // 国际化
import 'misans/lib/Normal/MiSans-Regular.min.css'; // 小米字体
import '@/assets/css/theme-dk.less'; // 样式主题
import AdminRoute from '@/route.jsx';

createRoot(document.getElementById('root')).render(
  <ConfigProvider
    locale={zhCN}
    theme={{
      token: {
        fontFamily: 'MiSans, serif', // 文字字体
        fontSize: 14, // 默认字号
        borderRadius: 0 // 圆角
      }
    }}
  >
    <AdminRoute />
  </ConfigProvider>
);
