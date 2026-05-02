import { useContext } from "react";
import { type AnyReactForm, FormContext } from "@/providers/form/form-context.ts";

export function useFormContext(): AnyReactForm {
  const form = useContext(FormContext);

  if (!form) {
    throw new Error("useFormContext must be used within a FormProvider");
  }

  return form;
}
