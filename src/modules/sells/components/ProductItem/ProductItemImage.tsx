import { Box, type Theme } from "@mui/material";
import ImageNotSupportedOutlinedIcon from "@mui/icons-material/ImageNotSupportedOutlined";
import type { ProductItemImageProps } from "@typings/sells/SellComponentTypes";

interface Props extends ProductItemImageProps {
  onClick?: () => void;
}

const ProductItemImage = ({ source, name, onClick }: Props): React.ReactNode => {
  if (!source) {
    return (
      <Box
        onClick={onClick}
        sx={(theme: Theme) => ({
          position: "absolute",
          inset: 0,
          backgroundColor: theme.custom?.blackTranslucid,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: onClick ? "pointer" : "default",
        })}
      >
        <ImageNotSupportedOutlinedIcon
          sx={(theme: Theme) => ({
            fontSize: "2rem",
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