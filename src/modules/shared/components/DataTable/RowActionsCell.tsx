import React from "react";
import { Box, IconButton, Tooltip } from "@mui/material";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import CookieIcon from '@mui/icons-material/Cookie';
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";
import type { RowActionsCellProps } from "@typings/ui/dataTable.types";


const RowActionsCell = ({
  onView,
  onEdit,
  onDelete,
  onPresentations,
  onToggleRead,
  isRead,
  toggleReadLabel = "Marcar como leída",
  onGoToDetail,
  goToDetailLabel = "Ver detalle",
  onRestock,
  restockLabel = "Reponer stock",
  viewLabel = "Ver detalle",
  editLabel = "Editar",
  deleteLabel = "Eliminar",
}: RowActionsCellProps): React.ReactNode => (
  <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }} role="group" aria-label="Acciones de la fila">

    {onToggleRead && (
      <Tooltip title={toggleReadLabel}>
        <IconButton size="small" color="secondary" onClick={onToggleRead} aria-label={toggleReadLabel}>
          {isRead ? <VisibilityOffOutlinedIcon fontSize="small" /> : <VisibilityOutlinedIcon fontSize="small" />}
        </IconButton>
      </Tooltip>
    )}

    {onGoToDetail && (
      <Tooltip title={goToDetailLabel}>
        <IconButton size="small" color="secondary" onClick={onGoToDetail} aria-label={goToDetailLabel}>
          <ArrowForwardIcon fontSize="small" />
        </IconButton>
      </Tooltip>
    )}

    {onPresentations && (
      <Tooltip title="Ver presentaciones">
        <IconButton size="small" color="secondary" onClick={onPresentations} aria-label="Ver presentaciones">
          <CookieIcon fontSize="small" />
        </IconButton>
      </Tooltip>
    )}

    {onView && (
      <Tooltip title={viewLabel}>
        <IconButton size="small" color="info" onClick={onView} aria-label={viewLabel}>
          <VisibilityOutlinedIcon fontSize="small" />
        </IconButton>
      </Tooltip>
    )}

    {onEdit && (
      <Tooltip title={editLabel}>
        <IconButton size="small" color="info" onClick={onEdit} aria-label={editLabel}>
          <EditOutlinedIcon fontSize="small" />
        </IconButton>
      </Tooltip>
    )}

    {onRestock && (
      <Tooltip title={restockLabel}>
        <IconButton size="small" color="secondary" onClick={onRestock} aria-label={restockLabel}>
          <Inventory2OutlinedIcon fontSize="small" />
        </IconButton>
      </Tooltip>
    )}

    {onDelete && (
      <Tooltip title={deleteLabel}>
        <IconButton size="small" color="error" onClick={onDelete} aria-label={deleteLabel}>
          <DeleteOutlineIcon fontSize="small" />
        </IconButton>
      </Tooltip>
    )}
  </Box>
);

export default RowActionsCell;