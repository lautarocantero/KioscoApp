import { Box, Tooltip, type Theme } from "@mui/material";
import type { ProductItemProps } from "@typings/sells/SellComponentTypes";
import type { ReactNode } from "react";
import ProductItemImage from "./ProductItemImage";
import ProductItemData from "./ProductItemData";
import ProductItemButton from "./ProductItemButton";
import { useProductItem } from "../../../../hooks/sells/useProductItem";

const ProductItemComponent = ({ product }: ProductItemProps): ReactNode => {
  const { name, presentations } = product;
  const { handleSelect } = useProductItem(product);

  return (
    <Tooltip title={name}>
      <Box
        sx={(theme: Theme) => ({
          position: "relative",
          display: "flex",
          flexDirection: "column",
          border: `1px solid ${theme.custom?.blackTranslucid}`,
          borderRadius: "0.8em",
          color: theme?.custom?.fontColor,
          width: "100%",
          maxWidth: "220px",
          height: { xs: "250px", md: "260px", lg: "280px" },
          overflow: "hidden",
          m: "auto",
        })}
      >
        <ProductItemImage
          source={product?.image_url}
          name={name}
          onClick={handleSelect}
        />

        <Box
          sx={(theme: Theme) => ({
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            display: "flex",
            flexDirection: "column",
            gap: "0.6em",
            padding: "0.8em 1em",
            backgroundColor: theme?.custom?.blackTranslucid,
            backdropFilter: "blur(3px)",
            WebkitBackdropFilter: "blur(3px)",
          })}
        >
          <ProductItemData name={name} presentations={presentations} />
          <ProductItemButton onClick={handleSelect} />
        </Box>
      </Box>
    </Tooltip>
  );
};

export default ProductItemComponent;