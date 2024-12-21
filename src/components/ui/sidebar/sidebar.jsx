import { cn } from "@/lib/utils";
import { CalendarCheck, ClockAlert, Home, Timer } from "lucide-react";

import { Link, useLocation } from "react-router-dom";
import { Separator } from "@/components/ui/separator";

export default function Sidebar() {
  const location = useLocation();

  const routes = [
    {
      label: "Home",
      icon: Home,
      href: "/app",
      color: "#292929",
    },
    {
      label: "Auto Timers",
      icon: Timer,
      href: "/autoTimers",
      color: "#292929",
    },
    {
      label: "Schedules",
      icon: CalendarCheck,
      href: "/schedules",
      color: "#292929",
    },
    {
      label: "AutoCut",
      icon: ClockAlert,
      href: "/autocut",
      color: "#292929",
    },

    // {
    //   label: 'Share Access',
    //   icon: Users,
    //   href: '/app/share',
    //   color: '#292929',
    // },
    // {
    //   label: 'Share Access',
    //   icon: Users,
    //   href: '/app/share',
    //   color: '#292929',
    // },
  ];

  return (
    <div className="h-full">
      <div className="space-y-4 h-full flex flex-col py-2">
        <div className="px-3 py-2 flex-1">
          <Link to="/app" className="cursor-pointer">
            <div className="w-32 h-auto mb-6">
              <img
                src="/aliste-logo.png"
                style={{ width: "100%", height: "auto" }}
              />
            </div>
          </Link>

          <Separator />
          {/* Routes */}
          <div className="space-y-3 mt-8">
            {routes.map((route) => (
              <Link
                to={route.href}
                key={route.href}
                className={cn(
                  "text-sm p-3 w-full flex font-medium cursor-pointer hover:bg-slate-500/10 hover:text-[#366BE0] rounded-lg",
                  location.pathname === route.href
                    ? "text-[#366BE0] bg-slate-500/10"
                    : "text-[#292929]"
                )}
              >
                <div className="flex items-center flex-1">
                  <route.icon className={cn("h-6 w-6 mr-3", route.color)} />
                  {route.label}
                </div>
              </Link>
            ))}
          </div>
        </div>
        <div className="text-center flex flex-col items-center space-y-1">
          <Link to="https://alistetechnologies.com" className="">
            <div className="w-32 h-auto">
              <img
                src="/aliste-logo.png"
                alt="Aliste Technologies"
                style={{ width: "100%", height: "auto" }}
              />
            </div>
          </Link>
          <p className="text-muted-foreground text-sm">
            Designed and developed by Aliste
          </p>
        </div>
      </div>
    </div>
  );
  return (
    <div className="py-6 px-6 h-full">
      <div className="h-full flex flex-col justify-between">
        <div className="h-full">
          <div className="h-full flex flex-col space-y-6">
            <div
              className="w-full px-3
             py-2 mb-10"
            >
              <Link to="/app" className="flex items-center cursor-pointer">
                <img
                  src="/aliste-logo.png"
                  style={{ width: "100%", height: "auto" }}
                />
              </Link>
            </div>

            {/* Separator */}
            <Separator />
            <div className="space-y-2">
              {routes.map((route) => (
                <Link
                  to={route.href}
                  key={route.href}
                  className="text-sm font-medium flex p-3 w-full justify-start cursor-pointer hover:bg-slate-200 rounded-lg transition"
                >
                  <div className="flex items-center flex-1">
                    <route.icon className={cn("h-5 w-5 mr-5", route.color)} />
                    {route.label}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
        <div className="bg-red-400 h-16">B</div>
      </div>
    </div>
  );
}
