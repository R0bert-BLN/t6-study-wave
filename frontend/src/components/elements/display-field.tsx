import type { ComponentProps, JSX, ReactNode } from "react";
import { cva } from "class-variance-authority";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

const displayVariants = cva(
  "transition-all duration-200 bg-transparent relative z-10 cursor-default shadow-none !ring-0 !ring-offset-0 focus-visible:!ring-0 focus-visible:!outline-none",
  {
    variants: {
      variant: {
        default: "border-zinc-200 rounded-md focus-visible:border-zinc-200",
        underline:
          "border-0 border-b border-zinc-200 rounded-none px-0 focus-visible:border-zinc-200",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

type DisplayFieldProps = Omit<
  ComponentProps<typeof Input>,
  "name" | "onChange" | "onBlur" | "value"
> & {
  label: string;
  value: string | number;
  variant?: "default" | "underline";
  className?: string;
  rightElement?: ReactNode;
};

export function DisplayField({
  label,
  value,
  variant = "default",
  className,
  rightElement,
  ...props
}: DisplayFieldProps): JSX.Element {
  return (
    <div className="group relative w-full space-y-1.5">
      <Label className="pointer-events-none block text-[14px] font-bold text-zinc-400 transition-colors duration-200">
        {label}
      </Label>

      <div className="relative">
        <Input
          readOnly
          value={value}
          className={cn(displayVariants({ variant }), rightElement ? "pr-24" : "", className)}
          style={{ boxShadow: "none" }}
          tabIndex={-1}
          {...props}
        />

        {rightElement && (
          <div className="absolute top-1/2 right-0 z-20 flex -translate-y-1/2 items-center justify-end">
            {rightElement}
          </div>
        )}
      </div>

      <div className="h-4" />
    </div>
  );
}
