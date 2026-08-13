import PaidIcon from '@mui/icons-material/Paid';
import { FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, Grid, TextField, type Theme } from "@mui/material";
import { SELL_STATUS_OPTIONS } from "../../../../config/constants";
import { sharedSx } from "../../../shared/components/sharedSx/sharedSx";
import { useCartPaymentStatusForm } from '../../../../hooks/cart/useCartPaymentStatusForm';
import type { CartPaymentStatusProps } from '@typings/cart/cartComponentTypes';
import type { ReactNode } from 'react';


const CartPaymentStatus = ({total}: CartPaymentStatusProps): ReactNode => {
    const {
        values,
        errors,
        touched,
        isPartial,
        maxAmountPaid,
        setFieldValue,
        handleStatusChange,
        handleAmountPaidChange,
        handleBlur,
    } = useCartPaymentStatusForm(total);

    if (total <= 0) return null;

    return (
        <Grid
            container
            display="flex"
            flexDirection="column"
            alignItems="flex-start"
            gap={0.5}
            sx={(theme: Theme) => ({
                borderTop: `1px solid ${theme?.custom?.translucidFontColor}`,
                marginTop: '1em',
                paddingTop: '1em',
                width: '100%',
            })}
        >
            <FormControl component="fieldset" sx={{ width: '100%' }}>
                <FormLabel
                    component="legend"
                    sx={(theme: Theme) => ({
                        display: 'flex',
                        alignItems: 'center',
                        gap: 0.8,
                        textAlign: 'left',
                        color: theme?.custom?.fontColor,
                        fontWeight: 600,
                        marginBottom: '0.3em',
                    })}
                >
                    <PaidIcon fontSize="small" sx={(theme: Theme) => ({ color: theme?.palette?.secondary?.main })} />
                    Estado del pago
                </FormLabel>
                <RadioGroup
                    value={values.status}
                    onChange={handleStatusChange}
                    sx={(theme: Theme) => ({
                        '& .MuiFormControlLabel-root': {
                            color: theme?.custom?.fontColor,
                            marginLeft: 0,
                            marginBottom: '-0.4em',
                        },
                        '& .MuiFormControlLabel-label': {
                            fontSize: theme?.typography?.body2?.fontSize,
                        },
                        '& .MuiRadio-root': {
                            color: theme?.custom?.translucidWhite,
                            padding: '0.4em',
                        },
                        '& .MuiSvgIcon-root': {
                            fontSize: '1.1rem',
                        },
                        '& .MuiRadio-root.Mui-checked': {
                            color: theme?.palette?.secondary?.main,
                        },
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 0,
                    })}
                >
                    {SELL_STATUS_OPTIONS.map(({ value, label }) => (
                        <FormControlLabel key={value} value={value} control={<Radio />} label={label} />
                    ))}
                </RadioGroup>
            </FormControl>

            {isPartial && (
                <Grid container flexDirection="column" gap={1.5} sx={{ width: '100%', marginTop: '0.5em' }}>
                    <TextField
                        label="Precio pagado"
                        type="number"
                        size="small"
                        sx={sharedSx}
                        value={values.amount_paid ?? ''}
                        onChange={handleAmountPaidChange}
                        onBlur={handleBlur}
                        name="amount_paid"
                        error={touched.amount_paid && !!errors.amount_paid}
                        helperText={touched.amount_paid ? errors.amount_paid : `Máximo $${maxAmountPaid}`}
                        slotProps={{ htmlInput: { max: maxAmountPaid, min: 0 } }}
                        fullWidth
                    />
                    <TextField
                        label="Nombre del moroso"
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