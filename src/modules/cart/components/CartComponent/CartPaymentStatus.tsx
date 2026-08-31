import PaidIcon from '@mui/icons-material/Paid';
import { Grid, TextField, type Theme } from "@mui/material";
import { useTranslation } from 'react-i18next';
import { SellStatusEnum } from "@typings/sells/sellsEnum";
import { sharedSx } from "../../../shared/components/sharedSx/sharedSx";
import { useCartPaymentStatusForm } from '../../../../hooks/cart/useCartPaymentStatusForm';
import type { CartPaymentStatusProps } from '@typings/cart/cartComponentTypes';
import type { ReactNode } from 'react';
import CartSectionLabel from './CartSectionLabel';
import CartChipToggleGroup from './CartChipToggleGroup';

const CartPaymentStatus = ({total}: CartPaymentStatusProps): ReactNode => {
    const { t } = useTranslation();
    const {
        values,
        errors,
        touched,
        isPartial,
        maxAmountPaid,
        setFieldValue,
        setStatus,
        handleAmountPaidChange,
        handleBlur,
        options,
    } = useCartPaymentStatusForm(total);

    if (total <= 0) return null;

    return (
        <Grid container display="flex" flexDirection="column" gap={1} sx={{ width: '100%' }}>
            <CartSectionLabel
                icon={<PaidIcon fontSize="small" sx={(theme: Theme) => ({ color: theme?.palette?.secondary?.main })} />}
                label={t("cart.paymentStatus.label")}
            />

            <CartChipToggleGroup
                ariaLabel={t("cart.paymentStatus.label")}
                value={values.status ?? SellStatusEnum.Completada}
                onChange={(value) => setStatus(value as SellStatusEnum)}
                options={options}
            />

            {isPartial && (
                <Grid container flexDirection="column" gap={1.5} sx={{ width: '100%', marginTop: '0.5em' }}>
                    <TextField
                        label={t("cart.paymentStatus.amountPaidLabel")}
                        type="number"
                        size="small"
                        sx={sharedSx}
                        value={values.amount_paid ?? ''}
                        onChange={handleAmountPaidChange}
                        onBlur={handleBlur}
                        name="amount_paid"
                        error={touched.amount_paid && !!errors.amount_paid}
                        helperText={touched.amount_paid ? errors.amount_paid : t("cart.paymentStatus.maxAmount", { amount: maxAmountPaid })}
                        slotProps={{ htmlInput: { max: maxAmountPaid, min: 0 } }}
                        fullWidth
                    />
                    <TextField
                        label={t("cart.paymentStatus.debtorNameLabel")}
                        type="text"
                        size="small"
                        sx={sharedSx}
                        value={values.debtor_name ?? ''}
                        onChange={(e) => setFieldValue('debtor_name', e.target.value)}
                        onBlur={handleBlur}
                        name="debtor_name"
                        error={touched.debtor_name && !!errors.debtor_name}
                        helperText={touched.debtor_name ? errors.debtor_name : ''}
                        fullWidth
                    />
                </Grid>
            )}
        </Grid>
    );
};

export default CartPaymentStatus;
