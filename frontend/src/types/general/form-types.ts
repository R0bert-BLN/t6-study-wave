import type { ReactNode } from "react";

export type FieldError = { message?: string } | string | unknown;

export type FieldState = {
  name: string;
  state: {
    value: string;
    meta: {
      errors: FieldError[];
    };
  };
  handleBlur: () => void;
  handleChange: (value: string) => void;
};

export type FormWithField<TName extends string> = {
  Field: (props: { name: TName; children: (field: FieldState) => ReactNode }) => ReactNode;
};

export type FormSubmitState = {
  canSubmit: boolean;
  isSubmitting: boolean;
};

export type FormWithSubscribe = {
  Subscribe: (props: {
    selector: (state: FormSubmitState) => readonly [boolean, boolean];
    children: (state: readonly [boolean, boolean]) => ReactNode;
  }) => ReactNode;
};
