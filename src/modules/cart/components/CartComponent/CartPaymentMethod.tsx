import CreditCardIcon from '@mui/icons-material/CreditCard';
import { FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, Grid, type Theme } from "@mui/material";
import { useTranslation } from 'react-i18next';
import { PAYMENT_METHOD_VALUES } from "@typings/sells/sellsEnum";
import { useCartPaymentMethodForm } from '../../../../hooks/cart/useCartPaymentMethodForm';
import type { CartPaymentMethodProps } from '@typings/cart/cartComponentTypes';

const CartPaymentMethod = ({total}: CartPaymentMethodProps): React.ReactNode => {
    const { t } = useTranslation();
    const { handleChange , values } = useCartPaymentMethodForm();

    if(total <= 0) return null;


    return (
        <Grid
            container
            display="flex"
            flexDirection="column"
            alignItems="flex-start"
            gap={0.5}
            sx={(theme: Theme) => ({
                borderTop: `1px solid ${theme?.custom?.translucidWhite}`,
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
                    <CreditCardIcon fontSize="small" sx={(theme: Theme) => ({ color: theme?.palette?.secondary?.main })} />
                    Método de pago
                </FormLabel>
                <RadioGroup
                    value={values.payment_method}
                    onChange={handleChange}
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
                    {PAYMENT_METHOD_VALUES.map((value) => (
                        <FormControlLabel key={value} value={value} control={<Radio />} label={t(`paymentMethod.${value}`)} />
                    ))}
                </RadioGroup>
            </FormControl>
        </Grid>
    );
};

export default CartPaymentMethod;