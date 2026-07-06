import { Grid, TextField } from "@mui/material";
import type { PresentationFormFieldsProps, PresentationFormValues } from "@typings/presentation/presentationTypes";
import { useFormikContext } from "formik";
import { sharedSx } from "../../../shared/components/sharedSx/sharedSx";
import FieldWithIcon from "../../../shared/components/FormGrid/FieldWithIcon";

const PresentationFormFields = ({ icons }: PresentationFormFieldsProps): React.ReactNode => {
    const { values, errors, setFieldValue } = useFormikContext<PresentationFormValues>();

    return (
        <Grid 
            container 
            spacing={2.5} 
            display="flex" 
            flexDirection="column"
        >
            <Grid spacing={{ xs: 12, sm: 12 }}>
                <FieldWithIcon iconConfig={icons?.sku}>
                    <TextField
                        fullWidth required label="SKU"
                        placeholder="Ej: COK-500ML-BLACK"
                        value={values.sku}
                        onChange={(e) => setFieldValue("sku", e.target.value)}
                        error={!!errors.sku} helperText={errors.sku}
                        variant="outlined" sx={sharedSx}
                    />
                </FieldWithIcon>
            </Grid>

            <Grid spacing={{ xs: 12, sm: 12 }}>
                <FieldWithIcon iconConfig={icons?.model_type}>
                    <TextField
                        fullWidth required label="Tipo de modelo"
                        placeholder="Ej: Lata, Botella, Tetra Pack"
                        value={values.model_type}
                        onChange={(e) => setFieldValue("model_type", e.target.value)}
                        error={!!errors.model_type} helperText={errors.model_type}
                        variant="outlined" sx={sharedSx}
                    />
                </FieldWithIcon>
            </Grid>

            <Grid spacing={{ xs: 12, sm: 12 }}>
                <FieldWithIcon iconConfig={icons?.model_size}>
                    <TextField
                        fullWidth required label="Tamaño/Presentación"
                        placeholder="Ej: 500ml, 1L, 2L"
                        value={values.model_size}
                        onChange={(e) => setFieldValue("model_size", e.target.value)}
                        error={!!errors.model_size} helperText={errors.model_size}
                        variant="outlined" sx={sharedSx}
                    />
                </FieldWithIcon>
            </Grid>
        </Grid>
    );
};

export default PresentationFormFields;