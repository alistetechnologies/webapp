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
      path: "/app/house",
      element: <AppRoot />,
      children: [
        {
          path: "",
          lazy: async () => {
            const { HouseDetails } = await import(
              "../features/dashboard/house-details"
            );

            return { Component: HouseDetails };
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
      path: "/lock",
      element: <AppRoot />,
      children: [
        {
          path: "",
          lazy: async () => {
            const { Lock } = await import("./routes/lock/Lock");
            return { Component: Lock };
          },
        },
      ],
    },
    {
      path: "/lock/house",
      element: <AppRoot />,
      children: [
        {
          path: "",
          lazy: async () => {
            const { LockDetails } = await import(
              "../features/lock/LockDetails"
            );

            return { Component: LockDetails };
            try {
              const { LockDetails } = await import(
                "../features/lock/LockDetails"
              );
              return { Component: LockDetails };
            } catch (error) {
              console.error("Error loading LockDetails:", error);
              throw error;
            }
          },
        },
      ],
    },
    {
      path: "/shareAccess",
      element: <AppRoot />,
      children: [
        {
          path: "",
          lazy: async () => {
            const { ShareAccess } = await import(
              "./routes/shareAccess/ShareAccess"
            );

            return { Component: ShareAccess };
          },
        },
      ],
    },
    {
      path: "/keyGenerate",
      element: <AppRoot />,
      children: [
        {
          path: "",
          lazy: async () => {
            const { KeyGenerate } = await import(
              "./routes/KeyGenerate/KeyGenerate"
            );
            return { Component: KeyGenerate };
          },
        },
      ],
    },
    {
      path: "/reports",
      element: <AppRoot />,
      children: [
        {
          path: "",
          lazy: async () => {
            const { Reports } = await import("./routes/reports/Reports");
            return { Component: Reports };
          },
        },
      ],
    },
  ]);

export const AppRouter = () => {
  const router = useMemo(() => createAppRouter(), []);

  return <RouterProvider router={router} />;
};
