//─────────────────── Componente 🧩: ProductItem ───────────────────//

//─────────────────── Descripción 📝 ───────────────────//
// Representa un producto dentro de la vista de ventas.
// Divide la presentación en dos secciones: izquierda (imagen y nombre) y derecha (especificaciones y acción).  

//──────────────────── Funciones 🔧 ─────────────────────//
// - ProductItem: componente principal.
//   - Recibe product.
//   - Renderiza:
//     - ProductItemEspecificationsLeft: muestra nombre e imagen/variantes.
//     - ProductItemEspecificationsRight: muestra especificaciones y botón para agregar al carrito.

//-----------------------------------------------------------------------------//

import { Grid, type Theme } from "@mui/material";
import type { ProductVariant } from "../../../../../typings/productVariant/productVariant";
import type { ProductItemInterface } from "../../../../../typings/sells/sellsComponentTypes";
import ProductItemEspecificationsLeft from "./ProductItemEspecificationsLeft";
import ProductItemEspecificationsRight from "./ProductItemEspecificationsRight";

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
        {/* --------- 🔎 Izquierda: imagen + nombre 🔎 --------- */}
            <ProductItemEspecificationsLeft name={name} variants={variants} />
        {/* --------- 🔎 Derecha: especificaciones + botón 🔎 --------- */}
            <ProductItemEspecificationsRight product={product} />
        </Grid>
    );
};

export default ProductItem;
