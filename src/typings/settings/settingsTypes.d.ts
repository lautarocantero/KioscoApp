import type { FormikProps } from "formik";
import type { AuthResetPasswordFormValues } from "@typings/auth/authTypes";
import type { SettingsCategoryEnum, SettingsSectionEnum, ThemeModeEnum, LanguageEnum } from "./settingsEnums";
import type { Currency } from "@typings/sells/sellsEnum";

//─────────────────────────── 🔑 Cambio de contraseña 🔑 ───────────────────────────//

// La UI pide "contraseña actual" para verificarla (ver useAccountPasswordForm),
// aunque el backend no tenga un endpoint dedicado a "cambiar contraseña
// logueado": se reutiliza /auth/login para validarla.
export type AccountPasswordFormValues = AuthResetPasswordFormValues & {
    currentPassword: string;
};

//─────────────────────────── 🔖 Navegación del modal 🔖 ───────────────────────────//

export interface SettingsSectionDefinition {
    id: SettingsSectionEnum;
    label: string;
}

export interface SettingsCategoryDefinition {
    id: SettingsCategoryEnum;
    label: string;
    icon: React.ReactNode;
    sections: SettingsSectionDefinition[];
}

//─────────────────────────── 🪝 Hooks 🪝 ───────────────────────────//

export interface UseSettingsModalReturn {
    isOpen: boolean;
    openSettings: () => void;
    closeSettings: () => void;
}

export interface UseSettingsNavigationReturn {
    activeSection: SettingsSectionEnum;
    setActiveSection: (section: SettingsSectionEnum) => void;
}

export interface UseThemeModeOptionReturn {
    mode: ThemeModeEnum;
    setMode: (mode: ThemeModeEnum) => void;
}

export interface UseLanguageOptionReturn {
    language: LanguageEnum;
    setLanguage: (language: LanguageEnum) => void;
}

export interface UseFontSizeOptionReturn {
    fontSize: number;
    setFontSize: (fontSize: number) => void;
}

export interface UseCurrencyOptionReturn {
    currency: Currency;
    setCurrency: (currency: Currency) => void;
}

export interface UseAccountPasswordFormReturn {
    formik: FormikProps<AccountPasswordFormValues>;
    isSubmitting: boolean;
    errorMessage: string | null;
    isDialogOpen: boolean;
    openDialog: () => void;
    closeDialog: () => void;
}
