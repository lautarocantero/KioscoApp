import { Box } from "@mui/material";
import { memo, type ReactNode } from 'react';
import CartLabel from "./CartLabelComponent";
import CartCountBadge from "./CartCountBadgeComponent";
import type { CartHeaderProps } from "@typings/cart/cartComponentTypes";
import CartHeaderActions from "./CartHeaderActions";


const CartHeaderComponent = ({ itemsCount, onClearCart }: CartHeaderProps): ReactNode => {

    return (
        <Box
            component="header"
            sx={{
                display: "flex",
                alignItems: "center",
                gap: 1.25,
                width: "100%",
            }}
        >
            <CartLabel />
            <CartCountBadge itemsCount={itemsCount} />
            <CartHeaderActions itemsCount={itemsCount} onClearCart={onClearCart} />
        </Box>
    )
}

export default memo(CartHeaderComponent);
