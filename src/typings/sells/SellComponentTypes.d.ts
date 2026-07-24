import type { Product } from "../product/productTypes";
import type { Presentation } from "../presentation/presentationTypes";
import type { DialogDataInterface, DialogVariantDataType, PaymentDetail, SellTicketType, SoldProductRow } from "./sellTypes";
import { FormModeComplexEnum } from "@typings/shared/sharedEnums";
import type { ViewMode } from "../../modules/sells/components/ProductsExhibitorList/ProductToolbar";

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
        payment: PaymentDetail;
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
    }

    export interface SellDetailPendingBalanceProps {
        pendingBalance: number;
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

    //──────────────────────────────────────────── 📋 Product Exhibitor 📋───────────────────────────────────────────//

    export interface ProductsToolbarProps {
        totalCount: number;
    }

    export type ToolbarInfoProps = Pick<ProductsToolbarProps, 'totalCount'>

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

    export interface ProductsSkeletonsProps {
        isLoading: boolean;
    }

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
        onSubmit: (e?: React.FormEvent<HTMLFormElement> | undefined) => void
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