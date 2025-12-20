


//─────────────────── Componente 🧩: ProductDialogDataComponent ───────────────────//

//─────────────────── Descripción 📝 ───────────────────//
// Contenedor de datos dentro del diálogo de producto.  
// Renderiza los subcomponentes encargados de seleccionar variante, unidades y precio. 

//──────────────────── Funciones 🔧 ─────────────────────//
// - `ProductDialogDataComponent`: componente principal que recibe props tipadas con `DialogDataType`.  
//   - `products`: listado de variantes de producto disponibles.  
//   - `ProductDialogSelector`: selector de variantes de producto.  
//   - `ProductDialogUnits`: campo para definir cantidad de unidades.  
//   - `ProductDialogPrice`: muestra el precio del producto seleccionado.  

//-----------------------------------------------------------------------------//

import { Box } from "@mui/material";
import type { VariantDialogDataType } from "../../../../../typings/sells/sellsComponentTypes";
import ProductDialogUnits from "./ProductDialogUnits";
import ProductDialogPriceComponent from "./ProductDialogPriceComponent";

const ProductDialogDataComponent = ( {values, setFieldValue } : VariantDialogDataType ):React.ReactNode => {

    return (
        <Box
            display={'flex'}
            flexDirection={'column'}
            sx={{
                m: '2em 0.2em 0em',
            }}
            gap={2}
        >
             <ProductDialogUnits
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

export default ProductDialogDataComponent;



