import { Typography, type Theme } from "@mui/material";
import { Grid } from "@mui/system";
import type { FormStepsTitleInterface } from "@typings/ui/uiModules";


const FormStepsTitleComponent = ( {title}: FormStepsTitleInterface ):React.ReactNode => {
    return(
        <Grid sx={{ flex: 1 }}  spacing={{ xs: 6 }}>
            <Typography
                component={"h2"}
                sx={{
                    color: (theme: Theme) => ( theme?.custom?.white ),
                    fontSize: (theme: Theme) => theme?.typography?.body2,
                    textAlign: 'end',
                }}
            >
                {title}
            </Typography>
        </Grid>
    )
};
        
export default FormStepsTitleComponent;