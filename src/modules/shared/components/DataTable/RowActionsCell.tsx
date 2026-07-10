import React from "react";
import { Box, IconButton, Tooltip } from "@mui/material";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import CookieIcon from '@mui/icons-material/Cookie';
import type { RowActionsCellProps } from "@typings/ui/dataTable.types";


const RowActionsCell = ({
  onView,
  onEdit,
  onDelete,
  onPresentations,
}: RowActionsCellProps): React.ReactNode => (
  <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }} role="group" aria-label="Acciones de la fila">

    {onPresentations && (
      <Tooltip title="Ver presentaciones">
        <IconButton size="small" color="success" onClick={onPresentations} aria-label="Ver presentaciones">
          <CookieIcon fontSize="small" />
        </IconButton>
      </Tooltip>
    )}

    {onView && (
      <Tooltip title="Ver detalle">
        <IconButton size="small" color="info" onClick={onView} aria-label="Ver detalle">
          <VisibilityOutlinedIcon fontSize="small" />
        </IconButton>
      </Tooltip>
    )}

    {onEdit && (
      <Tooltip title="Editar">
        <IconButton size="small" color="warning" onClick={onEdit} aria-label="Editar">
          <EditOutlinedIcon fontSize="small" />
        </IconButton>
      </Tooltip>
    )}

    {onDelete && (
      <Tooltip title="Eliminar">
        <IconButton size="small" color="error" onClick={onDelete} aria-label="Eliminar">
          <DeleteOutlineIcon fontSize="small" />
        </IconButton>
      </Tooltip>
    )}
  </Box>
);

export default RowActionsCell;