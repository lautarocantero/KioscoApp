
//── Helper 🦸: handleProductDialogSelectorChange ──//

// Descripción 📝
// Maneja el cambio de selección de variante dentro del diálogo de producto.

// Lógica 🔧
// - Actualiza el estado de la variante seleccionada.
// - Sincroniza los valores dependientes (precio, stock, imagen).

// Notas técnicas 💽
// - Se usa en ProductDialogSelector

//-----------------------------------------------------------------------------//


import type { ProductVariant } from "@typings/productVariant/productVariant";
import type { HandleProductDialogSelectorChangeInterface } from "@typings/sells/types";
import validateProductSelection from "../Validation/ValidateProductSelection";
 
const handleChangeProductDialogSelector = ({event, products, setFieldValue} : HandleProductDialogSelectorChangeInterface ) => {
    const productId: string = event.target.value as string;

    const validation = validateProductSelection({event, products, productId});

    if (!validation.valid) { 
        throw new Error(validation?.message);
      return; 
    }

    const productObject: ProductVariant | undefined = products.find((prod: ProductVariant) => prod._id === productId);

    if(!productObject) return;

    setFieldValue('productVariantId', productId );
    setFieldValue('productVariant', productObject);
};

export default handleChangeProductDialogSelector;