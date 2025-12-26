
//─────────────────── Componente 🧩: ProductDialogImageComponent ───────────────────//

//─────────────────── Descripción 📝 ───────────────────//
// Renderiza la imagen del producto en el Modal

//-----------------------------------------------------------------------------//

import { Box } from "@mui/material";
import type { ProductDialogImageComponentType } from "../../../../../typings/sells/sellsTypes";

const ProductDialogImageComponent = ({image_url, name }: ProductDialogImageComponentType):React.ReactNode => {

    return (
        <Box
            component={'img'}
            src={image_url}
            alt={`${name} Image`}
            sx={{
                width: { xs: '100%' },
                minHeight: { xs: '15em'},
                height: { xs: '100%' },
                maxHeight: {xs: '20em'},
                objectFit: "contain",
                borderRadius: "0.3em",
            }}
        >
        </Box>
    )
};

export default ProductDialogImageComponent;