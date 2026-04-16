import { useEffect } from "react";
import { Outlet, useLocation } from "react-router";

function scrollToTarget(hash: string) {
  const id = decodeURIComponent(hash.replace(/^#/, ""));
  const target = document.getElementById(id);

  if (target) {
    target.scrollIntoView({ block: "start", behavior: "auto" });
    return;
  }

  window.scrollTo({ top: 0, behavior: "auto" });
}

export function ScrollRoot() {
  const location = useLocation();

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      if (location.hash) {
        scrollToTarget(location.hash);
        return;
      }

      window.scrollTo({ top: 0, behavior: "auto" });
    });

    return () => window.cancelAnimationFrame(frame);
  }, [location.hash, location.pathname]);

  return <Outlet />;
}
