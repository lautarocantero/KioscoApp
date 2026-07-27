import { Box, Skeleton } from "@mui/material";
import type { ReactNode } from "react";

const ProductItemSkeleton = (): ReactNode => (
  <Box
    sx={{
      display: "flex",
      flexDirection: "column",
      borderRadius: "0.8em",
      overflow: "hidden",
      width: "100%",
      maxWidth: "220px",
      height: { xs: "250px", md: "260px", lg: "280px" },
      m: "auto",
    }}
  >
    <Skeleton variant="rectangular" width="100%" height="100%" sx={{ borderRadius: "0.8em" }} />
  </Box>
);

export default ProductItemSkeleton;