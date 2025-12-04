import { useContext } from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, type Theme } from "@mui/material";
import { DialogContext } from "./DialogContext";

const ProductDialog = (): React.ReactNode => {
  const { showModal, setShowModal } = useContext(DialogContext)!;
 
  return (
    <Dialog 
      open={showModal} 
      onClose={() => setShowModal(false)}
      sx={(theme: Theme) => ({
        backgroundColor: theme?.custom?.backgroundDark, 
        width: '100%',
      })}
    >
      <DialogTitle
        sx={(theme: Theme) => ({
          backgroundColor: theme?.custom?.backgroundLigth, 
          color: theme?.custom?.fontColor,
          fontSize: theme?.typography?.h5?.fontSize,
          width: '100%',
        })}
      >
        Dialog
      </DialogTitle>
      <DialogContent
        sx={(theme: Theme) => ({
          backgroundColor: theme?.custom?.backgroundLigth, 
          color: theme?.custom?.fontColor,
          width: '100%',
          padding: { xs: '0.1em', sm: '2em', }
        })}
      >
      </DialogContent>
      <DialogActions
        sx={(theme: Theme) => ({
          backgroundColor: theme?.custom?.backgroundLigth, 
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
        })}
      >
        <Button 
          onClick={() => setShowModal(false)}
          sx={(theme: Theme) => ({
            color: theme?.custom?.whiteTranslucid,
          })}
        >
          Cerrar
        </Button>
        <Button 
          onClick={() => setShowModal(false)}
          sx={(theme: Theme) => ({
            color: theme?.custom?.fontColor,
          })}
        >
          Aceptar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ProductDialog;
