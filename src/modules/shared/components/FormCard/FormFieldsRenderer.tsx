import { Grid, TextField, Tooltip } from "@mui/material";
import { useFormikContext } from "formik";
import { sharedSx } from "../../../shared/components/sharedSx/sharedSx";
import FieldWithIcon from "../../../shared/components/FormCard/FieldWithIcon";
import { useFocusFirstField } from "../../../../hooks/shared/useFocusFirstField";
import { useFieldDisplayState } from "../../../../hooks/shared/useFieldDisplayState";
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
    const { setFieldValue, setFieldTouched } = useFormikContext<T>();
    const firstFieldRef = useFocusFirstField(fields[0] as string | undefined, readOnly);

    return (
        <Grid component="section" aria-label={sectionLabel} container spacing={2.5} display="flex" flexDirection="column">
            {fields.map((fieldKey, index) => {
                const config: FieldConfig | undefined = registry[fieldKey];
                if (!config) return null;

                const { fieldError, fieldValue, helperId, inputId, isFirstField } =
                    useFieldDisplayState<T>(fieldKey, index, idPrefix);

                return (
                    <Grid key={String(fieldKey)} spacing={{ xs: 12, sm: 12 }}>
                        <FieldWithIcon iconConfig={icons?.[fieldKey]}>
                            <Tooltip title={config.tooltip} placement="top-start">
                                <TextField
                                    id={inputId}
                                    name={String(fieldKey)}
                                    inputRef={isFirstField ? firstFieldRef : undefined}
                                    fullWidth
                                    required={config.required}
                                    multiline={config.multiline}
                                    rows={config.rows}
                                    label={config.label}
                                    type={config.type ?? "text"}
                                    placeholder={config.placeholder}
                                    disabled={readOnly}
                                    value={fieldValue ?? ""}
                                    onChange={(e) => {
                                        const raw = e.target.value;
                                        const parsed = config.type === "number"
                                            ? (raw === "" ? "" : Number(raw))
                                            : raw;
                                        setFieldValue(fieldKey as string, parsed);
                                    }}
                                    onBlur={() => setFieldTouched(fieldKey as string, true)}
                                    error={!!fieldError}
                                    helperText={fieldError ?? config.helperTextWhenEmpty}
                                    variant="outlined"
                                    sx={sharedSx}
                                    slotProps={{
                                        formHelperText: { id: helperId },
                                        htmlInput: {
                                            step: config.step,
                                            min: config.min,
                                            "aria-required": !!config.required,
                                            "aria-invalid": !!fieldError,
                                            "aria-describedby": helperId,
                                        },
                                    }}
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