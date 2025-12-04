import { createContext } from "react";
import type { ProductDialogContextType } from "../../../../typings/sells/sellsComponentTypes";


export const ProductDialogContext = createContext<ProductDialogContextType | null>(null); 
