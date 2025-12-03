import { createContext, type Dispatch, type SetStateAction } from "react";
import type { Product } from "../../../../typings/product/productTypes";

interface DialogContextType {
    showModal: boolean;
    setShowModal: Dispatch<SetStateAction<boolean>>;
    productData: Product | null,
    setProductData: Dispatch<SetStateAction<Product | null>>;
}

export const DialogContext = createContext<DialogContextType | null>(null); 
