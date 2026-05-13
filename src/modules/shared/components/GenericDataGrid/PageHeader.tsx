// ─── Componente 🧩: PageHeader ───────────────────────────────────────────────
// Encabezado de página con título a la izquierda y slot de acción a la derecha.
// El slot `action` acepta cualquier nodo (Button, Link, etc.).

import React from "react";
import { Box, Typography } from "@mui/material";

interface PageHeaderProps {
  title: string;
  action?: React.ReactNode;
}

const PageHeader = ({ title, action }: PageHeaderProps): React.ReactNode => (
  <Box
    sx={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      mb: 3,
    }}
  >
    <Typography variant="h5" fontWeight={600}>
      {title}
    </Typography>
    {action}
  </Box>
);

export default PageHeader;
