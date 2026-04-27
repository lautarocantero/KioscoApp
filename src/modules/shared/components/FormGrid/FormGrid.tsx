import { Grid } from "@mui/material";
import type { FormGridProps } from "@typings/shared/types/useFormSteps";

const FormGridComponent = ({ formSteps }: FormGridProps): React.ReactNode => {
    const { stepState, totalSteps } = formSteps;

    return (
        <Grid container sx={{ margin: "3em auto 0", width: "90%" }}>
            <Grid container sx={{ mt: 3 }}>
                {stepState.content}
            </Grid>

        </Grid>
    );
};

export default FormGridComponent;