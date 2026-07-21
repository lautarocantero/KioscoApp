import type { SelectChangeEvent } from "@mui/material";
import type { UseCategorySelectorMultiParams, UseCategorySelectorMultiResult } from "@typings/presentation/presentationTypes";

export function useCategorySelectorMulti<C extends string>({
    categories,
    selected,
    onChange,
}: UseCategorySelectorMultiParams<C>): UseCategorySelectorMultiResult<C> {
    const availableOptions = categories.filter((category) => !selected.includes(category));

    const handleSelect = (event: SelectChangeEvent<string>) => {
        const value = event.target.value as C;
        if (!value) return;
        onChange([...selected, value]);
    };

    const handleRemove = (category: C) => {
        onChange(selected.filter((c) => c !== category));
    };

    return { availableOptions, handleSelect, handleRemove };
}