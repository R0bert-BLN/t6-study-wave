import { useEffect } from "react";
import { useRouterState } from "@tanstack/react-router";
import nprogress from "nprogress";
import "nprogress/nprogress.css";

nprogress.configure({ showSpinner: false, speed: 400, minimum: 0.2 });

export function NavigationProgress(): null {
  const isLoading = useRouterState({ select: (s) => s.status === "pending" });

  useEffect(() => {
    if (isLoading) {
      nprogress.start();
    } else {
      nprogress.done();
    }
  }, [isLoading]);

  return null;
}
