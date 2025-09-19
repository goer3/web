import { Navigate, useRoutes } from 'react-router';
import React from 'react';
import AdminLayout from '@/layout/Admin.jsx';
import ErrorLayout from '@/layout/Error.jsx';
import RouterLazyLoad from '@/router/LazyLoad.jsx';

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
        path: '/information',
        element: RouterLazyLoad(React.lazy(() => import('@/page/information/Index.jsx')))
      }
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
