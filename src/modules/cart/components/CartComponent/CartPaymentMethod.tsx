import CreditCardIcon from '@mui/icons-material/CreditCard';
import { Box, type Theme } from "@mui/material";
import { useTranslation } from 'react-i18next';
import { PaymentMethod } from "@typings/sells/sellsEnum";
import { useCartPaymentMethodForm } from '../../../../hooks/cart/useCartPaymentMethodForm';
import type { CartPaymentMethodProps } from '@typings/cart/cartComponentTypes';
import CartSectionLabel from './CartSectionLabel';
import CartChipToggleGroup from './CartChipToggleGroup';

const CartPaymentMethod = ({ total }: CartPaymentMethodProps): React.ReactNode => {
    const { t } = useTranslation();
    const { setPaymentMethod, values, options } = useCartPaymentMethodForm();

    if (total <= 0) return null;

    return (
        <Box sx={{ width: '100%' }}>
            <CartSectionLabel
                icon={<CreditCardIcon fontSize="small" sx={(theme: Theme) => ({ color: theme?.palette?.secondary?.main })} />}
                label={t("cart.paymentMethod.label")}
            />
            <CartChipToggleGroup
                ariaLabel={t("cart.paymentMethod.label")}
                value={values.payment_method}
                onChange={(value) => setPaymentMethod(value as PaymentMethod)}
                options={options}
            />
        </Box>
    );
};

export default CartPaymentMethod;
