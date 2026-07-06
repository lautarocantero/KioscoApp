//─────────────────── Componente 🧩: CartProductItemImageComponent ───────────────────//
//
//─────────────────── Descripción 📝 ───────────────────//
// Renderiza la miniatura del producto dentro de la fila del carrito.
//
//-----------------------------------------------------------------------------//

import { Box, Grid } from "@mui/material";
import type { CartProductItemImageProps } from "../../../../typings/sells/types/sellsTypes";

const CartProductItemImageComponent = ({image = "/images/productExample/cocaCola.png", name = 'product'}
    : CartProductItemImageProps): React.ReactNode => {
    return (
        <Grid sx={{ flexShrink: 0 }}>
            <Box
                component={'img'}
                src={image}
                alt={name}
                sx={{
                    borderRadius: '0.7em',
                    width: '3.5em',
                    height: '3.5em',
                    objectFit: 'cover',
                }}
            />
        </Grid>
    )
}

export default CartProductItemImageComponent;