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

// // derivado para los datos publicos
export type PresentationPublic = Pick<PresentationEntity, 
    '_id' |'name'| 'description'|'image_url'|
    'brand'| 'sku'|'model_type'|'model_size'|
    'stock'|'price'|'expiration_date'>

// /*══════════════════════════════════════════════════════════════════════╗
// ║ 🍕 SLICE  🍕🍕🍕🍕🍕🍕🍕🍕🍕🍕🍕🍕🍕🍕🍕🍕🍕🍕🍕                       ║
// ╚══════════════════════════════════════════════════════════════════════╝*/

// tipo del slice
interface PresentationState {
    Presentations: Presentation[],
    isLoading: boolean,
    errorMessage: string | null,
}

export type PresentationStateError = Pick<PresentationState, 'errorMessage'>;

// /*══════════════════════════════════════════════════════════════════════╗
// ║ 🪝 Hooks  🪝🪝🪝🪝🪝🪝🪝🪝🪝🪝🪝🪝🪝🪝🪝🪝🪝🪝🪝                       ║
// ╚══════════════════════════════════════════════════════════════════════╝*/

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
    min_stock:       number | "";
    stock:           number | "";
    price:           number | "";
    expiration_date: string;
}

// /*══════════════════════════════════════════════════════════════════════╗
// ║ 🎟️ TICKET  🎟️🎟️🎟️🎟️🎟️🎟️🎟️🎟️🎟️🎟️🎟️🎟️🎟️🎟️🎟️🎟️🎟️🎟️                       ║
// ╚══════════════════════════════════════════════════════════════════════╝*/

export type PresentationTicketType = PresentationPublic;


type IconConfig = FieldWithIconProps["iconConfig"];

export interface PresentationFormFieldsProps {
    icons?: {
        sku?: IconConfig;
        model_type?: IconConfig;
        model_size?: IconConfig;
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