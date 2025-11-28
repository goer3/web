import React from 'react';
import AdminLayout from '@/layout/Admin.jsx';
import LoginAndErrorLayout from '@/layout/LoginAndError.jsx';
import RouterLazyLoad from '@/router/LazyLoad.jsx';
import { Navigate, useRoutes } from 'react-router';

// 路由对象
export const Rules = [
  {
    path: '/',
    element: <Navigate to="/dashboard" />
  },
  {
    path: '/',
    element: <AdminLayout />,
    children: [
      {
        path: '/dashboard',
        element: RouterLazyLoad(React.lazy(() => import('@/page/dashboard/Dashboard.jsx')))
      },
      {
        path: '/kubernetes/pod',
        element: RouterLazyLoad(React.lazy(() => import('@/page/dashboard/Dashboard.jsx')))
      },
      {
        path: '/kubernetes/workload/deployment',
        element: RouterLazyLoad(React.lazy(() => import('@/page/dashboard/Dashboard.jsx')))
      },
      {
        path: '/system',
        children: [
          {
            path: '/system/role',
            element: RouterLazyLoad(React.lazy(() => import('@/page/system/role/SystemRole.jsx')))
          },
          {
            path: '/system/menu',
            element: RouterLazyLoad(React.lazy(() => import('@/page/system/menu/SystemMenu.jsx')))
          },
          {
            path: '/system/api',
            element: RouterLazyLoad(React.lazy(() => import('@/page/system/api/SystemApi.jsx')))
          },
          {
            path: '/system/setting',
            element: RouterLazyLoad(React.lazy(() => import('@/page/system/setting/SystemSetting.jsx')))
          }
        ]
      },
      {
        path: '/information',
        element: RouterLazyLoad(React.lazy(() => import('@/page/information/Information.jsx')))
      }
    ]
  },
  {
    path: '/',
    element: <LoginAndErrorLayout />,
    children: [
      {
        path: '/login',
        element: RouterLazyLoad(React.lazy(() => import('@/page/login/Login.jsx')))
      },
      {
        path: '/403',
        element: RouterLazyLoad(React.lazy(() => import('@/page/error/403/403.jsx')))
      },
      {
        path: '/404',
        element: RouterLazyLoad(React.lazy(() => import('@/page/error/404/404.jsx')))
      },
      {
        path: '/500',
        element: RouterLazyLoad(React.lazy(() => import('@/page/error/500/500.jsx')))
      }
    ]
  },
  {
    path: '*',
    element: <Navigate to="/404" />
  }
];

// 生成路由
export const GenerateRoutes = () => {
  return useRoutes(Rules);
};
