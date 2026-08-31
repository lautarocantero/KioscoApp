import { Box, type Theme } from "@mui/material";
import type { ReactNode } from "react";
import type { CartChipToggleGroupProps } from "@typings/cart/cartComponentTypes";

const CartChipToggleGroup = ({ options, value, onChange, ariaLabel }: CartChipToggleGroupProps): ReactNode => (
  <Box role="radiogroup" aria-label={ariaLabel} sx={{ display: "flex", gap: "0.4em", width: "100%" }}>
    {options.map((option) => {
      const isActive = option.value === value;

      return (
        <Box
          key={option.value}
          component="button"
          type="button"
          role="radio"
          aria-checked={isActive}
          onClick={() => onChange(option.value)}
          sx={(theme: Theme) => ({
            flex: 1,
            padding: "0.45em 0.3em",
            border: `1px solid ${isActive ? theme.palette.primary.main : theme.custom?.darkGray}`,
            borderRadius: "8px",
            backgroundColor: isActive ? theme.palette.primary.main : "transparent",
            color: isActive ? theme.custom?.white : theme.custom?.fontColor,
            fontSize: "0.7rem",
            fontWeight: 600,
            fontFamily: "inherit",
            cursor: "pointer",
          })}
        >
          {option.label}
        </Box>
      );
    })}
  </Box>
);

export default CartChipToggleGroup;
