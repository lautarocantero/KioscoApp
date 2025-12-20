//─────────────────── Contexto 🔰: DialogProvider  ───────────────────//

//─────────────────── Descripción 📝 ───────────────────//
//Componente proveedor que maneja el estado global del diálogo de producto

import { useState, type PropsWithChildren } from "react";
import { ProductVariantDialogContext } from "./ProductVariantDialogContext";

export const ProductVariantDialogProvider = ({ children }: PropsWithChildren): React.ReactNode => {
  const [showModal, setShowModal] = useState<boolean>(false);

  return (
    <ProductVariantDialogContext.Provider value={{ showModal, setShowModal }}>
      {children}
    </ProductVariantDialogContext.Provider>
  );
};
