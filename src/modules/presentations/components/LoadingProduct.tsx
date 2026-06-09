import { Box, CircularProgress } from "@mui/material";

const LoadingProductComponent = () => (
    <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "400px" }}>
        <CircularProgress sx={{ color: "#0386EE" }} />
    </Box>
);

export default LoadingProductComponent;