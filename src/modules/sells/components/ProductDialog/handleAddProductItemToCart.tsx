//── Helper 🦸: handleAddProductDialogItemToCart ──//

// Descripción 📝
// Agrega una presentación puntual al carrito desde la fila del diálogo de producto,
// sin depender del submit del formulario y sin cerrar el modal.

// Lógica 🔧
// - Valida `Presentation` y `requiredStock` con `validateProductForCart`.
// - Si es válido, formatea la variante con `formatProductTicket`.
// - Despacha `addToCartThunk` para agregar al carrito.
// - Solo muestra éxito si el thunk confirma que se agregó de verdad.
// - Muestra un snackbar con feedback. El modal permanece abierto.

//-----------------------------------------------------------------------------//

import type { Presentation } from "@typings/presentation/presentationTypes";
import type { ProductTicketType } from "@typings/seller/sellerTypes";
import type { ValidationResultType } from "@typings/sells/sellTypes";
import type { AppDispatch } from "../../../../store/presentation/presentationSlice";
import { addToCartThunk } from "../../../../store/seller/sellerThunks";
import { AlertColor } from "../../../../typings/ui/ui";
import validateProductForCart from "../../../../modules/sells/helpers/ProductDialog/Validation/ValidateProductForCart";
import formatProductTicket from "../../../../modules/sells/helpers/ProductDialog/Handlers/handleFormatProductTicket";

interface HandleAddProductDialogItemToCartInterface {
    presentation: Presentation;
    quantity: number;
    dispatch: AppDispatch;
    showSnackBar: (message: string, severity?: AlertColor) => void;
}

const handleAddProductDialogItemToCart = async ({
    presentation,
    quantity,
    dispatch,
    showSnackBar,
}: HandleAddProductDialogItemToCartInterface): Promise<boolean> => {

    const validation: ValidationResultType = validateProductForCart({ Presentation: presentation, requiredStock: quantity });

    if (!validation.valid && validation.message) {
        showSnackBar(validation.message, AlertColor.Error);
        return false;
    }

    {/*──🔎 Non-null assertion (!) asegura que no es null (se valida arriba) 🔎 ────*/}
    const { name }: { name: string } = presentation;
    const productTicketObject: ProductTicketType | undefined = formatProductTicket({ Presentation: presentation, requiredStock: quantity });

    if (!productTicketObject) {
        showSnackBar(`Error agregando el producto al carrito`, AlertColor.Error);
        return false;
    }

    {/*──🔎 acá el cambio: ahora leemos si el thunk confirma que se agregó 🔎 ────*/}
    const productAdded: boolean = await dispatch(addToCartThunk({ productData: productTicketObject }));

    if (!productAdded) {
        showSnackBar(`No se pudo agregar '${name}' al carrito`, AlertColor.Error);
        return false;
    }

    const nameEdited: string = name.length > 25 ? `${name.slice(0, 25)}...` : name;
    showSnackBar(`Agregado '${nameEdited}' al carrito`, AlertColor.Success);

    return true;

    {/*──🔎 A propósito: NO se llama a setShowModal(false) acá 🔎 ────*/}
};

export default handleAddProductDialogItemToCart;