import type { JSX } from "react";
import { useAuth } from "@/providers/auth/use-auth.ts";
import { CommentInput } from "@/components/elements/comment-input.tsx";
import { getUserInitials } from "@/utils/user.ts";

export default function FluxTab(): JSX.Element {
  const { user } = useAuth();

  return (
    <div className="animate-in fade-in flex w-full flex-col items-center justify-center pt-8 duration-500">
      <CommentInput
        variant="default"
        onSubmit={(value) => alert(`Announcement posted: ${value}`)}
        placeholder="Post an announcement..."
        userLabel={getUserInitials(user)}
        userSrc={user?.avatarUrl}
        className="max-w-190"
      />
    </div>
  );
}
