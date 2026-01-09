import type { Product } from "../../product/productTypes";
import type { ProductVariant } from "../../productVariant/productVariant";

{/*─────────────────── 🔎 tipos usados en sell referente a COMPONENTES 🔎 ───────────────────*/}

declare module '@typings/sell-components' {

    //──────────────────────────────────────────── 📋 Product Exhibitor 📋───────────────────────────────────────────//

    export interface ProductsExhibitorComponentInterface {
        title: string;
        products: Product[];
    };

    export type ProductListType  = Pick<ProductsExhibitorComponentInterface, 'products'>;

    //──────────────────────────────────────────── 🍫 Product Item 🧀 ───────────────────────────────────────────//
    export interface ProductItemInterface {
        product: Product;
    };

    export interface ProductItemImageInterface {
        source: string | undefined,
        name: string | undefined,
    }

    export interface EspecificationsLeftInterface {
        name: string,
        variants: ProductVariant[];
        image: string | undefined;
    }

    export type ItemDataType = Pick<EspecificationsLeftInterface, 'name' | 'variants'>;

    export type EspecificationsRightType = Pick<ProductItemInterface, 'product'>;

    export type AmountDataType = Pick<EspecificationsLeftInterface, 'variants'>;

    export type ItemQuantityHandler = Pick<EspecificationsLeftInterface, 'variants'>;

    export type EvaluateStockType = Pick<EspecificationsLeftInterface, 'variants'>

    export interface QuantityChipInterface {
      color: string,
      label: string,
    }

    //──────────────────────────────────────────── 🛒 Cart 🛒───────────────────────────────────────────//
    export interface CartProductListComponentInterface {
        cart: ProductTicketType[],
    }
    export interface CartPriceComponentType {
        productsTotalPrice: number,
        ivaPercentage: number,
        ivaAmount: number,
        total: number,
    }
    export interface CartPriceLabelInterface {
      label: string
      nestedLabel?: string
      nestedValue?: string
      labelStyles?: (theme: Theme) => object
      nestedStyles?: (theme: Theme) => object
    }
    export interface CartProductItemComponentInterface {
        product: ProductTicketType,
    }
    export interface CartProductItemDataComponentInterface {
        name: string | undefined,
        size: string | undefined,
        units: string | undefined,
        price: string | undefined,
    }
    export interface CartProductItemImageComponentInterface {
        image: string | undefined,
        name: string | undefined,
    }
    export interface CartProductButtonsInterface {
        _id: string,
    }
    export interface CartProductButtonInterface {
        icon : React.ReactNode, 
        side: CartSide, 
        action: () => void
    }
    interface DisplayDataComponentInterface {
        nameEdited: string,
        size: string,
        units: string,
        price: string,
    }
    export interface CartButtonsComponentInterface {
        generateTicket: () => void,
    }

    //──────────────────────────────────────────── ⬜ Mode Button ⬛ ───────────────────────────────────────────//
    export interface ModeButtonComponentInterface {
       functionAction: () => void,
       text: string,
       icon: React.ReactNode,
    }    

   //──────────────────────────────────────────── 🪧 Dialog 🪧 ───────────────────────────────────────────//

    export interface ProductDialogIlustrationInterface {
        name?: string;
        image_url?: string;
    }

    export type ProductDialogImageComponentType = Pick<ProductDialogIlustrationInterface, 'name' | 'image_url'>

    export interface DialogDataType {
        products: ProductVariant[],
        values: DialogDataInterface,
        setFieldValue: SetFieldValue<DialogDataInterface>,
    };

    export type DialogSelectorType = Pick<DialogDataType, 'products' | 'values' | 'setFieldValue'>;

    export type DialogDataDisplayType = Pick<DialogDataType, 'setFieldValue'> & {
        values: DialogVariantDataInterface,
        label: string,
    }

    export type DialogDataPriceType = Pick <DialogDataType, 'values'>

}