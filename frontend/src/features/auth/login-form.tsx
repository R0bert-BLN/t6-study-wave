import type { JSX } from "react";
import { useForm } from "@tanstack/react-form";
import { z } from "zod";
import { InputField } from "@/components/elements/input-field";
import SubmitButton from "@/components/elements/submit-button";
import { useLogin } from "@/hooks/auth/use-auth-mutation";
import { Waves } from "lucide-react";

const loginSchema = z.object({
  email: z.string().min(1, "Email is required").email("Invalid email format"),
  password: z.string().min(1, "Password is required"),
});

export function LoginForm(): JSX.Element {
  const { mutate: login, isPending } = useLogin();

  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    validators: {
      onSubmit: loginSchema,
    },
    onSubmit: async ({ value }) => {
      login(value);
    },
  });

  return (
    <div className="mx-auto w-full max-w-sm rounded-[2rem] border border-zinc-100 bg-white/80 p-10 shadow-2xl shadow-zinc-200/50 backdrop-blur-xl">
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
        <InputField name="email" label="Email" form={form} variant="underline" type="email" />

        <InputField
          name="password"
          label="Password"
          form={form}
          variant="underline"
          type="password"
        />

        <SubmitButton
          form={form}
          isLoading={isPending}
          label="Login"
          className="mt-4 w-full cursor-pointer rounded-full bg-zinc-900 py-5 font-bold text-white shadow-xl transition-all hover:bg-black"
        />
      </form>
    </div>
  );
}
