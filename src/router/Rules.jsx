import React from 'react';
import AdminLayout from '@/layout/Admin.jsx';
import ErrorLayout from '@/layout/Error.jsx';
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
        element: RouterLazyLoad(React.lazy(() => import('@/page/dashboard/Index.jsx')))
      },
      {
        path: '/system',
        children: [
          {
            path: '/system/role',
            element: RouterLazyLoad(React.lazy(() => import('@/page/system/role/Index.jsx')))
          },
          {
            path: '/system/menu',
            element: RouterLazyLoad(React.lazy(() => import('@/page/system/menu/Index.jsx')))
          },
          {
            path: '/system/api',
            element: RouterLazyLoad(React.lazy(() => import('@/page/system/api/Index.jsx')))
          },
          {
            path: '/system/setting',
            element: RouterLazyLoad(React.lazy(() => import('@/page/system/setting/Index.jsx')))
          }
        ]
      },
    ]
  },
  {
    path: '/',
    element: <ErrorLayout />,
    children: [
      {
        path: '/403',
        element: RouterLazyLoad(React.lazy(() => import('@/page/error/403/Index.jsx')))
      },
      {
        path: '/404',
        element: RouterLazyLoad(React.lazy(() => import('@/page/error/404/Index.jsx')))
      },
      {
        path: '/500',
        element: RouterLazyLoad(React.lazy(() => import('@/page/error/500/Index.jsx')))
      },
      {
        path: '/502',
        element: RouterLazyLoad(React.lazy(() => import('@/page/error/502/Index.jsx')))
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
