import {
  Box,
  type Theme,
} from "@mui/material";
import type { ProductsToolbarProps } from "@typings/sells/SellComponentTypes";
import type { ReactNode } from "react";
import ToolbarInfo from "./ToolbarInfo";
import ToolbarActions from "./ToolBarActions";


const ProductsToolbar = ({
    totalCount,
    viewMode,
    setViewMode,
}: ProductsToolbarProps): ReactNode => {


  return (
    <Box
      sx={(theme: Theme) => ({
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        alignItems: { xs: "flex-start", md: "center" },
        justifyContent: "space-between",
        width: "100%",
        gap: { xs: 2, md: 0 },
        mb: 2,
        px: { xs: 2, sm: 3 },
        py: 2,
        backgroundColor: theme.custom?.darkMain,
      })}
    >
      <ToolbarInfo totalCount={totalCount}  />

      <ToolbarActions viewMode={viewMode} setViewMode={setViewMode}/>

    </Box>
  );
};

export default ProductsToolbar;