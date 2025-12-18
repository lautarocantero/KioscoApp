
//─────────────────── Componente 🧩: CartProductItem ───────────────────//

//─────────────────── Descripción 📝 ───────────────────//
// Componente que se encarga de mostrar la informacion de un producto que se agrego al carrito

//──────────────────── Funciones 🔧 ─────────────────────//
// -CartProductItemComponent Componente principal que renderiza la informacion del producto
//      -CartProductItemImage Muestra la imagen del producto
//      -CartProductItemData  Muestra la informacion del producto (nombre, tamaño, stock, precio)

//─────────────────── 📝 To do: cambiar la imagen fija por el flujo ───────────────────//

//-----------------------------------------------------------------------------//


import { Grid, type Theme } from "@mui/material";
import type { CartProductItemComponentInterface } from "../../../../typings/sells/sellsTypes";
import CartProductItemData from "./CartProductItemDataComponent";
import CartProductItemImage from "./CartProductItemImageComponent";

const CartProductItemComponent = ({product}: CartProductItemComponentInterface ):React.ReactNode => {
    const {image_url, name, model_size, stock_required, price } = product;

    return(
        <Grid
            container
            sx={(theme: Theme) => ({
                backgroundColor: theme?.custom?.whiteTranslucid,
                borderRadius: '1em',
                minHeight: { xs: '5em', md: '8em'},
                marginTop: { xs: '0.1em', md: '0.5em' },
                display: 'flex',
                flexDirection: 'row',
                width: '100%'
            })}
        >
            <CartProductItemImage image={undefined} name={name} />
            <CartProductItemData name={name} size ={model_size} units={stock_required} price={`${price}$`}/>
        </Grid>
    )
}

export default CartProductItemComponent;