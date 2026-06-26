import CheckIcon from "@mui/icons-material/Check";
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { Box, Typography } from "@mui/material";

const ProductCreatedTimeline = (): React.ReactNode => (
    <Box sx={{ width: "100%", maxWidth: 520, display: "grid", gridTemplateColumns: "80px 1fr 80px", alignItems: "start", mb: 4 }}>
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 1.5 }}>
            <Box sx={theme => ({ width: 58, height: 58, borderRadius: "50%", backgroundColor: `${theme.custom.fontColorDark}15`, display: "flex", alignItems: "center", justifyContent: "center", color: theme.custom.fontColorDark })}>
                <Inventory2OutlinedIcon />
            </Box>
            <Typography variant="caption" sx={{ textAlign: "center" }}>Crear producto</Typography>
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", mt: "29px" }}>
            <Box sx={theme => ({ flex: 1, height: 3, borderRadius: "999px", backgroundColor: theme.palette.success.main })} />
            <Box sx={theme => ({ width: 58, height: 58, mx: 1, borderRadius: "50%", backgroundColor: theme.palette.success.main, color: theme.custom.white, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: `0 6px 18px ${theme.palette.success.main}40` })}>
                <CheckIcon sx={{ fontSize: 30 }} />
            </Box>
            <Box sx={theme => ({ flex: 1, height: 2, backgroundImage: `repeating-linear-gradient(to right, ${theme.custom.fontColorDark}40 0px, ${theme.custom.fontColorDark}40 6px, transparent 6px, transparent 12px)` })} />
        </Box>

        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 1.5 }}>
            <Box sx={theme => ({ width: 58, height: 58, borderRadius: "50%", backgroundColor: `${theme.custom.fontColorDark}15`, display: "flex", alignItems: "center", justifyContent: "center", color: theme.custom.fontColorDark })}>
                <AddCircleOutlineIcon />
            </Box>
            <Typography variant="caption" sx={{ textAlign: "center" }}>Crear presentación</Typography>
        </Box>
    </Box>
);

export default ProductCreatedTimeline;