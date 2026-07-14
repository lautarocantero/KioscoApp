import { DialogTitle, type Theme } from "@mui/material";
import { alpha } from "@mui/material/styles";


const SupplierDialogTitle = (): React.ReactNode => (
    <DialogTitle
        sx={(theme: Theme) => ({
            borderBottom: "0.5px solid",
            borderColor: alpha(theme.custom.white, 0.08),
            pb: 2,
        })}
    >
        Agregar nuevo proveedor
    </DialogTitle>
);

export default SupplierDialogTitle;