import type { Product } from "../product/productTypes";
import type { ProductVariant } from "../productVariant/productVariant";
import { type Dispatch, type SetStateAction } from "react";
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
// ║ 🪧 Dialog 🪧🪧🪧🪧🪧🪧🪧🪧🪧🪧🪧🪧🪧🪧🪧🪧🪧🪧🪧🪧🪧🪧🪧🪧🪧🪧🪧🪧🪧║
// ╚══════════════════════════════════════════════════════════════════════╝*/

export interface ProductDialogContextType {
    showModal: boolean;
    setShowModal: Dispatch<SetStateAction<boolean>>;
    productData: Product | null,
    setProductData: Dispatch<SetStateAction<Product | null>>;
}