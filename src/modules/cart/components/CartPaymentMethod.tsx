//─────────────────── Componente 🧩: CartPaymentMethod ───────────────────//
//
//─────────────────── Descripción 📝 ───────────────────//
// Componente de selección de método de pago dentro del carrito.
// para almacenar el valor seleccionado sin necesidad de formularios.
//
//──────────────────── Funciones 🔧 ─────────────────────//
// - Renderiza un grupo de opciones de pago (Transferencia, Efectivo, Débito, Crédito).
// - Usa `useRef` (inyectado como prop) para guardar el método seleccionado.
// - `handleChange`: actualiza el ref con el valor elegido.
// - Alinea todos los elementos a la izquierda, en columna, con ícono junto al título.
//
//─────────────────── Notas técnicas 💽 ───────────────────//
// - Los hijos del RadioGroup heredan color blanco (texto) y el radio 
//   seleccionado usa el color primario (púrpura).
// - Se define un valor por defecto: `PaymentMethod.Transfer`.
//
//-----------------------------------------------------------------------------//


import React from "react";
import CreditCardIcon from '@mui/icons-material/CreditCard';
import { FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, Grid, Typography, type Theme } from "@mui/material";
import { PaymentMethod } from "../../../typings/sells/enums/sells";

const CartPaymentMethod = ({paymentMethodRef}: {paymentMethodRef: React.RefObject<string>}): React.ReactNode => {

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    paymentMethodRef.current = (event.target as HTMLInputElement).value;
  };


  return (
    <Grid
        container 
        display="flex" 
        flexDirection="column"
        alignItems={'flex-start'} ///*─────────────────── 🔎 alinear todo a la izquierda 🔎 ───────────────────*
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
                })}>
                    <CreditCardIcon fontSize="small" sx={(theme: Theme) => ({ color: theme?.palette?.primary?.main })} />
                    Método de pago
            </FormLabel>
          <RadioGroup
            defaultValue={PaymentMethod?.Transfer}
            onChange={handleChange}
            sx={(theme: Theme) => ({
                '& .MuiFormControlLabel-root': {
                    color: theme?.custom?.fontColor,
                    marginLeft: 0,
                    marginBottom: '-0.4em', ///*─────────────────── 🔎 reduce espacio entre filas 🔎 ───────────────────*
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
                    color: theme?.palette?.primary?.main,
                },
                display: 'flex',
                flexDirection: 'column',
                gap: 0,
            })}
        >
            <FormControlLabel value={PaymentMethod?.Transfer} control={<Radio />} label="Transferencia" />
            <FormControlLabel value={PaymentMethod?.Cash} control={<Radio />} label="Efectivo" />
            <FormControlLabel value={PaymentMethod?.Debit} control={<Radio />} label="Débito" />
            <FormControlLabel value={PaymentMethod?.Credit} control={<Radio />} label="Crédito" />
        </RadioGroup>
        </FormControl>
    </Grid>
  );
};

export default CartPaymentMethod;