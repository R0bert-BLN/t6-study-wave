import { useState, type ReactNode, type JSX } from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { ModalContext } from "./modal-context";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

interface ModalProviderProps {
  children: ReactNode;
}

export const ModalProvider = ({ children }: ModalProviderProps): JSX.Element => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [content, setContent] = useState<ReactNode | null>(null);

  const openModal = (newContent: ReactNode) => {
    setContent(newContent);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setTimeout(() => setContent(null), 300);
  };

  return (
    <ModalContext.Provider value={{ isOpen, content, openModal, closeModal }}>
      {children}

      <Dialog open={isOpen} onOpenChange={(open) => !open && closeModal()}>
        <DialogContent className="w-full overflow-hidden px-6 py-4">
          <VisuallyHidden>
            <DialogTitle>Modal Dialog</DialogTitle>
          </VisuallyHidden>

          {content}
        </DialogContent>
      </Dialog>
    </ModalContext.Provider>
  );
};
