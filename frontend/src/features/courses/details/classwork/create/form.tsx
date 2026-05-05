import { type JSX, useState } from "react";
import { useForm } from "@tanstack/react-form";
import { z } from "zod";
import { InputField } from "@/components/elements/input-field";
import SelectField from "@/components/elements/select-field";
import SubmitButton from "@/components/elements/submit-button";
import { useModal } from "@/providers/modal/use-modal";
import { toast } from "sonner";
import {
  useCreateMaterial,
  useUpdateMaterial,
} from "@/hooks/resources/material/use-material-mutation.ts";
import {
  useCreateAssignment,
  useUpdateAssignment,
} from "@/hooks/resources/assignment/use-assignment-mutation.ts";
import { useAuth } from "@/providers/auth/use-auth.ts";
import { Button } from "@/components/ui/button.tsx";
import { TextField } from "@/components/elements/text-field.tsx";
import { FormProvider } from "@/providers/form/form-provider.tsx";
import FileUpload from "@/components/elements/file-upload.tsx";
import { type ClassworkItem, ClassworkType } from "@/types/resources/classwork.ts";
import DateTimeField from "@/components/elements/date-time-field.tsx";
import { formatForDatetimeLocal, formatIsoForLaravel } from "@/utils/date.ts";

const resourceSchema = z.object({
  type: z.enum([ClassworkType.Assignment, ClassworkType.Material], {
    required_error: "Please select a type",
  }),
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
  category: z.string().min(1, "Category is required"),
  dueDate: z.string().optional(),
});

interface ResourceFormProps {
  courseId: string;
  classwork?: ClassworkItem;
}

export function ClassworkForm({ courseId, classwork = undefined }: ResourceFormProps): JSX.Element {
  const { closeModal } = useModal();
  const { user } = useAuth();
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [deletedIds, setDeletedIds] = useState<string[]>([]);

  const currentExistingAttachments =
    classwork?.attachments?.filter((attachment) => !deletedIds.includes(attachment.id)) ?? [];

  const { mutate: createMaterial, isPending: isMaterialCreatePending } =
    useCreateMaterial(courseId);
  const { mutate: createAssignment, isPending: isAssignmentCreatePending } =
    useCreateAssignment(courseId);

  const { mutate: updateMaterial, isPending: isMaterialUpdatePending } = useUpdateMaterial(
    classwork?.id ?? "",
    courseId,
  );
  const { mutate: updateAssignment, isPending: isAssignmentUpdatePending } = useUpdateAssignment(
    classwork?.id ?? "",
    courseId,
  );

  const isPending =
    isMaterialCreatePending ||
    isAssignmentCreatePending ||
    isMaterialUpdatePending ||
    isAssignmentUpdatePending;

  const form = useForm({
    defaultValues: {
      type: classwork?.type ?? "material",
      title: classwork?.title ?? "",
      description: classwork?.description ?? undefined,
      category: classwork?.category ?? "",
      dueDate:
        classwork?.type === ClassworkType.Assignment
          ? formatForDatetimeLocal(classwork?.dueDate)
          : undefined,
    },
    validators: {
      onSubmit: resourceSchema,
    },
    onSubmit: async ({ value }) => {
      const payload = {
        title: value.title,
        description: value.description,
        courseId: courseId as string,
        createdBy: user?.id as string,
        attachments: selectedFiles,
        deletedAttachments: deletedIds,
        category: value.category,
      };

      if (value.type === ClassworkType.Material) {
        if (classwork) {
          updateMaterial(payload, {
            onSuccess: () => {
              toast.success("Material updated successfully");
              closeModal();
            },
            onError: () => {
              toast.error("Failed to update material");
            },
          });
        } else {
          createMaterial(payload, {
            onSuccess: () => {
              toast.success("Material created successfully");
              closeModal();
            },
            onError: () => {
              toast.error("Failed to create material");
            },
          });
        }
      } else if (value.type === "assignment") {
        const assignmentPayload = {
          ...payload,
          dueDate: value.dueDate ? formatIsoForLaravel(value.dueDate) : undefined,
        };

        if (classwork) {
          updateAssignment(assignmentPayload, {
            onSuccess: () => {
              toast.success("Assignment updated successfully");
              closeModal();
            },
            onError: () => {
              toast.error("Failed to update assignment");
            },
          });
        } else {
          createAssignment(assignmentPayload, {
            onSuccess: () => {
              toast.success("Assignment created successfully");
              closeModal();
            },
            onError: () => {
              toast.error("Failed to create assignment");
            },
          });
        }
      }
    },
  });

  return (
    <FormProvider value={form}>
      <div className="flex h-full flex-col gap-6">
        <p className="text-xl font-bold text-zinc-900">
          {classwork ? "Edit Classwork" : "Add Classwork"}
        </p>

        <form
          className="flex flex-col gap-1"
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit();
          }}
        >
          <SelectField
            name="type"
            label="Resource Type"
            options={[
              { label: "Assignment", value: "assignment" },
              { label: "Material", value: "material" },
            ]}
          />

          <InputField name="title" label="Title" />
          <InputField name="category" label="Category" />

          <form.Subscribe
            selector={(state) => state.values.type}
            children={(type) =>
              type === ClassworkType.Assignment ? (
                <DateTimeField name="dueDate" label="Due Date" />
              ) : null
            }
          />

          <TextField name="description" label="Description" />

          <FileUpload
            selectedFiles={selectedFiles}
            onFilesSelected={setSelectedFiles}
            existingAttachments={currentExistingAttachments}
            onRemoveExisting={(id) => setDeletedIds((prev) => [...prev, id])}
          />

          <div className="mt-2 flex justify-end gap-3 pt-6">
            <Button
              type="button"
              onClick={closeModal}
              variant="outline"
              className="cursor-pointer px-4 py-4.5 text-[13px] font-medium transition-all"
            >
              Cancel
            </Button>

            <SubmitButton
              isLoading={isPending}
              label={classwork ? "Update" : "Create"}
              className="main-btn px-4"
            />
          </div>
        </form>
      </div>
    </FormProvider>
  );
}
