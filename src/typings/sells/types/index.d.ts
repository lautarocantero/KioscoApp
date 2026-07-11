import type { Presentation } from "@typings/presentation/presentationTypes";
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
        products: Presentation[];
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

    //────────────────────────────────────────── 🔗 HOOKS 🔗 ─────────────────────────────────────────//

    export interface UseSellsResult {
        count: number | null;
        lastSaleAt: string | null;
        loading: boolean;
        error: string | null;
    }

   //────────────────────────────────────────── 🪧 Dialog 🪧 ───────────────────────────────────────────//

    export type ProductDialogContextType = Pick<DialogContextType, 'showModal' | 'setShowModal'>

    export interface DialogDataInterface {
        PresentationId: string,
        Presentation: Presentation | null,
        requiredStock: number,
        totalPrice: number,
    }

    export interface DialogOnSubmitType {
        data: DialogDataInterface,
        showSnackBar: (message: string, color: AlertColor) => void,
        dispatch: AppDispatch,
    };

    export type DialogVariantDataType = Omit<DialogDataInterface, 'PresentationId'>

    export interface FormatProductTicketInterface {
        Presentation: Presentation;
        requiredStock: number;
    }

    export type EvaluateStockType = Pick<EspecificationsLeftProps, 'presentations'>

    export interface validateProductSubmissionInterface {
        Presentation: Presentation | null;
        requiredStock: number;
    }

    export type ValidationResultType =  { valid: boolean; message?: string, adjustedValue?: number };

    export interface HandleProductDialogSelectorChangeInterface {
        event: SelectChangeEvent<string>;
        products: Presentation[];
        setFieldValue: SetFieldValue<DialogDataInterface>;
    }

    export type validateProductSelectionType = Pick<HandleProductDialogSelectorChangeInterface, 'event' | 'products' > & {
        productId: string;
    };

    export interface HandleProductDialogUnitsChangeInterface {
        incomingValue: number | null | undefined;
        Presentation: Presentation | null,
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
