import { Box, CircularProgress, type Theme } from "@mui/material";

const LoadingSpinnerComponent = () => (
    <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "400px" }}>
        <CircularProgress sx={(theme: Theme) => ({ color: theme.palette.primary.main })} />
    </Box>
);

export default LoadingSpinnerComponent;