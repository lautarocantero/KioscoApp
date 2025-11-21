import { useContext } from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography } from "@mui/material";
import { DialogContext } from "../context/DialogContext";

const SimpleDialog = () => {
  const { showModal, setShowModal, productData } = useContext(DialogContext)!;
  
  if(!productData) return (<Typography>No product loaded</Typography>)

  return (
    <Dialog open={showModal} onClose={() => setShowModal(false)}>
      <DialogTitle>Modal sencillo</DialogTitle>
      <DialogContent>
        Este es un modal básico controlado por el estado `showModal`.
        {productData ? (
          <>
            <p>Nombre: {productData.name}</p>
            <p>Precio: {productData.price}</p>
          </>
        ) : (
          <p>No hay producto seleccionado</p>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setShowModal(false)}>Cerrar</Button>
      </DialogActions>
    </Dialog>
  );
};

export default SimpleDialog;
