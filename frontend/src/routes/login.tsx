import { createFileRoute, redirect } from "@tanstack/react-router";
import type { JSX } from "react";
import { LoginForm } from "@/features/auth/login-form.tsx";

export const Route = createFileRoute("/login")({
  beforeLoad: ({ context }) => {
    if (context.auth.isLoading) {
      return;
    }

    if (context.auth.isAuthenticated) {
      throw redirect({
        to: "/courses",
      });
    }
  },
  component: LoginPage,
});

function LoginPage(): JSX.Element {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#FAFAFA] p-4">
      <div className="pointer-events-none absolute top-[-10%] left-[-10%] h-96 w-96 rounded-full bg-blue-600/10 blur-3xl"></div>
      <div className="pointer-events-none absolute right-[-10%] bottom-[-10%] h-96 w-96 rounded-full bg-emerald-600/10 blur-3xl"></div>

      <div className="animate-in slide-in-from-bottom-4 fade-in relative z-10 w-full max-w-md duration-700">
        <LoginForm />
      </div>
    </div>
  );
}
