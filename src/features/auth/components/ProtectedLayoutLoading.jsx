import { Outlet } from "react-router-dom";

export const ProtectedLayoutLoading = () => {
  return (
    <>
      <div className="fixed top-16 left-0 w-full h-1 bg-border overflow-hidden z-[9999]">
        <div className="h-full w-1/3 bg-primary animate-[loadingBar_1s_linear_infinite] shadow-[0_0_10px_var(--color-primary)]" />
      </div>

      <Outlet />
    </>
  );
};
