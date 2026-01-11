import type { ProductVariant } from "@typings/productVariant/productVariant";
import type { AlertColor } from "@typings/ui/ui";
import type { NavigateFunction } from "react-router-dom";
import type { DialogContextType } from "../../ui/uiModules";
import type { PaymentMethod } from "../enums/sells";
import type { EspecificationsLeftProps } from "../reactComponents";

{/*─────────────────── 🔎 tipos usados en sell 🔎 ───────────────────*/}

    //────────────────────────────────────────── 🔖 SellType 🔖 ─────────────────────────────────────────//

    interface SellEntityInterface {
        currency: string;   
        iva: number;
        modification_date: string | null;
        payment_method: PaymentMethod;
        products: ProductVariant[];
        purchase_date: string;
        seller_id: string;
        seller_name: string;
        sub_total: number;
        ticket_id: string;
        total_amount: number;
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
        errorMessage: string | null,
        isLoading: boolean,
        sells: SellTicketType[],
        sellSelected: SellTicketType | null,
    }

    export type SellStateErrorType = Pick <SellStateInterface, 'errorMessage'>

    //────────────────────────────────────────── 🕐 THUNKS 🕐 ─────────────────────────────────────────//

    type CreateSellRequestPayloadType = Pick<SellTicketType, 
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

    export interface GetSellByIdThunkInterface {
        ticket_id: string;
    }

    export interface DeleteSellByIdThunkInterface {
        ticket_id: string;
    }
    
    //────────────────────────────────────────── 🔗 API 🔗 ─────────────────────────────────────────//

    export type GetSellApiPayloadType = Pick<SellType, 'ticket_id'>;

    export type CreateSellApiPayloadType = Omit<SellType, 'ticket_id' | 'modification_date'>;

    export type DeleteSellApiPayloadType = Pick<SellType, 'ticket_id'>;

   //────────────────────────────────────────── 🪧 Dialog 🪧 ───────────────────────────────────────────//

    export type ProductDialogContextType = Pick<DialogContextType, 'showModal' | 'setShowModal'>

    export interface DialogDataInterface {
        productVariantId: string,
        productVariant: ProductVariant | null,
        requiredStock: number,
        totalPrice: number,
    }

    export interface DialogOnSubmitType {
        data: DialogDataInterface,
        showSnackBar: (message: string, color: AlertColor) => void,
        dispatch: AppDispatch,
        setShowModal: (value: boolean) => void;
    };

    export type DialogVariantDataType = Omit<DialogDataInterface, 'productVariantId'>

    export interface FormatProductTicketInterface {
        productVariant: ProductVariant;
        requiredStock: number;
    }

    export type EvaluateStockType = Pick<EspecificationsLeftProps, 'variants'>

    export interface validateProductSubmissionInterface {
        productVariant: ProductVariant | null;
        requiredStock: number;
    }

    export type ValidationResultType = { valid: true } | { valid: false; message: string };

    export type ValidationResultAdjustedType = { valid: true } | { valid: false; message: string, adjustedValue?: number };

    export interface HandleProductDialogSelectorChangeInterface {
        event: SelectChangeEvent<string>;
        products: ProductVariant[];
        setFieldValue: SetFieldValue<DialogDataInterface>;
    }

    export type validateProductSelectionType = Pick<HandleProductDialogSelectorChangeInterface, 'event' | 'products' > & {
        productId: string;
    };

    export interface HandleProductDialogUnitsChangeInterface {
        incomingValue: number | null | undefined;
        productVariant: ProductVariant | null,
        setFieldValue: SetFieldValue<DialogDataInterface>;
    }

   //────────────────────────────────────────── 📑 Sells Table 📑 ───────────────────────────────────────────//

   export type SellsHandleDetailType = Pick <SellEntityInterface, 'ticket_id'> & {
        navigate: NavigateFunction,
  }

   export type HandleDeleteSellType =  Pick <SellEntityInterface, 'ticket_id'> & {
        dispatch: AppDispatch,
        showSnackBar: (message: string, color: AlertColor) => void,
   }
