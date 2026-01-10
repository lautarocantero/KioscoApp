
//─────────────────── Componente 🧩: ProductItem ───────────────────//

//─────────────────── Descripción 📝 ───────────────────//
// Representa un producto dentro de la vista de ventas.
// Al hacer click en el se abre un modal mostrando los detalles del producto para agregarlo al carrito.
// Divide la presentación en dos secciones: izquierda (imagen y nombre) y derecha (especificaciones y boton ilustrativo).  

//──────────────────── Funciones 🔧 ─────────────────────//
// - ProductItem: componente principal. Recibe product.
// - ⌚ Antes: el modal se abría con un botón; ahora se abre al clickear la imagen (feedback de usuarios).
//     - ProductItemEspecificationsLeft: muestra nombre e imagen/variantes.
//     - ProductItemEspecificationsRight: muestra especificaciones y botón para agregar al carrito.

//-----------------------------------------------------------------------------//

import { Grid, type Theme } from "@mui/material";
import type { ProductVariant } from "../../../../typings/productVariant/productVariant";
import ProductItemEspecificationsLeft from "./ProductItemEspecificationsLeft";
import ProductItemEspecificationsRight from "./ProductItemEspecificationsRight";
import { useContext } from "react";
import type { AppDispatch } from "../../../../store/auth/authSlice";
import { useDispatch } from "react-redux";
import { selectProductThunk } from "../../../../store/seller/sellerThunks";
import type { getProductSelectedPayload } from "../../../../typings/seller/sellerTypes";
import { ProductDialogContext } from "../../context/Product/ProductDialogContext";
import type { ProductItemInterface } from "@typings/sells/reactComponents";

const ProductItemComponent = ({ product }: ProductItemInterface): React.ReactNode => {
    const { name, variants } : { name: string, variants: ProductVariant[]} = product;
    const { setShowModal } = useContext(ProductDialogContext)!;
    const dispatch = useDispatch<AppDispatch>();

    const selectProduct = async({product}: Partial<getProductSelectedPayload>): Promise<void> => {
        if(!product) throw new Error('No se ha seleccionado un producto');
        await dispatch(selectProductThunk({productData: product }));
        setShowModal(true);
    }

    return (
        <Grid 
            container
            sx={(theme: Theme) => ({
                alignItems: "center",
                backgroundColor: theme?.custom?.background, 
                borderRadius: "1em",
                color: theme?.custom?.fontColor,
                display: "flex",
                flexDirection: {md: 'column'},
                height: {xs: 'auto', sm: '200px', md: '400px'},
                justifyContent: "space-between",
                "&:first-of-type": { margin: { xs: "2em auto 0em", md: "1.5em auto 0em"}},
                margin: { xs: "0em auto", md: "1.5em auto 0em"},
                padding: "0.3em",
                width: {xs: "95%", md:'15em'},
            })}
            onClick={ () => { 
                selectProduct({product});
            }}
        >
        {/* --------- 🔎 Izquierda: imagen + nombre 🔎 --------- */}
            <ProductItemEspecificationsLeft name={name} variants={variants} image={product?.image_url}/>
        {/* --------- 🔎 Derecha: especificaciones + botón 🔎 --------- */}
            <ProductItemEspecificationsRight product={product} />
        </Grid>
    );
};

export default ProductItemComponent;
