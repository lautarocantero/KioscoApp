import { Pagination, type Theme } from "@mui/material";
import type { ProductsPaginationProps } from "@typings/sells/SellComponentTypes";
import type { ReactNode } from "react";


const ProductsPagination = ({ page, count, onChange }: ProductsPaginationProps): ReactNode => {
  if (count <= 1) return null;

  return (
    <Pagination
      page={page}
      count={count}
      onChange={(_, value) => onChange(value)}
      shape="rounded"
      sx={(theme: Theme) => ({
        display: "flex",
        justifyContent: "center",
        mt: 3,
        "& .MuiPaginationItem-root": {
          color: theme.custom?.translucidWhite,
        },
        "& .Mui-selected": {
          backgroundColor: `${theme.palette?.primary?.main} !important`,
          color: `${theme.custom?.darkBackground} !important`,
        },
      })}
    />
  );
};

export default ProductsPagination;