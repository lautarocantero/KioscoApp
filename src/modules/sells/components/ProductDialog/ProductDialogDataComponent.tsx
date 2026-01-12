
//─────────────────── Componente 🧩: ProductDialogDataComponent ───────────────────//

//─────────────────── Descripción 📝 ───────────────────//
// Muestra los datos principales del producto dentro del diálogo.  

//──────────────────── Funciones 🔧 ─────────────────────//
//   - Renderiza nombre y descripción del producto.  
//   - Muestra información adicional como categoría o atributos relevantes.  
//   - Se integra con Formik para mostrar valores actuales del producto.  

//-----------------------------------------------------------------------------//

import { Box } from "@mui/material";
import type { DialogDataProps } from "@typings/sells/reactComponents";
import React from "react";
import ProductDialogPriceComponent from "./ProductDialogPriceComponent";
import ProductDialogSelector from "./ProductDialogSelector";
import ProductDialogUnitsComponent from "./ProductDialogUnitsComponent";

const ProductDialogDataComponent = ( {products, values, setFieldValue } : DialogDataProps ):React.ReactNode => {

    return (
        <Box
            display={'flex'}
            flexDirection={'column'}
            sx={{
                m: '2em 0.2em 0em',
            }}
            gap={2}
        >
            <ProductDialogSelector 
                products={products} 
                values={values}
                setFieldValue={setFieldValue}
            />
             <ProductDialogUnitsComponent
                values={values}
                setFieldValue={setFieldValue}
                label={'Unidades'}
             />
              <ProductDialogPriceComponent
                values={values}
             />
        </Box>
    )
};

export default React.memo(ProductDialogDataComponent);



