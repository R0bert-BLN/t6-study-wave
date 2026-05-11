import { useState, type ReactNode, type JSX } from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { ModalContext } from "./modal-context";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { cn } from "@/lib/utils.ts";

export const ModalProvider = ({ children }: { children: ReactNode }): JSX.Element => {
  const [isOpen, setIsOpen] = useState(false);
  const [content, setContent] = useState<ReactNode | null>(null);
  const [className, setClassName] = useState<string>("");

  const openModal = (newContent: ReactNode, className: string = "") => {
    setContent(newContent);
    setClassName(className);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setTimeout(() => setContent(null), 200);
  };

  return (
    <ModalContext.Provider value={{ isOpen, content, openModal, closeModal }}>
      {children}

      <Dialog open={isOpen} onOpenChange={(open) => !open && closeModal()}>
        <DialogContent
          className={cn("overflow-hidden rounded-3xl border-none p-6 shadow-2xl", className)}
        >
          <VisuallyHidden>
            <DialogTitle>Modal Dialog</DialogTitle>
          </VisuallyHidden>

          <div className="no-scrollbar max-h-[90vh] w-full overflow-x-hidden overflow-y-auto">
            {content}
          </div>
        </DialogContent>
      </Dialog>
    </ModalContext.Provider>
  );
};
