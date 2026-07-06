import { Grid, Tooltip, type Theme } from "@mui/material";
import type { ProductItemProps } from "@typings/sells/reactComponents";
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
import { getNoisyBackgroundSx } from "../../../../modules/shared/components/NoisyBackground/NoisyBackground";

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
      <Grid
        container
        sx={(theme: Theme) => ({
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          gap: "0.8em",
          border: `1px solid ${theme.custom?.blackTranslucid}`,
          borderRadius: "0.5em",
          color: theme?.custom?.fontColor,
          padding: "1em",
          width: "100%",
          maxWidth: "300px",
          height: "12em",
          ...getNoisyBackgroundSx(theme),
        })}
      >
        {category && <ProductItemBadge label={category} />}

        <Grid sx={{ display: "flex", flexDirection: "row", gap: "0.8em", width: "100%" }}>
          <ProductItemImage
            source={product?.image_url}
            name={name}
            onClick={() => selectProduct({ product })}
          />
          <ProductItemData name={name} presentations={presentations} />
        </Grid>

        <ProductItemButton onClick={() => selectProduct({ product })} />
      </Grid>
    </Tooltip>
  );
};

export default ProductItemComponent;