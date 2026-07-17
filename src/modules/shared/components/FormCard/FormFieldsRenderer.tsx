import { Grid, TextField, Tooltip } from "@mui/material";
import { useFormikContext, getIn } from "formik";
import { sharedSx } from "../../../shared/components/sharedSx/sharedSx";
import FieldWithIcon from "../../../shared/components/FormCard/FieldWithIcon";
import type { FieldConfig, FormFieldsRendererProps } from "@typings/shared/types/formCard.types";


function FormFieldsRenderer<T extends object>({
    fields,
    registry,
    icons,
    readOnly = false,
    sectionLabel,
    idPrefix,
    renderAfterField,
}: FormFieldsRendererProps<T>): React.ReactNode {
    const { values, errors, setFieldValue } = useFormikContext<T>();

    return (
        <Grid component="section" aria-label={sectionLabel} container spacing={2.5} display="flex" flexDirection="column">
            {fields.map((fieldKey) => {
                const config: FieldConfig | undefined = registry[fieldKey];
                if (!config) return null;

                const fieldError = getIn(errors, fieldKey as string) as string | undefined;
                const fieldValue = getIn(values, fieldKey as string);
                const helperId = `${idPrefix}-${String(fieldKey)}-helper`;
                const inputId = `${idPrefix}-${String(fieldKey)}`;

                return (
                    <Grid key={String(fieldKey)} spacing={{ xs: 12, sm: 12 }}>
                        <FieldWithIcon iconConfig={icons?.[fieldKey]}>
                            <Tooltip title={config.tooltip} placement="top-start">
                                <TextField
                                    id={inputId}
                                    name={String(fieldKey)}
                                    fullWidth
                                    required={config.required}
                                    multiline={config.multiline}
                                    rows={config.rows}
                                    label={config.label}
                                    type={config.type ?? "text"}
                                    placeholder={config.placeholder}
                                    disabled={readOnly}
                                    value={fieldValue ?? ""}
                                    onChange={(e) => setFieldValue(fieldKey as string, e.target.value)}
                                    error={!!fieldError}
                                    helperText={fieldError ?? config.helperTextWhenEmpty}
                                    FormHelperTextProps={{ id: helperId }}
                                    inputProps={{
                                        step: config.step,
                                        "aria-required": !!config.required,
                                        "aria-invalid": !!fieldError,
                                        "aria-describedby": helperId,
                                    }}
                                    variant="outlined"
                                    sx={sharedSx}
                                />
                            </Tooltip>
                        </FieldWithIcon>
                        {renderAfterField?.[fieldKey]}
                    </Grid>
                );
            })}
        </Grid>
    );
}

export default FormFieldsRenderer;