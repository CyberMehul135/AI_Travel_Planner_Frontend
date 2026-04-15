import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { logoutUser } from "@/features/auth/auth.service";
import { useAuthContext } from "@/features/auth/context/AuthContext";
import { useTheme } from "@/theme/ThemeProvider";
import { useMutation } from "@tanstack/react-query";
import { Laptop, Moon, Sun } from "lucide-react";
import { useNavigate } from "react-router-dom";

export function AccountOptions({ children }) {
  const { theme, setTheme } = useTheme();
  const { logout } = useAuthContext();
  const navigate = useNavigate();

  const logoutMutation = useMutation({
    mutationFn: () => logoutUser(),
    onSuccess: () => {
      logout();
      navigate("/login", { replace: true });
    },
  });

  const handleLogout = () => {
    logoutMutation.mutate();
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
      <DropdownMenuContent className="max-md:w-52 max-md:p-2">
        <DropdownMenuGroup>
          <DropdownMenuItem onClick={() => navigate("/user/profile")}>
            Profile
          </DropdownMenuItem>

          <DropdownMenuSub>
            <DropdownMenuSubTrigger>Themes</DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent>
                <DropdownMenuItem onClick={() => setTheme("light")}>
                  <Sun className="mr-2 size-4" />
                  Light
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("dark")}>
                  <Moon className="mr-2 size-4" />
                  Dark
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("system")}>
                  <Laptop className="mr-2 size-4" />
                  System
                </DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>

          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleLogout}>
            Logout
            <DropdownMenuShortcut>⌘+T</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
