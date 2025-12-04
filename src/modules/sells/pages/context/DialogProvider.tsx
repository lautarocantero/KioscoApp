import { useState, type PropsWithChildren } from "react";
import { DialogContext } from "./DialogContext";
import type { Product } from "../../../../typings/product/productTypes";

export const DialogProvider = ({ children }: PropsWithChildren): React.ReactNode => {
  const [showModal, setShowModal] = useState(false);
  const [productData, setProductData] = useState<Product | null>(null);

  return (
    <DialogContext.Provider value={{ showModal, setShowModal,productData, setProductData }}>
      {children}
    </DialogContext.Provider>
  );
};
