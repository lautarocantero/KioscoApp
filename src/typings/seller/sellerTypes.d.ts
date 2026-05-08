import type { ProductVariant } from "../productVariant/productVariantTypes";
import type { CartAmount } from "./seller";

//────────────────────────────────────────────♦️ PRODUCTS ♦️───────────────────────────────────────────//

export type ProductTicketType = Pick<ProductVariant, 
    '_id' | 'name' | 'description' | 'image_url' | 'brand' |
    'product_id' | 'sku' | 'model_type' | 'model_size' | 'price' | 
    'expiration_date'> &  {
    stock_required: number,
}

//──────────────────────────────────────────── 🍕 SLICE  🍕 ───────────────────────────────────────────//

export interface SellerStateInterface {
    _id: string | null,
    name: string,
    cart: ProductTicketType[],
    productSelected: ProductVariant | null,
    description: string,
    created_at: string,
    updated_at: string,
    errorMessage: string | null,
};

export interface getProductSelectedPayload {
    product: Product,
};

export interface SellerAddToCartSlicePayload {
    product: ProductTicketType,
};

export type SellerAddUnitActionPayload = Pick<SellerStateInterface, '_id'>

export type SellerRemoveFromCartActionPayload = Pick<SellerStateInterface, '_id'> & {
    amount: CartAmount,
}

export interface SellerSetProductSlicePayload {
    product: ProductVariant,
};

//──────────────────────────────────────────── 🌀 THUNK 🌀 ───────────────────────────────────────────//

export interface SelectProductThunkInterface {
    productData: ProductVariant,
}

export interface AddToCartThunkInterface {
    productData: ProductTicketType,
}

export type addOneUnitThunkInterface = Pick<SellerStateInterface, '_id'>

export type removeFromCartInterface = Pick<SellerStateInterface, '_id'> & {
    amount: CartAmount,
}

export type SellerError = Pick<SellerStateInterface, 'errorMessage'>;
