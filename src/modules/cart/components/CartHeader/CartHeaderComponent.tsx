import { Box } from "@mui/material";
import { memo, type ReactNode } from 'react';
import CartLabel from "./CartLabelComponent";
import type { CartHeaderProps } from "@typings/cart/cartComponentTypes";
import CartHeaderActions from "./CartHeaderActions";


const CartHeaderComponent = ({ itemsCount, onClearCart }: CartHeaderProps): ReactNode => {


    return (
        <Box
            component="header"
            sx={{
                display: "flex",
                flexDirection: "column",
                rowGap: "1em",
                width: "100%",
            }}
        >
            <CartLabel itemsCount={itemsCount} />
            <CartHeaderActions itemsCount={itemsCount} onClearCart={onClearCart} />
        </Box>
    )
}

export default memo(CartHeaderComponent);