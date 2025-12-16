import type { ProductVariant } from "../productVariant/productVariant";

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
    cart: ProductTicket[],
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
    product: ProductTicket,
};

export interface SellerSetProductSlicePayload {
    product: ProductVariant,
};

//──────────────────────────────────────────── 🌀 THUNK 🌀 ───────────────────────────────────────────//

export interface SelectProductThunkInterface {
    productData: ProductVariant,
}

export interface AddToCartThunkInterface {
    productData: ProductTicket,
}

export type SellerError = Pick<SellerStateInterface, 'errorMessage'>;
