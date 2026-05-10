import type { JSX } from "react";
import { z } from "zod";
import { useModal } from "@/providers/modal/use-modal.ts";
import { useJoinCourse } from "@/hooks/resources/course/use-course-mutation.ts";
import { useForm } from "@tanstack/react-form";
import { toast } from "sonner";
import { InputField } from "@/components/elements/input-field.tsx";
import SubmitButton from "@/components/elements/submit-button.tsx";
import { Button } from "@/components/ui/button.tsx";
import { FormProvider } from "@/providers/form/form-provider.tsx";

const joinClassSchema = z.object({
  code: z.string().min(1, "Course code is required"),
});

export default function JoinForm(): JSX.Element {
  const { closeModal } = useModal();
  const { mutate: joinCourse, isPending } = useJoinCourse();

  const form = useForm({
    defaultValues: {
      code: "",
    },
    validators: {
      onSubmit: joinClassSchema,
    },
    onSubmit: async ({ value }) => {
      joinCourse(value.code, {
        onSuccess: () => {
          closeModal();
          toast.success("Joined course successfully");
        },
        onError: () => {
          toast.error("Failed to join course");
        },
      });
    },
  });

  return (
    <FormProvider value={form}>
      <div className="flex flex-col gap-6">
        <div className="mb-2 text-left">
          <p className="text-xl font-bold tracking-tight text-zinc-900">Join course</p>
        </div>

        <form
          className="flex flex-col gap-2"
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit();
          }}
        >
          <InputField name="code" label="Course Code" variant="default" className="mb-2" />

          <div className="flex justify-end gap-3 pt-4">
            <Button
              type="button"
              onClick={closeModal}
              variant="outline"
              className="cursor-pointer px-4 py-4.5 text-[13px] font-medium transition-all"
            >
              Cancel
            </Button>

            <SubmitButton isLoading={isPending} label="Join Course" className="main-btn px-4" />
          </div>
        </form>
      </div>
    </FormProvider>
  );
}
