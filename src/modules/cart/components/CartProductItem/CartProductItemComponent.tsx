//─────────────────── Componente 🧩: CartProductItem ───────────────────//
//
//─────────────────── Descripción 📝 ───────────────────//
// Fila de producto del carrito: imagen, nombre/tamaño, precio unitario,
// stepper de cantidad, subtotal y botón de eliminar.
//
//-----------------------------------------------------------------------------//

import { Grid, type Theme } from "@mui/material";
import type { CartProductItemProps } from "../../../../typings/sells/types/sellsTypes";
import { formatCurrency } from "../../helpers/formatCurrency";
import CartProductButtons from "./CartProductButtons";
import CartProductItemData from "./CartProductItemDataComponent";
import CartProductItemImage from "./CartProductItemImageComponent";
import CartProductPriceColumn from "../CartProductPriceColumnComponent";
import CartProductQuantity from "../CartProductQuantityComponent";

const CartProductItemComponent = ({product}: CartProductItemProps): React.ReactNode => {
    const {image_url, name, model_size, stock_required, price, _id}:
    {image_url: string, name: string, model_size: string, stock_required: number, price: number, _id?: string} = product;

    const subtotal: number = price * stock_required;

    return (
        <Grid
            container
            sx={(theme: Theme) => ({
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                width: '100%',
                gap: 1.5,
                backgroundColor: theme?.custom?.posBackground,
                borderRadius: '1em',
                padding: '0.8em 1em',
                marginBottom: '0.8em',
            })}
        >
            <CartProductItemImage image={image_url} name={name} />
            <CartProductItemData name={name} size={model_size} />
            <CartProductPriceColumn label="Precio unitario" value={formatCurrency(price)} />
            <CartProductQuantity _id={String(_id)} quantity={stock_required} />
            <CartProductPriceColumn label="Subtotal" value={formatCurrency(subtotal)} />
            <CartProductButtons _id={String(_id)} />
        </Grid>
    )
}

export default CartProductItemComponent;