import { useContext } from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography, type Theme } from "@mui/material";
import { DialogContext } from "../../../sells/pages/context/DialogContext";
import type { ProductInterface } from "../../../../typings/sells/sellsTypes";
import SimpleDialogIlustration from "./SimpleDialogIlustration";
import SimpleDialogContent from "./SimpleDialogContent";

const SimpleDialog = (): React.ReactNode => {
  const { showModal, setShowModal, productData } = useContext(DialogContext)!;
  const { name, size, stock, price } = productData as ProductInterface;

  if(!productData) return (<Typography>No product loaded</Typography>)

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
        Agregar producto
      </DialogTitle>
      <DialogContent
        sx={(theme: Theme) => ({
          backgroundColor: theme?.custom?.backgroundLigth, 
          color: theme?.custom?.fontColor,
          width: '100%',
        })}
      >
        <SimpleDialogIlustration name={name}/>
        <SimpleDialogContent size={size} stock={stock} price={price} />
        
        
      </DialogContent>
      <DialogActions
        sx={(theme: Theme) => ({
          backgroundColor: theme?.custom?.backgroundLigth, 
        })}
      >
        <Button onClick={() => setShowModal(false)}>Cerrar</Button>
      </DialogActions>
    </Dialog>
  );
};

export default SimpleDialog;
