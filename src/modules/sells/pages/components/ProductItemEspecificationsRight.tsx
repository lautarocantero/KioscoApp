
// # Componente: ProductItemEspecificationsRight  

// ## Descripción 📦
// Sección derecha del ítem de producto.  
// Renderiza las especificaciones de cantidad disponibles y el botón de acción para añadir al carrito.  

// ## Funciones 🔧
// - `ProductItemEspecificationsRight`: componente principal que recibe `product` tipado con `EspecificationsRightType`.  
//   - Extrae `variants` del objeto `product`.  
//   - Renderiza:  
//     - `ProductItemAmountData`: muestra información sobre las cantidades disponibles de las variantes.  
//     - `ProductItemButton`: botón que permite añadir el producto al carrito (abre el diálogo y despacha la acción).  

// ## Notas técnicas 💽
// - Usa `Grid` de MUI como contenedor con disposición en columna.  
// - Diseño responsivo:  
//   - Alinea contenido a la derecha en pantallas pequeñas (`xs`).  
//   - Centra contenido en pantallas medianas (`md`).  
// - Mantiene altura completa y ocupa el 50% del ancho en pantallas pequeñas, 100% en medianas.  
// - Se integra en `ProductItem` como la sección derecha del layout.  
//-----------------------------------------------------------------------------//

import { Grid } from "@mui/material";
import ProductItemButton from "./ProductItemButton";
import ProductItemAmountData from "./ProductItemAmountData";
import type { ProductVariant } from "../../../../typings/productVariant/productVariant";
import type { EspecificationsRightType } from "../../../../typings/sells/sellsComponentTypes";


const ProductItemEspecificationsRight = ({product} : EspecificationsRightType): React.ReactNode => {

    const {variants} : {variants: ProductVariant[]} = product;

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
            <ProductItemButton product={product} />
        </Grid>
    )
}

export default ProductItemEspecificationsRight;