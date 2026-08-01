import type { FormModeComplexEnum } from "@typings/shared/sharedEnums";
import type { DeleteDialogState } from "@typings/ui/dialog.types";
import type { BadgeColorEnum } from "@typings/ui/uiEnums";
import type React from "react";
import type { UpdatedPresentationInterface } from "./presentationTypes";
import type { SaleType } from "./presentationEnum";

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

export interface DetailFieldProps {
    icon: ReactNode;
    iconColor: string;
    label: string;
    value: ReactNode;
    badge?: { label: string; color: BadgeColorEnum };
}

export interface GroupBasicInfoProps {
    sku: string;
    barcode: string;
    modelType: string;
    modelSize: string;
    imageUrl?: string;
}

export interface GroupCommercialInfoProps {
    price: number | string;
    expirationDate?: string | Date | null;
    isNotExpired: boolean;
    saleType: SaleType;
}

export interface GroupStockProps {
    minStock: number | string
    stock: number | string;
    hasSufficientStock: boolean;
    saleType: SaleType;
}

export type CategorySelectorBaseProps<C extends string> = {
    id?: string;
    label?: string;
    categories: readonly C[];
    getLabel: (category: C) => string;
    disabled?: boolean;
};

export type CategorySelectorSingleProps<C extends string> = CategorySelectorBaseProps<C> & {
    mode: "single";
    value: C | null;
    onChange: (value: C | null) => void;
    allowClear?: boolean;
    clearLabel?: string;
    catalogFilter?: boolean;
};

export type CategorySelectorMultiProps<C extends string> = CategorySelectorBaseProps<C> & {
    mode: "multi";
    value: C[];
    onChange: (value: C[]) => void;
};

export type CategorySelectorProps<C extends string> =
    | CategorySelectorSingleProps<C>
    | CategorySelectorMultiProps<C>;

export interface PresentationCategoryFieldProps<T> {
    name: keyof T & string;
    label?: string;
}

export interface UseFormikCategorySelectorResult<C> { 
    value: C | null; 
    onChange: (next: C | null) => void 
}

export interface UseFormikCategorySelectorMultiResult<C extends string> {
    value: C[];
    onChange: (next: C[]) => void;
}


// /*══════════════════════════════════════════════════════════════════════╗
// ║ 🧩 Presentation — Shared navigation props                             ║
// ╚══════════════════════════════════════════════════════════════════════╝*/

interface PresentationNavigationProps {
    handleSeeDetail: () => void;
    handleBackToPresentations: () => void;
    handleBackToProducts: () => void;
}

// /*══════════════════════════════════════════════════════════════════════╗
// ║ ✅ Presentation Created ✅✅✅✅✅✅✅✅✅✅✅✅✅✅                      ║
// ╚══════════════════════════════════════════════════════════════════════╝*/

export interface PresentationCreatedActionsProps {
    onCreateAnother: () => void;
}

export interface PresentationCreatedBodyProps {
    name: string;
}

interface PresentationCreatedProps extends PresentationNavigationProps {
    createdPresentation: CreatedPresentationInterface;
    handleCreateAnotherPresentation: () => void;
    handleCreateAnotherProduct: () => void;
}

// /*══════════════════════════════════════════════════════════════════════╗
// ║ ✅ Presentation Edited ✅✅✅✅✅✅✅✅✅✅✅✅✅✅                       ║
// ╚══════════════════════════════════════════════════════════════════════╝*/

interface PresentationEditedProps extends PresentationNavigationProps {
    updatedPresentation: UpdatedPresentationInterface;
}