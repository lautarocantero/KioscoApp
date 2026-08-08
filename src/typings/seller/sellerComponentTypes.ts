import type { Product, ProductEntity } from "@typings/product/productTypes";
import type { CartSide, ViewMode } from "./sellerEnums";
import type { UseSellerBarResult } from "./sellerTypes";
import type { GridColDef } from "@mui/x-data-grid";
import type { Presentation } from "@typings/presentation/presentationTypes";
import type { DialogVariantDataType, ProductTicketType, ProductTicketWithStockType, TicketSummaryType } from "@typings/sells/sellTypes";
import type { SvgIconProps, Theme } from "@mui/material";
import type { ComponentType } from "react";

// /*══════════════════════════════════════════════════════════════════════╗
// ║ 📑 SELLER CATALOG HEADER 📑📑📑📑📑📑📑📑📑📑📑📑📑📑📑             ║
// ╚══════════════════════════════════════════════════════════════════════╝*/

export interface SellerBarFilterProps {
    categories: UseSellerBarResult["categories"];
}

export interface SellerBarSearchProps {
    search: UseSellerBarResult["search"];
}

export interface BarcodeButtonComponentProps {
    barcode: UseSellerBarResult["barcode"];
}

export interface CartButtonComponentProps {
    cart: UseSellerBarResult["cart"];
}

// /*══════════════════════════════════════════════════════════════════════╗
// ║ 📑 SELLER TOOLBAR 📑📑📑📑📑📑📑📑📑📑📑📑📑📑📑                   ║
// ╚══════════════════════════════════════════════════════════════════════╝*/

export interface ProductsToolbarProps {
    totalCount: number;
    viewMode: ViewMode, 
    setViewMode: (mode: ViewMode) => void,
}

export type ToolbarInfoProps = Pick<ProductsToolbarProps, 'totalCount'>

// /*══════════════════════════════════════════════════════════════════════╗
// ║ 📋 PRODUCT EXHIBITOR 📋📋📋📋📋📋📋📋📋📋📋📋📋📋📋                 ║
// ╚══════════════════════════════════════════════════════════════════════╝*/

export type ToolbarActionsProps = Pick<ProductsToolbarProps, 'viewMode' | 'setViewMode'>

export interface ProductsExhibitorListProps {
    products: Product[];
    viewMode: ViewMode;
    isLoading?: boolean;
    isEmpty?: boolean;
    columns: GridColDef<ProductEntity>[];
    gridSx: {
        readonly display: "flex" | "grid";
        readonly flexDirection: "column" | undefined;
        readonly gridTemplateColumns: {
            xs: string;
            sm: string;
            md: string;
            lg: string;
        } | undefined;
        readonly rowGap: 2;
        readonly columnGap: 2;
        readonly width: "100%";
    }
    page: number;
    count: number;
    onChange: (page: number) => void;
}


export type ProductsPaginationProps = Pick <ProductsExhibitorListProps, "page" | "count" | "onChange">;

export interface ProductExhibitorTableProps {
    products: Product[];
    isLoading?: boolean;
    columns: GridColDef<ProductEntity>[];
}

export interface ProductRowActionCellProps {
    product: Product;
}

export type  ProductsSkeletonsProps = Pick<ProductsExhibitorListProps, 'isLoading' | 'gridSx'>;

export interface SortByCatalogProps {
    viewMode: ViewMode;
}

export interface ViewModeToggleProps {
    viewMode: ViewMode, 
    setViewMode: (mode: ViewMode) => void,
}

// /*══════════════════════════════════════════════════════════════════════╗
// ║ 🍫 PRODUCT ITEM 🧀🍫🧀🍫🧀🍫🧀🍫🧀🍫🧀🍫🧀🍫🧀                     ║
// ╚══════════════════════════════════════════════════════════════════════╝*/

export interface ProductItemProps {
    product: Product;
    viewMode?: ViewMode;
};

export interface ProductItemImage {
    source: string | undefined,
    name: string | undefined,
}

export interface EspecificationsLeftProps {
    name: string,
    presentations: Presentation[];
    image: string | undefined;
}

export type ItemDataProps = Pick<EspecificationsLeftProps, 'name' | 'presentations'>;

export interface ProductItemChipProps {
    totalStock: number;
}

export type EspecificationsRightProps = Pick<ProductItemProps, 'product'>;

export type AmountDataProps = Pick<EspecificationsLeftProps, 'presentations'>;

export type ItemQuantityHandlerProps = Pick<EspecificationsLeftProps, 'presentations'>;

export interface QuantityChipProps {
  color: string,
  label: string,
}

export interface ProductItemImageProps extends ProductItemImage {
    onClick?: () => void;
}

export interface ProductItemButtonProps {
    onClick?: () => void;
}

// /*══════════════════════════════════════════════════════════════════════╗
// ║ 🪧 DIALOG 🪧🪧🪧🪧🪧🪧🪧🪧🪧🪧🪧🪧🪧🪧🪧🪧🪧🪧                       ║
// ╚══════════════════════════════════════════════════════════════════════╝*/

export interface ProductDialogIlustrationProps {
    name?: string;
    image_url?: string;
}

export type ProductDialogImageProps = Pick<ProductDialogIlustrationProps, 'name' | 'image_url'>

export interface ProductDialogContentProps {
    product: {
        name: string,
        description: string,
        image: string,
    }
    products: Presentation[],
}

export type ProductDialogMainContentProps = Pick< ProductDialogContentProps ,"product" | "products">

export type DialogDataProps = Pick< ProductDialogContentProps ,"product"> & {
    description: string;
    values?: DialogVariantDataType,
    setFieldValue?: (field: string, value: unknown, shouldValidate?: boolean) => void;
};

export type ProductDialogHeaderProps = Pick< ProductDialogContentProps ,"product">

export type ProductDialogSelectorProps = Pick<ProductDialogContentProps, 'products'>;

export type ProductDialogTableProps = Pick<ProductDialogContentProps, 'products'>;

export type ProductDialogSelectorHeaderComponent = Pick<ProductDialogContentProps, 'products'>;

export type DialogDataDisplayProps = Pick<DialogDataProps, 'setFieldValue'> & {
    values: DialogVariantDataType,
    label: string,
}

export interface ProductDialogTableTotalProps {
  hasAddedItems: boolean;
  sessionTotal: number;
  formatter: Intl.NumberFormat;
}

export type DialogDataPriceProps = Pick <DialogDataProps, 'values'>

// /*══════════════════════════════════════════════════════════════════════╗
// ║ 🛒 CART 🛒🛒🛒🛒🛒🛒🛒🛒🛒🛒🛒🛒🛒🛒🛒🛒🛒🛒🛒🛒🛒🛒🛒               ║
// ╚══════════════════════════════════════════════════════════════════════╝*/

export interface CartProductListProps {
    cart: ProductTicketType[],
}
export interface CartPriceProps {
    productsTotalPrice: number,
    ivaPercentage: number,
    ivaAmount: number,
    total: number,
}
export interface CartPriceLabelProps {
  label: string
  nestedLabel?: string
  nestedValue?: string
  labelStyles?: (theme: Theme) => object
  nestedStyles?: (theme: Theme) => object
}
export interface CartProductItemProps {
    product: ProductTicketType,
}
export interface CartProductItemDataProps {
    name: string | undefined,
    size: string | undefined,
    units: string | undefined,
    price: string | undefined,
}
export interface CartProductItemImageProps {
    image: string | undefined,
    name: string | undefined,
}
export interface CartProductButtonsProps {
    _id: string,
}
export interface CartProductButtonProps {
    icon : React.ReactNode, 
    side: CartSide, 
    action: () => void
}
export interface DisplayDataComponentProps {
    nameEdited: string,
    size: string,
    units: string,
    price: string,
}
export interface CartButtonsComponentProps {
    generateTicket: () => void,
}


export type CartHeaderProps = {
    itemsCount: number;
    onClearCart: () => void;
}

export type CartHeaderActionsProps = CartHeaderProps;

export interface CartProductTableProps {
    cart: ProductTicketWithStockType[], 
    columns: GridColDef<ProductTicketWithStockType>[]
}

export type CartSummaryCardProps = {
    onGenerateTicket?: () => void;
    onBack: () => void;
    productsTotalPrice: number,
    ivaPercentage: number,
    ivaAmount: number,
    total: number,
}

export interface CartPaymentMethodProps {
    total: number;
}

export interface CartPaymentStatusProps extends CartPaymentMethodProps{};

export type CartSellDataComponentProps = Pick<CartSummaryCardProps, 
    'productsTotalPrice'|
    'ivaPercentage'|
    'ivaAmount'|
    'total'
>;

export interface CartSummaryFooterProps {
    total: number,
    onBack: CartSummaryCardProps['onBack'];
    onGenerateTicket: CartSummaryCardProps['onGenerateTicket'];
}

export type CartProductRowActionCellProps = {
    product: ProductTicketType;
}

export interface CartPriceRowProps {
    label: string, 
    value: string, 
    valueColor?: (theme: Theme) => string, 
    bold?: boolean,
}

// /*══════════════════════════════════════════════════════════════════════╗
// ║ ✅ ORDER CONFIRMED ✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅                     ║
// ╚══════════════════════════════════════════════════════════════════════╝*/

export type SummaryItem = {
    id: string;
    icon: ComponentType<SvgIconProps>;
    iconColor: (theme: Theme) => string;
    label: string;
    value: string;
}

export interface TicketSummaryDetailsProps {
    ticketSummary: TicketSummaryType | null;
}

export interface OrderConfirmedActionsProps {
    onPrintTicket: () => void;
    onNewSell: () => void;
    goToTicketDetail: () => void;
}

export interface ManualDownloadNoticeProps {
    onPrintTicket: () => void;
}