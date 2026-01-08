//─────────────────── Contexto 🔰: SellDialogContext ───────────────────//

//─────────────────── Descripción 📝 ───────────────────//
// Contexto global para manejar el estado del dialog de la venta (modal).  
// Permite compartir funciones y valores relacionados con la apertura/cierre del modal

import { createContext } from "react";
import type { SellDialogContextType } from "../../../../typings/sells/sellsTypes";

export const SellDialogContext = createContext<SellDialogContextType | null>(null); 
