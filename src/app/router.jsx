import { useMemo } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { LoginRoute } from "./routes/auth/login";
import AppRoot from "./routes/app/root";

const createAppRouter = () =>
  createBrowserRouter([
    {
      path: "/",
      element: <LoginRoute />,
    },
    {
      path: "/app",
      element: <AppRoot />,
      children: [
        {
          path: "",
          lazy: async () => {
            const { Dashboard } = await import("./routes/app/dashboard");

            return { Component: Dashboard };
          },
        },
      ],
    },
    {
      path: "/autoTimers",
      element: <AppRoot />,
      children: [
        {
          path: "",
          lazy: async () => {
            const { Timers } = await import("./routes/timers/Timers");

            return { Component: Timers };
          },
        },
      ],
    },
    {
      path: "/schedules",
      element: <AppRoot />,
      children: [
        {
          path: "",
          lazy: async () => {
            const { Schedules } = await import("./routes/schedules/Schedules");

            return { Component: Schedules };
          },
        },
      ],
    },
    {
      path: "/autocut",
      element: <AppRoot />,
      children: [
        {
          path: "",
          lazy: async () => {
            const { AutoCut } = await import("./routes/autocut/AutoCut");

            return { Component: AutoCut };
          },
        },
      ],
    },
    {
      path: '/lock',
      element: <AppRoot />,
      children: [
        {
          path: '',
          lazy: async () => {
            const {Lock} = await import('./routes/lock/Lock');

            return { Component: Lock };
          },
        },
      ],
    },
    {
      path: '/lock/house',
      element: <AppRoot />,
      children: [
        {
          path: '',
          lazy: async () => {
            const {LockDetails} = await import('../features/lock/LockDetails');

            return { Component: LockDetails };
          },
        },
      ],
    },
  
  ]);

export const AppRouter = () => {
  const router = useMemo(() => createAppRouter(), []);

  return <RouterProvider router={router} />;
};
