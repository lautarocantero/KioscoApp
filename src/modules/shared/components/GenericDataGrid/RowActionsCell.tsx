// ─── Componente 🧩: RowActionsCell ───────────────────────────────────────────
// Celda de acciones reutilizable para cualquier DataGrid.
// Recibe las tres acciones como callbacks opcionales; si alguna no se pasa,
// el botón correspondiente no se renderiza.

import React from "react";
import { Box, IconButton, Tooltip } from "@mui/material";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";

interface RowActionsCellProps {
  onView?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
}

const RowActionsCell = ({
  onView,
  onEdit,
  onDelete,
}: RowActionsCellProps): React.ReactNode => (
  <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
    {onView && (
      <Tooltip title="Ver detalle">
        <IconButton size="small" color="info" onClick={onView}>
          <VisibilityOutlinedIcon fontSize="small" />
        </IconButton>
      </Tooltip>
    )}

    {onEdit && (
      <Tooltip title="Editar">
        <IconButton size="small" color="warning" onClick={onEdit}>
          <EditOutlinedIcon fontSize="small" />
        </IconButton>
      </Tooltip>
    )}

    {onDelete && (
      <Tooltip title="Eliminar">
        <IconButton size="small" color="error" onClick={onDelete}>
          <DeleteOutlineIcon fontSize="small" />
        </IconButton>
      </Tooltip>
    )}
  </Box>
);

export default RowActionsCell;
