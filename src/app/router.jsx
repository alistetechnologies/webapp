import { useMemo } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { LoginRoute } from './routes/auth/login';
import AppRoot from './routes/app/root';

const createAppRouter = () =>
  createBrowserRouter([
    {
      path: '/',
      element: <LoginRoute />,
    },
    {
      path: '/app',
      element: <AppRoot />,
      children: [
        {
          path: '',
          lazy: async () => {
            const { Dashboard } = await import('./routes/app/dashboard');

            return { Component: Dashboard };
          },
        },
      ],
    },
  ]);

export const AppRouter = () => {
  const router = useMemo(() => createAppRouter(), []);

  return <RouterProvider router={router} />;
};
