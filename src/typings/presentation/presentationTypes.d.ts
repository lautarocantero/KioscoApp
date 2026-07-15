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

type CreatePresentationPayload = Omit<PresentationEntity, "_id" | "created_at" | "updated_at">


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