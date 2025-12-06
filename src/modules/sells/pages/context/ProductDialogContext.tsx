import { createContext } from "react";
import type { ProductDialogContextType } from "../../../../typings/sells/sellsTypes";


export const ProductDialogContext = createContext<ProductDialogContextType | null>(null); 
