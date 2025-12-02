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
    modelSize: string;
    minStock: number;
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
export type ProductVariantPublic = Omit<ProductVariantEntity, '_id'>

// /*══════════════════════════════════════════════════════════════════════╗
// ║ 🍕 SLICE  🍕🍕🍕🍕🍕🍕🍕🍕🍕🍕🍕🍕🍕🍕🍕🍕🍕🍕🍕                       ║
// ╚══════════════════════════════════════════════════════════════════════╝*/

// tipo del slice
interface ProductVariantState {
    items: ProductVariant[],
    isLoading: boolean,
    errorMessage: string | null,
}


