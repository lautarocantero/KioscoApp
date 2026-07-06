
// # Componente: NumberField  

// ## Descripción 📦  
// Campo de entrada numérica reutilizable que combina `BaseNumberField` de `@base-ui-components` con estilos de MUI.  
// Permite capturar valores numéricos con validación visual, etiqueta flotante y mensaje de ayuda.  
// Se integra en formularios donde se requiere ingresar cantidades o límites numéricos.  

// ## Lógica 🔧  
// - `SSRInitialFilled`: placeholder para manejar correctamente el estado de la etiqueta (`shrink`) en renderizado SSR.  
// - Props principales:  
//   - `id`: identificador único del campo.  
//   - `label`: etiqueta visible del campo.  
//   - `error`: estado de error para mostrar estilos rojos.  
//   - `size`: tamaño del campo (`small` | `medium`).  
//   - `max`: valor máximo permitido, mostrado en el helper text.  
//   - `onValueChange`: callback que recibe el valor numérico parseado.  
// - `BaseNumberField.Root`: envuelve el campo y renderiza `FormControl` con estilos personalizados según el tema.  
// - `BaseNumberField.Input`: renderiza un `OutlinedInput` de MUI, manejando eventos (`onBlur`, `onChange`, `onFocus`, etc.).  
//   - En `onChange`, convierte el valor a número y dispara `onValueChange` si es válido.  

// ## Renderizado 🎨  
// - `FormControl`:  
//   - Estilos dinámicos basados en `Theme` (`white`, bordes, etc.).  
//   - Maneja estados `disabled`, `required` y `error`.  
// - `InputLabel`: etiqueta flotante vinculada al campo.  
// - `OutlinedInput`: campo de texto numérico con borde y estilos adaptados al tema.  
// - `FormHelperText`: mensaje de ayuda que indica el rango permitido (`1` a `max`).  

// ## Notas técnicas 💽  
// - Integra tipado fuerte con `BaseNumberField.Root.Props`.  
// - Compatible con SSR gracias al placeholder `SSRInitialFilled`.  
// - Estilos consistentes con el tema global (`theme.custom`).  
// - Ideal para formularios que requieren validación visual y control de valores numéricos.  


import * as React from 'react';
import { NumberField as BaseNumberField } from '@base-ui-components/react/number-field';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import type { Theme } from '@mui/material';

/**
 * This component is a placeholder for FormControl to correctly set the shrink label state on SSR.
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function SSRInitialFilled(_: BaseNumberField.Root.Props) {
  return null;
}
SSRInitialFilled.muiName = 'Input';

export default function NumberField({
  id: idProp,
  label,
  error,
  size = 'medium',
  max,
  onValueChange,
  ...other
}: BaseNumberField.Root.Props & {
  label?: React.ReactNode;
  size?: 'small' | 'medium';
  error?: boolean;
  max?: number,
  onValueChange?: (value: number) => void;
}) {
  let id = React.useId();
  if (idProp) {
    id = idProp;
  }
  return (
    <BaseNumberField.Root
      {...other}
      render={(props, state) => (
        <FormControl
          size={size}
          ref={props.ref}
          disabled={state.disabled}
          required={state.required}
          error={error}
          variant="outlined"
          sx={(theme: Theme) => ({
            '& .MuiInputLabel-root': { color: theme?.custom?.fontColor, },   
            '& .MuiOutlinedInput-root': {
              color: theme?.custom?.fontColor,
              '& fieldset': { borderColor: theme?.custom?.white, },      
              '&:hover fieldset': { borderColor: theme?.custom?.white, },
              '&.Mui-focused fieldset': { borderColor: theme?.custom?.white, },
            },
            '& .MuiFormHelperText-root': { color: theme?.custom?.fontColor, }
          })}
          fullWidth
        >
          {props.children}
        </FormControl>
      )}
    >
      <SSRInitialFilled {...other} />
      <InputLabel htmlFor={id}>{label}</InputLabel>
      <BaseNumberField.Input
        id={id}
        render={(props, state) => (
          <OutlinedInput
            label={label}
            inputRef={props.ref}
            value={state.inputValue}
            onBlur={props.onBlur}
            onChange={(e) => {
              props.onChange?.(e);
              const parsed = Number(e.target.value);
              if (!Number.isNaN(parsed)) {
                onValueChange?.(parsed);
              }
            }}
            onKeyUp={props.onKeyUp}
            onKeyDown={props.onKeyDown}
            onFocus={props.onFocus}
            slotProps={{
              input: props,
            }}
            sx={{ pr: 0 }}
          />
        )}
      />
      <FormHelperText sx={{ ml: 0, '&:empty': { mt: 0 } }}>
        Ingresa un valor entre 1 y {max}
      </FormHelperText>
    </BaseNumberField.Root>
  );
}
