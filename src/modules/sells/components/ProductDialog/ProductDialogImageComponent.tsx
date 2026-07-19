
//─────────────────── Componente 🧩: ProductDialogImageComponent ───────────────────//

//─────────────────── Descripción 📝 ───────────────────//
// Renderiza la imagen principal del producto en el diálogo.  

//──────────────────── Funciones 🔧 ─────────────────────//
//   - Muestra imagen del producto seleccionada.  
//   - Permite fallback si no hay imagen disponible.  

//-----------------------------------------------------------------------------//

import { Box } from "@mui/material";
import type { ProductDialogImageProps } from "@typings/sells/SellComponentTypes";
import React from "react";

const ProductDialogImageComponent = ({image_url = '/images/productExample/cocaCola.png', name = 'Product'}: ProductDialogImageProps):React.ReactNode => {

    return (
        <Box
            component={'img'}
            src={image_url}
            alt={`${name} Image`}
            sx={{
                minWidth: { xs: '10em', sm: '20em' },
                width: { xs: '100%' },
                minHeight: { xs: '15em' },
                height: { xs: '100%' },
                maxHeight: { xs: '20em' },
                objectFit: "contain",
                borderRadius: "0.3em",
            }}
        >
        </Box>
    )
};

export default React.memo(ProductDialogImageComponent);