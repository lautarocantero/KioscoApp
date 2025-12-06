import { createContext } from "react";
import type { ProductDialogContextType } from "../../../../typings/sells/sellsComponentTypes";


export const DialogContext = createContext<ProductDialogContextType | null>(null); 
