import type { ReactNode } from "react";
import type { SelectFieldProps } from "@typings/shared/types/formCard.types";
import CategorySelector from "../../../shared/components/CategorySelector/CategorySelector";
import { useFormikCategorySelector, useFormikCategorySelectorMulti } from "../../../shared/components/CategorySelector/useFormikCategorySelector";

function SelectFieldSingle<T extends object, C extends string>({
    name, label, options, getOptionLabel, allowClear, clearLabel,
}: Omit<SelectFieldProps<T, C>, "multiple">): ReactNode {
    const { value, onChange } = useFormikCategorySelector<T, C>(name);
    return (
        <CategorySelector
            mode="single"
            id={name}
            label={label}
            categories={options}
            getLabel={getOptionLabel}
            value={value}
            onChange={onChange}
            allowClear={allowClear}
            clearLabel={clearLabel}
        />
    );
}

function SelectFieldMulti<T extends object, C extends string>({
    name, label, options, getOptionLabel,
}: Omit<SelectFieldProps<T, C>, "multiple" | "allowClear" | "clearLabel">): ReactNode {
    const { value, onChange } = useFormikCategorySelectorMulti<T, C>(name);
    return (
        <CategorySelector
            mode="multi"
            id={name}
            label={label}
            categories={options}
            getLabel={getOptionLabel}
            value={value}
            onChange={onChange}
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