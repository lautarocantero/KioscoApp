import { Box, CircularProgress } from "@mui/material";

const LoadingSpinnerComponent = () => (
    <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "400px" }}>
        <CircularProgress sx={{ color: "#0386EE" }} />
    </Box>
);

export default LoadingSpinnerComponent;