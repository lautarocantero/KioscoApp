
// # Proveedor de Contexto: DialogProvider  

// ## Descripción 📦  
// Componente proveedor que envuelve a los hijos con el `ProductDialogContext`.  
// Maneja el estado global del diálogo de producto, incluyendo:  
// - `showModal`: controla la visibilidad del modal.  
// - `productData`: almacena la información del producto seleccionado.  
// Expone también las funciones `setShowModal` y `setProductData` para actualizar dichos estados.  
// Permite que cualquier componente hijo consuma y manipule el estado del diálogo sin necesidad de prop drilling.  


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
