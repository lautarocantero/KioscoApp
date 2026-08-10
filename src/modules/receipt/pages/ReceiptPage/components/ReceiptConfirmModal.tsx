import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Box,
  Stack,
  Chip,
  List,
  ListItem,
  ListItemText,
  Alert,
  Divider,
} from "@mui/material";
import EmptyButton from "../../../../shared/components/Buttons/EmptyButton";
import PrimaryButtonComponent from "../../../../shared/components/Buttons/PrimaryButtonComponent";
import type { ReceiptConfirmModalProps } from "@typings/receipt/receiptComponentTypes";
import { buildReceiptConfirmModalView } from "../helpers/buildReceiptConfirmModalReview";

const ReceiptConfirmModal = ({ open, preview, loading, onConfirm, onCancel }: ReceiptConfirmModalProps): React.ReactNode => {
  if (!preview) return null;

  const {
    stats,
    pendingReviewCount,
    productsCount,
    presentationsCount,
    visibleProducts,
    remainingProductsCount,
    hasPendingReview,
} = buildReceiptConfirmModalView(preview);

  return (
    <Dialog open={open} onClose={onCancel} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ fontWeight: 700 }}>Confirmar carga de boleta</DialogTitle>
      <DialogContent dividers>
        <Stack spacing={2}>
          <Typography variant="body2" color="text.secondary">
            Se analizaron {stats.totalRows} filas del archivo. Revisá el detalle antes de aplicar los cambios a la base de datos.
          </Typography>

          <Stack direction="row" spacing={1} flexWrap="wrap" sx={{ rowGap: 1 }}>
            <Chip label={`${productsCount} productos nuevos`} color="primary" />
            <Chip label={`${presentationsCount} presentaciones nuevas`} color="primary" />
            {hasPendingReview && <Chip label={`${pendingReviewCount} a revisar`} color="warning" />}
        </Stack>

          {hasPendingReview && (
            <Alert severity="warning">
              Algunos ítems se importarán igual, pero tienen datos incompletos (rubro sin mapeo, tamaño no
              detectado, sin código de barras, etc.). Podés revisarlos después de la carga.
            </Alert>
          )}

          <Divider />

          <Box>
            <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1 }}>
              Productos a crear
            </Typography>
            <List dense sx={{ maxHeight: 240, overflowY: "auto", bgcolor: "action.hover", borderRadius: 2 }}>
              {visibleProducts.map((product) => (
                <ListItem key={product._id}>
                  <ListItemText primary={product.name} secondary={`${product.presentations.length} presentación(es)`} />
                </ListItem>
              ))}
            </List>
            {remainingProductsCount > 0 && (
              <Typography variant="caption" color="text.secondary">
                y {remainingProductsCount} producto(s) más…
              </Typography>
            )}
          </Box>
        </Stack>
      </DialogContent>
      <DialogActions sx={{ px: 3, py: 2, gap: 1 }}>
        <EmptyButton buttonText="Cancelar" buttonOnClick={onCancel} buttonWidth="140px" />
        <PrimaryButtonComponent
          buttonText={loading ? "Aplicando…" : "Confirmar e importar"}
          buttonOnClick={onConfirm}
          buttonWidth="200px"
          disabled={loading}
          marginTop="0"
        />
      </DialogActions>
    </Dialog>
  );
};

export default ReceiptConfirmModal;