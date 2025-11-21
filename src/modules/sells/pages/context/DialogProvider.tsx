import { useState, type PropsWithChildren } from "react";
import { DialogContext } from "./DialogContext";
import type { ProductInterface } from "../../../../typings/sells/sellsTypes";

export const DialogProvider = ({ children }: PropsWithChildren) => {
  const [showModal, setShowModal] = useState(false);
  const [productData, setProductData] = useState<ProductInterface | null>(null);

  return (
    <DialogContext.Provider value={{ showModal, setShowModal,productData, setProductData }}>
      {children}
    </DialogContext.Provider>
  );
};
