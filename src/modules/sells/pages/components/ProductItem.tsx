
// # Componente: ProductItem  

// ## Descripción 📦
// Representa un producto dentro de la vista de ventas.  
// Divide la presentación en dos secciones:  
// - Izquierda: imagen y nombre del producto.  
// - Derecha: especificaciones y botón de acción.  

// ## Funciones 🔧
// - `ProductItem`: componente principal que recibe `product` tipado con `ProductItemInterface`.  
//   - Extrae `name` y `variants` del objeto `product`.  
//   - Renderiza:  
//     - `ProductItemEspecificationsLeft`: muestra nombre e imagen/variantes.  
//     - `ProductItemEspecificationsRight`: muestra especificaciones y acciones (ej. agregar al carrito).  

// ## Notas técnicas 💽
// - Usa `Grid` de MUI como contenedor principal con estilos dinámicos basados en `Theme`.  
// - Diseño responsivo:  
//   - Altura variable según tamaño de pantalla (`xs`, `sm`, `md`).  
//   - Flexbox para disposición en columna en pantallas medianas (`md`).  
// - Bordes redondeados, colores y márgenes adaptados al tema visual.  
// - Se integra en listados o vistas de productos como unidad visual reutilizable.  
//-----------------------------------------------------------------------------//

import { Grid, type Theme } from "@mui/material";
import ProductItemEspecificationsRight from "./ProductItemEspecificationsRight";
import ProductItemEspecificationsLeft from "./ProductItemEspecificationsLeft";
import type { ProductVariant } from "../../../../typings/productVariant/productVariant";
import type { ProductItemInterface } from "../../../../typings/sells/sellsComponentTypes";

const ProductItem = ({ product }: ProductItemInterface): React.ReactNode => {
    const { name, variants } : { name: string, variants: ProductVariant[]} = product;

    return (
        <Grid 
            container
            sx={(theme: Theme) => ({
                alignItems: "center",
                backgroundColor: theme?.custom?.background, 
                borderRadius: "8px",
                color: theme?.custom?.fontColor,
                display: "flex",
                flexDirection: {md: 'column'},
                height: {xs: 'auto', sm: '200px', md: '400px'},
                justifyContent: "space-between",
                margin: '2em auto 0em',
                padding: "0.3em",
                width: {xs: "100%", md:'auto'},
            })}
        >
        {/* Izquierda: imagen + nombre */}
            <ProductItemEspecificationsLeft name={name} variants={variants} />
        {/* Derecha: especificaciones + botón */}
            <ProductItemEspecificationsRight product={product} />
        </Grid>
    );
};

export default ProductItem;
