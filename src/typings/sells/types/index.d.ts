import type { DialogContextType } from "../../ui/uiModules";
import type { PaymentMethod } from "../enums/sells";

{/*─────────────────── 🔎 tipos usados en sell 🔎 ───────────────────*/}

declare module '@typings/sell-types' {

    //────────────────────────────────────────── 🔖 Sell 🔖 ─────────────────────────────────────────//

    interface SellEntity {
        ticket_id: string;
        purchase_date: string;
        modification_date: string | null;
        seller_id: string;
        seller_name: string;
        payment_method: PaymentMethod;
        products: ProductVariant[];
        sub_total: number;
        iva: number;
        total_amount: number;
        currency: string;   
    }

    export type SellTicketType = Pick<SellEntity, 
        'currency' |
        'iva' | 
        'modification_date' | 
        'payment_method' | 
        'products' | 
        'purchase_date' | 
        'seller_id' | 
        'seller_name' | 
        'sub_total' | 
        'ticket_id' | 
        'total_amount'  
        >;

    export type Sell = SellEntity;

    //────────────────────────────────────────── 🍕 SLICE 🍕 ─────────────────────────────────────────//

    export interface SellState { 
        sells: SellTicketType[],
        sellSelected: SellTicketType | null,
        isLoading: boolean,
        errorMessage: string | null,
    }

    export type SellStateError = Pick <SellState, 'errorMessage'>

    //────────────────────────────────────────── 🕐 THUNKS 🕐 ─────────────────────────────────────────//

    export type CreateSellRequestPayload = Pick<SellTicketType, 
        'currency' |
        'iva' | 
        'payment_method' | 
        'products' | 
        'purchase_date' | 
        'seller_id' | 
        'seller_name' | 
        'sub_total' | 
        'total_amount'
    >

    export interface CreateSellSanitizedPayload {
        data: CreateSellRequestPayload;
    }

    //────────────────────────────────────────── 🔗 API 🔗 ─────────────────────────────────────────//

    export type CreateSellApiPayload = Omit<Sell, 'ticket_id' | 'modification_date'>;

   //────────────────────────────────────────── 🪧 Dialog 🪧 ───────────────────────────────────────────//

    export type ProductDialogContextType = Pick<DialogContextType, 'showModal' | 'setShowModal'>
    export type SellDialogContextType = Pick<DialogContextType, 'showModal' | 'setShowModal'>

    export interface DialogDataInterface {
        productVariantId: string,
        productVariant: ProductVariant | null,
        requiredStock: number,
        totalPrice: number,
    }

    export type DialogVariantDataInterface = Omit<DialogDataInterface, 'productVariantId'>

    export type VariantDialogDataInterface = Pick<DialogDataInterface, 'productVariant' | 'requiredStock' | 'totalPrice'>;

}