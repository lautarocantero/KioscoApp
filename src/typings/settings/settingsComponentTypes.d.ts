import type { UseAccountPasswordFormReturn, SettingsCategoryDefinition } from "./settingsTypes";
import type { SettingsSectionEnum } from "./settingsEnums";

//─────────────────────────── 🪧 Modal 🪧 ───────────────────────────//

export interface SettingsModalProps {
    open: boolean;
    onClose: () => void;
}

export type SettingsModalHeaderProps = Pick<SettingsModalProps, "onClose">;

export interface SettingsModalSidebarProps {
    categories: SettingsCategoryDefinition[];
    activeSection: SettingsSectionEnum;
    onSelectSection: (section: SettingsSectionEnum) => void;
}

export type SettingsModalSidebarCategoryProps = Omit<SettingsModalSidebarProps, "categories"> & {
    category: SettingsCategoryDefinition;
};

export type SettingsModalContentProps = Pick<SettingsModalSidebarProps, "activeSection">;

//─────────────────────────── 🔖 Secciones 🔖 ───────────────────────────//

export interface SettingsInfoRowProps {
    label: string;
    value: string;
}

export type AccountPasswordDialogProps = Pick<UseAccountPasswordFormReturn, "formik" | "isSubmitting" | "errorMessage"> & {
    open: boolean;
    onClose: () => void;
};
