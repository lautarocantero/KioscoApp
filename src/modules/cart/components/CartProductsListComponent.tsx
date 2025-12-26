
//─────────────────── Componente 🧩: CartProductList ───────────────────//

//─────────────────── Descripción 📝 ───────────────────//
// Componente que se encarga de renderizar la lista de productos que se encuentran en el carrito

//──────────────────── Funciones 🔧 ─────────────────────//
// -CartProductList Componente principal que muestra un listado
//      -CartProductItem Componente que muestra un producto

//-----------------------------------------------------------------------------//

import { Grid } from "@mui/material";
import type { ProductTicketType } from "../../../typings/seller/sellerTypes";
import type { CartProductListComponentInterface } from "../../../typings/sells/sellsTypes";
import CartProductItem from "./CartProductItem/CartProductItemComponent";

const CartProductListComponent = ({cart}: CartProductListComponentInterface): React.ReactNode => {
    
    if(!cart) return null;
    
    if(cart?.length === 0) return null;

    return (
        <Grid
            container
            display={'flex'}
            flexDirection={'column'}
            width={'100%'}
        >
            {
                cart?.map((prod: ProductTicketType) => {
                    return (
                        <CartProductItem 
                            key={String(prod)}
                            product={prod}
                        />
                    )
                })
            }
        </Grid>
    )

}

export default CartProductListComponent;