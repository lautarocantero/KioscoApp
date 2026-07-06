// src/.../components/ProductsPagination/ProductsPagination.tsx
import { Pagination, type Theme } from "@mui/material";

export interface ProductsPaginationProps {
  page: number;
  count: number;
  onChange: (page: number) => void;
}

const ProductsPagination = ({ page, count, onChange }: ProductsPaginationProps): React.ReactNode => {
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
          color: theme.custom?.fontColorTransparent,
        },
        "& .Mui-selected": {
          backgroundColor: `${theme.palette?.primary?.main} !important`,
          color: `${theme.custom?.posBackground} !important`,
        },
      })}
    />
  );
};

export default ProductsPagination;