"use client";
import { Button } from "@/components/ui/button/button";
import { AddIcon } from "@/lib/icons";
import { useState } from "react";
import { ScrollArea } from "../ui/scroll-area";
import { Modal, ModalContent } from "../ui/modal";

type TPopupModalProps = {
  onConfirm?: () => void;
  loading?: boolean;
  renderModal: (onClose: () => void) => React.ReactNode;
  buttonText?: string;
  buttonVariant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
  buttonSize?: "default" | "sm" | "lg" | "icon";
  buttonClassName?: string;
};

export default function PopupModal({
  renderModal,
  buttonText = "Add New",
  buttonVariant = "default",
  buttonSize = "default",
  buttonClassName = "",
}: TPopupModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const onClose = () => setIsOpen(false);

  return (
    <>
      <Button
        className={`whitespace-nowrap text-xs sm:text-sm ${buttonClassName}`}
        onClick={() => setIsOpen(true)}
        variant={buttonVariant}
        size={buttonSize}
      >
        <AddIcon className="mr-1 h-3 w-3 sm:mr-2 sm:h-4 sm:w-4" />
        <span className="hidden sm:inline">{buttonText}</span>
        <span className="sm:hidden">Add</span>
      </Button>
      <Modal open={isOpen} onOpenChange={setIsOpen}>
        <ModalContent className="mx-auto w-full max-w-4xl !bg-background !p-0">
          <ScrollArea className="max-h-[85vh]">
            <div className="p-4 sm:p-6">{renderModal(onClose)}</div>
          </ScrollArea>
        </ModalContent>
      </Modal>
    </>
  );
}
