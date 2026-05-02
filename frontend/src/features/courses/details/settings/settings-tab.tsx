import type { JSX } from "react";
import { z } from "zod";
import { useForm } from "@tanstack/react-form";
import { toast } from "sonner";
import { InputField } from "@/components/elements/input-field.tsx";
import SubmitButton from "@/components/elements/submit-button.tsx";
import { FormProvider } from "@/providers/form/form-provider.tsx";
import { useUpdateCourse } from "@/hooks/resources/course/use-course-mutation.ts";
import type { Course } from "@/types/resources/course.ts";
import { TextField } from "@/components/elements/text-field.tsx";
import { Copy } from "lucide-react";

const updateClassSchema = z.object({
  name: z.string().min(1, "Class name is required"),
  description: z.string().min(1, "Description is required"),
});

interface SettingsTabProps {
  course: Course;
}

export default function SettingsTab({ course }: SettingsTabProps): JSX.Element {
  const { mutate: updateCourse, isPending } = useUpdateCourse(course.id);

  const handleCopyCode = () => {
    navigator.clipboard.writeText(course.code);
    toast.success("Copied to clipboard");
  };

  const form = useForm({
    defaultValues: {
      name: course.name,
      description: course.description,
    },
    validators: {
      onSubmit: updateClassSchema,
    },
    onSubmit: async ({ value }) => {
      updateCourse(value, {
        onSuccess: () => {
          toast.success("Changes saved successfully");
        },
        onError: () => {
          toast.error("Failed to save changes");
        },
      });
    },
  });

  return (
    <FormProvider value={form}>
      <div className="animate-in fade-in mx-auto w-full max-w-2xl pt-8 duration-500">
        <form
          className="flex flex-col gap-4"
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit();
          }}
        >
          <InputField name="name" label="Class Name" variant="underline" />
          <TextField name="description" label="Description" variant="underline" />

          <div className="flex flex-col gap-2">
            <p className="text-[14px] font-bold text-zinc-400">Invite Code</p>

            <div className="flex items-center gap-4">
              <p className="font-mono text-xl font-bold tracking-wider text-zinc-900">
                {course.code}
              </p>

              <button
                type="button"
                onClick={handleCopyCode}
                className="h-8 w-8 cursor-pointer justify-center rounded-md text-zinc-400 transition-colors hover:text-zinc-900"
              >
                <Copy size={18} />
              </button>
            </div>
          </div>

          <div className="flex justify-end pt-4">
            <SubmitButton isLoading={isPending} label="Save Changes" className="main-btn" />
          </div>
        </form>
      </div>
    </FormProvider>
  );
}
