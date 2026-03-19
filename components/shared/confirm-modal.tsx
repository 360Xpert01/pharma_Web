"use client";

import { Modal, ModalContent, ModalHeader, ModalTitle, ModalDescription } from "../ui/modal";
import { Button } from "../ui/button/button";

interface ConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
  description?: React.ReactNode;
  confirmLabel?: string;
  cancelLabel?: string;
  loading?: boolean;
}

export const ConfirmModal = ({
  isOpen,
  onClose,
  onConfirm,
  title = "Are you sure?",
  description = "You have unsaved changes. Are you sure you want to cancel?",
  confirmLabel = "Cancel",
  cancelLabel = "Not now",
  loading = false,
}: ConfirmModalProps) => {
  return (
    <Modal open={isOpen} onOpenChange={onClose}>
      <ModalContent className="max-w-lg p-8">
        <ModalHeader className="space-y-3">
          <ModalTitle className="text-2xl font-bold">{title}</ModalTitle>
          <ModalDescription className="text-base text-gray-600">{description}</ModalDescription>
        </ModalHeader>
        <div className="flex w-full items-center justify-end space-x-3 pt-8">
          <Button
            disabled={loading}
            variant="outline"
            onClick={onClose}
            className="px-6 py-2 rounded-8 font-semibold border-2"
          >
            {cancelLabel}
          </Button>
          <Button
            disabled={loading}
            variant="destructive"
            onClick={onConfirm}
            className="px-6 py-2 rounded-8 font-semibold bg-red-600 hover:bg-red-700 text-white"
          >
            {confirmLabel}
          </Button>
        </div>
      </ModalContent>
    </Modal>
  );
};
