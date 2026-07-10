import { Alert } from "@mui/material";
import type { DataTableErrorAlertProps } from "@typings/ui/dataTable.types";

const DataTableErrorAlert = ({ error, onClose }: DataTableErrorAlertProps): React.ReactNode => {
    if (!error) return null;

    return (
        <Alert severity="error" sx={{ mb: 2, width: "100%" }} onClose={onClose} closeText="Cerrar">
            {error}
        </Alert>
    );
};

export default DataTableErrorAlert;