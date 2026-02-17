"use client";

import { useState, useCallback } from "react";

interface UseDropdownMenuReturn {
  openId: string | null;
  toggle: (id: string) => void;
  close: () => void;
  isOpen: (id: string) => boolean;
}

/**
 * Hook to manage dropdown menu state for tables
 * Ensures only one dropdown is open at a time
 *
 * @example
 * const { openId, toggle, close, isOpen } = useDropdownMenu();
 *
 * <TableActionDropdown
 *   isOpen={isOpen(item.id)}
 *   onToggle={() => toggle(item.id)}
 *   onClose={close}
 *   items={[...]}
 * />
 */
export function useDropdownMenu(): UseDropdownMenuReturn {
  const [openId, setOpenId] = useState<string | null>(null);

  const toggle = useCallback((id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  }, []);

  const close = useCallback(() => {
    setOpenId(null);
  }, []);

  const isOpen = useCallback(
    (id: string) => {
      return openId === id;
    },
    [openId]
  );

  return {
    openId,
    toggle,
    close,
    isOpen,
  };
}
