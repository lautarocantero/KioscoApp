import type { FormModeComplexEnum } from "@typings/shared/sharedEnums";
import type { DeleteDialogState } from "@typings/ui/dialog.types";
import type { BadgeColorEnum } from "@typings/ui/uiEnums";
import type React from "react";
import type { UpdatedPresentationInterface } from "./presentationTypes";

// /*══════════════════════════════════════════════════════════════════════╗
// ║ 📋 PresentationForm  📋📋📋📋📋📋📋📋📋📋📋📋📋📋                       ║
// ╚══════════════════════════════════════════════════════════════════════╝*/

export interface PresentationFormProps {
    mode?: FormModeComplexEnum,
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
// ║ ✅ Presentation Edited  ✅✅✅✅✅✅✅✅✅✅✅✅✅✅                       ║
// ╚══════════════════════════════════════════════════════════════════════╝*/

interface PresentationEditedProps { updatedVariant: UpdatedPresentationInterface; }