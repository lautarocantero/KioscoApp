import type { ProductVariant } from "@typings/productVariant/productVariant";
import type { DialogContextType } from "../../ui/uiModules";
import type { PaymentMethod } from "../enums/sells";
import type { NavigateFunction } from "react-router-dom";
import type { AlertColor } from "@typings/ui/ui";

{/*─────────────────── 🔎 tipos usados en sell 🔎 ───────────────────*/}

    //────────────────────────────────────────── 🔖 SellType 🔖 ─────────────────────────────────────────//

    interface SellEntityInterface {
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

    export type SellTicketType = Pick<SellEntityInterface, 
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

    export type SellType = SellEntityInterface;

    //────────────────────────────────────────── 🍕 SLICE 🍕 ─────────────────────────────────────────//

    export interface SellStateInterface { 
        sells: SellTicketType[],
        sellSelected: SellTicketType | null,
        isLoading: boolean,
        errorMessage: string | null,
    }

    export type SellStateErrorType = Pick <SellStateInterface, 'errorMessage'>

    //────────────────────────────────────────── 🕐 THUNKS 🕐 ─────────────────────────────────────────//

    export type CreateSellRequestPayloadType = Pick<SellTicketType, 
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

    export interface CreateSellSanitizedPayloadInterface {
        data: CreateSellRequestPayloadType;
    }

    //────────────────────────────────────────── 🔗 API 🔗 ─────────────────────────────────────────//

    export type GetSellApiPayloadType = Pick<SellType, 'ticket_id'>;

    export type CreateSellApiPayloadType = Omit<SellType, 'ticket_id' | 'modification_date'>;

    export type DeleteSellApiPayloadType = Pick<SellType, 'ticket_id'>;

   //────────────────────────────────────────── 🪧 Dialog 🪧 ───────────────────────────────────────────//

    export type ProductDialogContextType = Pick<DialogContextType, 'showModal' | 'setShowModal'>

    export type SellDialogContextType = Pick<DialogContextType, 'showModal' | 'setShowModal'>

    export interface DialogDataInterface {
        productVariantId: string,
        productVariant: ProductVariant | null,
        requiredStock: number,
        totalPrice: number,
    }

    export interface ProductDialogInitialValues {
        productVariants: ProductVariant[],
    }

    export type DialogVariantDataType = Omit<DialogDataInterface, 'productVariantId'>

    export type VariantDialogDataType = Pick<DialogDataInterface, 'productVariant' | 'requiredStock' | 'totalPrice'>;

   //────────────────────────────────────────── 📑 Sells Table 📑 ───────────────────────────────────────────//

   export interface SellsHandleDetailInterface {
        ticket_id: string,
        navigate: NavigateFunction,
   }

   export interface HandleDeleteSellInterface {
        ticket_id: string,
        dispatch: AppDispatch,
        showSnackBar: (message: string, color: AlertColor) => void,
   }
