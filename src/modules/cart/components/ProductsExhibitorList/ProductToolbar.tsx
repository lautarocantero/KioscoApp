import {
  Box,
  type Theme,
} from "@mui/material";
import type { ReactNode } from "react";
import ToolbarInfo from "./ToolbarInfo";
import ToolbarActions from "./ToolBarActions";
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
        flexDirection: "column",
        width: "100%",
        gap: 1.5,
        mb: 2,
        px: { xs: 2, sm: 3 },
        py: 2,
        backgroundColor: theme.custom?.darkMain,
      })}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          alignItems: { xs: "flex-start", md: "center" },
          justifyContent: "space-between",
          width: "100%",
          gap: { xs: 2, md: 0 },
        }}
      >
        <ToolbarInfo totalCount={totalCount} presentationsCount={presentationsCount} />

        <ToolbarActions viewMode={viewMode} setViewMode={setViewMode}/>
      </Box>

      <CategoryChipsRow />
    </Box>
  );
};

export default ProductsToolbar;