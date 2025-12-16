//─────────────────── Contexto 🔰: ProductDialogContext ───────────────────//

//─────────────────── Descripción 📝 ───────────────────//
// Contexto global para manejar el estado del diálogo de producto.  
// Permite compartir funciones y valores relacionados con la apertura/cierre del modal
// Centraliza el manejo del estado del diálogo, evitando prop drilling y asegurando coherencia en la experiencia de usuario.  

import { createContext } from "react";
import type { ProductDialogContextType } from "../../../../typings/sells/sellsTypes";


export const ProductDialogContext = createContext<ProductDialogContextType | null>(null); 
