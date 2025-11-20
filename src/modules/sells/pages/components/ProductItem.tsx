import { Grid, type Theme } from "@mui/material";
import type { ProductInterface } from "../../../../typings/sells/sellsTypes";
import ProductItemEspecificationsRight from "./ProductItemEspecificationsRight";
import ProductItemEspecificationsLeft from "./ProductItemEspecificationsLeft";

const ProductItem = ({product}: {product: ProductInterface}): React.ReactNode => {
    const { name, stock, price } = product;

    return (
        <Grid
            container
            sx={(theme: Theme) => ({
                alignItems: "center",
                backgroundColor: theme?.custom?.backgroundDark,
                borderRadius: "8px",
                color: theme?.custom?.fontColor,
                display: "flex",
                height: {xs: 'auto', sm: '200px'},
                justifyContent: "space-between",
                marginBottom: "0.7em",
                padding: "0.3em",
                width: "100%",
            })}
        >
        {/* Izquierda: imagen + nombre */}
            <ProductItemEspecificationsLeft name={name} stock={stock} price={price} />
        {/* Derecha: especificaciones + botón */}
            <ProductItemEspecificationsRight />
        </Grid>
    );
};

export default ProductItem;
