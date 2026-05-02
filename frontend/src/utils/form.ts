import type { FieldError } from "@/providers/form/form-context.ts";

export const getFirstError = (errors: FieldError[]): string | null => {
  const firstError = errors[0];

  if (!firstError) return null;

  if (typeof firstError === "string") return firstError;

  if (typeof firstError === "object" && "message" in firstError) {
    return typeof (firstError as any).message === "string" ? (firstError as any).message : null;
  }

  return null;
};
