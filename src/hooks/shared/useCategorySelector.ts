import { useFormikContext } from "formik";
import { PresentationCategory, PRESENTATION_CATEGORY_VALUES } from "@typings/presentation/presentationEnum";
import type { SelectChangeEvent } from "@mui/material";

export function useCategorySelector<T extends object>(name: keyof T & string) {
    const { values, setFieldValue } = useFormikContext<T>();
    const selected = (values[name as keyof T] as unknown as PresentationCategory[] | undefined) ?? [];

    const availableOptions = (PRESENTATION_CATEGORY_VALUES as PresentationCategory[]).filter(
        (category) => !selected.includes(category)
    );

    const handleSelect = (event: SelectChangeEvent<string>) => {
        const value = event.target.value as PresentationCategory;
        if (!value) return;
        void setFieldValue(name, [...selected, value]);
    };

    const handleRemove = (category: PresentationCategory) => {
        void setFieldValue(name, selected.filter((c) => c !== category));
    };

    return { selected, availableOptions, handleSelect, handleRemove };
}