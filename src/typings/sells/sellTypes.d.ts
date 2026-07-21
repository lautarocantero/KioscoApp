import type { Presentation } from "@typings/presentation/presentationTypes";
import type { AlertColor } from "@typings/ui/ui";
import type { NavigateFunction } from "react-router-dom";
import type { DialogContextType } from "../../ui/uiModules";
import type { PaymentMethod } from "./sellsEnum";
import type { EspecificationsLeftProps } from "./SellComponentTypes";
import type { ReactNode, RefObject, MouseEvent, SetStateAction } from "react";
import type { SelectChangeEvent } from "@mui/material";
import type { GridColDef } from "@mui/x-data-grid";

{/*─────────────────── 🔎 tipos usados en sell 🔎 ───────────────────*/}

//────────────────────────────────────────── 🔖 Sell 🔖 ─────────────────────────────────────────//

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
    _id: string;
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
    '_id' |
    'total_amount'
    >;

export type Sell = SellEntityInterface;

// /*══════════════════════════════════════════════════════════════════════╗
// ║ 📋 FORMULARIOS 📋📋📋📋📋📋📋📋📋📋📋📋📋📋📋📋📋📋📋📋📋📋         ║
// ╚══════════════════════════════════════════════════════════════════════╝*/

export interface SellEditFormValues {
    _id: string;
    purchase_date: string;
    modification_date: string | null;
    seller_id: string;
    seller_name: string;
    payment_method: PaymentMethod;
    products: ProductTicketType[];
    sub_total: number;
    iva: number;
    total_amount: number;
    currency: string;
}

export type SoldProductRow = {
    id: string;
    productId: string;
    presentationId: string;
    name: string;
    sku: string;
    imageUrl?: string;
    quantity: number;
    unitPrice: number;
    subtotal: number;
};

export interface PaymentDetail {
    methodLabel: string;
    approved: boolean;
    reference: string;
    paymentDate: string;
}

export interface InfoItem {
    icon: ReactNode;
    color: string;
    label: string;
    value: string;
    hint?: string;
    badge?: string;
}

export interface PurchaseDateParts {
    date: string;
    time: string;
    timezone: string;
}

//────────────────────────────────────────── 🍕 SLICE 🍕 ─────────────────────────────────────────//

export interface SellStateInterface {
    errorMessage: string | null,
    isLoading: boolean,
    sells: SellTicketType[],
    currentSell: SellTicketType | null,
    isLoadingCurrent: boolean,
    currentSellError: string | null,
}

export type SellStateErrorType = Pick<SellStateInterface, 'errorMessage'>

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
    _id: string;
}

export interface DeleteSellByIdThunkInterface {
    _id: string;
}

export type EditSellRequestPayloadType = Pick<Sell,
    '_id' |
    'currency' |
    'iva' |
    'modification_date' |
    'payment_method' |
    'products' |
    'purchase_date' |
    'seller_id' |
    'seller_name' |
    'sub_total' |
    'total_amount'
>;

export interface EditSellSanitizedPayloadInterface {
    data: EditSellRequestPayloadType;
}

//────────────────────────────────────────── 🔗 API 🔗 ─────────────────────────────────────────//

export type GetSellApiPayloadType = Pick<Sell, '_id'>;

export type CreateSellApiPayloadType = Omit<Sell, '_id' | 'modification_date'>;

export type DeleteSellApiPayloadType = Pick<Sell, '_id'>;

export type EditSellApiPayloadType = EditSellRequestPayloadType;

//────────────────────────────────────────── 🔗 HOOKS 🔗 ─────────────────────────────────────────//

export interface UseSellsResult {
    count: number | null;
    lastSaleAt: string | null;
    loading: boolean;
    error: string | null;
}

export interface UseCartPresentationPickerReturn {
    productSelected: Presentation | null;
    presentations: Presentation[];
}

export interface UseSellsListDataResult {
    sells: SellTicketType[];
    loading: boolean;
    error: string | null;
    searchTerm: string;
    setSearchTerm: (term: string) => void;
}

export interface UseSellsReturn extends UseSellsListDataResult {
    deleteDialog: DeleteDialogState;
    clearError: () => void;
    handleDeleteRequest: (id: string, name: string) => void;
    handleDeleteCancel: () => void;
    handleDeleteConfirm: () => Promise<void>;
    columns: GridColDef<SellTicketType>[];
}

export interface UseSellDataResult {
    sellData: SellTicketType | null;
    isLoading: boolean;
    error: string | null;
}

export interface UsePrintSellTicketReturn {
    printTicket: (ticket: SellTicketType) => void;
}

export interface UseSellbarResult {
    search: {
        value: string;
        onChange: (value: string) => void;
        onClear: () => void;
    };
    barcode: {
        showBarcodeInput: boolean;
        value: string;
        inputRef: RefObject<HTMLInputElement | null>;
        toggleShowInput: () => void;
        onChange: (value: string) => void;
        onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
    };
    cart: {
        count: number | undefined;
        goToCart: () => void;
    };
    categories: {
        list: PresentationCategory[];
        isLoading: boolean;
        selected: PresentationCategory | null;
        selectedLabel: string | null;
        getLabel: (category: PresentationCategory) => string;
        anchorEl: HTMLElement | null;
        isMenuOpen: boolean;
        onOpenMenu: (event: MouseEvent<HTMLElement>) => void;
        onCloseMenu: () => void;
        onSelect: (category: PresentationCategory | null) => void;
    };
}

/*══════════════════════════════════════════════════════════════════════╗
║ 📷 useSellbarBarcode                                                  ║
╚══════════════════════════════════════════════════════════════════════╝*/

export interface UseSellbarBarcodeParams {
    cart: ProductTicketType[];
    showSnackBar: (message: string, severity: AlertColor) => void;
}

export type UseSellbarBarcodeResult = UseSellbarResult['barcode'];

/*══════════════════════════════════════════════════════════════════════╗
║ 🛒 useSellbarCart                                                     ║
╚══════════════════════════════════════════════════════════════════════╝*/

export type UseSellbarCartResult = UseSellbarResult['cart'];

/*══════════════════════════════════════════════════════════════════════╗
║ 🏷️ useSellbarCategories                                               ║
╚══════════════════════════════════════════════════════════════════════╝*/

export interface UseSellbarCategoriesParams {
    showSnackBar: (message: string, severity: AlertColor) => void;
}

export type UseSellbarCategoriesResult = UseSellbarResult['categories'] & {
    selectedCategory: PresentationCategory | null;
};

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

export type ValidationResultType = { valid: boolean; message?: string, adjustedValue?: number };

export interface HandleProductDialogSelectorChangeInterface {
    event: SelectChangeEvent<string>;
    products: Presentation[];
    setFieldValue: SetFieldValue<DialogDataInterface>;
}

export type validateProductSelectionType = Pick<HandleProductDialogSelectorChangeInterface, 'event' | 'products'> & {
    productId: string;
};

export interface HandleProductDialogUnitsChangeInterface {
    incomingValue: number | null | undefined;
    Presentation: Presentation | null,
    setFieldValue: SetFieldValue<DialogDataInterface>;
}

//────────────────────────────────────────── 📑 Sells Table 📑 ───────────────────────────────────────────//

export type SellsHandleDetailType = Pick<SellEntityInterface, '_id'> & {
    navigate: NavigateFunction,
}

export type HandleDeleteSellType = Pick<SellEntityInterface, '_id'> & {
    dispatch: AppDispatch,
    showSnackBar: (message: string, color: AlertColor) => void,
}

export interface BuildColumnsForSellsArgs {
    onDeleteRequest: (id: string, name: string) => void;
    navigate: (path: string) => void;
}