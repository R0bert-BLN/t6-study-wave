import type { InputHTMLAttributes, JSX } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import type { FieldError, FormWithField } from "@/types/general/form-types.ts";

const inputVariants = cva("transition-all bg-transparent relative z-10 cursor-text", {
  variants: {
    variant: {
      default: "border-input rounded-md focus-visible:ring-2 focus-visible:ring-ring",
      underline:
        "border-0 border-b-2 border-zinc-200 rounded-none px-0 shadow-none focus-visible:ring-0 focus-visible:border-blue-600 bg-transparent",
    },
    error: {
      true: "border-rose-500 focus-visible:border-rose-600 focus-visible:ring-rose-500 text-rose-600",
      false: "",
    },
  },
  defaultVariants: {
    variant: "default",
    error: false,
  },
});

interface InputFieldProps<TName extends string>
  extends
    Omit<InputHTMLAttributes<HTMLInputElement>, "form" | "name" | "value" | "onBlur" | "onChange">,
    VariantProps<typeof inputVariants> {
  form: FormWithField<TName>;
  name: TName;
  label: string;
}

function getFirstError(errors: FieldError[]): string | null {
  const firstError = errors[0];

  if (!firstError) {
    return null;
  }

  if (typeof firstError === "string") {
    return firstError;
  }

  if (typeof firstError === "object" && "message" in firstError) {
    const message = (firstError as { message?: unknown }).message;
    return typeof message === "string" ? message : null;
  }

  return null;
}

export function InputField<TName extends string>({
  form,
  name,
  label,
  variant = "default",
  className,
  ...props
}: InputFieldProps<TName>): JSX.Element {
  return (
    <form.Field
      name={name}
      children={(field) => {
        const errorMessage = getFirstError(field.state.meta.errors);

        return (
          <div className="group relative w-full">
            <Label
              htmlFor={field.name}
              className={cn(
                "pointer-events-none mb-1 block text-[12px] font-bold tracking-widest uppercase transition-colors",
                errorMessage ? "text-rose-500" : "text-zinc-400 group-focus-within:text-blue-600",
              )}
            >
              {label}
            </Label>

            <Input
              id={field.name}
              name={field.name}
              value={field.state.value}
              onBlur={field.handleBlur}
              onChange={(event) => field.handleChange(event.target.value)}
              className={cn(inputVariants({ variant, error: Boolean(errorMessage) }), className)}
              aria-invalid={Boolean(errorMessage)}
              {...props}
            />

            {errorMessage && (
              <p className="animate-in slide-in-from-top-1 fade-in absolute pt-1.5 text-[11px] font-medium text-rose-500">
                {errorMessage}
              </p>
            )}
          </div>
        );
      }}
    />
  );
}
