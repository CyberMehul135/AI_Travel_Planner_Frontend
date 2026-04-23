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
      title: "Home",
    },
    {
      to: "/trips/create",
      icon: Plane,
      title: "Planning",
    },
    {
      to: "/trips",
      icon: Planner,
      title: "Trips",
    },
    {
      to: "/user/profile",
      icon: CircleUser,
      title: "You",
    },
  ];

  return (
    <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md px-0 z-50 md:hidden">
      <div className="flex justify-around items-center bg-background/80 backdrop-blur-xl border-t py-2 shadow-lg">
        {/* Navigation Icons */}
        {navItems.map((item, index) => {
          const Icon = item.icon;

          return (
            <div className="flex flex-col items-center">
              <NavLink
                key={index}
                to={item.to}
                end={item.to === "/trips"}
                className={({ isActive }) =>
                  cn(
                    "p-2 rounded-xl transition-all duration-200",
                    isActive
                      ? "text-white bg-primary"
                      : "dark:text-white hover:text-primary",
                  )
                }
              >
                <Icon size={22} />
              </NavLink>
              <p className="text-xs mt-0.5">{item.title}</p>
            </div>
          );
        })}

        {/* Sidebar Toggle */}
        <div className="flex flex-col items-center">
          <button
            onClick={toggleSidebar}
            className="p-2 rounded-xl hover:text-primary transition dark:text-white text-black"
          >
            <Menu size={22} />
          </button>
          <p className="text-xs mt-0.5">Menu</p>
        </div>
      </div>
    </div>
  );
};
