import type { CreatedProductInterface } from "@typings/product/productTypes";
import type { TFunction } from "i18next";
import type { RestockDialogState } from "@typings/ui/dialog.types";
import type { ModelUnit, PresentationCategory, SaleType } from "./presentationEnum";

// /*══════════════════════════════════════════════════════════════════════╗
// ║ 🔒 BASE PRINCIPAL 🔒🔒🔒🔒🔒🔒🔒🔒🔒🔒🔒🔒🔒🔒🔒🔒                     ║
// ╚══════════════════════════════════════════════════════════════════════╝*/

interface PresentationEntity { 
    _id: string;
    brand: string;
    category: PresentationCategory[];
    created_at: string;
    description: string;
    expiration_date: string;
    image_url: string;
    min_stock: number;
    model_size: number;
    model_type: string;
    model_unit: ModelUnit;
    name: string;
    price: number;
    product_id: string;
    barcode: string;
    sku: string;
    stock: number;
    updated_at: string;
    is_perishable: boolean
    sale_type: SaleType;
    // ids de ProviderEntity — proveedores asociados a esta presentación. Opcional: puede quedar vacío.
    providers?: string[];
}

// /*══════════════════════════════════════════════════════════════════════╗
// ║ 🧩 DERIVADOS 🧩🧩🧩🧩🧩🧩🧩🧩🧩🧩🧩🧩🧩🧩🧩🧩🧩🧩🧩🧩🧩                ║
// ╚══════════════════════════════════════════════════════════════════════╝*/

// // derivado para no utilizar directamente el PresentationEntity
export type Presentation = PresentationEntity;

export interface ExistingPresentationInterface extends PresentationEntity {}


// // derivado para los datos publicos
export type PresentationPublic = Pick<PresentationEntity, 
    '_id' |'name'| 'description'|'image_url'|
    'brand'| 'sku'|'model_type'|'model_size'|'model_unit'|
    'stock'|'price'|'expiration_date'>

export type CreatedPresentationInterface = Pick<PresentationEntity, '_id' |'name'>


// /*══════════════════════════════════════════════════════════════════════╗
// ║ 📋 FORMULARIOS 📋📋📋📋📋📋📋📋📋📋📋📋📋📋📋📋📋📋📋📋📋📋         ║
// ╚══════════════════════════════════════════════════════════════════════╝*/

interface PresentationBaseFormValues {
    brand: string;
    description: string;
    category: PresentationCategory[];
    expiration_date: string;
    image_url: string;
    min_stock: string;
    model_size: number;
    model_type: string;
    model_unit: ModelUnit | "";
    name: string;
    price: number;
    product_id: string;
    barcode: string;
    sku: string;
    stock: number;
    is_perishable: boolean
    sale_type: SaleType;
    providers?: string[];
}

// Formulario de CREACIÓN — idéntico a la base por ahora (sin campos extra de variante/stock)
export type PresentationFormValues = PresentationBaseFormValues;

// Formulario de EDICIÓN — solo los campos editables base
export type PresentationEditFormValues = PresentationBaseFormValues;

// Cuerpo enviado al POST /product/create-product
// 👇 FIX: se omite también 'model_unit' de la base (que permite "") y se
// redefine como ModelUnit puro, ya que el body enviado a la API nunca
// debe llevar el placeholder vacío del <Select>.
export type CreatePresentationBody = Omit<PresentationBaseFormValues, 'min_stock' | 'model_unit'> & {
    min_stock:  number;
    model_unit: ModelUnit;
    created_at: string;
    updated_at: string;
};

// Cuerpo enviado al PATCH /product/:id
// 👇 mismo fix que arriba
export type UpdatePresentationBody = Omit<PresentationBaseFormValues, 'min_stock' | 'model_unit'> & {
    min_stock:  number;
    model_unit: ModelUnit;
    updated_at: string;
};

// /*══════════════════════════════════════════════════════════════════════╗
// ║ 🍕 SLICE  🍕🍕🍕🍕🍕🍕🍕🍕🍕🍕🍕🍕🍕🍕🍕🍕🍕🍕🍕                       ║
// ╚══════════════════════════════════════════════════════════════════════╝*/

// tipo del slice
export interface PresentationState {
    presentations: Presentation[];
    selectedPresentation: Presentation | null;
    isLoading: boolean;
    errorMessage: string | null;
    // Catálogo completo de presentaciones (todas las variantes, sin filtrar
    // por producto) — usado por el dashboard de /shop para el detalle de
    // stock bajo. Separado de `presentations` (que es por-producto) para
    // no pisarse entre sí.
    allPresentations: Presentation[];
    isLoadingAllPresentations: boolean;
    allPresentationsError: string | null;
}

export type PresentationStateError = Pick<PresentationState, 'errorMessage'>;

// /*══════════════════════════════════════════════════════════════════════╗
// ║ 🪝 Hooks  🪝🪝🪝🪝🪝🪝🪝🪝🪝🪝🪝🪝🪝🪝🪝🪝🪝🪝🪝                       ║
// ╚══════════════════════════════════════════════════════════════════════╝*/

export interface UsePresentationDataResult {
    presentationData: Presentation | null;
    isLoading: boolean;
    error: string | null;
}

export interface UsePresentationsListDataResult {
    presentations: Presentation[];
    loading: boolean;
    error: string | null;
    searchTerm: string;
    setSearchTerm: (term: string) => void;
}

// Base reutilizable para hooks de formulario de presentación (submit state)
interface UsePresentationFormStateBase {
    isSubmitting: boolean;
    submitError:  string | null;
    stepErrors:   string[];
}

// Base reutilizable para hooks de formulario multi-paso
interface UsePresentationFormStepsBase {
    currentStep: number;
    totalSteps:  number;
    handlePrevStep: () => void;
}

// Hook de formulario de CREACIÓN
export interface UsePresentationFormReturn
    extends UsePresentationFormStateBase,
            UsePresentationFormStepsBase {
    productId:           string | undefined;
    productData:         Product | null;
    loadingProduct:      boolean;
    productError:        string | null;
    createdPresentation:      CreatedPresentationInterface | null;
    handleNextStep: (
        validateForm: () => Promise<FormikErrors<PresentationFormValues>>,
        onValidSubmit?: () => void,
    ) => Promise<void>;
    handleSubmit:        (values: PresentationFormValues) => Promise<void>;
    handleCreateAnotherPresentation: () => void;
    handleSeeDetail: () => void;
    handleBackToPresentations: () => void;
    handleCreateAnotherProduct: () => void;
    handleBackToProducts: () => void;
}

// Hook de formulario de EDICIÓN
export interface UsePresentationEditFormReturn
    extends UsePresentationFormStateBase,
            UsePresentationFormStepsBase {
    variantId:       string | undefined;
    editingVariant:  Presentation | null;
    updatedPresentation:  UpdatedPresentationInterface | null;
    isLoadingEntity: boolean;
    handleNextStep: (
        validateForm: () => Promise<FormikErrors<PresentationFormValues>>,
        onValidSubmit?: () => void,
    ) => Promise<void>;
    handleEdit: (values: PresentationFormValues) => Promise<void>;
    handleSeeDetail: () => void;
    handleBackToPresentations: () => void;
    handleBackToProducts: () => void;
}

export interface UsePresentationDetailStatusReturn {
    hasSufficientStock: boolean;
    isNotExpired: boolean;
}

// /*══════════════════════════════════════════════════════════════════════╗
// ║ 🚚 PROVEEDORES DE LA PRESENTACIÓN 🚚🚚🚚🚚🚚🚚🚚🚚🚚🚚🚚🚚🚚🚚🚚🚚🚚🚚  ║
// ╚══════════════════════════════════════════════════════════════════════╝*/

export interface UsePresentationProvidersFieldReturn {
    providerOptions: string[];
    loading: boolean;
    getProviderLabel: (providerId: string) => string;
}

export interface UseCategorySelectorParams<C extends string> {
    value: C | null;
    onChange: (value: C | null) => void;
    getLabel: (category: C) => string;
    disabled?: boolean;
}

export interface UseCategorySelectorMultiParams<C extends string> {
    categories: readonly C[];
    selected: C[];
    onChange: (next: C[]) => void;
}

export interface UseCategorySelectorResult<C extends string> {
    anchorEl: HTMLElement | null;
    isMenuOpen: boolean;
    onOpenMenu: (event: React.MouseEvent<HTMLElement>) => void;
    onCloseMenu: () => void;
    handleSelect: (category: C | null) => void;
    selectedLabel: string | null;
}

export interface UseCategorySelectorMultiResult<C extends string> {
    availableOptions: C[];
    handleSelect: (event: SelectChangeEvent<string>) => void;
    handleRemove: (category: C) => void;
}

// /*══════════════════════════════════════════════════════════════════════╗
// ║ 🗂️ COLUMNAS  🗂️🗂️🗂️🗂️🗂️🗂️🗂️🗂️🗂️🗂️🗂️🗂️🗂️🗂️🗂️🗂️🗂️🗂️🗂️🗂️           ║
// ╚══════════════════════════════════════════════════════════════════════╝*/

// Argumentos para construir las columnas del grid de presentations
export type BuildColumnsArgs = {
    onDeleteRequest: (id: string, name: string) => void;
    onRestockRequest: (presentation: Presentation) => void;
    navigate: ReturnType<typeof useNavigate>;
    t: TFunction;
};

// /*══════════════════════════════════════════════════════════════════════╗
// ║ 🛞 Utilidades  🛞🛞🛞🛞🛞🛞🛞🛞🛞🛞🛞🛞🛞🛞🛞🛞🛞🛞🛞🛞                 
// ╚══════════════════════════════════════════════════════════════════════╝*/

export interface PresentationCreatedComponentProps {
    createdPresentation: CreatedPresentationInterface;
    handleCreateAnotherPresentation: () => void;
    handleSeeDetail: () => void;
    handleBackToPresentations: () => void;
    handleCreateAnotherProduct: () => void;
    handleBackToProducts: () => void;
}

export interface UpdatedPresentationInterface {
    _id:  string;
    name: string;
}

// /*══════════════════════════════════════════════════════════════════════╗
// ║ 📦 REPOSICIÓN DE STOCK 📦📦📦📦📦📦📦📦📦📦📦📦📦📦📦📦📦📦📦📦📦     ║
// ╚══════════════════════════════════════════════════════════════════════╝*/

export interface UseRestockPresentationReturn {
    restockDialog: RestockDialogState;
    stockValue: number;
    isSubmitting: boolean;
    errorMessage: string | null;
    handleRestockRequest: (presentation: Presentation) => void;
    handleStockChange: (value: number) => void;
    handleRestockCancel: () => void;
    handleRestockConfirm: () => Promise<void>;
}

// /*══════════════════════════════════════════════════════════════════════╗
// ║ 🎟️ TICKET  🎟️🎟️🎟️🎟️🎟️🎟️🎟️🎟️🎟️🎟️🎟️🎟️🎟️🎟️🎟️🎟️🎟️🎟️                       ║
// ╚══════════════════════════════════════════════════════════════════════╝*/

export type PresentationTicketType = PresentationPublic;


type IconConfig = FieldWithIconProps["iconConfig"];