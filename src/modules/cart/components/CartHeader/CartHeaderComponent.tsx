import { Grid } from "@mui/material";
import { memo, type ReactNode } from 'react';
import CartLabel from "./CartLabelComponent";
import CartCleanAction from "./CartCleanActionComponent";
import type { CartHeaderProps } from "@typings/seller/sellerComponentTypes";


const CartHeaderComponent = ({ itemsCount, onClearCart }: CartHeaderProps): ReactNode => {

    if (itemsCount <= 0) return null;

    return (
        <Grid
            container
            size={{ xs: 12, md: 8 }}
            flexDirection={{ xs: "column", sm: "row" }}
            justifyContent="space-between"
            alignItems={{ xs: "stretch", sm: "center" }}
            sx={{ mb: "2em", gap: { xs: "1em"} }}
        >
            <CartLabel itemsCount={itemsCount} />
            <CartCleanAction itemsCount={itemsCount} onClearCart={onClearCart} />
        </Grid>
    )
}

export default memo(CartHeaderComponent);