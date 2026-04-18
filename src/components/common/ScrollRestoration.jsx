import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const scrollPositions = {};

export const ScrollRestoration = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // When route change, than save current scroll
    return () => {
      scrollPositions[pathname] = window.scrollY;
    };
  }, [pathname]);

  useEffect(() => {
    // When NewPage Open
    if (scrollPositions[pathname] !== undefined) {
      // back/forward case
      window.scrollTo({
        top: scrollPositions[pathname],
      });
    } else {
      // fresh navigation case
      window.scrollTo({
        top: 0,
      });
    }
  }, [pathname]);

  return null;
};
