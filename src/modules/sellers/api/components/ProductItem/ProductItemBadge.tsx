import { Chip, type Theme } from "@mui/material";

export interface ProductItemBadgeProps {
  label: string;
}

const ProductItemBadge = ({ label }: ProductItemBadgeProps): React.ReactNode => (
  <Chip
    label={label}
    size="small"
    sx={(theme: Theme) => ({
      position: "absolute",
      top: "0.8em",
      right: "0.8em",
      backgroundColor: "transparent",
      border: `1px solid ${theme.palette?.primary?.main ?? theme.palette?.primary?.main}`,
      color: theme.palette?.primary?.main ?? theme.palette?.primary?.main,
      fontSize: "0.7rem",
      height: "22px",
    })}
  />
);

export default ProductItemBadge;