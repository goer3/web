import { createRoot } from 'react-dom/client';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/locale/zh_CN'; // 国际化
import 'misans/lib/Normal/MiSans-Regular.min.css'; // 小米字体
import '@/assets/css/theme-dk.less'; // 样式主题
import AdminRoute from '@/route.jsx';

// 主体变量
const ColorBlack = '#000000'; // 黑色
const ColorWhite = '#ffffff'; // 白色
const ColorLightBlue = '#e3e8f0'; // 浅蓝色
const ColorLightGray = '#f0f0f0'; // 浅灰色
const ColorLightGray2 = '#fafafa'; // 浅灰色2
const ColorBlue = '#0052D9'; // 蓝色
const ColorGray = '#0000001a'; // 灰色
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
        fontSize: 13, // 默认字号
        borderRadius: 0, // 圆角
        fontColor: ColorBlack, // 文字颜色
        colorPrimary: ColorBlack, // 主色调
        colorLink: ColorBlue, // 链接颜色
        colorLinkHover: ColorBlue, // 链接颜色悬停
        marginXS: 5,
        margin: 10,
        marginLG: 15,
        controlHeight: 26,
        controlItemBgActive: ColorLightBlue
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
          lightSiderBg: ColorWhite,
          lightTriggerBg: ColorWhite,
          lightTriggerColor: ColorBlack,
          siderBg: ColorWhite,
          triggerBg: ColorWhite,
          triggerColor: ColorBlack,
          triggerHeight: HeaderHeight,
          zeroTriggerHeight: HeaderHeight,
          zeroTriggerWidth: HeaderHeight
        },
        Menu: {
          collapsedIconSize: 17,
          fontSize: 13,
          itemHeight: 40,
          itemMarginBlock: 0,
          itemMarginInline: 0,
          itemBg: ColorWhite,
          itemActiveBg: ColorBlack,
          itemHoverBg: ColorBlack,
          itemHoverColor: ColorWhite,
          itemSelectedBg: ColorBlack,
          itemSelectedColor: ColorWhite,
          // subMenuItemSelectedColor: ColorWhite,
          dropdownWidth: 80
        },
        Button: {
          colorPrimary: ColorBlack,
          defaultShadow: 'none',
          primaryShadow: 'none',
          dangerShadow: 'none',
          contentFontSizeSM: 12,
          defaultHoverColor: ColorBlack,
          defaultHoverBorderColor: ColorBlack
        },
        Input: {
          activeShadow: 'none',
          errorActiveShadow: 'none',
          warningActiveShadow: 'none',
          paddingBlock: 0,
          paddingInline: '10px',
          lineHeight: '25px'
        },
        Select: {
          activeOutlineColor: 'none',
          optionSelectedFontWeight: 'normal'
        },
        InputNumber: {
          activeShadow: 'none'
        },
        DatePicker: {
          activeShadow: 'none'
        },
        Dropdown: {
          controlHeight: 26
        },
        Table: {
          cellFontSizeSM: 13,
          lineHeight: '32px',
          cellPaddingBlockSM: 0,
          cellPaddingInlineSM: '10px',
          rowSelectedBg: ColorLightBlue,
          rowSelectedHoverBg: ColorLightBlue
        },
        Pagination: {
          itemActiveBg: ColorLightGray
        },
        Drawer: {},
        Card: {
          headerHeight: 34,
          headerBg: ColorLightGray2,
          headerPadding: 15,
          bodyPadding: 10
        }
      }
    }}
  >
    <AdminRoute />
  </ConfigProvider>
);
