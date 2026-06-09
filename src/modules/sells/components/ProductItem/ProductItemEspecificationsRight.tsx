//─────────────────── Componente 🧩: ProductItemEspecificationsRight ───────────────────//

//─────────────────── Descripción 📝 ───────────────────//
// Sección derecha del ítem de producto.
// Muestra las cantidades disponibles de variantes y el botón para añadir al carrito.  

//──────────────────── Funciones 🔧 ─────────────────────//
// - ProductItemEspecificationsRight: componente principal.
//   - Recibe product.
//   - Renderiza:
//     - ProductItemAmountData: muestra existencias de las variantes.
//     - ProductItemButton: botón para enfatizar la opcion de agregar el producto al carrito.

//-----------------------------------------------------------------------------//

import { Grid } from "@mui/material";
import type { EspecificationsRightProps } from "@typings/sells/reactComponents";
import type { Presentation } from "../../../../typings/productVariant/productVariantTypes";
import ProductItemAmountData from "./ProductItemAmountData";
import ProductItemButton from "./ProductItemButton";


const ProductItemEspecificationsRight = ({product} : EspecificationsRightProps): React.ReactNode => {

    const {variants} : {variants: Presentation[]} = product;

    return (
        <Grid 
            container 
            display={'flex'} 
            flexDirection={'column'} 
            alignItems={{xs: "end", md: 'center'}}
            justifyContent={'space-between'}
            height={'100%'}
            width={{ xs: '50%', md: '100%'}}
            sx={{
                flex: 1,
            }}
        >
            <ProductItemAmountData variants={variants}/>
            <ProductItemButton />
        </Grid>
    )
}

export default ProductItemEspecificationsRight;