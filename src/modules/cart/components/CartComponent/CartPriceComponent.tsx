import { Grid } from "@mui/material";
import { useTranslation } from "react-i18next";
import { formatCurrency } from "../../helpers/formatCurrency";
import CartPriceRow from "./CartPriceRow";
import CartGlobalDiscountRow from "./CartGlobalDiscountRow";
import type { ReactNode } from "react";
import type { CartPriceProps } from "@typings/cart/cartComponentTypes";


const CartPriceComponent = ({
    productsTotalPrice,
    discountAmount,
    globalDiscount,
    onGlobalDiscountChange,
    ivaPercentage,
    ivaAmount,
}: CartPriceProps): ReactNode => {
    const { t } = useTranslation();

    return (
        <Grid
            container
            display="flex"
            flexDirection="column"
            gap={1}
        >
            <CartPriceRow
                label={t("cart.summary.subtotal")}
                value={formatCurrency(productsTotalPrice)}
            />

            <CartGlobalDiscountRow
                globalDiscount={globalDiscount}
                onGlobalDiscountChange={onGlobalDiscountChange}
                discountAmount={discountAmount}
            />

            <CartPriceRow
                label={t("cart.summary.iva", { percentage: ivaPercentage })}
                value={formatCurrency(ivaAmount)}
            />
        </Grid>
    )
}

export default CartPriceComponent;
