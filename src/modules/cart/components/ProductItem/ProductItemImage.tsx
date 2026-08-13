import { useState } from "react";
import { Box } from "@mui/material";
import type { ProductItemImageProps } from "@typings/cart/cartComponentTypes";
import type { ReactNode } from "react";
import { FALLBACK_PRODUCT_IMAGE } from "../../../../config/constants";

const ProductItemImage = ({ source, name, onClick }: ProductItemImageProps): ReactNode => {
  const [hasError, setHasError] = useState(false);

  const imageSource = !source || hasError ? FALLBACK_PRODUCT_IMAGE : source;

  return (
    <Box
      component="img"
      src={imageSource}
      alt={name}
      onClick={onClick}
      onError={() => setHasError(true)}
      sx={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        objectFit: "cover",
        cursor: onClick ? "pointer" : "default",
      }}
    />
  );
};

export default ProductItemImage;