
//─────────────────── Componente 🧩: CartProductItem ───────────────────//

//─────────────────── Descripción 📝 ───────────────────//
// Componente que se encarga de mostrar la informacion de un producto que se agrego al carrito

//──────────────────── Funciones 🔧 ─────────────────────//
// -CartProductItemComponent Componente principal que renderiza la informacion del producto
//      -CartProductItemImage Muestra la imagen del producto
//      -CartProductItemData  Muestra la informacion del producto (nombre, tamaño, stock, precio)
//      -CartProductButtons Muestra 2 botones para eliminar una unidad o la totalidad del carrito

//-----------------------------------------------------------------------------//


import { Grid, type Theme } from "@mui/material";
import type { CartProductItemComponentInterface } from "../../../../typings/sells/types/sellsTypes";
import CartProductButtons from "./CartProductButtons";
import CartProductItemData from "./CartProductItemDataComponent";
import CartProductItemImage from "./CartProductItemImageComponent";

const CartProductItemComponent = ({product}: CartProductItemComponentInterface ):React.ReactNode => {
    const {image_url, name, model_size, stock_required, price } : 
    {image_url: string, name: string, model_size: string, stock_required: number, price: number } = product ;

    return(
        <Grid
            container
            sx={{
                display: 'flex',
                flexDirection: 'column'
            }}
        >
            <Grid
                sx={(theme: Theme) => ({
                    backgroundColor: theme?.custom?.whiteTranslucid,
                    borderRadius: '1em 1em 0em 0em',
                    minHeight: { xs: '5em', md: '8em'},
                    marginTop: { xs: '0.3em', md: '0.5em' },
                    display: 'flex',
                    flexDirection: 'row',
                    width: '100%'
                })}
            >
                <CartProductItemImage image={image_url} name={name} />
                <CartProductItemData name={name} size ={model_size} units={String(stock_required)} price={`${price}$`}/>
            </Grid>
            <Grid
                sx={(theme: Theme) => ({
                    backgroundColor: theme?.custom?.whiteTranslucid,
                    borderRadius: '0em 0em 1em 1em',
                    minHeight: { xs: '3em' },
                    display: 'flex',
                    flexDirection: 'row',
                    width: '100%'
                })}
            >
                <CartProductButtons _id={String(product?._id)}/>
            </Grid>
        </Grid>
    )
}

export default CartProductItemComponent;