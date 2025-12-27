// /*══════════════════════════════════════════════════════════════════════╗
// ║ 🔒 BASE PRINCIPAL 🔒🔒🔒🔒🔒🔒🔒🔒🔒🔒🔒🔒🔒🔒🔒🔒                     ║
// ╚══════════════════════════════════════════════════════════════════════╝*/

interface ProductVariantEntity { 
    _id: string | null;
    name: string;
    description: string;
    created_at: string;
    updated_at: string;
    image_url: string;
    gallery_urls: string[];
    brand: string;
    product_id: string;
    sku: string;
    model_type: string;
    model_size: string;
    min_stock: number;
    stock: number;
    price: number;
    expiration_date: string;
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
// ║ 🎟️ TICKET  🎟️🎟️🎟️🎟️🎟️🎟️🎟️🎟️🎟️🎟️🎟️🎟️🎟️🎟️🎟️🎟️🎟️🎟️                       ║
// ╚══════════════════════════════════════════════════════════════════════╝*/

export type ProductVariantTicketType = ProductVariantPublic;