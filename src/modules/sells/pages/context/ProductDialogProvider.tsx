import { useState, type PropsWithChildren } from "react";
import type { Product } from "../../../../typings/product/productTypes";
import { ProductDialogContext } from "./ProductDialogContext";

export const DialogProvider = ({ children }: PropsWithChildren): React.ReactNode => {
  const [showModal, setShowModal] = useState(false);
  const [productData, setProductData] = useState<Product | null>(null);

  return (
    <ProductDialogContext.Provider value={{ showModal, setShowModal,productData, setProductData }}>
      {children}
    </ProductDialogContext.Provider>
  );
};
