import { Box, Typography } from "@mui/material";

const ProductCreatedNote = (): React.ReactNode => (
    <Box sx={{ px: 3, py: 1.5, borderTop: "0.5px solid rgba(255,255,255,0.07)" }}>
        <Typography sx={{ fontSize: "0.72rem", color: "rgba(255,255,255,0.30)" }}>
            Podés agregar presentaciones (2L, lata, retornable...) con stock y precio individuales.
        </Typography>
    </Box>
);

export default ProductCreatedNote;