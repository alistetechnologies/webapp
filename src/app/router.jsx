import { useMemo } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { LoginRoute } from './routes/auth/login';

const createAppRouter = () =>
  createBrowserRouter([
    {
      path: '/',
      element: <LoginRoute />,
    },
  ]);

export const AppRouter = () => {
  const router = useMemo(() => createAppRouter(), []);

  return <RouterProvider router={router} />;
};
