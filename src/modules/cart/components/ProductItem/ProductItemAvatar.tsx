import { Box, Typography, alpha, type Theme } from "@mui/material";
import type { ReactNode } from "react";
import type { ProductItemAvatarProps } from "@typings/cart/cartComponentTypes";

const ProductItemAvatar = ({ name, onClick }: ProductItemAvatarProps): ReactNode => (
  <Box
    onClick={onClick}
    role={onClick ? "button" : undefined}
    aria-label={onClick ? name : undefined}
    sx={(theme: Theme) => ({
      width: 38,
      height: 38,
      flexShrink: 0,
      borderRadius: "10px",
      backgroundColor: alpha(theme.palette.primary.main, 0.12),
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      cursor: onClick ? "pointer" : "default",
    })}
  >
    <Typography sx={(theme: Theme) => ({ color: theme.palette.primary.main, fontWeight: 700 })}>
      {name?.trim()?.charAt(0)?.toUpperCase() ?? "?"}
    </Typography>
  </Box>
);

export default ProductItemAvatar;
