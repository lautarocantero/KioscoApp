

//─────────────────── Componente 🧩: ProductDialogData ───────────────────//

//─────────────────── Descripción 📝 ───────────────────//
// Contenedor de datos dentro del diálogo de producto.  
// Renderiza los subcomponentes encargados de seleccionar variante, unidades y precio. 

//──────────────────── Funciones 🔧 ─────────────────────//
// - `ProductDialogData`: componente principal que recibe props tipadas con `DialogDataType`.  
//   - `products`: listado de variantes de producto disponibles.  
//   - `values`: valores actuales del formulario (Formik).  
//   - `setFieldValue`: función de Formik para actualizar campos.  
// - Renderiza:  
//   - `ProductDialogSelector`: selector de variantes de producto.  
//   - `ProductDialogUnits`: campo para definir cantidad de unidades.  
//   - `ProductDialogPrice`: muestra el precio del producto seleccionado.  

//-----------------------------------------------------------------------------//

import { Box } from "@mui/material";
import type { DialogDataType } from "../../../../../typings/sells/sellsComponentTypes";
import ProductDialogPrice from "./ProductDialogPrice";
import ProductDialogSelector from "./ProductDialogSelector";
import ProductDialogUnits from "./ProductDialogUnits";

const ProductDialogData = ( {products, values, setFieldValue } : DialogDataType ):React.ReactNode => {

    return (
        <Box
            display={'flex'}
            flexDirection={'column'}
            component={'form'}
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
             <ProductDialogUnits
                values={values}
                setFieldValue={setFieldValue}
                label={'Unidades'}
             />
              <ProductDialogPrice
                values={values}
             />
        </Box>
    )
};

export default ProductDialogData;



