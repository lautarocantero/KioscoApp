import type { ProductTicketType } from "@typings/sells/sellTypes";
import type { Presentation } from "../presentation/presentationTypes";
import type { CartAmount } from "./seller";


//──────────────────────────────────────────── 🍕 SLICE  🍕 ───────────────────────────────────────────//

export interface SellerStateInterface {
    _id: string | null,
    name: string,
    cart: ProductTicketType[],
    productSelected: Presentation | null,
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
    product: Presentation,
};

//──────────────────────────────────────────── 🌀 THUNK 🌀 ───────────────────────────────────────────//

export interface SelectProductThunkInterface {
    productData: Presentation,
}

export interface AddToCartThunkInterface {
    productData: ProductTicketType,
}

export type addOneUnitThunkInterface = Pick<SellerStateInterface, '_id'>

export type removeFromCartInterface = Pick<SellerStateInterface, '_id'> & {
    amount: CartAmount,
}

export type SellerError = Pick<SellerStateInterface, 'errorMessage'>;
