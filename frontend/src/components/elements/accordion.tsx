import type { JSX, ReactNode } from "react";
import React from "react";
import {
  Accordion as RadixAccordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";
import { capitalizeWords } from "@/utils/string.ts";

interface AccordionSectionProps {
  title: string;
  children: ReactNode;
  defaultOpen?: boolean;
  className?: string;
}

export default function Accordion({
  title,
  children,
  defaultOpen = false,
  className,
}: AccordionSectionProps): JSX.Element | null {
  if (React.Children.count(children) === 0) return null;

  return (
    <RadixAccordion
      type="single"
      collapsible
      defaultValue={defaultOpen ? "item-1" : undefined}
      className={cn("w-full", className)}
    >
      <AccordionItem value="item-1" className="border-none">
        <AccordionTrigger className="group mb-2 cursor-pointer pb-2 hover:no-underline">
          <span className="text-[18px] font-bold text-zinc-800 transition-colors group-hover:opacity-70">
            {capitalizeWords(title)}
          </span>
        </AccordionTrigger>

        <AccordionContent className="pl-8">{children}</AccordionContent>
      </AccordionItem>
    </RadixAccordion>
  );
}
