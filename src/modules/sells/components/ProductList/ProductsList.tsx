
//─────────────────── Componente 🧩: ProductsList  ───────────────────//

//─────────────────── Descripción 📝 ───────────────────//
// Renderiza un listado de productos en la vista de ventas.  
// Itera sobre el array de productos recibido y genera un `ProductItem` por cada uno.  
// Si no exiten productos, aparecera un loader. 

//──────────────────── Funciones 🔧 ─────────────────────//
// - `ProductsList`: componente principal que recibe props tipadas con `ProductListType`.  
//   - `products`: listado de productos a mostrar.

//─────────────────── Notas técnicas 💽  ───────────────────//
// - Se integra en vistas de ventas o catálogos como contenedor de múltiples productos.  
// - Cada `ProductItem` maneja su propia presentación (imagen, datos, acciones).  
// - Mantiene modularidad al delegar la lógica de presentación a `ProductItem`.  
//-----------------------------------------------------------------------------//

import { CircularProgress } from "@mui/material";
import type { Product } from "../../../../typings/product/productTypes";
import type { ProductListType } from "../../../../typings/sells/sellsComponentTypes";
import ProductItemComponent from "../ProductItem/ProductItemComponent";

const ProductsList = ({products}: ProductListType):React.ReactNode => {

    if(products.length === 0 ) return ( <CircularProgress />)

    return (
        <>
            {products.map((prod: Product) => 
                (<ProductItemComponent key={prod._id} product={prod as Product} />)
            )}
        </>
    )
}

export default ProductsList;