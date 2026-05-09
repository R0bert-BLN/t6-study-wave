import { createContext, type ReactNode } from "react";

export interface ModalContext {
  isOpen: boolean;
  content: ReactNode | null;
  openModal: (content: ReactNode, className: string) => void;
  closeModal: () => void;
}

export const ModalContext = createContext<ModalContext | null>(null);
