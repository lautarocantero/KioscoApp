import { Divider, Grid, type Theme } from "@mui/material";
import { useTranslation } from "react-i18next";
import { formatCurrency } from "../../helpers/formatCurrency";
import CartPriceRow from "./CartPriceRow";
import type { ReactNode } from "react";
import type { CartPriceProps } from "@typings/cart/cartComponentTypes";


const CartPriceComponent = (
    { productsTotalPrice, ivaPercentage, ivaAmount, total, productsCount }
    : CartPriceProps & { productsCount?: number }): ReactNode => {
    const { t } = useTranslation();

    return (
        <Grid
            container
            display="flex"
            flexDirection="column"
            gap={1.2}
        >
            <CartPriceRow
                label={productsCount ? t("cart.summary.productsWithCount", { count: productsCount }) : t("cart.summary.products")}
                value={formatCurrency(productsTotalPrice)}
            />
            <CartPriceRow
                label={t("cart.summary.iva", { percentage: ivaPercentage })}
                value={formatCurrency(ivaAmount)}
            />

            <Divider
                sx={(theme: Theme) => ({
                    borderColor: theme?.custom?.translucidFontColor,
                    my: 0.5,
                })}
            />

            <CartPriceRow
                label={t("cart.summary.total")}
                value={formatCurrency(total)}
                valueColor={(theme) => theme?.palette?.secondary?.main}
                bold
            />
        </Grid>
    )
}

export default CartPriceComponent;