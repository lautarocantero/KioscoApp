import type { FormModeSimpleEnum } from "@typings/shared/sharedEnums";
import type { DeleteDialogState } from "@typings/ui/dialog.types";
import type { BadgeColorEnum } from "@typings/ui/uiEnums";
import type React from "react";

// /*══════════════════════════════════════════════════════════════════════╗
// ║ 📋 PresentationForm  📋📋📋📋📋📋📋📋📋📋📋📋📋📋                       ║
// ╚══════════════════════════════════════════════════════════════════════╝*/

export interface PresentationFormProps {
    mode: FormModeSimpleEnum,
}

export interface SectionHeaderProps {
    icon: ReactNode;
    title: string;
    color: string;
}

interface DetailFieldProps {
    icon: ReactNode;
    iconColor: string;
    label: string;
    value: ReactNode;
    badge?: { label: string; color: BadgeColorEnum };
}


// /*══════════════════════════════════════════════════════════════════════╗
// ║ ✅ Presentation Created  ✅✅✅✅✅✅✅✅✅✅✅✅✅✅                       ║
// ╚══════════════════════════════════════════════════════════════════════╝*/

export interface VariantCreatedActionsProps {
    onCreateAnother: () => void;
}

export interface VariantCreatedBodyProps {
    name: string;
}


// /*══════════════════════════════════════════════════════════════════════╗
// ║ ✅ Presentation Delete  ✅✅✅✅✅✅✅✅✅✅✅✅✅✅                       ║
// ╚══════════════════════════════════════════════════════════════════════╝*/

export interface PresentationDeleteDialogProps {
    deleteDialog: DeleteDialogState;
    onConfirm: () => void;
    onCancel: () => void;
}