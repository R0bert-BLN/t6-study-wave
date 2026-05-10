import React, { type JSX, useState } from "react";
import { useRef } from "react";
import { z } from "zod";
import { useForm } from "@tanstack/react-form";
import { toast } from "sonner";
import { type User, UserRole } from "@/types/resources/user.ts";
import { InputField } from "@/components/elements/input-field.tsx";
import SubmitButton from "@/components/elements/submit-button.tsx";
import { FormProvider } from "@/providers/form/form-provider.tsx";
import { useUpdateUser } from "@/hooks/resources/user/use-user-mutation.ts";
import { getUserInitials } from "@/utils/user.ts";
import { DisplayField } from "@/components/elements/display-field.tsx";
import { UserAvatar } from "@/components/elements/user-avatar.tsx";
import { useFileHandler } from "@/hooks/general/use-file-handler.ts";

const updateProfileSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
});

interface ProfileFormProps {
  user: User;
}

export default function ProfileForm({ user }: ProfileFormProps): JSX.Element {
  const { mutate: updateUser, isPending } = useUpdateUser(user.id);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [picture, setPicture] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const { getInlineFileUrl } = useFileHandler();

  const form = useForm({
    defaultValues: {
      firstName: user.firstName,
      lastName: user.lastName,
    },
    validators: {
      onSubmit: updateProfileSchema,
    },
    onSubmit: async ({ value }) => {
      const payload = {
        ...value,
        picture: picture || undefined,
      };

      updateUser(payload, {
        onSuccess: () => {
          toast.success("Profile updated successfully");
        },
        onError: () => {
          toast.error("Failed to update profile");
        },
      });
    },
  });

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    setPicture(file);

    if (!file) {
      setPreviewUrl(null);
      return;
    }

    const reader = new FileReader();
    reader.onload = () => setPreviewUrl(reader.result as string);
    reader.readAsDataURL(file);
  };

  return (
    <FormProvider value={form}>
      <div className="animate-in fade-in mx-auto w-full max-w-2xl pt-4 pb-4 duration-500">
        <form
          className="flex flex-col gap-8"
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit();
          }}
        >
          <div className="flex flex-col gap-4">
            <span className="pb-2 text-[12px] font-bold tracking-widest text-zinc-400 uppercase">
              Public Profile
            </span>

            <div className="flex items-center gap-6">
              <div
                onClick={() => fileInputRef.current?.click()}
                className="group relative flex cursor-pointer overflow-hidden rounded-full transition-all"
              >
                <UserAvatar
                  label={getUserInitials(user)}
                  src={previewUrl ?? getInlineFileUrl(user.avatarUrl ?? "")}
                  className="h-20 w-20"
                  fallbackClassName="text-3xl"
                />

                <div className="absolute inset-0 flex items-center justify-center bg-black/60 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                  <span className="text-xs font-semibold tracking-wider text-white uppercase">
                    Change
                  </span>
                </div>
              </div>

              <input
                type="file"
                ref={fileInputRef}
                onChange={(event) => handleFileChange(event)}
                accept="image/png, image/jpeg, image/webp"
                className="hidden"
              />

              <div className="flex flex-col gap-1">
                <span className="text-xl font-bold text-zinc-900">
                  {user.firstName} {user.lastName}
                </span>

                <span className="text-sm text-zinc-500">
                  {user.role === UserRole.PROFESSOR ? "Professor" : "Student"}
                </span>
              </div>
            </div>

            <InputField name="firstName" label="First Name" variant="underline" />
            <InputField name="lastName" label="Last Name" variant="underline" />
          </div>

          <div className="flex flex-col gap-6 pt-4">
            <span className="pb-2 text-[12px] font-bold tracking-widest text-zinc-400 uppercase">
              Security & Access
            </span>

            <DisplayField
              label="Email"
              value={user.email}
              variant="underline"
              className="cursor-not-allowed"
            />

            <DisplayField
              label="Password"
              value="•••••••••••••••"
              variant="underline"
              className="cursor-not-allowed"
              rightElement={
                <button
                  type="button"
                  onClick={() => alert("Update password functionality not implemented yet.")}
                  className="cursor-pointer text-sm font-semibold text-blue-600 transition-colors hover:text-blue-400"
                >
                  Update Password
                </button>
              }
            />
          </div>

          <div className="flex justify-end">
            <SubmitButton isLoading={isPending} label="Save Changes" className="main-btn" />
          </div>
        </form>
      </div>
    </FormProvider>
  );
}
