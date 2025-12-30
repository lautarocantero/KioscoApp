//─────────────────── Contexto 🔰: SnackBarContext ───────────────────//

//─────────────────── Descripción 📝 ───────────────────//
// Contexto global para manejar el estado del snackbar.  
// Permite compartir funciones y valores relacionados con la apertura/cierre del snackbar

import { createContext } from "react";
import type { SnackBarContextInterface } from "../../../../../src/typings/ui/uiModules";

export const SnackBarContext = createContext<SnackBarContextInterface | null>(null);