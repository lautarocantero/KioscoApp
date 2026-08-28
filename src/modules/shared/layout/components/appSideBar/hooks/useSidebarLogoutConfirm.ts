import { useCallback, useState } from "react";
import type { UseSidebarLogoutConfirmReturn } from "@typings/ui/sidebar.types";

// Gate de confirmación para "Cerrar sesión": el click en el menú abre el
// diálogo en vez de ejecutar el logout directo — onLogout (la acción real,
// dispatch + navigate de useAppSidebar) solo se dispara al confirmar.
export const useSidebarLogoutConfirm = (onLogout: () => void): UseSidebarLogoutConfirmReturn => {
  const [isOpen, setIsOpen] = useState(false);

  const requestLogout = useCallback(() => setIsOpen(true), []);
  const cancelLogout = useCallback(() => setIsOpen(false), []);

  const confirmLogout = useCallback(() => {
    setIsOpen(false);
    onLogout();
  }, [onLogout]);

  return { isOpen, requestLogout, cancelLogout, confirmLogout };
};
