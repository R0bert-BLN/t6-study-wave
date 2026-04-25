import { createRootRouteWithContext, Outlet } from "@tanstack/react-router";
import type { JSX } from "react";
import { Toaster } from "sonner";
import type { AuthContext } from "@/providers/auth/auth-context.ts";
import { NavigationProgress } from "@/components/layouts/navigation-progress.tsx";
import { ErrorPage } from "@/components/elements/error-page.tsx";

export interface RouterContext {
  auth: AuthContext;
}

export const Route = createRootRouteWithContext<RouterContext>()({
  component: RootComponent,
  notFoundComponent: () => <ErrorPage />,
  errorComponent: ({ error }) => (
    <ErrorPage
      code={500}
      title="Something went wrong"
      message={error.message || "An unexpected error occurred while loading this page."}
    />
  ),
});

function RootComponent(): JSX.Element {
  return (
    <>
      <NavigationProgress />
      <Outlet />
      <Toaster position="top-right" richColors closeButton />
    </>
  );
}
