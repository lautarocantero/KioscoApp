import { useContext } from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from "@mui/material";
import { DialogContext } from "../context/DialogContext";

const SimpleDialog = () => {
  const { showModal, setShowModal } = useContext(DialogContext)!;

  return (
    <Dialog open={showModal} onClose={() => setShowModal(false)}>
      <DialogTitle>Modal sencillo</DialogTitle>
      <DialogContent>
        Este es un modal básico controlado por el estado `showModal`.
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setShowModal(false)}>Cerrar</Button>
      </DialogActions>
    </Dialog>
  );
};

export default SimpleDialog;
