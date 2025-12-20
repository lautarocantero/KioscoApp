//─────────────────── Contexto 🔰: ProductVariantDialogContext ───────────────────//

//─────────────────── Descripción 📝 ───────────────────//
// Contexto global para manejar el estado del diálogo del producto variante.  
// A diferencia del contexto del producto, este mostrara un producto variante, no un producto (que dentro contiene
// producto variante)
// Permite compartir funciones y valores relacionados con la apertura/cierre del modal

import { createContext } from "react";
import type { ProductVariantDialogContextType } from "../../../../../typings/sells/sellsTypes";

export const ProductVariantDialogContext = createContext<ProductVariantDialogContextType | null>(null); 
