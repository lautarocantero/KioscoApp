
// # Proveedor de contexto: DialogProvider  

// ## Descripción 📦  
// Componente proveedor que encapsula el estado y funciones para manejar la visibilidad de un diálogo/modal.  
// Utiliza `DialogContext` para compartir `showModal` y `setShowModal` con todos los componentes hijos.  

// ## Lógica 🔧  
// - Estado local:  
//   - `showModal`: booleano que indica si el modal está visible.  
//   - `setShowModal`: función para actualizar el estado.  
// - `DialogContext.Provider`: expone `{ showModal, setShowModal }` a través del contexto.  
// - `children`: cualquier componente hijo que necesite acceder o modificar el estado del diálogo.  

// ## Notas técnicas 💽  
// - Tipado con `PropsWithChildren` para aceptar cualquier contenido hijo.  
// - Patrón estándar de React Context API para evitar prop drilling.  
// - Se integra en flujos donde se requiere abrir/cerrar modales de manera global y controlada.  


import { useState, type PropsWithChildren } from "react";
import { DialogContext } from "./DialogContext";

export const DialogProvider = ({ children }: PropsWithChildren): React.ReactNode => {
  const [showModal, setShowModal] = useState<boolean>(false);

  return (
    <DialogContext.Provider value={{ showModal, setShowModal }}>
      {children}
    </DialogContext.Provider>
  );
};
