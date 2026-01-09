
//─────────────────── Componente 🧩: CartProductItemImageComponent ───────────────────//

//─────────────────── Descripción 📝 ───────────────────//
// Renderiza la imagen del producto que se encuentra en el listado de productos del carrito

//-----------------------------------------------------------------------------//

import { Box, Grid } from "@mui/material";
import type { CartProductItemImageComponentInterface } from "../../../../typings/sells/types/sellsTypes";

const CartProductItemImageComponent = ({image = "/images/productExample/cocaCola.png", name = 'product'} 
    : CartProductItemImageComponentInterface):React.ReactNode => {
    return (
        <Grid
            size={{ xs: 4 }}
            display={'flex'}
            alignItems={'center'}
            sx={{
                overflow: 'hidden'
            }}
        >
            <Box
                component={'img'}
                src={image}
                alt={name}
                sx={{
                    borderRadius: '1em 0em 0em 1em',
                    width: {xs: '95%', md: '20em'},
                    minHeight: {xs: '100%', md: '10em'},
                    height: {xs: '100%', md: "10em"},
                    maxHeight: {xs: '5em', md: '10em'},
                    objectFit: { xs: 'cover', sm: 'contain'},
                    objectPosition: 'top',
                }}
            >
            </Box>
        </Grid>
    )
}

export default CartProductItemImageComponent;