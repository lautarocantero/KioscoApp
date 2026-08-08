import { Grid, type Theme } from "@mui/material";
import { memo, type ReactNode } from 'react';
import CartLabel from "./CartLabelComponent";
import type { CartHeaderProps } from "@typings/seller/sellerComponentTypes";
import CartHeaderActions from "./CartHeaderActions";


const CartHeaderComponent = ({ itemsCount, onClearCart }: CartHeaderProps): ReactNode => {


    return (
        <Grid
            container
            size={{ xs: 12, md: 8 }}
            sx={(theme: Theme) => ({
                mb: "2em", 
                rowGap: "1em", 
                borderTop:  `0.1em solid ${theme?.custom?.darkGray}`,
                paddingTop: "1em"
            })}
        >
            <CartLabel />
            <CartHeaderActions itemsCount={itemsCount} onClearCart={onClearCart} />
        </Grid>
    )
}

export default memo(CartHeaderComponent);