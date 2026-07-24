import { Button, Dialog, DialogActions, DialogContent, type Theme } from "@mui/material";
import { getNoisyBackgroundSx } from "../../../../modules/shared/components/NoisyBackground/NoisyBackground";
import useProductDialog from "../../../../hooks/sells/useProductDialog";
import ProductDialogContentComponent from "./ProductDialogContentComponent";
import type { ReactNode } from "react";

const ProductDialog = (): ReactNode => {
  const {
    showModal,
    setShowModal,
    productSelected,
    presentations,
    handleSubmit,
  } = useProductDialog();

  if (!productSelected) return null;

  const { name, description, image_url } = productSelected;

  return (
    <Dialog
      open={showModal}
      onClose={() => setShowModal(false)}
      fullWidth
      maxWidth="md"
    >
      <DialogContent
        sx={(theme: Theme) => ({
          color: theme?.custom?.fontColor,
          border: `1px solid ${theme.custom.translucidWhite}`,
          ...getNoisyBackgroundSx({ theme }),
        })}
      >
        <ProductDialogContentComponent
          product={{
            name: name,
            description: description,
            image: image_url,
          }}
          products={presentations}
          onSubmit={handleSubmit}
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