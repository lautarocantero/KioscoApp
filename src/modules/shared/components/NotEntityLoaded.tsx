
import { Box, Typography } from "@mui/material";

interface NotEntityLoadedProps {
    error?:        string | null;
    fallbackText?: string;
}

const NotEntityLoaded = ({ error, fallbackText = "No se pudo cargar los datos" }: NotEntityLoadedProps) => (
    <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "400px" }}>
        <Typography color="error">
            {error ?? fallbackText}
        </Typography>
    </Box>
);

export default NotEntityLoaded;