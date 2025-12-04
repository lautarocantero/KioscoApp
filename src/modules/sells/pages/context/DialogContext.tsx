import { createContext } from "react";
import type { DialogContextType } from "../../../../typings/sells/sellsComponentTypes";


export const DialogContext = createContext<DialogContextType | null>(null); 
