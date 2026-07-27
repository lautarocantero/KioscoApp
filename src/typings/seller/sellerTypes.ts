import type { ProductTicketType } from "@typings/sells/sellTypes";
import type { Presentation } from "../presentation/presentationTypes";
import type { CartAmount } from "./seller";
import type { SellerRol, SellerStatus, SortOption, ViewMode } from "./sellerEnums";
import type { Product, ProductWithPresentations } from "@typings/product/productTypes";
import type { AlertColor } from "@typings/ui/ui";
import type { PresentationCategory } from "@typings/presentation/presentationEnum";
import type { RefObject, MouseEvent } from "react";


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


//──────────────────────────────────────────── 📦 Payloads ────────────────────────────────────────────//

export type CreateSellerPayload = Omit<Seller, "_id" | "__v">;

export type EditSellerPayload = Omit<Seller, "__v">;

export interface DeleteSellerPayload {
    _id: string;
}

//──────────────────────────────────────────── 🍕 SLICE  🍕 ───────────────────────────────────────────//


export interface SellerStateInterface {
    _id: string | null,
    name: string,
    cart: ProductTicketType[],
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
    product: ProductTicketType,
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

//──────────────────────────────────────────── 🌀 THUNK 🌀 ───────────────────────────────────────────//

export interface SelectProductThunkInterface {
    productData: ProductWithPresentations,
}

export interface AddToCartThunkInterface {
    productData: ProductTicketType,
}

export type addOneUnitThunkInterface = Pick<SellerStateInterface, '_id'>

export type removeFromCartInterface = Pick<SellerStateInterface, '_id'> & {
    amount: CartAmount,
}

export type SellerError = Pick<SellerStateInterface, 'errorMessage'>;

/*══════════════════════════════════════════════════════════════════════╗
║ 🪝 useSellerBar — armado de carrito / catálogo (ex "useSellbar")      ║
╚══════════════════════════════════════════════════════════════════════╝*/

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

/*──────────────── 📷 useSellerBarBarcode ────────────────*/

export interface UseSellerBarBarcodeParams {
    cart: ProductTicketType[];
    showSnackBar: (message: string, severity: AlertColor) => void;
}

export type UseSellerBarBarcodeResult = UseSellerBarResult['barcode'];

/*──────────────── 🛒 useSellerBarCart ────────────────*/

export type UseSellerBarCartResult = UseSellerBarResult['cart'];

/*──────────────── 🏷️ useSellerBarCategories ────────────────*/

export interface UseSellerBarCategoriesParams {
    showSnackBar: (message: string, severity: AlertColor) => void;
}

export type UseSellerBarCategoriesResult = UseSellerBarResult['categories'] & {
    selectedCategory: PresentationCategory | null;
};