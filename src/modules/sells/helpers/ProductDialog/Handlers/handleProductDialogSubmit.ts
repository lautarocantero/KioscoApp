
//── Helper 🦸: onSubmit ──//

// Descripción 📝
// Maneja el envío del formulario en ProductDialog, validando la selección y agregando el producto al carrito.

// Lógica 🔧
// - Valida `Presentation` y `requiredStock` con `validateProductForCart`.
// - Si es válido, formatea la variante con `formatProductTicket`.
// - Despacha `addToCartThunk` para agregar al carrito.
// - Cierra el modal y muestra un snackbar con feedback.

// Notas técnicas 💽
// - Integrado en el componente `ProductDialog` como callback de Formik.

//-----------------------------------------------------------------------------//


import type { Presentation } from "@typings/presentation/presentationTypes";
import type { ProductTicketType } from "@typings/seller/sellerTypes";
import type { DialogOnSubmitType, ValidationResultType } from "@typings/sells/sellTypes";
import { addToCartThunk } from "../../../../../store/seller/sellerThunks";
import { AlertColor } from "../../../../../typings/ui/ui";
import validateProductForCart from "../Validation/ValidateProductForCart";
import formatProductTicket from "./handleFormatProductTicket";

  const onSubmit = async ({ data, showSnackBar, dispatch, setShowModal }: DialogOnSubmitType): Promise<void> => {
    const { Presentation, requiredStock }: { Presentation: Presentation | null, requiredStock: number } = data;

    const validation: ValidationResultType = validateProductForCart({Presentation, requiredStock});

    if (!validation.valid && validation.message) { 
      showSnackBar(validation.message, AlertColor.Error); 
      return; 
    }
    {/*──🔎 Non-null assertion (!) asegura que no es null (se valida arriba) 🔎 ────*/}
    const { name } : { name : string } = Presentation!;             
    const productTicketObject: ProductTicketType | undefined = formatProductTicket({Presentation: Presentation!, requiredStock});

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