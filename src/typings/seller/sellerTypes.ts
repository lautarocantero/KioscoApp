import type { CartFormValues, ProductTicketType, ProductTicketWithStockType, TicketSummaryType } from "@typings/sells/sellTypes";
import type { Presentation } from "../presentation/presentationTypes";
import type { CartAmount, SellerRol, SellerStatus, SortOption, ViewMode } from "./sellerEnums";
import type { Product, ProductWithPresentations } from "@typings/product/productTypes";
import type { AlertColor } from "@typings/ui/ui";
import type { PresentationCategory } from "@typings/presentation/presentationEnum";
import type { RefObject, MouseEvent } from "react";
import type { GridColDef } from "@mui/x-data-grid";
import type { AppDispatch } from "../../store/seller/sellerSlice";
import type { PaymentMethod } from "@typings/sells/sellsEnum";
import type { FormikErrors, FormikTouched } from "formik";


export interface Seller {
    _id:          string;
    name:         string;
    email:        string;
    password:     string;
    rol:          SellerRol;
    created_at:   string;
    user_status:  SellerStatus;
    __v?:         number;
}

// /*══════════════════════════════════════════════════════════════════════╗
// ║ 🧩 DERIVADOS 🧩🧩🧩🧩🧩🧩🧩🧩🧩🧩🧩🧩🧩🧩🧩🧩🧩🧩🧩🧩🧩                ║
// ╚══════════════════════════════════════════════════════════════════════╝*/

// // derivado para el slice
export interface SellerSliceState {
    sellers:       Seller[];
    isLoading:     boolean;
    errorMessage:  string | null;
}

// /*══════════════════════════════════════════════════════════════════════╗
// ║ 📦 PAYLOADS 📦📦📦📦📦📦📦📦📦📦📦📦📦📦📦                         ║
// ╚══════════════════════════════════════════════════════════════════════╝*/

export type CreateSellerPayload = Omit<Seller, "_id" | "__v">;

export type EditSellerPayload = Omit<Seller, "__v">;

export interface DeleteSellerPayload {
    _id: string;
}

// /*══════════════════════════════════════════════════════════════════════╗
// ║ 🍕 SLICE 🍕🍕🍕🍕🍕🍕🍕🍕🍕🍕🍕🍕🍕🍕🍕🍕🍕🍕🍕                       ║
// ╚══════════════════════════════════════════════════════════════════════╝*/


export interface SellerStateInterface {
    _id: string | null,
    name: string,
    cart: ProductTicketWithStockType[],
    productSelected: ProductWithPresentations | null,
    description: string,
    created_at: string,
    updated_at: string,
    errorMessage: string | null,
    sort: SortOption,
    viewMode: ViewMode,
    page: number,
};

export interface getProductSelectedPayload {
    product: Product,
};

export interface SellerAddToCartSlicePayload {
    product: ProductTicketWithStockType,
};

export type SellerAddUnitActionPayload = Pick<SellerStateInterface, '_id'>

export type SellerRemoveFromCartActionPayload = Pick<SellerStateInterface, '_id'> & {
    amount: CartAmount,
}

export interface SellerSetProductSlicePayload {
    product: ProductWithPresentations,
};

export type SellerSetSortPayload = Pick<SellerStateInterface, 'sort'>

export type SellerSetViewModePayload = Pick<SellerStateInterface, 'viewMode'>

export type SellerSetPagePayload = Pick<SellerStateInterface, 'page'>

// /*══════════════════════════════════════════════════════════════════════╗
// ║ 🌀 THUNK 🌀🌀🌀🌀🌀🌀🌀🌀🌀🌀🌀🌀🌀🌀🌀🌀🌀🌀🌀🌀🌀🌀🌀               ║
// ╚══════════════════════════════════════════════════════════════════════╝*/

export interface SelectProductThunkInterface {
    productData: ProductWithPresentations,
}

export interface AddToCartThunkInterface {
    productData: ProductTicketWithStockType,
}

export type addOneUnitThunkInterface = Pick<SellerStateInterface, '_id'>

export type removeFromCartInterface = Pick<SellerStateInterface, '_id'> & {
    amount: CartAmount,
}

export type SellerError = Pick<SellerStateInterface, 'errorMessage'>;

// /*══════════════════════════════════════════════════════════════════════╗
// ║ 🪝 USE SELLER BAR — armado de carrito / catálogo (ex "useSellbar")   ║
// ╚══════════════════════════════════════════════════════════════════════╝*/

export interface UseSellerBarResult {
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

// /*══════════════════════════════════════════════════════════════════════╗
// ║ 📷 USE SELLER BAR BARCODE 📷📷📷📷📷📷📷📷📷📷📷📷📷📷📷           ║
// ╚══════════════════════════════════════════════════════════════════════╝*/

export interface UseSellerBarBarcodeParams {
    cart: ProductWithPresentations[];
    showSnackBar: (message: string, severity: AlertColor) => void;
}

export type UseSellerBarBarcodeResult = UseSellerBarResult['barcode'];

// /*══════════════════════════════════════════════════════════════════════╗
// ║ 🛒 USE SELLER BAR CART 🛒🛒🛒🛒🛒🛒🛒🛒🛒🛒🛒🛒🛒🛒🛒🛒🛒🛒🛒         ║
// ╚══════════════════════════════════════════════════════════════════════╝*/

export type UseSellerBarCartResult = UseSellerBarResult['cart'];

// /*══════════════════════════════════════════════════════════════════════╗
// ║ 🏷️ USE SELLER BAR CATEGORIES 🏷️🏷️🏷️🏷️🏷️🏷️🏷️🏷️🏷️🏷️🏷️🏷️🏷️     ║
// ╚══════════════════════════════════════════════════════════════════════╝*/

export interface UseSellerBarCategoriesParams {
    showSnackBar: (message: string, severity: AlertColor) => void;
}

export type UseSellerBarCategoriesResult = UseSellerBarResult['categories'] & {
    selectedCategory: PresentationCategory | null;
};

// /*══════════════════════════════════════════════════════════════════════╗
// ║ 🪝 HOOKS  🪝🪝🪝🪝🪝🪝🪝🪝🪝🪝🪝🪝🪝🪝🪝🪝🪝🪝🪝                       ║
// ╚══════════════════════════════════════════════════════════════════════╝*/

export interface UseCartPresentationPickerReturn {
    productSelected: ProductWithPresentations | null;
    presentations: Presentation[];
}


export interface AddedItem {
  presentationId: string;
  price: number;
  quantity: number;
}


export interface UseProductDialogSelectorReturn {
  isEmpty: boolean;
  getQuantity: (presentationId: string) => number;
  handleQuantityChange: (presentationId: string, value: number | null) => void;
  handleAddToCart: (args: { presentation: Presentation; quantity: number }) => void;
  formatter: Intl.NumberFormat;
  sessionTotal: number;
  addedItems: AddedItem[];
  columns: GridColDef<Presentation>[];
}


export interface HandleAddProductDialogItemToCartInterface {
    presentation: Presentation;
    quantity: number;
    dispatch: AppDispatch;
    showSnackBar: (message: string, color: AlertColor) => void;
}


export interface UseCartReturn {
    cart: ProductTicketWithStockType[];
    productsTotalPrice: number;
    ivaPercentage: number;
    ivaAmount: number;
    total: number;
    totalUnits: number;
    paymentMethodRef: React.RefObject<PaymentMethod>;
    ticketSummary: TicketSummaryType | null;
    generateTicket: (formValues: CartFormValues) => Promise<void>;
    printTicket: () => void;
    handleClearCart: () => void;
    goBackToSell: () => void;
    goToNewSell: () => void;
    goToTicketDetail: () => void;
    columns: GridColDef<ProductTicketWithStockType>[]
}


export interface useCartPaymentMethodFormReturn {
    handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void,
    values: CartFormValues,
}


export interface useCartPaymentStatusFormReturn {
    values: CartFormValues;
    setFieldValue: (field: string, value: any, shouldValidate?: boolean | undefined) => Promise<void | FormikErrors<CartFormValues>>;
    errors: FormikErrors<CartFormValues>;
    touched: FormikTouched<CartFormValues>;
    isPartial: boolean;
    maxAmountPaid: number;
    handleStatusChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    handleAmountPaidChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    handleBlur: {
        (e: React.FocusEvent<any, Element>): void;
        <T = any>(fieldOrEvent: T): T extends string ? (e: any) => void : void;
    };
}