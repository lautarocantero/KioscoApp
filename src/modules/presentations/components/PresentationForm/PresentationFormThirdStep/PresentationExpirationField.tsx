import { Grid, TextField } from "@mui/material";
import { useFormikContext } from "formik";
import type { PresentationFormValues } from "@typings/presentation/presentationTypes";
import { sharedSx } from "../../../../shared/components/sharedSx/sharedSx";

const PresentationExpirationField = (): React.ReactNode => {
    const { values, errors, setFieldValue } = useFormikContext<PresentationFormValues>();

    return (
        <Grid container spacing={2.5} display="flex" flexDirection="column">
            <Grid spacing={{ xs: 12, sm: 12 }}>
                <TextField
                    fullWidth required label="Fecha de vencimiento" type="date"
                    value={values.expiration_date}
                    onChange={(e) => setFieldValue("expiration_date", e.target.value)}
                    error={!!errors.expiration_date} helperText={errors.expiration_date}
                    variant="outlined" sx={sharedSx}
                    InputLabelProps={{ shrink: true }}
                />
            </Grid>
        </Grid>
    );
};

export default PresentationExpirationField;