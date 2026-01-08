//─────────────────── Contexto 🔰: ProductDialogContext ───────────────────//

//─────────────────── Descripción 📝 ───────────────────//
// Contexto global para manejar el estado del dialog de producto (modal).  
// Permite compartir funciones y valores relacionados con la apertura/cierre del modal

import { createContext } from "react";
import type { ProductDialogContextType } from "../../../../typings/sells/sellsTypes";


export const ProductDialogContext = createContext<ProductDialogContextType | null>(null); 
