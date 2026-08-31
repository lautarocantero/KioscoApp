import {
  Box,
  type Theme,
} from "@mui/material";
import type { ReactNode } from "react";
import ToolbarInfo from "./ToolbarInfo";
import ViewModeToggle from "./ViewModeToggle";
import CategoryChipsRow from "./CategoryChipsRow";
import type { ProductsToolbarProps } from "@typings/cart/cartComponentTypes";


const ProductsToolbar = ({
    totalCount,
    presentationsCount,
    viewMode,
    setViewMode,
}: ProductsToolbarProps): ReactNode => {

  return (
    <Box
      sx={(theme: Theme) => ({
        display: "flex",
        alignItems: "center",
        width: "100%",
        gap: 1.5,
        px: { xs: 2, sm: 1.75 },
        py: 1.25,
        borderBottom: `1px solid ${theme.custom?.darkGray}`,
      })}
    >
      <CategoryChipsRow />
      <ToolbarInfo totalCount={totalCount} presentationsCount={presentationsCount} />
      <ViewModeToggle viewMode={viewMode} setViewMode={setViewMode} />
    </Box>
  );
};

export default ProductsToolbar;
