import { Box, Typography, type Theme } from "@mui/material";
import type { ReactNode } from "react";
import type { CartSectionLabelProps } from "@typings/cart/cartComponentTypes";

const CartSectionLabel = ({ icon, label }: CartSectionLabelProps): ReactNode => (
  <Box sx={{ display: "flex", alignItems: "center", gap: "0.5em", mb: "0.4em" }}>
    {icon}
    <Typography sx={(theme: Theme) => ({ color: theme.custom?.fontColor, fontWeight: 600, fontSize: theme.typography?.body2?.fontSize })}>
      {label}
    </Typography>
  </Box>
);

export default CartSectionLabel;
