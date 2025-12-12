
// # Contexto: DialogContext  

// ## Descripción 📦  
// Contexto global para manejar el estado de diálogos genéricos en la interfaz de usuario.  
// Permite compartir funciones y valores relacionados con la apertura, cierre y control de modales o diálogos entre componentes.  
// Centraliza la gestión de estado evitando prop drilling y asegurando consistencia en la experiencia de usuario.  


import { createContext } from "react";
import type { DialogContextType } from "../../../../typings/ui/uiModules";

export const DialogContext = createContext<DialogContextType | null>(null); 

