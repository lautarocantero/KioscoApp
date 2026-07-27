import type { UseSellerBarResult } from "./sellerTypes";

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