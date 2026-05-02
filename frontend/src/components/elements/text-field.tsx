import type { ComponentProps, JSX } from "react";
import { cva } from "class-variance-authority";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { useFormContext } from "@/providers/form/use-form.ts";
import { getFirstError } from "@/utils/form.ts";
import { Textarea } from "@/components/ui/textarea.tsx";

const inputVariants = cva(
  "transition-all duration-200 bg-transparent relative z-10 cursor-text shadow-none !ring-0 !ring-offset-0",
  {
    variants: {
      variant: {
        default: "border-zinc-200 rounded-md focus-visible:border-blue-600 focus-visible:ring-0",
        underline:
          "border-0 border-b border-zinc-200 rounded-none px-0 focus-visible:border-blue-600 focus-visible:ring-0",
      },
      error: {
        true: "!border-rose-500 focus-visible:!border-rose-500 bg-rose-50/20",
        false: "",
      },
    },
    defaultVariants: {
      variant: "default",
      error: false,
    },
  },
);

type TextFieldProps<TName extends string> = Omit<
  ComponentProps<typeof Textarea>,
  "name" | "value" | "onChange" | "onBlur"
> & {
  name: TName;
  label: string;
  variant?: "default" | "underline";
  className?: string;
};

export function TextField<TName extends string>({
  name,
  label,
  variant = "default",
  className,
  ...props
}: TextFieldProps<TName>): JSX.Element {
  const form = useFormContext();

  return (
    <form.Field
      name={name}
      children={(field) => {
        const errorMessage = getFirstError(field.state.meta.errors);

        return (
          <div className="group relative w-full space-y-1.5">
            <Label
              htmlFor={field.name}
              className={cn(
                "pointer-events-none block text-[14px] font-bold transition-colors duration-200",
                errorMessage ? "text-rose-500" : "text-zinc-400 group-focus-within:text-zinc-900",
              )}
            >
              {label}
            </Label>

            <Textarea
              id={field.name}
              name={field.name}
              value={field.state.value}
              onBlur={field.handleBlur}
              onChange={(event) => field.handleChange(event.target.value)}
              className={cn(inputVariants({ variant, error: Boolean(errorMessage) }), className)}
              style={{ boxShadow: "none" }}
              {...props}
            />

            <div className="h-4">
              {errorMessage && (
                <p className="animate-in fade-in slide-in-from-top-1 text-[12px] font-medium text-rose-600">
                  {errorMessage}
                </p>
              )}
            </div>
          </div>
        );
      }}
    />
  );
}
