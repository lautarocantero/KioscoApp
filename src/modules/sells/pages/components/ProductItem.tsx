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
