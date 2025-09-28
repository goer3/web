import { createRoot } from 'react-dom/client';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/locale/zh_CN'; // 国际化
import 'misans/lib/Normal/MiSans-Regular.min.css'; // 小米字体
import '@/assets/css/theme-dk.less'; // 样式主题
import AdminRoute from '@/route.jsx';

// 主体变量
const ColorBlack = '#001529'; // 黑色
const ColorWhite = '#ffffff'; // 白色
const ColorLightBlue = '#e3e8f0'; // 浅蓝色
const ColorBlue = '#0052D9'; // 蓝色
const HeaderHeight = '50px'; // 头部高度
const SiderBackgroundColor = '#f7f8fa'; // 侧边栏背景颜色

createRoot(document.getElementById('root')).render(
  <ConfigProvider
    locale={zhCN}
    theme={{
      cssVar: true,
      hashed: false,
      token: {
        fontFamily: 'MiSans, serif', // 文字字体
        fontSize: 14, // 默认字号
        borderRadius: 0, // 圆角
        fontColor: ColorBlack, // 文字颜色
        colorPrimary: ColorBlack, // 主色调
        colorLink: ColorBlue, // 链接颜色
        colorLinkHover: ColorBlue, // 链接颜色悬停
        marginXS: 5,
        margin: 10,
        marginLG: 15,
        controlHeight: 28
      },
      components: {
        Layout: {
          bodyBg: ColorWhite,
          footerBg: ColorWhite,
          footerPadding: '0 15px',
          headerBg: ColorWhite,
          headerColor: ColorBlack,
          headerHeight: HeaderHeight,
          headerPadding: '0 15px',
          lightSiderBg: SiderBackgroundColor,
          lightTriggerBg: ColorWhite,
          lightTriggerColor: ColorBlack,
          siderBg: SiderBackgroundColor,
          triggerBg: ColorWhite,
          triggerColor: ColorBlack,
          triggerHeight: HeaderHeight,
          zeroTriggerHeight: HeaderHeight,
          zeroTriggerWidth: HeaderHeight
        },
        Menu: {
          collapsedIconSize: 17,
          itemBg: SiderBackgroundColor,
          itemActiveBg: ColorBlack,
          itemMarginBlock: 0,
          itemMarginInline: 0,
          itemSelectedBg: ColorBlack,
          itemSelectedColor: ColorWhite,
          itemHoverBg: ColorLightBlue,
          itemHoverColor: ColorBlack,
          subMenuItemSelectedColor: ColorBlack
        },
        Button: {
          colorPrimary: ColorBlack,
          defaultShadow: 'none',
          primaryShadow: 'none',
          dangerShadow: 'none',
          contentFontSize: 12,
          contentLineHeight: '28px',
          controlHeight: '28px',
          defaultHoverColor: ColorBlue,
        },
        Input: {
          activeShadow: 'none',
          errorActiveShadow: 'none',
          warningActiveShadow: 'none',
          inputFontSize: 13,
        },
        Form: {
          labelFontSize: 13,
        }
      }
    }}
  >
    <AdminRoute />
  </ConfigProvider>
);
