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
  <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>

    {onPresentations && (
      <Tooltip title="Ver presentaciones">
        <IconButton size="small" color="success" onClick={onPresentations}>
          <CookieIcon fontSize="small" />
        </IconButton>
      </Tooltip>
    )}

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
