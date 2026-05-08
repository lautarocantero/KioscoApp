import type { CreatedProductInterface } from "@typings/product/productTypes";

// /*══════════════════════════════════════════════════════════════════════╗
// ║ 🔒 BASE PRINCIPAL 🔒🔒🔒🔒🔒🔒🔒🔒🔒🔒🔒🔒🔒🔒🔒🔒                     ║
// ╚══════════════════════════════════════════════════════════════════════╝*/

interface ProductVariantEntity { 
    _id: string | null;
    brand: string;
    created_at: string;
    description: string;
    expiration_date: string;
    gallery_urls: string[];
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

// // derivado para no utilizar directamente el ProductVariantEntity
export type ProductVariant = ProductVariantEntity;

// // derivado para los datos publicos
export type ProductVariantPublic = Pick<ProductVariantEntity, 
    '_id' |'name'| 'description'|'image_url'|
    'brand'| 'sku'|'model_type'|'model_size'|
    'stock'|'price'|'expiration_date'>

// /*══════════════════════════════════════════════════════════════════════╗
// ║ 🍕 SLICE  🍕🍕🍕🍕🍕🍕🍕🍕🍕🍕🍕🍕🍕🍕🍕🍕🍕🍕🍕                       ║
// ╚══════════════════════════════════════════════════════════════════════╝*/

// tipo del slice
interface ProductVariantState {
    productVariants: ProductVariant[],
    isLoading: boolean,
    errorMessage: string | null,
}

export type ProductVariantStateError = Pick<ProductVariantState, 'errorMessage'>;

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

export interface ProductVariantFormValues {
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

export type ProductVariantTicketType = ProductVariantPublic;
