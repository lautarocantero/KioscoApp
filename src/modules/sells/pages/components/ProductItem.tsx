import { Grid, type Theme } from "@mui/material";
import type { ProductInterface } from "../../../../typings/sells/sellsTypes";
import ProductItemEspecificationsRight from "./ProductItemEspecificationsRight";
import ProductItemEspecificationsLeft from "./ProductItemEspecificationsLeft";

const ProductItem = ({product }: {product: ProductInterface}): React.ReactNode => {
    const { name, stock, price } = product;

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
            <ProductItemEspecificationsLeft name={name} stock={stock} price={price} />
        {/* Derecha: especificaciones + botón */}
            <ProductItemEspecificationsRight />
        </Grid>
    );
};

export default ProductItem;
