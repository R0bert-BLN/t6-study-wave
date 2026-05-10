import type { Material } from "@/types/resources/material.ts";
import { JSX } from "react";
import { MessageSquareText } from "lucide-react";
import { getUserFullName, getUserInitials } from "@/utils/user.ts";
import { CommentInput } from "@/components/elements/comment-input.tsx";
import CommentItem from "@/components/elements/comment-item.tsx";
import type { Comment, CommentPayload } from "@/types/resources/comment.ts";
import AttachmentCard from "@/components/elements/attachment-card.tsx";
import { formatReadableDate } from "@/utils/date.ts";
import { useFileHandler } from "@/hooks/general/use-file-handler.ts";
import { useCreateComment } from "@/hooks/resources/comment/use-comment-mutation.ts";
import { useAuth } from "@/providers/auth/use-auth.ts";
import { ResourceType } from "@/types/resources/resource-type.ts";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { UserAvatar } from "@/components/elements/user-avatar.tsx";

interface MaterialDetailsProps {
  material: Material;
}

export default function MaterialDetails({ material }: MaterialDetailsProps): JSX.Element {
  const { user } = useAuth();
  const { getInlineFileUrl } = useFileHandler();
  const { mutate: createComment } = useCreateComment();
  const queryClient = useQueryClient();

  const handleCommentSubmit = (body: string): void => {
    const payload: CommentPayload = {
      commentableId: material.id,
      commentableType: ResourceType.Material,
      createdBy: user?.id ?? "",
      body: body,
      isPrivate: false,
    };

    createComment(payload, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: [ResourceType.Material, material.id] });
      },
      onError: () => {
        toast.error("Failed to post comment");
      },
    });
  };

  return (
    <div className="no-scrollbar flex flex-1 flex-col overflow-y-auto pt-6">
      <div className="mb-8 flex items-center gap-4">
        <UserAvatar
          label={getUserInitials(material.createdBy)}
          src={getInlineFileUrl(material.createdBy?.avatarUrl)}
          className="h-13 w-13"
          fallbackClassName="text-lg"
        />

        <div className="flex flex-col">
          <span className="text-[16px] font-bold text-zinc-900">
            {getUserFullName(material.createdBy)}
          </span>

          <span className="text-[13px] text-zinc-500">
            Posted on {formatReadableDate(material.createdAt)}
          </span>
        </div>
      </div>

      <div className="mb-12 space-y-6">
        <p className="text-[15px] leading-relaxed whitespace-pre-wrap text-zinc-800">
          {material.description}
        </p>
      </div>

      {material.attachments && material.attachments.length > 0 && (
        <div className="mb-12">
          <span className="mb-4 text-[11px] font-bold tracking-[0.1em] text-zinc-400 uppercase">
            Attachments
          </span>

          <div className="grid grid-cols-1 gap-4 pt-2 md:grid-cols-2">
            {material.attachments.map((attachment) => (
              <AttachmentCard key={attachment.id} attachment={attachment} />
            ))}
          </div>
        </div>
      )}

      <div className="flex flex-col gap-6">
        <div className="flex items-center gap-3 text-[14px] font-bold text-zinc-900">
          <MessageSquareText className="h-5 w-5 text-zinc-500" />
          <span>Class comments</span>
        </div>

        <div className="flex items-start gap-4">
          <div className="flex-1">
            <CommentInput
              onSubmit={(value) => handleCommentSubmit(value)}
              placeholder="Add a comment..."
              userLabel={getUserInitials(user)}
              userSrc={getInlineFileUrl(user?.avatarUrl)}
            />
          </div>
        </div>

        {material.comments && material.comments.length > 0 && (
          <div className="flex flex-col gap-6 pt-2">
            {material.comments.map((comment: Comment) => (
              <CommentItem
                variant="announcement"
                key={comment.id}
                authorName={getUserFullName(comment.createdBy)}
                authorAvatar={getInlineFileUrl(comment.createdBy?.avatarUrl)}
                authorInitials={getUserInitials(comment.createdBy)}
                content={comment.body}
                createdAt={comment.createdAt}
                className="cursor-default hover:opacity-100"
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
