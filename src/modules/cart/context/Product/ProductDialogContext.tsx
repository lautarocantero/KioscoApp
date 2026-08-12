import type { ProductDialogContextType } from "@typings/sells/sellTypes";
import { createContext } from "react";

export const ProductDialogContext = createContext<ProductDialogContextType | null>(null); 
