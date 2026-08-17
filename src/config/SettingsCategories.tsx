import type { ComponentType } from "react";
import PersonIcon from "@mui/icons-material/Person";
import PaletteIcon from "@mui/icons-material/Palette";
import type { SettingsCategoryDefinition } from "@typings/settings/settingsTypes";
import { SettingsCategoryEnum, SettingsSectionEnum } from "@typings/settings/settingsEnums";
import AccountInfoSection from "../modules/shared/components/SettingsModal/sections/AccountInfoSection";
import AccountPasswordSection from "../modules/shared/components/SettingsModal/sections/AccountPasswordSection";
import AppearanceModeSection from "../modules/shared/components/SettingsModal/sections/AppearanceModeSection";
import AppearanceLanguageSection from "../modules/shared/components/SettingsModal/sections/AppearanceLanguageSection";
import AppearanceFontSizeSection from "../modules/shared/components/SettingsModal/sections/AppearanceFontSizeSection";

// `label`/`sections[].label` son claves de traducción ("settings.categories.*",
// "settings.sections.*" en src/i18n/locales), no texto literal — se resuelven
// con t() dentro de SettingsModalSidebarCategory.
export const SETTINGS_CATEGORIES: SettingsCategoryDefinition[] = [
  {
    id: SettingsCategoryEnum.Account,
    label: "settings.categories.account",
    icon: <PersonIcon fontSize="small" />,
    sections: [
      { id: SettingsSectionEnum.AccountInfo, label: "settings.sections.accountInfo" },
      { id: SettingsSectionEnum.AccountPassword, label: "settings.sections.accountPassword" },
    ],
  },
  {
    id: SettingsCategoryEnum.Appearance,
    label: "settings.categories.appearance",
    icon: <PaletteIcon fontSize="small" />,
    sections: [
      { id: SettingsSectionEnum.AppearanceMode, label: "settings.sections.appearanceMode" },
      { id: SettingsSectionEnum.AppearanceLanguage, label: "settings.sections.appearanceLanguage" },
      { id: SettingsSectionEnum.AppearanceFontSize, label: "settings.sections.appearanceFontSize" },
    ],
  },
];

export const SETTINGS_SECTION_COMPONENTS: Record<SettingsSectionEnum, ComponentType> = {
  [SettingsSectionEnum.AccountInfo]: AccountInfoSection,
  [SettingsSectionEnum.AccountPassword]: AccountPasswordSection,
  [SettingsSectionEnum.AppearanceMode]: AppearanceModeSection,
  [SettingsSectionEnum.AppearanceLanguage]: AppearanceLanguageSection,
  [SettingsSectionEnum.AppearanceFontSize]: AppearanceFontSizeSection,
};
