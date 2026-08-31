import type { Product, ProductEntity } from "@typings/product/productTypes";
import type { ViewMode } from "./cartEnums";
import type { CartChipOption, PresentationRow, UseCartBarResult, UsePresentationSearchReturn, UseSellPageHeaderResult } from "./cartTypes";
import type { GridColDef } from "@mui/x-data-grid";
import type { Presentation } from "@typings/presentation/presentationTypes";
import type { DialogVariantDataType, ProductTicketType, ProductTicketWithStockType, TicketSummaryType, UseProductsExhibitorResult } from "@typings/sells/sellTypes";
import type { SvgIconProps, Theme } from "@mui/material";
import type { ComponentType, ReactNode } from "react";

export interface PresentationSearchBarProps {
    search: UsePresentationSearchReturn;
}

export type SellPageHeaderProps = UseSellPageHeaderResult;

export interface PresentationSearchResultRowProps {
    row: PresentationRow;
    isHighlighted: boolean;
    onSelect: (row: PresentationRow) => void;
    onMouseEnter: () => void;
}

export interface DensePresentationListProps {
    rows: PresentationRow[];
    onAdd: (presentation: Presentation) => void;
}

export type DensePresentationRowProps = {
    row: PresentationRow;
} & Pick<DensePresentationListProps, 'onAdd'>;

export interface BarcodeButtonComponentProps {
    barcode: UseCartBarResult["barcode"];
}

export interface ProductsToolbarProps {
    totalCount: number;
    presentationsCount: number;
    viewMode: ViewMode,
    setViewMode: (mode: ViewMode) => void,
}

export type ToolbarInfoProps = Pick<ProductsToolbarProps, 'totalCount' | 'presentationsCount'>

export interface ProductsExhibitorListProps {
    products: Product[];
    paginatedProducts: Product[];
    viewMode: ViewMode;
    isLoading?: boolean;
    isEmpty?: boolean;
    columns: GridColDef<ProductEntity>[];
    gridSx: UseProductsExhibitorResult['gridSx'];
    presentationRows: PresentationRow[];
    onAddPresentation: (presentation: Presentation) => void;
}

export interface ProductsPaginationProps {
    page: number;
    count: number;
    onChange: (page: number) => void;
}

export interface ProductExhibitorTableProps {
    products: Product[];
    isLoading?: boolean;
    columns: GridColDef<ProductEntity>[];
}

export interface ProductRowActionCellProps {
    product: Product;
}

export type  ProductsSkeletonsProps = Pick<ProductsExhibitorListProps, 'isLoading' | 'gridSx'>;

export interface ViewModeToggleProps {
    viewMode: ViewMode, 
    setViewMode: (mode: ViewMode) => void,
}

export interface ProductItemProps {
    product: Product;
    viewMode?: ViewMode;
};

export interface ProductItemAvatarProps {
    name: string | undefined;
    onClick?: () => void;
}

export interface ProductItemPresentationRowProps {
    presentation: Presentation;
    onAdd: (presentation: Presentation) => void;
}

export interface EspecificationsLeftProps {
    name: string,
    presentations: Presentation[];
    image: string | undefined;
}

export type ItemDataProps = Pick<EspecificationsLeftProps, 'presentations'> & {
    onAddPresentation: (presentation: Presentation) => void;
};

export type EspecificationsRightProps = Pick<ProductItemProps, 'product'>;

export type AmountDataProps = Pick<EspecificationsLeftProps, 'presentations'>;

export type ItemQuantityHandlerProps = Pick<EspecificationsLeftProps, 'presentations'>;

export interface QuantityChipProps {
  color: string,
  label: string,
}

export interface ProductItemButtonProps {
    onClick?: () => void;
}

export interface ProductDialogIlustrationProps {
    name?: string;
    image_url?: string;
}

export type ProductDialogImageProps = Pick<ProductDialogIlustrationProps, 'name' | 'image_url'>

export interface ProductDialogContentProps {
    product: Product,
    products: Presentation[],
}

export type ProductDialogMainContentProps = Pick< ProductDialogContentProps ,"product" | "products">

export type DialogDataProps = Pick< ProductDialogContentProps ,"product"> & {
    description: string;
    values?: DialogVariantDataType,
    setFieldValue?: (field: string, value: unknown, shouldValidate?: boolean) => void;
};

export type ProductDialogHeaderProps = Pick< ProductDialogContentProps , "product" | "product">

export type ProductDialogSelectorProps = Pick<ProductDialogContentProps, "product" | 'products'>;

export type ProductDialogTableProps = Pick<ProductDialogContentProps, "product" | 'products'>;

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

export interface CartPriceProps {
    productsTotalPrice: number,
    discountAmount: number,
    globalDiscount: string,
    onGlobalDiscountChange: (value: string) => void,
    ivaPercentage: number,
    ivaAmount: number,
}
export type CartHeaderProps = {
    itemsCount: number;
    onClearCart: () => void;
}

export type CartCountBadgeProps = Pick<CartHeaderProps, "itemsCount">

export type CartHeaderActionsProps = CartHeaderProps;

export interface CartItemHandlers {
    onIncrease: (_id: string) => void;
    onDecrease: (_id: string) => void;
    onItemDiscountChange: (_id: string, value: string) => void;
}

export interface CartLineItemProps extends CartItemHandlers {
    product: ProductTicketWithStockType;
}

export interface CartItemsListProps extends CartItemHandlers {
    cart: ProductTicketWithStockType[];
}

export type CartSummaryCardProps = {
    onGenerateTicket?: () => void;
    productsTotalPrice: number,
    discountAmount: number,
    globalDiscount: string,
    onGlobalDiscountChange: (value: string) => void,
    note: string,
    onNoteChange: (value: string) => void,
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
    'discountAmount'|
    'globalDiscount'|
    'onGlobalDiscountChange'|
    'note'|
    'onNoteChange'|
    'ivaPercentage'|
    'ivaAmount'
>;

export interface CartSummaryFooterProps {
    total: number,
    onGenerateTicket: CartSummaryCardProps['onGenerateTicket'];
}

export type CartProductRowActionCellProps = {
    product: ProductTicketType;
}

export interface CartSectionLabelProps {
    icon: ReactNode;
    label: string;
}

export interface CartChipToggleGroupProps {
    options: CartChipOption[];
    value: string;
    onChange: (value: string) => void;
    ariaLabel: string;
}

export interface CartGlobalDiscountRowProps {
    globalDiscount: string;
    onGlobalDiscountChange: (value: string) => void;
    discountAmount: number;
}

export interface CartNoteInputProps {
    note: string;
    onNoteChange: (value: string) => void;
}

export interface CartPriceRowProps {
    label: string,
    value: string,
}

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

export interface ProductItemBadgeProps {
  label: string;
}
