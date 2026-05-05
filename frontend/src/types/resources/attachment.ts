import type { User } from "@/types/resources/user.ts";
import type { ResourceType } from "@/types/resources/resource-type.ts";

export interface Attachment {
  id: string;
  attachableId: string;
  attachableType: string;
  name: string;
  path: string;
  size: number;
  extension: string;
  ownedBy?: User | null;
  createdAt: string;
  updatedAt: string;
}

export interface AttachmentCreatePayload {
  attachableId: string;
  attachableType: ResourceType;
  file: File;
}
