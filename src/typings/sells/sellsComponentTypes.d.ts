import type { Product } from "../product/productTypes";
import type { ProductVariant } from "../productVariant/productVariant";
// /*══════════════════════════════════════════════════════════════════════╗
// ║ 📋 Product Exhibitor 📋📋📋📋📋📋📋📋📋📋📋📋📋📋📋📋📋📋📋📋📋📋📋📋📋║
// ╚══════════════════════════════════════════════════════════════════════╝*/

export interface ProductsExhibitorInterface {
    title: string;
    products: Product[];
};

export type ProductListType  = Pick<ProductsExhibitorInterface, 'products'>;


// /*══════════════════════════════════════════════════════════════════════╗
// ║ 🍞 Product Item 🍞 🧀 🍫 🍷 ☕ 🔋 🍞 🧀 🍫 🍷 ☕ 🔋 🍞 🧀 🍫 🍷 ☕ 🔋  ║
// ╚══════════════════════════════════════════════════════════════════════╝*/

export interface ProductItemInterface {
    product: Product;
};

export interface EspecificationsLeftInterface {
    name: string,
    variants: ProductVariant[];
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
// ║ 🪧 Dialog 🪧🪧🪧🪧🪧🪧🪧🪧🪧🪧🪧🪧🪧🪧🪧🪧🪧🪧🪧🪧🪧🪧🪧🪧🪧🪧🪧🪧🪧🪧  ║
// ╚══════════════════════════════════════════════════════════════════════╝*/

export interface DialogDataInterface {
    productId: string,
    productAvailableStock: number,
    productStock: number,
    productPrice: number,
}

export interface DialogDataType {
    products: ProductVariant[],
    values: DialogData,
    setFieldValue: (field: string, value: string) => void,
};

export type DialogSelectorType = Pick<DialogDataType, 'products' | 'values' | 'setFieldValue'>;

export type DialogDataDisplayType = Pick <DialogDataType, 'values' | 'setFieldValue'> & {
    label: string;
}

export type DialogDataPriceType = Pick <DialogDataType, 'values'>




