import { alpha, FormControl, FormControlLabel, FormHelperText, FormLabel, Grid, Radio, RadioGroup, TextField, Tooltip, type Theme } from "@mui/material";
import { useFormikContext } from "formik";
import { sharedSx } from "../../../shared/components/sharedSx/sharedSx";
import FieldWithIcon from "../../../shared/components/FormCard/FieldWithIcon";
import { useFocusFirstField } from "../../../../hooks/shared/useFocusFirstField";
import { useFieldDisplayState } from "../../../../hooks/shared/useFieldDisplayState";
import type { FieldConfig, FormFieldsRendererProps } from "@typings/shared/types/formCard.types";
import SelectField from "../../../presentations/components/PresentationForm/PresentationCategoryField";
import type { ReactNode } from "react";


function FormFieldsRenderer<T extends object>({
    fields,
    registry,
    icons,
    readOnly = false,
    disabledFields,
    sectionLabel,
    idPrefix,
    renderBeforeField,
    renderAfterField,
}: FormFieldsRendererProps<T>): ReactNode {
    const { setFieldValue, setFieldTouched } = useFormikContext<T>();
    const firstFieldRef = useFocusFirstField(fields[0] as string | undefined, readOnly);

    return (
        <Grid component="section" aria-label={sectionLabel} container spacing={2.5} display="flex" flexDirection="column">
            {fields.map((fieldKey, index) => {
                const config: FieldConfig | undefined = registry[fieldKey];
                if (!config) return null;

                const { fieldError, fieldValue, helperId, inputId, isFirstField } =
                    useFieldDisplayState<T>(fieldKey, index, idPrefix);

                const isFieldDisabled = readOnly || !!disabledFields?.includes(fieldKey);

                if (config.type === "select") {
                    return (
                        <Grid key={String(fieldKey)} spacing={{ xs: 12, sm: 12 }}>
                            {renderBeforeField?.[fieldKey]}
                            <FieldWithIcon iconConfig={icons?.[fieldKey]}>
                                <SelectField<T, string>
                                    name={fieldKey as keyof T & string}
                                    label={config.label}
                                    options={config.options ?? []}
                                    getOptionLabel={config.getOptionLabel ?? ((v) => v)}
                                    multiple={config.multiple}
                                    allowClear={config.allowClear}
                                    clearLabel={config.clearLabel}
                                    disabled={isFieldDisabled}
                                />
                            </FieldWithIcon>
                            {renderAfterField?.[fieldKey]}
                        </Grid>
                    );
                }

                if (config.type === "radio") {
                    return (
                        <Grid key={String(fieldKey)} spacing={{ xs: 12, sm: 12 }}>
                            {renderBeforeField?.[fieldKey]}
                            <FieldWithIcon iconConfig={icons?.[fieldKey]}>
                                <FormControl error={!!fieldError} disabled={isFieldDisabled} fullWidth>
                                    <FormLabel
                                        id={`${inputId}-label`}
                                        sx={{ fontSize: (theme: Theme) => theme?.typography?.body2?.fontSize }}
                                    >
                                        {config.label}
                                    </FormLabel>
                                    <RadioGroup
                                        aria-labelledby={`${inputId}-label`}
                                        value={fieldValue === undefined || fieldValue === "" ? "" : String(fieldValue)}
                                        onChange={(e) => setFieldValue(fieldKey as string, e.target.value === "true")}
                                        sx={{ gap: 1.5, mt: 1 }}
                                    >
                                        {(config.radioOptions ?? []).map((opt) => {
                                            const isSelected = String(fieldValue) === opt.value;
                                            return (
                                                <FormControlLabel
                                                    key={opt.value}
                                                    value={opt.value}
                                                    control={<Radio />}
                                                    label={opt.label}
                                                    sx={(theme: Theme) => ({
                                                        m: 0,
                                                        px: 2,
                                                        py: 0.5,
                                                        borderRadius: 2,
                                                        border: "1px solid",
                                                        borderColor: isSelected ? theme.palette.primary.light : theme.palette.divider,
                                                        backgroundColor: isSelected ? alpha(theme.palette.primary.light, 0.08) : "transparent",
                                                        boxShadow: isSelected ? `0 0 0 3px ${alpha(theme.palette.primary.light, 0.18)}` : "none",
                                                        transition: theme.transitions.create(["border-color", "background-color", "box-shadow"]),
                                                        "& .MuiFormControlLabel-label": {
                                                            fontSize: theme.typography.body2.fontSize,
                                                            fontWeight: isSelected ? 600 : 400,
                                                        },
                                                        "&:hover": {
                                                            borderColor: theme.palette.primary.light,
                                                        },
                                                    })}
                                                />
                                            );
                                        })}
                                    </RadioGroup>
                                    <FormHelperText id={helperId}>{fieldError ?? config.helperTextWhenEmpty}</FormHelperText>
                                </FormControl>
                            </FieldWithIcon>
                            {renderAfterField?.[fieldKey]}
                        </Grid>
                    );
                }

                return (
                    <Grid key={String(fieldKey)} spacing={{ xs: 12, sm: 12 }}>
                        {renderBeforeField?.[fieldKey]}
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
                                    disabled={isFieldDisabled}
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