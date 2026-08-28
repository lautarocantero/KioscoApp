import { useEffect } from "react";

const EDITABLE_TAGS = ["INPUT", "TEXTAREA", "SELECT"];

const isTypingTarget = (target: EventTarget | null): boolean => {
  if (!(target instanceof HTMLElement)) return false;
  if (target.isContentEditable) return true;
  return EDITABLE_TAGS.includes(target.tagName);
};

// Atajo global "V" → Vender, ignorado si el foco está en un campo editable
// (para no interceptar una "v" que el usuario está tipeando en un input).
export const useSidebarShortcut = (onSell: () => void): void => {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key.toLowerCase() !== "v") return;
      if (event.metaKey || event.ctrlKey || event.altKey) return;
      if (isTypingTarget(event.target)) return;

      onSell();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onSell]);
};
