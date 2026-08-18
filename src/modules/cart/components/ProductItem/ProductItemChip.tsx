import { Box, Chip, type Theme } from "@mui/material";
import CategoryIcon from "@mui/icons-material/Category";
import { useTranslation } from "react-i18next";
import type { ReactNode } from "react";
import type { ProductItemChipProps } from "@typings/cart/cartComponentTypes";

const ProductItemChip = ({totalStock}: ProductItemChipProps): ReactNode => {
  const { t } = useTranslation();

  return (
    <Box
        sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            mt: "0.15em",
        }}
    >
        <Chip
        icon={<CategoryIcon sx={{ fontSize: "0.9em !important" }} />}
        label={t("cart.productItem.stockLabel", { stock: totalStock })}
        size="small"
        variant="filled"
        sx={(theme: Theme) => ({
            fontWeight: 600,
            fontSize: "0.75em",
            height: "1.6em",
            borderRadius: "0.6em",
            color: theme.custom?.white,
            "& .MuiChip-icon": {
            color: "inherit",
            },
        })}
        />
    </Box>
  );
};

export default ProductItemChip;