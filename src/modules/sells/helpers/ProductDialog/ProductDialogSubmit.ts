
//── Helper 🦸: onSubmit ──//

// Descripción 📝
// Maneja el envío del formulario en ProductDialog, validando la selección y agregando el producto al carrito.

// Lógica 🔧
// - Valida `productVariant` y `requiredStock` con `validateProductSubmission`.
// - Si es válido, formatea la variante con `formatProductTicket`.
// - Despacha `addToCartThunk` para agregar al carrito.
// - Cierra el modal y muestra un snackbar con feedback.

// Notas técnicas 💽
// - Tipado con `DialogOnSubmitType`, `ProductVariant` y `ProductTicketType`.
// - Usa `showSnackBar` para feedback visual.
// - Integrado en el componente `ProductDialog` como callback de Formik.

//-----------------------------------------------------------------------------//


import type { ProductVariant } from "@typings/productVariant/productVariant";
import type { DialogOnSubmitType } from "@typings/sells/types";
import validateProductSubmission from "../ValidateProductSubmission";
import { AlertColor } from "../../../../typings/ui/ui";
import formatProductTicket from "../FormatProductTicket";
import type { ProductTicketType } from "@typings/seller/sellerTypes";
import { addToCartThunk } from "../../../../store/seller/sellerThunks";

  const onSubmit = async ({ data, showSnackBar, dispatch, setShowModal }: DialogOnSubmitType): Promise<void> => {
    const { productVariant, requiredStock }: { productVariant: ProductVariant | null, requiredStock: number } = data;

    const validation = validateProductSubmission({productVariant, requiredStock});

    if (!validation.valid) { 
      showSnackBar(validation.message, AlertColor.Error); 
      return; 
    }
    {/*──🔎 Non-null assertion (!) asegura que no es null (se valida arriba) 🔎 ────*/}
    const { name } : { name : string } = productVariant!;             
    const productTicketObject: ProductTicketType | undefined = formatProductTicket({productVariant: productVariant!, requiredStock});

    if(!productTicketObject) {
      showSnackBar(`Error agregando el producto al carrito`, AlertColor.Error);
      return;
    };

    await dispatch(addToCartThunk({productData: productTicketObject}));   
    setShowModal(false)

    const nameEdited: string = name.length > 25 ? `${name.slice(0, 25)}...` : name;
    showSnackBar(`Agregado '${nameEdited}' al carrito`, AlertColor.Success);
  }  

export default onSubmit;