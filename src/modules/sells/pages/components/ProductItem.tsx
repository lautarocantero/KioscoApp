import { Grid, type Theme } from "@mui/material";


import type { ProductInterface } from "../../../../typings/sells/sellsTypes";
import ProductItemImage from "./ProductItemImage";
import ProductItemEspecifications from "./ProductItemEspecifications";

const ProductItem = ({product}: {product: ProductInterface}): React.ReactNode => {
    const { name, stock } = product;

    return (
        <Grid
            container
            sx={(theme: Theme) => ({
                backgroundColor: theme?.custom?.backgroundDark,
                color: theme?.custom?.fontColor,
                padding: "0.3em",
                borderRadius: "8px",
                marginBottom: "0.7em",
                width: "100%",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
            })}
        >
        {/* Izquierda: imagen + nombre */}
            <ProductItemImage name={name} stock={stock} />
        {/* Derecha: especificaciones + botón */}
            <ProductItemEspecifications />
        </Grid>
    );
};

export default ProductItem;
