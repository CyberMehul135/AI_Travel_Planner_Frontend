import { NavLink } from "react-router-dom";
import {
  ChartColumnIncreasing,
  Plane,
  Route as Planner,
  CircleUser,
  Menu,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useSidebar } from "@/components/ui/sidebar";

export const MobileBottomNav = () => {
  const { toggleSidebar } = useSidebar();

  const navItems = [
    {
      to: "/",
      icon: ChartColumnIncreasing,
    },
    {
      to: "/trips/create",
      icon: Plane,
    },
    {
      to: "/trips",
      icon: Planner,
    },
    {
      to: "/user/profile",
      icon: CircleUser,
    },
  ];

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 w-full max-w-md px-2 z-50 md:hidden">
      <div className="flex justify-between items-center bg-background/80 backdrop-blur-xl border rounded-2xl px-4 py-2 shadow-lg">
        {/* Navigation Icons */}
        {navItems.map((item, index) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={index}
              to={item.to}
              end={item.to === "/trips"}
              className={({ isActive }) =>
                cn(
                  "p-2 rounded-xl transition-all duration-200",
                  isActive
                    ? " text-white bg-primary"
                    : "dark:text-white hover:text-primary",
                )
              }
            >
              <Icon size={22} />
            </NavLink>
          );
        })}

        {/* Sidebar Toggle */}
        <button
          onClick={toggleSidebar}
          className="p-2 rounded-xl hover:text-primary transition dark:text-white text-black"
        >
          <Menu size={22} />
        </button>
      </div>
    </div>
  );
};
