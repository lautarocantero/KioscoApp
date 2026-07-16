import { Grid, TextField } from "@mui/material";
import { useFormikContext } from "formik";
import type { PresentationFormValues, PresentationStockFieldsProps } from "@typings/presentation/presentationTypes";
import { sharedSx } from "../../../shared/components/sharedSx/sharedSx";
import FieldWithIcon from "../../../shared/components/FormCard/FieldWithIcon";
import type { ReactNode } from "react";


const PresentationStockFields = ({ icons }: PresentationStockFieldsProps): ReactNode => {
    const { values, errors, setFieldValue } = useFormikContext<PresentationFormValues>();

    return (
        <Grid container spacing={2.5} display="flex" flexDirection="column">
            <Grid spacing={{ xs: 12, sm: 12 }}>
                <FieldWithIcon iconConfig={icons?.stock}>
                    <TextField
                        fullWidth required label="Stock" type="number"
                        placeholder="Ej: 100"
                        value={values.stock}
                        onChange={(e) => setFieldValue("stock", e.target.value)}
                        error={!!errors.stock} helperText={errors.stock}
                        variant="outlined" sx={sharedSx}
                    />
                </FieldWithIcon>
            </Grid>

            <Grid spacing={{ xs: 12, sm: 12 }}>
                <FieldWithIcon iconConfig={icons?.min_stock}>
                    <TextField
                        fullWidth required label="Stock mínimo" type="number"
                        placeholder="Ej: 10"
                        value={values.min_stock}
                        onChange={(e) => setFieldValue("min_stock", e.target.value)}
                        error={!!errors.min_stock} helperText={errors.min_stock}
                        variant="outlined" sx={sharedSx}
                    />
                </FieldWithIcon>
            </Grid>

            <Grid spacing={{ xs: 12, sm: 12 }}>
                <FieldWithIcon iconConfig={icons?.price}>
                    <TextField
                        fullWidth required label="Precio" type="number"
                        placeholder="Ej: 1.50"
                        value={values.price}
                        onChange={(e) => setFieldValue("price", e.target.value)}
                        error={!!errors.price} helperText={errors.price}
                        variant="outlined" sx={sharedSx}
                        inputProps={{ step: "0.01" }}
                    />
                </FieldWithIcon>
            </Grid>
        </Grid>
    );
};

export default PresentationStockFields;