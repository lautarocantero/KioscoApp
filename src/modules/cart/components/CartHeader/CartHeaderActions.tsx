import { Button, type Theme } from "@mui/material";
import { useTranslation } from 'react-i18next';
import type { ReactNode } from 'react';
import type { CartHeaderActionsProps } from '@typings/cart/cartComponentTypes';


const CartHeaderActions = ({ itemsCount, onClearCart }: CartHeaderActionsProps): ReactNode => {
    const { t } = useTranslation();

    return (
        <Button
            onClick={onClearCart}
            disabled={itemsCount === 0}
            sx={(theme: Theme) => ({
                ml: "auto",
                minWidth: 0,
                padding: "0.25em 0.4em",
                borderRadius: "6px",
                textTransform: "none",
                fontSize: theme.typography?.caption?.fontSize,
                fontWeight: 600,
                color: theme.palette.error.main,
                "&:hover": { backgroundColor: theme.custom?.errorLight },
                "&.Mui-disabled": { color: theme.custom?.darkGray },
            })}
        >
            {t("cart.header.clearButton")}
        </Button>
    )
}

export default CartHeaderActions;
