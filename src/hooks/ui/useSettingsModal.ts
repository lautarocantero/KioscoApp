import { useCallback, useState } from "react";
import type { UseSettingsModalReturn } from "@typings/settings/settingsTypes";

export const useSettingsModal = (): UseSettingsModalReturn => {
  const [isOpen, setIsOpen] = useState(false);

  const openSettings = useCallback(() => setIsOpen(true), []);
  const closeSettings = useCallback(() => setIsOpen(false), []);

  return { isOpen, openSettings, closeSettings };
};
