// /*══════════════════════════════════════════════════════════════════════╗
// ║ 🔒 BASE PRINCIPAL 🔒🔒🔒🔒🔒🔒🔒🔒🔒🔒🔒🔒🔒🔒🔒🔒                     ║
// ╚══════════════════════════════════════════════════════════════════════╝*/

interface ProductVariantEntity { 
    _id: string | null;
    name: string;
    description: string;
    createdAt: string;
    updatedAt: string;
    imageUrl: string;
    galleryUrls: string[];
    brand: string;
    productId: string;
    sku: string;
    modelType: string;
    model_size: string;
    min_stock: number;
    stock: number;
    price: number;
    expirationDate: string;
}

// /*══════════════════════════════════════════════════════════════════════╗
// ║ 🧩 DERIVADOS 🧩🧩🧩🧩🧩🧩🧩🧩🧩🧩🧩🧩🧩🧩🧩🧩🧩🧩🧩🧩🧩                ║
// ╚══════════════════════════════════════════════════════════════════════╝*/

// // derivado para no utilizar directamente el ProductVariantEntity
export type ProductVariant = ProductVariantEntity;

// // derivado para los datos publicos
export type ProductVariantPublic = Pick<ProductVariantEntity, 
    '_id' |'name'| 'description'|'imageUrl'|
    'brand'| 'sku'|'modelType'|'model_size'|
    'stock'|'price'|'expirationDate'>

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