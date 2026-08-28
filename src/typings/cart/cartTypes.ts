import type { CartFormValues, ProductTicketWithStockType, TicketSummaryType } from "@typings/sells/sellTypes";
import type { Presentation } from "@typings/presentation/presentationTypes";
import type { CartAmount, SortOption, ViewMode } from "./cartEnums";
import type { Product, ProductWithPresentations } from "@typings/product/productTypes";
import type { AlertColor } from "@typings/ui/ui";
import type { PresentationCategory } from "@typings/presentation/presentationEnum";
import type { RefObject, MouseEvent, KeyboardEvent } from "react";
import type { AppDispatch } from "../../store/cart/cartSlice";
import type { PaymentMethod } from "@typings/sells/sellsEnum";
import type { FormikErrors, FormikTouched } from "formik";
import type { GridColDef } from "@mui/x-data-grid";
import type { TFunction } from "i18next";

export interface CartStateInterface {
    _id: string | null,
    cart: ProductTicketWithStockType[],
    productSelected: ProductWithPresentations | null,
    presentationSelected: Presentation | null,
    presentations: Presentation[],
    presentationsLoading: boolean,
    products: Product[],
    productsLoading: boolean,
    errorMessage: string | null,
    sort: SortOption,
    viewMode: ViewMode,
    page: number,
    selectedCategory: PresentationCategory | null,
    searchTerm: string,
    exactMatch: boolean,
};

export interface getProductSelectedPayload {
    product: Product,
};

export interface CartAddToCartSlicePayload {
    product: ProductTicketWithStockType,
};

export type CartAddUnitActionPayload = Pick<CartStateInterface, '_id'>

export type CartRemoveFromCartActionPayload = Pick<CartStateInterface, '_id'> & {
    amount: CartAmount,
}

export interface CartSetProductSlicePayload {
    product: ProductWithPresentations,
};

export interface CartSetPresentationSlicePayload {
    presentation: Presentation,
};

export type CartSetSortPayload = Pick<CartStateInterface, 'sort'>

export type CartSetViewModePayload = Pick<CartStateInterface, 'viewMode'>

export type CartSetPagePayload = Pick<CartStateInterface, 'page'>

export type CartSetSelectedCategoryPayload = Pick<CartStateInterface, 'selectedCategory'>

export type CartSetSearchTermPayload = Pick<CartStateInterface, 'searchTerm'>

export type CartSetExactMatchPayload = Pick<CartStateInterface, 'exactMatch'>

export interface SelectProductThunkInterface {
    productData: ProductWithPresentations,
}

export interface SelectPresentationThunkInterface {
    presentationData: Presentation,
}

export interface AddToCartThunkInterface {
    productData: ProductTicketWithStockType,
}

export type addOneUnitThunkInterface = Pick<CartStateInterface, '_id'>

export type removeFromCartInterface = Pick<CartStateInterface, '_id'> & {
    amount: CartAmount,
}

export interface CartSetQuantityActionPayload {
  _id: string;
  stock_required: number;
}

export interface setQuantityThunkInterface {
  _id: string;
  stock_required: number;
}

export type CartError = Pick<CartStateInterface, 'errorMessage'>;

export interface UseCartBarResult {
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
}

export interface UseCartBarBarcodeParams {
    cart: ProductTicketWithStockType[];
    showSnackBar: (message: string, severity: AlertColor) => void;
}

export type UseCartBarBarcodeResult = UseCartBarResult['barcode'];

export type UseCartBarCartResult = UseCartBarResult['cart'];

export interface UseCartBarCategoriesParams {
    showSnackBar: (message: string, severity: AlertColor) => void;
}

export interface UseCartBarCategoriesResult {
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
}

export interface PresentationRow {
    key: string;
    productId: string;
    presentationId: string;
    product: string;
    presentation: string;
    category: string;
    sku: string;
    price: number;
    stock: number;
    minStock: number;
    isWeight: boolean;
    presentationData: Presentation;
}

export interface UsePresentationSearchReturn {
    query: string;
    onQueryChange: (value: string) => void;
    results: PresentationRow[];
    highlightedIndex: number;
    isOpen: boolean;
    onKeyDown: (event: KeyboardEvent<HTMLInputElement>) => void;
    onHighlight: (index: number) => void;
    onSelect: (row: PresentationRow) => void;
    onClear: () => void;
}

export interface UseProductItemReturn {
    handleSelect: () => void;
    handleAddPresentation: (presentation: Presentation) => void;
}

export interface UseProductStockReturn {
    totalStock: number;
}

export interface UseCartPresentationPickerReturn {
    productSelected: ProductWithPresentations | null;
    presentations: Presentation[];
    presentationsLoading: boolean;
}

export interface AddedItem {
  presentationId: string;
  price: number;
  quantity: number;
  amount: number;
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
    t: TFunction;
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
    handleIncreaseProduct: (_id: string) => void;
    handleDecreaseProduct: (_id: string) => void;
    handleSubtotalChange: (_id: string, value: number) => void;
    handleQuantityChange: (_id: string, value: number) => void;
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
