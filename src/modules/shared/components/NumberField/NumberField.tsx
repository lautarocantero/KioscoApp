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
              '& fieldset': { borderColor: theme?.custom?.fontColor, },      
              '&:hover fieldset': { borderColor: theme?.custom?.fontColor, },
              '&.Mui-focused fieldset': { borderColor: theme?.custom?.fontColor, },
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
