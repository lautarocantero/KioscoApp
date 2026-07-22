import { Box, Tooltip, type Theme } from "@mui/material";
import type { ProductItemProps } from "@typings/sells/SellComponentTypes";
import { useContext } from "react";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../../../../store/auth/authSlice";
import { selectProductThunk } from "../../../../store/seller/sellerThunks";
import type { Presentation } from "../../../../typings/presentation/presentationTypes";
import type { getProductSelectedPayload } from "../../../../typings/seller/sellerTypes";
import { ProductDialogContext } from "../../context/Product/ProductDialogContext";
import ProductItemImage from "./ProductItemImage";
import ProductItemData from "./ProductItemData";
import ProductItemButton from "./ProductItemButton";
import ProductItemBadge from "./ProductItemBadge";
import { CARD_HEIGHT } from "../../../../config/constants";



const ProductItemComponent = ({ product }: ProductItemProps): React.ReactNode => {
  const { name, presentations, category }: { name: string; presentations: Presentation[]; category?: string } = product;
  const { setShowModal } = useContext(ProductDialogContext)!;
  const dispatch = useDispatch<AppDispatch>();

  const selectProduct = async ({ product }: Partial<getProductSelectedPayload>): Promise<void> => {
    if (!product) throw new Error("No se ha seleccionado un producto");
    await dispatch(selectProductThunk({ productData: product }));
    setShowModal(true);
  };

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
          height: CARD_HEIGHT,
          overflow: "hidden",
        })}
      >
        {category && <ProductItemBadge label={category} />}

        <ProductItemImage
          source={product?.image_url}
          name={name}
          onClick={() => selectProduct({ product })}
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
          <ProductItemButton onClick={() => selectProduct({ product })} />
        </Box>
      </Box>
    </Tooltip>
  );
};

export default ProductItemComponent;