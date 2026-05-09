import type { JSX, ReactNode } from "react";
import { UserPlus } from "lucide-react"; // Iconița din Lucide
import { UserAvatar } from "@/components/elements/user-avatar";
import { getUserInitials } from "@/utils/user";
import { type User, UserRole } from "@/types/resources/user";
import { cn } from "@/lib/utils";

interface ParticipantsListProps {
  participants: User[];
  onInvite?: () => void;
  canInvite?: boolean;
  className?: string;
}

export function ParticipantsList({
  participants,
  onInvite,
  canInvite = true,
  className,
}: ParticipantsListProps): JSX.Element {
  const professors = participants.filter((u) => u.role === UserRole.PROFESSOR);
  const students = participants.filter((u) => u.role === UserRole.STUDENT);

  return (
    <div
      className={cn(
        "animate-in fade-in mx-auto flex h-full w-full max-w-3xl flex-col duration-500",
        className,
      )}
    >
      <div className="no-scrollbar flex-1 space-y-6 overflow-y-auto pr-2 pb-6">
        <ParticipantSection
          title="Professors"
          count={professors.length}
          onInvite={onInvite}
          showInvite={canInvite}
          underlineClass="border-zinc-200"
        >
          {professors.map((professor) => (
            <ParticipantItem key={professor.id} user={professor} />
          ))}
        </ParticipantSection>

        <ParticipantSection
          title="Students"
          count={students.length}
          onInvite={onInvite}
          showInvite={canInvite}
          underlineClass="border-zinc-200"
        >
          {students.map((student) => (
            <ParticipantItem key={student.id} user={student} />
          ))}
        </ParticipantSection>
      </div>
    </div>
  );
}

interface ParticipantSectionProps {
  title: string;
  count: number;
  onInvite?: () => void;
  showInvite: boolean;
  underlineClass: string;
  children: ReactNode;
}

function ParticipantSection({
  title,
  count,
  onInvite,
  showInvite,
  underlineClass,
  children,
}: ParticipantSectionProps) {
  return (
    <section>
      <div className={cn("mb-2 flex items-center justify-between border-b pb-3", underlineClass)}>
        <p className="text-[13px] font-bold text-blue-400 uppercase">
          {title} ({count})
        </p>

        {showInvite && (
          <button
            onClick={onInvite}
            className="group flex cursor-pointer items-center gap-2 px-3 py-1.5 text-blue-400 transition-all hover:opacity-70"
          >
            <UserPlus size={18} strokeWidth={2.5} />
            <span className="text-[13px] font-bold">Invite</span>
          </button>
        )}
      </div>

      <div className="flex flex-col gap-1">{children}</div>
    </section>
  );
}

function ParticipantItem({ user }: { user: User }) {
  return (
    <div className="group flex items-center gap-4 rounded-2xl px-2 py-3 transition-all duration-200 hover:bg-zinc-50/80">
      <UserAvatar
        label={getUserInitials(user)}
        src={user.avatarUrl}
        className="h-10 w-10 border-none shadow-none"
      />

      <div className="flex min-w-0 flex-col items-start gap-1">
        <span className="truncate text-[15px] font-bold text-zinc-900 transition-colors group-hover:text-black">
          {user.firstName} {user.lastName}
        </span>

        <span className="truncate text-[12px] font-medium text-zinc-500">{user.email}</span>
      </div>
    </div>
  );
}
