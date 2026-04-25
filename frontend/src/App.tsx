import type { JSX } from "react";
import { useAuth } from "@/hooks/auth/use-auth.ts";
import { createRouter, RouterProvider } from "@tanstack/react-router";
import { routeTree } from "@/routeTree.gen.ts";

const router = createRouter({
  routeTree,
  context: {
    auth: undefined!,
  },
});

export default function App(): JSX.Element {
  const auth = useAuth();

  return <RouterProvider router={router} context={{ auth }} />;
}
