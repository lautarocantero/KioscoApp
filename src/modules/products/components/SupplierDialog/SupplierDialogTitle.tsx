import { DialogTitle } from "@mui/material";


const SupplierDialogTitle = (): React.ReactNode => (
    <DialogTitle sx={{ borderBottom: "0.5px solid rgba(255,255,255,0.08)", pb: 2 }}>
        Agregar nuevo proveedor
    </DialogTitle>
);

export default SupplierDialogTitle;