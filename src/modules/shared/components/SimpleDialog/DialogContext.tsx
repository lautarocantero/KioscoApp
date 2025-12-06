import { createContext } from "react";
import type { DialogContextType } from "../../../../typings/ui/uiModules";


export const DialogContext = createContext<DialogContextType | null>(null); 
