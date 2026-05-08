
//── Helper 🦸: handleProductDialogSelectorChange ──//

// Descripción 📝
// Maneja el cambio de selección de variante dentro del diálogo de producto.

// Lógica 🔧
// - Actualiza el estado de la variante seleccionada.
// - Sincroniza los valores dependientes (precio, stock, imagen).

// Notas técnicas 💽
// - Se usa en ProductDialogSelector

//-----------------------------------------------------------------------------//

import type { ProductVariant } from "@typings/productVariant/productVariantTypes";
import type { HandleProductDialogSelectorChangeInterface } from "@typings/sells/types";
import validateProductSelection from "../Validation/ValidateProductSelection";
 
const handleChangeProductDialogSelector = ({event, products, setFieldValue} : HandleProductDialogSelectorChangeInterface ) => {
    
    if(!event?.target) {
        throw new Error("No se ha recibido el evento de cambio.");
        return;
    }

    const productId: string = event.target.value as string;

    const validation = validateProductSelection({event, products, productId});

    if (!validation.valid && "message" in validation) { 
        throw new Error(validation?.message);
        return; 
    }

    if (!validation.valid) { 
      throw new Error("No se ha podido seleccionar el producto");
      return; 
  }

    const productObject: ProductVariant | undefined = products.find((prod: ProductVariant) => prod._id === productId);

    if(!productObject) return;

    setFieldValue('productVariantId', productId );
    setFieldValue('productVariant', productObject);
};

export default handleChangeProductDialogSelector;