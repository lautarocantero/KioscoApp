import type { ProductVariant } from "../productVariant/productVariant";

// /*══════════════════════════════════════════════════════════════════════╗
// ║ 🍕 SLICE  🍕🍕🍕🍕🍕🍕🍕🍕🍕🍕🍕🍕🍕🍕🍕🍕🍕🍕🍕                       ║
// ╚══════════════════════════════════════════════════════════════════════╝*/


export interface SellerStateInterface {
    _id: string | null,
    name: string,
    cart: ProductVariant[],
    productSelected: ProductVariant | null,
    description: string,
    createdAt: string,
    updatedAt: string,
    errorMessage: string | null,
};

export interface getProductSelectedPayload {
    product: ProductVariant,
};

export interface SellerAddToCartSlicePayload {
    product: ProductVariant,
};

export type SellerSetProductSlicePayload = Pick<SellerAddToCartSlicePayload, 'product' > & {
};

// /*══════════════════════════════════════════════════════════════════════╗
// ║ 🌀 THUNK  🌀🌀🌀🌀🌀🌀🌀🌀🌀🌀🌀🌀🌀🌀🌀🌀🌀🌀🌀🌀                       ║
// ╚══════════════════════════════════════════════════════════════════════╝*/
export interface SelectProductThunkInterface {
    productData: ProductVariant,
}

export interface AddToCartThunkInterface {
    productData: ProductVariant,
}

export type SellerError = Pick<SellerStateInterface, 'errorMessage'>;
