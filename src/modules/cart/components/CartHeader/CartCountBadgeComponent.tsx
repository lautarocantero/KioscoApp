import { Box, alpha, type Theme } from "@mui/material";
import { useTranslation } from "react-i18next";
import type { ReactNode } from "react";
import type { CartCountBadgeProps } from "@typings/cart/cartComponentTypes";
import { formatCartCountBadgeLabel } from "../../helpers/formatCartCountBadgeLabel";

const CartCountBadge = ({ itemsCount }: CartCountBadgeProps): ReactNode => {
  const { t } = useTranslation();
  const label = formatCartCountBadgeLabel(itemsCount, t);

  return (
    <Box
      component="span"
      sx={(theme: Theme) => ({
        fontSize: "0.7rem",
        fontWeight: 600,
        color: theme.palette.primary.main,
        backgroundColor: alpha(theme.palette.primary.main, 0.12),
        borderRadius: "999px",
        padding: "0.2em 0.7em",
        whiteSpace: "nowrap",
      })}
    >
      {label}
    </Box>
  );
};

export default CartCountBadge;
