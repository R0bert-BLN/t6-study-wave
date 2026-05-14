import type { JSX } from "react";
import { useForm } from "@tanstack/react-form";
import { z } from "zod";
import { InputField } from "@/components/elements/input-field";
import SubmitButton from "@/components/elements/submit-button";
import SelectField from "@/components/elements/select-field.tsx";
import { useRegister } from "@/hooks/auth/use-auth-mutation";
import { Waves } from "lucide-react";
import { FormProvider } from "@/providers/form/form-provider.tsx";
import { UserRole } from "@/types/resources/user.ts";

const registerSchema = z
  .object({
    firstName: z.string().min(1, "First name is required"),
    lastName: z.string().min(1, "Last name is required"),
    email: z.string().min(1, "Email is required").email("Invalid email format"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    passwordConfirmation: z.string().min(1, "Confirm your password"),
    role: z.string().min(1, "Role is required"),
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    message: "Passwords do not match",
    path: ["passwordConfirmation"],
  });

export function RegisterForm(): JSX.Element {
  const { mutate: register, isPending } = useRegister();

  const form = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      passwordConfirmation: "",
      role: String(UserRole.STUDENT),
    },
    validators: {
      onSubmit: registerSchema,
    },
    onSubmit: async ({ value }) => {
      register({
        ...value,
        role: Number(value.role),
      });
    },
  });

  return (
    <FormProvider value={form}>
      <div className="mx-auto w-[550px] rounded-[2rem] border border-zinc-100 bg-white/80 p-10 shadow-2xl shadow-zinc-200/50 backdrop-blur-xl">
        <div className="mb-10 flex items-center justify-center gap-2 text-center">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-blue-600 text-white shadow-lg shadow-blue-900/50">
            <Waves className="text-lg" />
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-zinc-900">StudyWave</h1>
        </div>

        <form
          className="flex flex-col gap-6"
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit();
          }}
        >
          <div className="no-scrollbar flex max-h-[400px] flex-col gap-3 overflow-y-auto pr-2">
            <InputField name="firstName" label="First Name" variant="underline" />
            <InputField name="lastName" label="Last Name" variant="underline" />

            <InputField name="email" label="Email" variant="underline" type="email" />

            <SelectField
              name="role"
              label="Role"
              variant="underline"
              options={[
                { label: "Student", value: String(UserRole.STUDENT) },
                { label: "Professor", value: String(UserRole.PROFESSOR) },
              ]}
            />

            <InputField name="password" label="Password" variant="underline" type="password" />
            <InputField
              name="passwordConfirmation"
              label="Confirm Password"
              variant="underline"
              type="password"
            />
          </div>

          <SubmitButton isLoading={isPending} label="Create Account" className="main-btn" />

          <span className="text-center text-sm text-zinc-500">
            Already have an account?{" "}
            <a href="/login" className="font-medium text-blue-600 hover:underline">
              Log in
            </a>
          </span>
        </form>
      </div>
    </FormProvider>
  );
}
