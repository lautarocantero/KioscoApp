import type { DataTableDeleteDialogProps } from "@typings/ui/dataTable.types";
import ConfirmDialog from "../ConfirmDialog/ConfirmDialog";

const DataTableDeleteDialog = ({ config }: DataTableDeleteDialogProps): React.ReactNode => {
    if (!config) return null;

    return (
        <ConfirmDialog
            open={config.open}
            title={config.title ?? "Confirmar eliminación"}
            description={config.description}
            warningText={config.warningText}
            confirmLabel={config.confirmLabel ?? "Eliminar"}
            cancelLabel={config.cancelLabel ?? "Cancelar"}
            onConfirm={config.onConfirm}
            onCancel={config.onCancel}
        />
    );
};

export default DataTableDeleteDialog;