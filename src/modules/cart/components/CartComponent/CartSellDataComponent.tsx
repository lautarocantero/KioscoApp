import { Grid } from "@mui/material";
import type { ReactNode } from 'react';
import CartPriceComponent from './CartPriceComponent';
import CartNoteInput from './CartNoteInput';
import type { CartSellDataComponentProps } from '@typings/cart/cartComponentTypes';


const CartSellDataComponent = ({
    productsTotalPrice,
    discountAmount,
    globalDiscount,
    onGlobalDiscountChange,
    note,
    onNoteChange,
    ivaPercentage,
    ivaAmount,
}: CartSellDataComponentProps): ReactNode => {

    return (
        <Grid
            container
            sx={() => ({
                display: 'flex',
                flexDirection: 'column',
                gap: 1.2,
                width: '100%',
            })}
        >
            <CartPriceComponent
                productsTotalPrice={productsTotalPrice}
                discountAmount={discountAmount}
                globalDiscount={globalDiscount}
                onGlobalDiscountChange={onGlobalDiscountChange}
                ivaPercentage={ivaPercentage}
                ivaAmount={ivaAmount}
            />

            <CartNoteInput note={note} onNoteChange={onNoteChange} />
        </Grid>
    )
}

export default CartSellDataComponent;
