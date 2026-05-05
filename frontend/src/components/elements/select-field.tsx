import type { JSX } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { useFormContext } from "@/providers/form/use-form.ts";
import { getFirstError } from "@/utils/form.ts";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface SelectOption {
  label: string;
  value: string;
}

const selectTriggerVariants = cva(
  "flex w-full items-center justify-between transition-all duration-200 bg-transparent shadow-none !ring-0 !ring-offset-0 cursor-pointer",
  {
    variants: {
      variant: {
        default: "border border-zinc-200 rounded-md focus:border-blue-600 px-3 h-10",
        underline: "border-0 border-b border-zinc-200 rounded-none px-0 h-10 focus:border-blue-600",
      },
      error: {
        true: "!border-rose-500 bg-rose-50/20 text-rose-600",
        false: "",
      },
    },
    defaultVariants: {
      variant: "default",
      error: false,
    },
  },
);

interface SelectFieldProps<TName extends string> extends VariantProps<
  typeof selectTriggerVariants
> {
  name: TName;
  label: string;
  options: SelectOption[];
  placeholder?: string;
  className?: string;
}

export default function SelectField<TName extends string>({
  name,
  label,
  options,
  variant = "default",
  placeholder = "Select an option",
  className,
}: SelectFieldProps<TName>): JSX.Element {
  const form = useFormContext();

  return (
    <form.Field
      name={name as any}
      children={(field) => {
        const errorMessage = getFirstError(field.state.meta.errors);

        return (
          <div className="group relative w-full space-y-1.5">
            <Label
              htmlFor={field.name}
              className={cn(
                "pointer-events-none block text-[11px] font-bold tracking-widest uppercase transition-colors duration-200",
                errorMessage ? "text-rose-500" : "text-zinc-400 group-focus-within:text-zinc-900",
              )}
            >
              {label}
            </Label>

            <Select
              value={field.state.value as string}
              onValueChange={(value) => field.handleChange(value as any)}
            >
              <SelectTrigger
                id={field.name}
                className={cn(
                  selectTriggerVariants({ variant, error: Boolean(errorMessage) }),
                  className,
                )}
              >
                <SelectValue placeholder={placeholder} />
              </SelectTrigger>

              <SelectContent className="rounded-md border-zinc-200 shadow-xl" position="popper">
                {options.map((opt) => (
                  <SelectItem
                    key={opt.value}
                    value={opt.value}
                    className="cursor-pointer rounded-lg focus:bg-zinc-100 focus:text-zinc-900"
                  >
                    {opt.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <div className="h-4">
              {errorMessage && (
                <p className="animate-in fade-in slide-in-from-top-1 text-[11px] font-medium text-rose-600">
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
