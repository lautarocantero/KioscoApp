//─────────────────── Componente 🧩: ProductItemEspecificationsLeft  ───────────────────//

//─────────────────── Descripción 📝 ───────────────────//
// Sección izquierda del ítem de producto.  
// Renderiza la imagen del producto y sus datos básicos (nombre + stock total).

//──────────────────── Funciones 🔧 ─────────────────────//
// - `ProductItemEspecificationsLeft`: componente principal que recibe props tipadas con `EspecificationsLeftInterface`.  
//   - `name`: nombre del producto (por defecto `"product"` si no se pasa prop).  
//   - `variants`: listado de variantes del producto (por defecto array vacío).  
// - Renderiza:  
//   - `ProductItemImage`: imagen representativa del producto.  
//   - `ProductItemData`: muestra nombre y stock total calculado a partir de las variantes.

//─────────────────── 📝 To do: Cambiar datos fijos por datos reales ───────────────────//

//-----------------------------------------------------------------------------//

import { Grid } from "@mui/material";
import type { EspecificationsLeftInterface } from "../../../../../typings/sells/sellsComponentTypes";
import ProductItemData from "./ProductItemData";
import ProductItemImage from "./ProductItemImage";

const ProductItemEspecificationsLeft = ({name = 'product', variants = [], image = '/images/productExample/cocaCola.png'} : EspecificationsLeftInterface ): React.ReactNode => {

    return (
        <Grid 
            display="flex" 
            flexDirection={{ md: 'column'}}
            alignItems="center"
            height={'100%'}
            width={{ xs: '50%', md: '100%'}}
            sx={{
                flex: 1,
            }}
        >
            <ProductItemImage source={image} name={name} />
            <ProductItemData name={name} variants={variants} />                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   
        </Grid>
    )
}

export default ProductItemEspecificationsLeft;