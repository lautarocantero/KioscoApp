import type { HandleAddProductDialogItemToCartInterface, ProductTicketType, ValidationResultType } from "@typings/sells/sellTypes";
import { addToCartThunk } from "../../../../store/seller/sellerThunks";
import { AlertColor } from "../../../../typings/ui/ui";
import validateProductForCart from "../../../../modules/sells/helpers/ProductDialog/Validation/ValidateProductForCart";
import formatProductTicket from "../../../../modules/sells/helpers/ProductDialog/Handlers/handleFormatProductTicket";


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

    const { name }: { name: string } = presentation;
    const productTicketObject: ProductTicketType | undefined = formatProductTicket({ Presentation: presentation, requiredStock: quantity });

    if (!productTicketObject) {
        showSnackBar(`Error agregando el producto al carrito`, AlertColor.Error);
        return false;
    }

    const productAdded: boolean = await dispatch(addToCartThunk({ productData: productTicketObject }));

    if (!productAdded) {
        showSnackBar(`No se pudo agregar '${name}' al carrito`, AlertColor.Error);
        return false;
    }

    const nameEdited: string = name.length > 25 ? `${name.slice(0, 25)}...` : name;
    showSnackBar(`Agregado '${nameEdited}' al carrito`, AlertColor.Success);

    return true;
};

export default handleAddProductDialogItemToCart;