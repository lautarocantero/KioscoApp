import { useCallback, useState } from "react";
import { SettingsSectionEnum } from "@typings/settings/settingsEnums";
import type { UseSettingsNavigationReturn } from "@typings/settings/settingsTypes";

export const useSettingsNavigation = (): UseSettingsNavigationReturn => {
  const [activeSection, setActiveSectionState] = useState<SettingsSectionEnum>(SettingsSectionEnum.AccountInfo);

  const setActiveSection = useCallback((section: SettingsSectionEnum) => setActiveSectionState(section), []);

  return { activeSection, setActiveSection };
};
