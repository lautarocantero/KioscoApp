import { DialogActions, Button, Box, CircularProgress, type Theme } from "@mui/material";
import type { SupplierDialogActionsProps } from "@typings/providers/providerComponentTypes";


const SupplierDialogActions = ({
    isLoading, onClose, onSubmit,
}: SupplierDialogActionsProps): React.ReactNode => (
    <DialogActions sx={{ borderTop: "0.5px solid rgba(255,255,255,0.08)", pt: 2, pb: 2, px: 3 }}>
        <Button
            onClick={onClose}
            disabled={isLoading}
            sx={(theme: Theme) => ({
                textTransform: "none",
                borderColor: theme?.custom?.translucidWhite,
                color: theme?.custom?.translucidWhite,
            })}
        >
            Cancelar
        </Button>

        <Button
            onClick={onSubmit}
            variant="contained"
            disabled={isLoading}
            sx={{
                textTransform: "none",
                fontWeight: 600,
                backgroundColor: "#0386EE",
                "&:disabled": { backgroundColor: "rgba(3, 134, 238, 0.5)" },
            }}
        >
            {isLoading ? (
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <CircularProgress size={16} color="inherit" />
                    Creando...
                </Box>
            ) : "Crear proveedor"}
        </Button>
    </DialogActions>
);

export default SupplierDialogActions;