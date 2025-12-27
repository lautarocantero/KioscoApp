import type { Product } from "../product/productTypes";
import type { ProductVariant } from "../productVariant/productVariant";
// /*══════════════════════════════════════════════════════════════════════╗
// ║ 📋 Product Exhibitor 📋📋📋📋📋📋📋📋📋📋📋📋📋📋📋📋📋📋📋📋📋📋📋📋📋║
// ╚══════════════════════════════════════════════════════════════════════╝*/

export interface ProductsExhibitorComponentInterface {
    title: string;
    products: Product[];
};

export type ProductListType  = Pick<ProductsExhibitorComponentInterface, 'products'>;

// /*══════════════════════════════════════════════════════════════════════╗
// ║ 🍞 Product Item 🍞 🧀 🍫 🍷 ☕ 🔋 🍞 🧀 🍫 🍷 ☕ 🔋 🍞 🧀 🍫 🍷 ☕ 🔋  ║
// ╚══════════════════════════════════════════════════════════════════════╝*/

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

export type ProductItemButtonType = Pick<ProductItemInterface, 'product'>;

// /*══════════════════════════════════════════════════════════════════════╗
// ║ 🪧 Dialog 🪧🪧🪧🪧🪧🪧🪧🪧🪧🪧🪧🪧🪧🪧🪧🪧🪧🪧🪧🪧🪧🪧🪧🪧🪧🪧🪧🪧🪧║
// ╚══════════════════════════════════════════════════════════════════════╝*/

export interface DialogDataInterface {
    productVariantId: string,
    productVariant: ProductVariant | null,
    requiredStock: number,
    totalPrice: number,
}

export type DialogVariantDataInterface = Omit<DialogDataInterface, 'productVariantId'>

export type VariantDialogDataInterface = Pick<DialogDataInterface, 'productVariant' | 'requiredStock' | 'totalPrice'>;

export interface DialogDataType {
    products: ProductVariant[],
    values: DialogDataInterface,
    setFieldValue: SetFieldValue<DialogDataInterface>,
};

export interface VariantDialogDataType {
    values: DialogVariantDataInterface,
    setFieldValue: SetFieldValue<DialogVariantDataInterface>,
}

export type DialogSelectorType = Pick<DialogDataType, 'products' | 'values' | 'setFieldValue'>;

export type DialogDataDisplayType = Pick<DialogDataType, 'setFieldValue'> & {
    values: DialogVariantDataInterface,
    label: string,
}

export type DialogDataPriceType = Pick <DialogDataType, 'values'>

export type VariantDialogDataPriceType = Pick <VariantDialogDataType, 'values'>

