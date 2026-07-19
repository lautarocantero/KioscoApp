import type { Product } from "../product/productTypes";
import type { Presentation } from "../presentation/presentationTypes";
import type { DialogDataInterface, DialogVariantDataType, SellTicketType } from "./sellTypes";
import type { ViewMode } from "modules/sells/components/ProductList/ProductToolbar";
import { FormModeComplexEnum } from "@typings/shared/sharedEnums";

{/*─────────────────── 🔎 tipos usados en sell referente a COMPONENTES TSX, (UI📳) 🔎 ───────────────────*/}

   //────────────────────────────────────────── 📑 Sells List 📑 ───────────────────────────────────────────//

    export interface SellFormProps {
        mode?: FormModeComplexEnum.Edit | FormModeComplexEnum.Detail;
    }

   //────────────────────────────────────────── 📑 Sells Table 📑 ───────────────────────────────────────────//
   

    export interface SellsTableProps {
       isLoading: boolean;
       sells: SellTicketType[];
    }

    export interface SellDataProps {
        sellSelected: SellTicketType | null;
    }

    export type SellCartDataProps = Pick<SellDataProps, 'sellSelected'>;

    export type SellCartProductsProps = Pick<SellDataProps, 'sellSelected'>;

    //──────────────────────────────────────────── 📋 Product Exhibitor 📋───────────────────────────────────────────//

    export interface ProductsExhibitorProps {
        title: string;
        products: Product[];
    };

    export type ProductListProps  = Pick<ProductsExhibitorProps, 'products'> & {
        viewMode?: ViewMode;
    };


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

    export interface DialogDataProps {
        name: string,
        products: Presentation[],
        values: DialogDataInterface,
        setFieldValue: SetFieldValue<DialogDataInterface>,
    };

    export type DialogSelectorProps = Pick<DialogDataProps, 'products' | 'values' | 'setFieldValue'>;

    export type DialogDataDisplayProps = Pick<DialogDataProps, 'setFieldValue'> & {
        values: DialogVariantDataType,
        label: string,
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