import type { JSX } from "react";
import { z } from "zod";
import { useModal } from "@/providers/modal/use-modal.ts";
import { useCreateCourse } from "@/hooks/resources/course/use-course-mutation.ts";
import { useForm } from "@tanstack/react-form";
import { toast } from "sonner";
import { InputField } from "@/components/elements/input-field.tsx";
import SubmitButton from "@/components/elements/submit-button.tsx";
import { Button } from "@/components/ui/button.tsx";
import { FormProvider } from "@/providers/form/form-provider.tsx";
import { TextField } from "@/components/elements/text-field.tsx";

const createClassSchema = z.object({
  name: z.string().min(1, "Class name is required"),
  description: z.string().min(1, "Description is required"),
});

export default function CourseForm(): JSX.Element {
  const { closeModal } = useModal();
  const { mutate: createCourse, isPending } = useCreateCourse();

  const form = useForm({
    defaultValues: {
      name: "",
      description: "",
    },
    validators: {
      onSubmit: createClassSchema,
    },
    onSubmit: async ({ value }) => {
      createCourse(value, {
        onSuccess: () => {
          closeModal();
          toast.success("Course created successfully");
        },
        onError: () => {
          toast.error("Failed to create course");
        },
      });
    },
  });

  return (
    <FormProvider value={form}>
      <div className="flex flex-col gap-6">
        <div className="mb-2 text-left">
          <p className="text-xl font-bold tracking-tight text-zinc-900">Create a new class</p>
        </div>

        <form
          className="flex flex-col gap-2"
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit();
          }}
        >
          <InputField name="name" label="Class Name" variant="default" className="mb-2" />
          <TextField name="description" label="Description" variant="default" />

          <div className="mt-2 flex justify-end gap-3 pt-4">
            <Button
              type="button"
              onClick={closeModal}
              variant="outline"
              className="cursor-pointer px-4 py-4.5 text-[13px] font-medium transition-all"
            >
              Cancel
            </Button>

            <SubmitButton isLoading={isPending} label="Create Class" className="main-btn px-4" />
          </div>
        </form>
      </div>
    </FormProvider>
  );
}
