
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
// - Alinea todos los elementos a la derecha para consistencia visual.
//
//─────────────────── Notas técnicas 💽 ───────────────────//
// - `RadioGroup` se adapta responsivamente: columna en XS, fila en SM+.
// - Los hijos del RadioGroup heredan color blanco (texto e íconos).
// - Se define un valor por defecto: `PaymentMethod.Transfer`.
//
//-----------------------------------------------------------------------------//


import React from "react";
import { FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, Grid, type Theme } from "@mui/material";
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
        alignItems={'flex-end'} ///*─────────────────── 🔎 alinear todo al final 🔎 ───────────────────*
        gap={1}
        sx={(theme: Theme) => ({
            borderTop: `1px solid ${theme?.custom?.whiteTranslucid}`,
            marginTop: '1em'
        })}
    >
        <FormControl component="fieldset">
            <FormLabel 
                component="legend" 
                sx={(theme: Theme) => ({ 
                    textAlign: 'right', 
                    color: theme?.custom?.white 
                })}>
                    Método de pago
            </FormLabel>
          <RadioGroup
            row
            defaultValue={PaymentMethod?.Transfer}
            onChange={handleChange}
            sx={(theme: Theme) => ({
                '& .MuiFormControlLabel-root': {
                    color: theme?.custom?.white ,
                },
                '& .MuiRadio-root': {
                    color: theme?.custom?.white ,
                },
                '& .MuiRadio-root.Mui-checked': {
                    color: theme?.custom?.white ,
                },
                display: 'flex',
                flexDirection: { xs: 'column', sm: 'row'}
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
