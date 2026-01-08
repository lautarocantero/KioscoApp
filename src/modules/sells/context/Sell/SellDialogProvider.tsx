//─────────────────── Contexto 🔰: SellDialogProvider  ───────────────────//

//─────────────────── Descripción 📝 ───────────────────//
//Componente proveedor que maneja el estado global del diálogo de la venta

import { useState, type PropsWithChildren } from "react";
import { SellDialogContext } from "./SellDialogContext";

export const SellDialogProvider = ({ children }: PropsWithChildren): React.ReactNode => {
  const [showModal, setShowModal] = useState<boolean>(false);

  return (
    <SellDialogContext.Provider value={{ showModal, setShowModal }}>
      {children}
    </SellDialogContext.Provider>
  );
};
