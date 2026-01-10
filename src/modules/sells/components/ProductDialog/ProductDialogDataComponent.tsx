
//─────────────────── Componente 🧩: ProductDialogDataComponent ───────────────────//

//─────────────────── Descripción 📝 ───────────────────//
// Contenedor de datos dentro del diálogo de producto.  
// Renderiza los subcomponentes encargados de seleccionar variante, unidades y precio. 

//──────────────────── Funciones 🔧 ─────────────────────//
// - `ProductDialogDataComponent`: componente principal que recibe props tipadas con `DialogDataProps`.  
//   - `products`: listado de variantes de producto disponibles.  
//   - `ProductDialogSelector`: selector de variantes de producto.  
//   - `ProductDialogUnits`: campo para definir cantidad de unidades.  
//   - `ProductDialogPrice`: muestra el precio del producto seleccionado.  

//-----------------------------------------------------------------------------//

import { Box } from "@mui/material";
import type { DialogDataProps } from "@typings/sells/reactComponents";
import ProductDialogPriceComponent from "./ProductDialogPriceComponent";
import ProductDialogSelector from "./ProductDialogSelector";
import ProductDialogUnitsComponent from "./ProductDialogUnitsComponent";
import React from "react";

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



