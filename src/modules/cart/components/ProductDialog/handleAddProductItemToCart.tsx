import type { ProductTicketWithStockType, ValidationResultType } from "@typings/sells/sellTypes";
import { AlertColor } from "@typings/ui/ui";
import type { HandleAddProductDialogItemToCartInterface } from "@typings/cart/cartTypes";
import validateProductForCart from "../../helpers/ProductDialog/Validation/ValidateProductForCart";
import formatProductTicket from "../../helpers/ProductDialog/Handlers/handleFormatProductTicket";
import { addToCartThunk } from "../../../../store/cart/cartThunks";


const handleAddProductDialogItemToCart = async ({
    presentation,
    quantity,
    dispatch,
    showSnackBar,
    t,
}: HandleAddProductDialogItemToCartInterface): Promise<boolean> => {

    const validation: ValidationResultType = validateProductForCart({ Presentation: presentation, requiredStock: quantity, t });

    if (!validation.valid && validation.message) {
        showSnackBar(validation.message, AlertColor.Error);
        return false;
    }

    const { name }: { name: string } = presentation;
    const productTicketObject: ProductTicketWithStockType | undefined = formatProductTicket({ Presentation: presentation, requiredStock: quantity });

    if (!productTicketObject) {
        showSnackBar(t("cart.snackbar.genericAddError"), AlertColor.Error);
        return false;
    }

    const productAdded: boolean = await dispatch(addToCartThunk({ productData: productTicketObject }));

    if (!productAdded) {
        showSnackBar(t("cart.snackbar.addToCartFailed", { name }), AlertColor.Error);
        return false;
    }

    const nameEdited: string = name.length > 25 ? `${name.slice(0, 25)}...` : name;
    showSnackBar(t("cart.snackbar.addedToCart", { name: nameEdited }), AlertColor.Success);

    return true;
};

export default handleAddProductDialogItemToCart;