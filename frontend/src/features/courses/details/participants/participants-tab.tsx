import type { JSX } from "react";
import { ParticipantsList } from "@/components/elements/participants-list.tsx";
import type { User } from "@/types/resources/user.ts";
import { useAuth } from "@/providers/auth/use-auth.ts";

interface ParticipantsTabProps {
  participants: User[];
}

export default function ParticipantsTab({ participants }: ParticipantsTabProps): JSX.Element {
  const { isProfessor } = useAuth();

  return (
    <div className="animate-in fade-in flex h-full w-full flex-col items-center justify-center pt-8 text-center text-zinc-500 duration-500">
      <ParticipantsList
        participants={participants}
        canInvite={isProfessor}
        onInvite={() => alert("Invite functionality not implemented yet")}
      />
    </div>
  );
}
