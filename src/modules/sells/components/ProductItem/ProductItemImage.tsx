import { Box, type Theme } from "@mui/material";
import ImageNotSupportedOutlinedIcon from "@mui/icons-material/ImageNotSupportedOutlined";
import type { ProductItemImageProps } from "@typings/sells/SellComponentTypes";

interface Props extends ProductItemImageProps {
  onClick?: () => void;
}

const IMAGE_SIZE = "110px";
const IMAGE_HEIGHT = "120px";

const ProductItemImage = ({ source, name, onClick }: Props): React.ReactNode => {
  if (!source) {
    return (
      <Box
        onClick={onClick}
        sx={(theme: Theme) => ({
          width: IMAGE_SIZE,
          height: IMAGE_HEIGHT,
          flexShrink: 0,
          borderRadius: "0.5em",
          backgroundColor: theme.custom?.blackTranslucid,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: onClick ? "pointer" : "default",
        })}
      >
        <ImageNotSupportedOutlinedIcon
          sx={(theme: Theme) => ({
            fontSize: "1.6rem",
            color: theme.custom?.translucidWhite,
          })}
        />
      </Box>
    );
  }

  return (
    <Box
      component="img"
      src={source}
      alt={name}
      onClick={onClick}
      sx={{
        width: IMAGE_SIZE,
        height: IMAGE_HEIGHT,
        objectFit: "cover",
        borderRadius: "0.5em",
        cursor: onClick ? "pointer" : "default",
        flexShrink: 0,
      }}
    />
  );
};

export default ProductItemImage;