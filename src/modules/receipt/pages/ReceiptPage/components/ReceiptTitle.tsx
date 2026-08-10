import { Box, Typography, type Theme } from "@mui/material";
import type { ReactNode } from "react";


const ReceiptPageTitle = (): ReactNode => {

    return (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
            <Typography 
                variant="h4" 
                sx={ (theme: Theme) => ({ 
                    fontWeight: 400,
                    color: theme?.palette?.primary?.main,  
                    })}
            >
            Carga de boletas
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Importa tus boletas desde un archivo Excel y actualizá tu inventario.
          </Typography>
        </Box>
  );
};

export default ReceiptPageTitle;