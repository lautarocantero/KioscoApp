import { createContext, type Dispatch, type SetStateAction } from "react";
import type { ProductInterface } from "../../../../typings/sells/sellsTypes";

interface DialogContextType {
    showModal: boolean;
    setShowModal: Dispatch<SetStateAction<boolean>>;
    productData: ProductInterface | null,
    setProductData: Dispatch<SetStateAction<ProductInterface | null>>;
}

export const DialogContext = createContext<DialogContextType | null>(null); 
