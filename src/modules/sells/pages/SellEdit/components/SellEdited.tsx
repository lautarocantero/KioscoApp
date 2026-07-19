import { Box, Button, Typography } from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";

interface SellEditedProps {
    handleSeeDetail: () => void;
    handleBackToSells: () => void;
}

const SellEdited = ({ handleSeeDetail, handleBackToSells }: SellEditedProps): React.ReactNode => {
    return (
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2, p: 4, textAlign: "center" }}>
            <CheckCircleOutlineIcon color="success" sx={{ fontSize: 56 }} />
            <Typography variant="h6">Venta actualizada correctamente</Typography>
            <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
                <Button variant="outlined" onClick={handleBackToSells}>Volver a ventas</Button>
                <Button variant="contained" onClick={handleSeeDetail}>Ver detalle</Button>
            </Box>
        </Box>
    );
};

export default SellEdited;