import type { ReactNode } from "react";
import type { SelectFieldProps } from "@typings/shared/types/formCard.types";
import { useFormikFormSelector, useFormikFormSelectorMulti } from "../../../shared/components/FormSelector/useFormikFormSelector";
import FormSelector from "../../../shared/components/FormSelector/FormSelector";

function SelectFieldSingle<T extends object, C extends string>({
    name, label, options, getOptionLabel, allowClear, clearLabel, disabled,
}: Omit<SelectFieldProps<T, C>, "multiple">): ReactNode {
    const { value, onChange } = useFormikFormSelector<T, C>(name);
    return (
        <FormSelector
            mode="single"
            id={name}
            label={label}
            categories={options}
            getLabel={getOptionLabel}
            value={value}
            onChange={onChange}
            allowClear={allowClear}
            clearLabel={clearLabel}
            disabled={disabled}
        />
    );
}

function SelectFieldMulti<T extends object, C extends string>({
    name, label, options, getOptionLabel, disabled,
}: Omit<SelectFieldProps<T, C>, "multiple" | "allowClear" | "clearLabel">): ReactNode {
    const { value, onChange } = useFormikFormSelectorMulti<T, C>(name);
    return (
        <FormSelector
            mode="multi"
            id={name}
            label={label}
            categories={options}
            getLabel={getOptionLabel}
            value={value}
            onChange={onChange}
            disabled={disabled}
        />
    );
}

// Wrapper: decide qué subcomponente montar según `multiple`.
// Cada subcomponente llama su propio hook de forma incondicional (reglas de hooks).
function SelectField<T extends object, C extends string>(props: SelectFieldProps<T, C>): ReactNode {
    if (props.multiple) return <SelectFieldMulti {...props} />;
    return <SelectFieldSingle {...props} />;
}

export default SelectField;