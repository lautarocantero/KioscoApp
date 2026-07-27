import { Box, Chip, type Theme } from "@mui/material";
import CategoryIcon from "@mui/icons-material/Category";
import type { ReactNode } from "react";
import type { ProductItemChipProps } from "@typings/sells/SellComponentTypes";

const ProductItemChip = ({totalStock}: ProductItemChipProps): ReactNode => {

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
        label={`Stock: ${totalStock}`}
        size="small"
        variant="filled"
        sx={(theme: Theme) => ({
            fontWeight: 600,
            fontSize: "0.75em",
            height: "1.6em",
            borderRadius: "0.6em",
            color: theme.custom?.fontColor,
            "& .MuiChip-icon": {
            color: "inherit",
            },
        })}
        />
    </Box>
  );
};

export default ProductItemChip;