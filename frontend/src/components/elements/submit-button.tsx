import type { JSX } from "react";
import * as React from "react";
import { Button, buttonVariants } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import type { VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { useFormContext } from "@/providers/form/use-form.ts";

interface SubmitButtonProps
  extends Omit<React.ComponentProps<"button">, "form">, VariantProps<typeof buttonVariants> {
  label: string;
  isLoading?: boolean;
}

export default function SubmitButton({
  label,
  isLoading,
  variant = "default",
  className,
  disabled,
  ...props
}: SubmitButtonProps): JSX.Element {
  const form = useFormContext();

  return (
    <form.Subscribe
      selector={(state) => [state.canSubmit, state.isSubmitting] as const}
      children={([canSubmit, isSubmitting]) => {
        const loading = isLoading ?? isSubmitting;

        return (
          <Button
            type="submit"
            disabled={disabled || !canSubmit || loading}
            variant={variant}
            className={cn(className)}
            {...props}
          >
            {loading ? <Spinner className="size-5 text-white" /> : <span>{label}</span>}
          </Button>
        );
      }}
    />
  );
}
