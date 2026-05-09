import type { JSX } from "react";
import { useEffect } from "react";
import { useAuth } from "@/providers/auth/use-auth.ts";
import { CommentInput } from "@/components/elements/comment-input.tsx";
import { getUserFullName, getUserInitials } from "@/utils/user.ts";
import { useQueryClient } from "@tanstack/react-query";
import { echo } from "@/lib/echo.ts";
import { Route } from "@/routes/_app/courses/$courseId.tsx";
import { ResourceType } from "@/types/resources/resource-type.ts";
import type { FluxItem } from "@/types/resources/flux.ts";
import { FluxType } from "@/types/resources/flux.ts";
import { useGetFlux } from "@/hooks/resources/flux/use-flux-query.ts";
import CommentItem from "@/components/elements/comment-item.tsx";
import { ClassworkItem } from "@/components/elements/classwork-item.tsx";
import { useCreateAnnouncement } from "@/hooks/resources/announcement/use-announcement-mutation.ts";
import { toast } from "sonner";

export default function FluxTab(): JSX.Element {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const { courseId } = Route.useParams();

  const { mutate: createAnnouncement } = useCreateAnnouncement(courseId);
  const { data: flux } = useGetFlux(courseId);

  const renderItem = (item: FluxItem) => {
    switch (item.type) {
      case FluxType.Announcement:
        return (
          <CommentItem
            variant="announcement"
            key={item.id}
            id={item.id}
            authorName={getUserFullName(item.createdBy)}
            authorInitials={getUserInitials(item.createdBy)}
            content={item.body}
            createdAt={item.createdAt}
            href={`/${ResourceType.Course}/${courseId}/${ResourceType.Announcement}/${item.id}`}
          />
        );

      case FluxType.Assignment:
        return (
          <ClassworkItem
            key={item.id}
            variant="assignment"
            classwork={item}
            courseId={courseId}
            href={`/${ResourceType.Course}/${courseId}/${ResourceType.Assignment}/${item.id}`}
            showActionMenu={false}
            showDate={true}
          />
        );

      case FluxType.Material:
        return (
          <ClassworkItem
            key={item.id}
            variant="material"
            classwork={item}
            courseId={courseId}
            href={`/${ResourceType.Course}/${courseId}/${ResourceType.Material}/${item.id}`}
            showActionMenu={false}
            showDate={true}
          />
        );
    }
  };

  const onSubmitAnnouncement = (value: string) => {
    const payload = {
      body: value,
      courseId: courseId as string,
      createdBy: user?.id as string,
    };

    createAnnouncement(payload, {
      onSuccess: () => {
        toast.success("Announcement posted successfully");
      },
      onError: () => {
        toast.error("Failed to post announcement");
      },
    });
  };

  useEffect(() => {
    const channel = echo.private(`course.${courseId}`);

    channel.listen(".classwork.created", () => {
      queryClient.invalidateQueries({ queryKey: [ResourceType.Flux, courseId] });
    });

    return () => {
      channel.stopListening(".classwork.created");
      echo.leave(`course.${courseId}`);
    };
  }, [courseId, queryClient]);

  return (
    <div className="animate-in fade-in flex h-full min-h-0 w-full flex-col pt-8 duration-500">
      <CommentInput
        variant="default"
        onSubmit={(value) => onSubmitAnnouncement(value)}
        placeholder="Post an announcement..."
        userLabel={getUserInitials(user)}
        userSrc={user?.avatarUrl}
        className="mx-auto max-w-190"
      />

      <div className="no-scrollbar mx-auto mt-10 w-full max-w-160 flex-1 space-y-8 overflow-y-auto">
        {flux?.map((item) => renderItem(item))}
      </div>
    </div>
  );
}
