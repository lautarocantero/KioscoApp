import { DialogActions, Button, Box, CircularProgress, type Theme } from "@mui/material";
import { alpha } from "@mui/material/styles";
import type { SupplierDialogActionsProps } from "@typings/providers/providerComponentTypes";


const SupplierDialogActions = ({
    isLoading, onClose, onSubmit,
}: SupplierDialogActionsProps): React.ReactNode => (
    <DialogActions
        sx={(theme: Theme) => ({
            borderTop: "0.5px solid",
            borderColor: alpha(theme.custom.white, 0.08),
            pt: 2, pb: 2, px: 3,
        })}
    >
        <Button
            onClick={onClose}
            disabled={isLoading}
            sx={(theme: Theme) => ({
                textTransform: "none",
                borderColor: theme.custom.translucidWhite,
                color: theme.custom.translucidWhite,
            })}
        >
            Cancelar
        </Button>

        <Button
            onClick={onSubmit}
            variant="contained"
            disabled={isLoading}
            sx={(theme: Theme) => ({
                textTransform: "none",
                fontWeight: 600,
                backgroundColor: theme.custom.accents.blue,
                "&:disabled": { backgroundColor: alpha(theme.custom.accents.blue, 0.5) },
            })}
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