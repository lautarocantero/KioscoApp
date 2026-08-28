import type { Presentation } from "@typings/presentation/presentationTypes";
import type { AlertColor } from "@typings/ui/ui";
import type { NavigateFunction } from "react-router-dom";
import type { TFunction } from "i18next";
import type { DialogContextType } from "../../ui/uiModules";
import type { SettleDebtDialogState } from "@typings/ui/dialog.types";
import type { PaymentMethod, SellFilterEnum, SellStatusEnum } from "./sellsEnum";
import type { UseSellsContextBandReturn } from "./types";
import type { EspecificationsLeftProps } from "./SellComponentTypes";
import type { ReactNode, MouseEvent, SetStateAction, RefObject } from "react";
import type { SelectChangeEvent } from "@mui/material";
import type { GridColDef } from "@mui/x-data-grid";
import type { SortOption, ViewMode } from "../../modules/sells/components/ProductsExhibitorList/ProductToolbar";
import type { AppDispatch } from "../../store/presentation/presentationSlice";
import type { SaleType } from "@typings/presentation/presentationEnum";
import type { PresentationRow } from "@typings/cart/cartTypes";

// /*══════════════════════════════════════════════════════════════════════╗
// ║ 🔒 BASE PRINCIPAL 🔒🔒🔒🔒🔒🔒🔒🔒🔒🔒🔒🔒🔒🔒🔒🔒                     ║
// ╚══════════════════════════════════════════════════════════════════════╝*/

interface SellEntityInterface {
    currency: string;
    iva: number;
    modification_date: string | null;
    payment_method: PaymentMethod;
    products: ProductTicketType[];
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
    > & {
        status: SellStatusEnum,
        amount_paid: number | null,
        debtor_name: string | null,
        // Vínculo entre una venta parcial y la venta de saldo que la saldó
        // (ver "saldar deuda"). Ambos null en una venta que nunca fue parcial.
        settles_sell_id: string | null,
        settled_by_sell_id: string | null,
    };

export type Sell = SellEntityInterface;

export interface ProductTicketType {
  _id: string;        
  sku: string;               
  name: string;              
  description: string;     
  brand: string;          
  model_type: string;      
  model_size: number;       
  price: number;         
  expiration_date: string;   
  image_url: string;        
  stock_required: number;   
  sale_type: SaleType;
}

export type ProductTicketWithStockType = ProductTicketType & {
    product_id: string;
    stock: number;
    subtotal?: number;
};

// /*══════════════════════════════════════════════════════════════════════╗
// ║ 🔗 API 🔗🔗🔗🔗🔗🔗🔗🔗🔗🔗🔗🔗🔗🔗🔗🔗🔗🔗🔗🔗🔗🔗🔗               ║
// ╚══════════════════════════════════════════════════════════════════════╝*/

export type GetSellApiPayloadType = Pick<Sell, '_id'>;

export type CreateSellApiPayloadType = Omit<Sell, '_id' | 'modification_date'> & {
    status: SellStatusEnum | undefined;
    amount_paid: number | null;
    debtor_name: string | null;
    // Cuando es true, el back no valida ni descuenta stock para esta venta —
    // usado por la venta de saldo que genera "saldar deuda" (ver settleSellDebtThunk).
    skip_stock?: boolean;
    // _id de la venta parcial que esta venta salda, cuando esta venta ES una
    // venta de saldo generada por "saldar deuda".
    settles_sell_id?: string | null;
};

export type DeleteSellApiPayloadType = Pick<Sell, '_id'>;

export type EditSellApiPayloadType = EditSellRequestPayloadType;

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
    status: SellStatusEnum,
    amount_paid: number;
    debtor_name: string;
    settles_sell_id: string | null;
    settled_by_sell_id: string | null;

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
    sale_type: SaleType;
};

export interface PaymentDetail {
    methodLabel: string;
    approved: boolean;
    reference: string;
    paymentDate: string;
    amountPaid: number | null;
    pendingAmount: number | null;
    debtorName: string | null;
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

export interface CartFormValues {
    payment_method: PaymentMethod;
    status: SellStatusEnum;
    amount_paid: number | null;
    debtor_name: string | null;
}

// /*══════════════════════════════════════════════════════════════════════╗
// ║ 🍕 SLICE  🍕🍕🍕🍕🍕🍕🍕🍕🍕🍕🍕🍕🍕🍕🍕🍕🍕🍕🍕                       ║
// ╚══════════════════════════════════════════════════════════════════════╝*/

export interface SellStateInterface {
    sells:               SellTicketType[];
    currentSell:         SellTicketType | null;
    isLoading:           boolean;
    errorMessage:        string | null;
    isLoadingCurrent:    boolean;
    currentSellError:    string | null;
    todaySellsCount:     number | null;
    todaySellsTotalAmount:  number | null;
    lastSaleAt:          string | null;
    isLoadingTodaySells: boolean;
    todaySellsError:     string | null;
}

export type SellStateErrorType = Pick<SellStateInterface, 'errorMessage'>

// /*══════════════════════════════════════════════════════════════════════╗
// ║ 🪝 HOOKS  🪝🪝🪝🪝🪝🪝🪝🪝🪝🪝🪝🪝🪝🪝🪝🪝🪝🪝🪝                       ║
// ╚══════════════════════════════════════════════════════════════════════╝*/

export interface UseSellsResult {
    count: number | null;
    lastSaleAt: string | null;
    loading: boolean;
    error: string | null;
}


export interface UseSellsListDataResult {
    sells: SellTicketType[];
    loading: boolean;
    error: string | null;
    searchTerm: string;
    setSearchTerm: (term: string) => void;
}


export interface UseSellsReturn extends UseSellsListDataResult, UseSellsContextBandReturn {
    deleteDialog: DeleteDialogState;
    clearError: () => void;
    handleDeleteRequest: (id: string, name: string) => void;
    handleDeleteCancel: () => void;
    handleDeleteConfirm: () => Promise<void>;
    filter: SellFilterEnum;
    setFilter: (filter: SellFilterEnum) => void;
    counts: Record<SellFilterEnum, number>;
    columns: GridColDef<SellTicketType>[];
    settleDebtDialog: SettleDebtDialogState;
    settleDebtIsSubmitting: boolean;
    settleDebtErrorMessage: string | null;
    handleSettleDebtCancel: () => void;
    handleSettleDebtConfirm: () => Promise<void>;
    handleViewPartials: () => void;
    partialsFilterChipRef: RefObject<HTMLDivElement | null>;
}


export interface UseSellDataResult {
    sellData: SellTicketType | null;
    isLoading: boolean;
    error: string | null;
}


export interface UsePrintSellTicketReturn {
    printTicket: (ticket: SellTicketType) => void;
}


export type TicketSummaryType = {
    sellId: string;
    ticketNumber: string;
    date: string;
    total: number;
    productsCount: number;
    paymentMethod: PaymentMethod;
}


export type CreateSellResponse = { _id: string; message: string };

// /*══════════════════════════════════════════════════════════════════════╗
// ║ 🕐 THUNKS 🕐🕐🕐🕐🕐🕐🕐🕐🕐🕐🕐🕐🕐🕐🕐🕐🕐🕐🕐🕐🕐🕐🕐🕐🕐             ║
// ╚══════════════════════════════════════════════════════════════════════╝*/

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
> & {
    status?: SellStatusEnum;
    amount_paid: number | null;
    debtor_name: string | null;
}

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
> & {
    // Opcionales: solo se envían al saldar una deuda (ver settleSellDebtThunk),
    // el resto de las ediciones de venta no los toca.
    status?: SellStatusEnum;
    amount_paid?: number | null;
    debtor_name?: string | null;
    // _id de la venta de saldo que saldó esta venta, cuando esta venta ES la
    // venta original que pasó de parcial a completada.
    settled_by_sell_id?: string | null;
};

export interface EditSellSanitizedPayloadInterface {
    data: EditSellRequestPayloadType;
}

export interface UseProductsExhibitorResult {
    isEmpty: boolean;
    loading: boolean;
    products: Product[];
    paginatedProducts: Product[];
    totalCount: number;
    page: number;
    pageCount: number;
    setPage: (page: number) => void;
    sort: SortOption;
    handleSortChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    options: { value: SortOption }[];
    viewMode: ViewMode;
    setViewMode: (mode: ViewMode) => void;
    gridSx: {
        readonly display: "flex" | "grid";
        readonly flexDirection: "column" | undefined;
        readonly gridTemplateColumns: string | undefined;
        readonly rowGap: 2;
        readonly columnGap: 2;
        readonly width: "100%";
        readonly padding: 2;
    };
    columns: GridColDef<ProductEntity>[];
    presentationRows: PresentationRow[];
    handleAddPresentation: (presentation: Presentation) => void;
}

export interface UseSellStatsResult {
    todaySells: number | null;
    todaySellsAmount: number | null;
    lastSaleAt: string | null;
    isLoading:  boolean;
    error:      string | null;
}

type FormikReturn = ReturnType<typeof useFormik<DialogDataInterface>>;
type CartPickerReturn = ReturnType<typeof useCartPresentationPicker>;

export interface UseProductDialogReturn {
  showModal: boolean;
  setShowModal: (value: boolean) => void;
  productSelected: CartPickerReturn["productSelected"];
  presentations: CartPickerReturn["presentations"];
  totalStock: number;
  formattedTotalStock: string;
}

// /*══════════════════════════════════════════════════════════════════════╗
// ║ 🪧 DIALOG  🪧🪧🪧🪧🪧🪧🪧🪧🪧🪧🪧🪧🪧🪧🪧🪧🪧🪧                       ║
// ╚══════════════════════════════════════════════════════════════════════╝*/

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
    t: TFunction;
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

export interface BuildColumnsForProductDialogInterface {
    getQuantity: (presentationId: string) => number;
    handleQuantityChange: (presentationId: string, value: number | null) => void;
    handleAddToCart: (args: { presentation: Presentation; quantity: number }) => void;
    fallbackImage?: string;
    t: TFunction;
}

// /*══════════════════════════════════════════════════════════════════════╗
// ║ 📑 SELLS TABLE 📑📑📑📑📑📑📑📑📑📑📑📑📑📑📑                     ║
// ╚══════════════════════════════════════════════════════════════════════╝*/

export type SellsHandleDetailType = Pick<SellEntityInterface, '_id'> & {
    navigate: NavigateFunction,
}

export type HandleDeleteSellType = Pick<SellEntityInterface, '_id'> & {
    dispatch: AppDispatch,
    showSnackBar: (message: string, color: AlertColor) => void,
}

export interface BuildColumnsForSellsArgs {
    onDeleteRequest: (id: string, name: string) => void;
    onSettleDebtRequest: (sell: SellTicketType) => void;
    navigate: (path: string) => void;
    t: TFunction;
    isAdmin: boolean;
}

export interface SettleSellDebtThunkInterface {
    sell: SellTicketType;
    pendingBalance: number;
}

export interface UseSettleSellDebtReturn {
    settleDebtDialog: SettleDebtDialogState;
    isSubmitting: boolean;
    errorMessage: string | null;
    handleSettleDebtRequest: (sell: SellTicketType) => void;
    handleSettleDebtCancel: () => void;
    handleSettleDebtConfirm: () => Promise<void>;
}