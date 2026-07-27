import type { Product } from "../product/productTypes";
import type { Presentation } from "../presentation/presentationTypes";
import type { DialogDataInterface, DialogVariantDataType, PaymentDetail, SellTicketType, SoldProductRow, TicketSummaryType, UseSellbarResult } from "./sellTypes";
import { FormModeComplexEnum } from "@typings/shared/sharedEnums";
import type { ViewMode } from "../../modules/sells/components/ProductsExhibitorList/ProductToolbar";
import type { ReactNode } from "react";
import type { SvgIconProps } from "@mui/material";
import type { PaymentMethod } from "./sellsEnum";

{/*─────────────────── 🔎 tipos usados en sell referente a COMPONENTES TSX, (UI📳) 🔎 ───────────────────*/}

   //────────────────────────────────────────── 📑 Sells List 📑 ───────────────────────────────────────────//

    export interface SellFormProps {
        mode?: FormModeComplexEnum;
    }

    export interface EmptyProductListProps {
        isEmpty: boolean
    }

   //────────────────────────────────────────── 📑 Sells Detail 📑 ───────────────────────────────────────────//

   export interface SellDetailHeaderProps {
    ticketNumber: string;
    status: SellStatus;
    }

    export interface SellDetailInfoBarProps {
        purchaseDate: string;
        purchaseTime: string;
        timezone: string;
        sellerName: string;
        paymentMethodLabel: string;
        currency: string;
    }

    export interface SellDetailProductsSoldProps {
        products: SoldProductRow[];
    }

    export interface SellDetailPaymentDataProps {
        payment: {
            method: PaymentMethod;
            status: SellStatusEnum;
            amountPaid: number | null;
            debtorName: string | null;
            pendingAmount: number | null;
        };
    }

    export interface SellDetailSoldDataProps {
        subTotal: number;
        iva: number;
        ivaPercentage: number;
        total: number;
    }

    export interface SellDetailAditionalDataProps {
        subTotal: number;
        iva: number;
        ivaPercentage: number;
        total: number;
        currency: string;
        sellId: string;
        pendingBalance: number | null;
        debtorName: string | null;
    }

    export interface SellDetailPendingBalanceProps {
        pendingBalance: number | null;
        debtorName: string | null;
    }

    export interface SellDetailActionsProps {
        onBack: () => void;
        onPrintReceipt: () => void;
    }

   //────────────────────────────────────────── 📑 Sells Table 📑 ───────────────────────────────────────────//
   

    export interface SellsTableProps {
       isLoading: boolean;
       sells: SellTicketType[];
    }

    export interface SellDataProps {
        currentSell: SellTicketType | null;
    }

    export type SellCartDataProps = Pick<SellDataProps, 'currentSell'>;

    export type SellCartProductsProps = Pick<SellDataProps, 'currentSell'>;

    //──────────────────────────────────────────── Catalog header ───────────────────────────────────────────//

    export interface SellbarFilterProps {
        categories: UseSellbarResult["categories"];
    }

    export interface SellbarSearchProps {
      search: UseSellbarResult["search"];
    }

    export interface BarcodeButtonComponentProps {
        barcode: UseSellbarResult["barcode"];
    }

    export interface CartButtonComponentProps {
        cart: UseSellbarResult["cart"];
    }

    //──────────────────────────────────────────── 📋 Product Exhibitor 📋───────────────────────────────────────────//

    export interface ProductsToolbarProps {
        totalCount: number;
        viewMode: ViewMode, 
        setViewMode: (mode: ViewMode) => void,
    }

    export type ToolbarInfoProps = Pick<ProductsToolbarProps, 'totalCount'>

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

    export interface SortByCatalogHeaderProps {
        viewMode: ViewMode;
    }

    export interface ViewModeToggleProps {
        viewMode: ViewMode, 
        setViewMode: (mode: ViewMode) => void,
    }

    //──────────────────────────────────────────── 🍫 Product Item 🧀 ───────────────────────────────────────────//

    export interface ProductItemProps {
        product: Product;
        viewMode?: ViewMode;
    };

    export interface ProductItemImageProps {
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

   //──────────────────────────────────────────── 🪧 Dialog 🪧 ───────────────────────────────────────────//

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

    //──────────────────────────────────────────── 🛒 Cart 🛒───────────────────────────────────────────//

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

    export type CartLabelProps = {
        itemsCount: number;
    }

    export type CartCleanActionProps = CartLabelProps & {
        onClearCart: () => void;
    }

    export type CartHeaderProps = CartCleanActionProps;

    export interface CartProductTableProps {
        cart: ProductTicketType[], 
        columns: GridColDef<ProductTicketType>[]
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

    //────────────────────────────────────────────  order confirmed  ───────────────────────────────────────────//

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