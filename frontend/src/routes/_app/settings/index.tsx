import { createFileRoute } from "@tanstack/react-router";
import type { JSX } from "react";
import Header from "@/components/elements/header.tsx";
import ProfileForm from "@/features/settings/form.tsx";
import { useAuth } from "@/providers/auth/use-auth.ts";

export const Route = createFileRoute("/_app/settings/")({
  component: SettingsPage,
});

function SettingsPage(): JSX.Element | null {
  const { user } = useAuth();

  if (!user) {
    return null;
  }

  return (
    <div className="main-container flex h-screen flex-col">
      <Header className="pb-10" title="Settings" subtitle="Manage your account settings" />

      <div className="no-scrollbar flex-1 overflow-y-auto">
        <ProfileForm user={user} />
      </div>
    </div>
  );
}
