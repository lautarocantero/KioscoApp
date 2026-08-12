import { Button, Dialog, DialogActions, DialogContent, IconButton, type Theme } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import ProductDialogContentComponent from "./ProductDialogContentComponent";
import type { ReactNode } from "react";
import useProductDialog from "@hooks/cart/useProductDialog";
import { getNoisyBackgroundSx } from "../../../shared/components/NoisyBackground/NoisyBackground";


const ProductDialog = (): ReactNode => {
  const {
    showModal,
    setShowModal,
    productSelected,
    presentations,
  } = useProductDialog();

  if (!productSelected) return null;

  return (
    <Dialog
      open={showModal}
      onClose={() => setShowModal(false)}
      fullWidth
      maxWidth="md"
    >
      <IconButton
        onClick={() => setShowModal(false)}
        aria-label="Cerrar"
        sx={(theme: Theme) => ({
          position: "absolute",
          top: 16,
          right: 16,
          color: theme.custom?.lightGray,
          zIndex: 1,
        })}
      >
        <CloseIcon fontSize="small" />
      </IconButton>

      <DialogContent
        sx={(theme: Theme) => ({
          color: theme?.custom?.fontColor,
          border: `1px solid ${theme.custom.translucidWhite}`,
          ...getNoisyBackgroundSx({ theme }),
        })}
      >
        <ProductDialogContentComponent
          product={productSelected}
          products={presentations}
        />
      </DialogContent>
      <DialogActions
        sx={(theme: Theme) => ({
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'flex-start',
          ...getNoisyBackgroundSx({ theme }),
        })}
      >
        <Button
          onClick={() => setShowModal(false)}
          aria-label="Cerrar"
          sx={(theme: Theme) => ({
            color: theme?.custom?.fontColor,
            fontSize: theme?.typography?.body2?.fontSize,
          })}
        >
          Cerrar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ProductDialog;