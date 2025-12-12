
// # Componente: ProductsList  

// ## Descripción 📦
// Renderiza un listado de productos en la vista de ventas.  
// Itera sobre el array de productos recibido y genera un `ProductItem` por cada uno.  

// ## Funciones 🔧
// - `ProductsList`: componente principal que recibe props tipadas con `ProductListType`.  
//   - `products`: listado de productos a mostrar.  
// - Lógica interna:  
//   - Usa `.map()` para recorrer el array de productos.  
//   - Renderiza un `ProductItem` por cada producto, pasando la prop `product`.  
//   - Usa `prod._id` como `key` para asegurar unicidad en la lista.  

// ## Notas técnicas 💽
// - Se integra en vistas de ventas o catálogos como contenedor de múltiples productos.  
// - Cada `ProductItem` maneja su propia presentación (imagen, datos, acciones).  
// - Mantiene modularidad al delegar la lógica de presentación a `ProductItem`.  
//-----------------------------------------------------------------------------//

import type { Product } from "../../../../typings/product/productTypes";
import type { ProductListType } from "../../../../typings/sells/sellsComponentTypes";
import ProductItem from "./ProductItem";


const ProductsList = ({products}: ProductListType):React.ReactNode => {
    return (
        <>
            {products.map((prod: Product) => 
                (<ProductItem key={prod._id} product={prod as Product} />)
            )}
        </>
    )
}

export default ProductsList;