import { createContext } from "react";
import type { ReactFormExtendedApi } from "@tanstack/react-form";

export type FieldError = { message?: string } | string | unknown;
export type AnyReactForm = ReactFormExtendedApi<
  any,
  any,
  any,
  any,
  any,
  any,
  any,
  any,
  any,
  any,
  any,
  any
>;

export const FormContext = createContext<AnyReactForm | null>(null);
