import { Grid } from "@mui/material";
import { memo, type ReactNode } from 'react';
import CartLabel from "./CartLabelComponent";
import type { CartHeaderProps } from "@typings/seller/sellerComponentTypes";
import CartHeaderActions from "./CartHeaderActions";


const CartHeaderComponent = ({ itemsCount, onClearCart }: CartHeaderProps): ReactNode => {


    return (
        <Grid
            container
            size={{ xs: 12, md: 8 }}
            sx={{ mb: "2em", rowGap: "1em" }}
        >
            <CartLabel />
            <CartHeaderActions itemsCount={itemsCount} onClearCart={onClearCart} />
        </Grid>
    )
}

export default memo(CartHeaderComponent);