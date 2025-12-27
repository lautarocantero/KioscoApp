
//─────────────────── Componente 🧩: ProductItemImage ───────────────────//

//─────────────────── Descripción 📝 ───────────────────//
// Renderiza la imagen ilustrativa de un producto dentro del ítem.  
// Actualmente utiliza una imagen de ejemplo (`/images/productExample/cocaCola.png`). 

//──────────────────── Funciones 🔧 ─────────────────────//
// - `ProductItemImage`: componente principal que renderiza una imagen del producto.  

//─────────────────── Notas técnicas 💽  ───────────────────//
// tanto el src como el name no se utilizan, se usara un texto fijo hasta remplazarlo
// por nombres y src reales.  

//-----------------------------------------------------------------------------//

import { Box } from "@mui/material";
import type { ProductItemImageInterface } from "../../../../../typings/sells/sellsComponentTypes";

const ProductItemImage = ({source, name}: ProductItemImageInterface):React.ReactNode => {

    return (
        <Box
            component="img"
            src={source}
            alt={name}
            sx={{
                width: { xs: 90, sm: 200, md: '300' },
                height: { xs: 80, sm: 180 },
                objectFit: "contain",
                borderRadius: "0.3em",
            }}
        />    
    )
}

export default ProductItemImage;