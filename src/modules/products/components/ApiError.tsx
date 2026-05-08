import { Grid, Typography } from "@mui/material";


const ApiErrorComponent = ({ submitError }: { submitError: string | null }) => {
    if (!submitError) return null;
    
    return (
        <Grid size={12} sx={{ mb: 2 }}>
            <Typography color="error" variant="body2" textAlign="center">
                ❌ {submitError}
            </Typography>
        </Grid>
    );}

export default ApiErrorComponent;