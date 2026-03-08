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
// ║ 🎟️ TICKET  🎟️🎟️🎟️🎟️🎟️🎟️🎟️🎟️🎟️🎟️🎟️🎟️🎟️🎟️🎟️🎟️🎟️🎟️                       ║
// ╚══════════════════════════════════════════════════════════════════════╝*/

export type ProductVariantTicketType = ProductVariantPublic;