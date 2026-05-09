import type { JSX } from "react";
import { Link } from "@tanstack/react-router";
import { BookMarked, ClipboardList, Folder } from "lucide-react";
import { cva, type VariantProps } from "class-variance-authority";
import ActionMenu from "@/components/elements/action-menu.tsx";
import { type ClassworkItem, ClassworkType } from "@/types/resources/classwork.ts";
import { useAuth } from "@/providers/auth/use-auth.ts";
import { useModal } from "@/providers/modal/use-modal.ts";
import { ClassworkForm } from "@/features/courses/details/classwork/create/form.tsx";
import { useDeleteAssignment } from "@/hooks/resources/assignment/use-assignment-mutation.ts";
import { useDeleteMaterial } from "@/hooks/resources/material/use-material-mutation.ts";
import { toast } from "sonner";
import { cn } from "@/lib/utils.ts";

const iconVariants = cva(
  "w-10 h-10 rounded-full flex items-center justify-center shrink-0 shadow-inner",
  {
    variants: {
      variant: {
        assignment: "bg-blue-50 text-blue-600",
        material: "bg-zinc-100 text-zinc-600",
        file: "bg-zinc-100 text-zinc-600",
      },
    },
    defaultVariants: {
      variant: "material",
    },
  },
);

interface ResourceItemProps extends VariantProps<typeof iconVariants> {
  courseId: string;
  classwork: ClassworkItem;
  showDate?: boolean;
  className?: string;
  showActionMenu?: boolean;
  href?: string;
}

export function ClassworkItem({
  variant = "material",
  classwork,
  courseId,
  className,
  href = "#",
  showDate = false,
  showActionMenu = true,
}: ResourceItemProps): JSX.Element {
  const { user, isProfessor } = useAuth();
  const { openModal } = useModal();
  const { mutate: deleteAssignment } = useDeleteAssignment(classwork.id, courseId);
  const { mutate: deleteMaterial } = useDeleteMaterial(classwork.id, courseId);

  const Icon = variant === "assignment" ? ClipboardList : variant === "file" ? BookMarked : Folder;

  return (
    <Link
      to={href}
      className={cn(
        "group/item flex cursor-pointer items-center gap-4 rounded-xl !no-underline transition-all duration-200 outline-none hover:opacity-70 focus-visible:ring-2 focus-visible:ring-blue-600",
        className,
      )}
    >
      <div className={iconVariants({ variant })}>
        <Icon size={20} />
      </div>

      <div className="min-w-0 flex-1">
        <p className="flex items-baseline gap-2 text-[14px] font-bold text-zinc-900 transition-colors">
          {classwork.title}
          {showDate && (
            <span className="text-[11px] font-medium text-zinc-400">
              {new Date(classwork.createdAt).toLocaleDateString()}
            </span>
          )}
        </p>

        <p className="mt-0.5 max-w-[500px] truncate text-[13px] font-medium text-zinc-500">
          {classwork?.description}
        </p>
      </div>

      {isProfessor && showActionMenu && (
        <ActionMenu
          align="center"
          triggerClassName="text-zinc-400 hover:text-zinc-800 hover:bg-zinc-100"
          items={[
            {
              label: "Edit",
              onClick: () =>
                openModal(
                  <ClassworkForm courseId={courseId} classwork={classwork} />,
                  "!max-w-2xl",
                ),
              disabled: classwork.createdBy?.id !== user?.id,
            },
            {
              label: "Delete",
              disabled: classwork.createdBy?.id !== user?.id,
              destructive: true,
              onClick: () => {
                if (classwork.type === ClassworkType.Material) {
                  deleteMaterial(undefined, {
                    onSuccess: () => {
                      toast.success("Material deleted successfully");
                    },
                    onError: () => {
                      toast.error("Failed to delete material");
                    },
                  });
                } else if (classwork.type === ClassworkType.Assignment) {
                  deleteAssignment(undefined, {
                    onSuccess: () => {
                      toast.success("Assignment deleted successfully");
                    },
                    onError: () => {
                      toast.error("Failed to delete assignment");
                    },
                  });
                }
              },
            },
          ]}
        />
      )}
    </Link>
  );
}
