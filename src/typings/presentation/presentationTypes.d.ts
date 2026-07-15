import type { CreatedProductInterface } from "@typings/product/productTypes";

// /*══════════════════════════════════════════════════════════════════════╗
// ║ 🔒 BASE PRINCIPAL 🔒🔒🔒🔒🔒🔒🔒🔒🔒🔒🔒🔒🔒🔒🔒🔒                     ║
// ╚══════════════════════════════════════════════════════════════════════╝*/

interface PresentationEntity { 
    _id: string;
    brand: string;
    created_at: string;
    description: string;
    expiration_date: string;
    image_url: string;
    min_stock: number;
    model_size: string;
    model_type: string;
    name: string;
    price: number;
    product_id: string;
    sku: string;
    stock: number;
    updated_at: string;
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
    'brand'| 'sku'|'model_type'|'model_size'|
    'stock'|'price'|'expiration_date'>

// /*══════════════════════════════════════════════════════════════════════╗
// ║ 📋 FORMULARIOS 📋📋📋📋📋📋📋📋📋📋📋📋📋📋📋📋📋📋📋📋📋📋         ║
// ╚══════════════════════════════════════════════════════════════════════╝*/

interface PresentationBaseFormValues {
    brand: string;
    description: string;
    expiration_date: string;
    image_url: string;
    min_stock: number;
    model_size: string;
    model_type: string;
    name: string;
    price: number;
    product_id: string;
    sku: string;
    stock: number;
}

// Formulario de CREACIÓN — idéntico a la base por ahora (sin campos extra de variante/stock)
export type PresentationFormValues = PresentationBaseFormValues;

// Formulario de EDICIÓN — solo los campos editables base
export type PresentationEditFormValues = PresentationBaseFormValues;

// Cuerpo enviado al POST /product/create-product
export type CreatePresentationBody = PresentationBaseFormValues & {
    created_at:   string;
    updated_at:   string;
};

// Cuerpo enviado al PATCH /product/:id
export type UpdatePresentationBody = PresentationBaseFormValues & {
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
    createdVariant:      CreatedVariantInterface | null;
    handleNextStep: (
        validateForm: () => Promise<FormikErrors<PresentationFormValues>>,
        onValidSubmit?: () => void,
    ) => Promise<void>;
    handleSubmit:        (values: PresentationFormValues) => Promise<void>;
    handleCreateAnother: () => void;
}

// Hook de formulario de EDICIÓN
export interface UsePresentationEditFormReturn
    extends UsePresentationFormStateBase,
            UsePresentationFormStepsBase {
    variantId:       string | undefined;
    editingVariant:  Presentation | null;
    updatedVariant:  UpdatedPresentationInterface | null;
    isLoadingEntity: boolean;
    handleNextStep: (
        validateForm: () => Promise<FormikErrors<PresentationFormValues>>,
        onValidSubmit?: () => void,
    ) => Promise<void>;
    handleEdit: (values: PresentationFormValues) => Promise<void>;
}


// /*══════════════════════════════════════════════════════════════════════╗
// ║ 🗂️ COLUMNAS  🗂️🗂️🗂️🗂️🗂️🗂️🗂️🗂️🗂️🗂️🗂️🗂️🗂️🗂️🗂️🗂️🗂️🗂️🗂️🗂️           ║
// ╚══════════════════════════════════════════════════════════════════════╝*/

// Argumentos para construir las columnas del grid de presentations
export type BuildColumnsArgs = {
    productId: string;
    onDeleteRequest: (id: string, name: string) => void;
    navigate: ReturnType<typeof useNavigate>;
};

// /*══════════════════════════════════════════════════════════════════════╗
// ║ 🛞 Utilidades  🛞🛞🛞🛞🛞🛞🛞🛞🛞🛞🛞🛞🛞🛞🛞🛞🛞🛞🛞🛞                 
// ╚══════════════════════════════════════════════════════════════════════╝*/

export type CreatedVariantInterface = Pick<CreatedProductInterface, '_id' | 'name'>;

export interface VariantCreatedComponentProps {
    createdVariant: CreatedVariantInterface;
    onCreateAnother: () => void;
}

export interface UpdatedPresentationInterface {
    _id:  string;
    name: string;
}

export interface PresentationFormValues {
    sku:             string;
    model_type:      string;
    model_size:      string;
    image_file?: File | null;
    image_url:       string;
    min_stock:       number;
    stock:           number;
    price:           number;
    expiration_date: string;
}

// /*══════════════════════════════════════════════════════════════════════╗
// ║ 🎟️ TICKET  🎟️🎟️🎟️🎟️🎟️🎟️🎟️🎟️🎟️🎟️🎟️🎟️🎟️🎟️🎟️🎟️🎟️🎟️                       ║
// ╚══════════════════════════════════════════════════════════════════════╝*/

export type PresentationTicketType = PresentationPublic;


type IconConfig = FieldWithIconProps["iconConfig"];

export interface PresentationFormFieldsProps {
    readOnly?: boolean;
    icons?: {
        sku?: IconConfig;
        model_type?: IconConfig;
        model_size?: IconConfig;
        image_url?: FieldIconConfig;
    };
}

export interface PresentationStockFieldsProps {
    icons?: {
        stock?: IconConfig;
        min_stock?: IconConfig;
        price?: IconConfig;
    };
}

export interface ExpirationFieldProps {
    icon?: IconConfig;
}