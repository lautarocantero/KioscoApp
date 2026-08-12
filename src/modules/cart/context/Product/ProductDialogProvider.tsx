//─────────────────── Contexto 🔰: DialogProvider  ───────────────────//

//─────────────────── Descripción 📝 ───────────────────//
//Componente proveedor que maneja el estado global del diálogo de producto

import { useState, type PropsWithChildren } from "react";
import { ProductDialogContext } from "./ProductDialogContext";

export const DialogProvider = ({ children }: PropsWithChildren): React.ReactNode => {
  const [showModal, setShowModal] = useState<boolean>(false);

  return (
    <ProductDialogContext.Provider value={{ showModal, setShowModal }}>
      {children}
    </ProductDialogContext.Provider>
  );
};