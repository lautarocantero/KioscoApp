import { useFormikContext } from "formik";
import type { UseFormikCategorySelectorMultiResult, UseFormikCategorySelectorResult } from "@typings/presentation/presentationComponentTypes";

export function useFormikFormSelector<T extends object, C extends string>(
    name: keyof T & string,
): UseFormikCategorySelectorResult<C> {
    const { values, setFieldValue } = useFormikContext<T>();
    const value = (values[name as keyof T] as unknown as C | null) ?? null;

    const onChange = (next: C | null) => {
        void setFieldValue(name, next);
    };

    return { value, onChange };
}

export function useFormikFormSelectorMulti<T extends object, C extends string>(
    name: keyof T & string,
): UseFormikCategorySelectorMultiResult<C> {
    const { values, setFieldValue } = useFormikContext<T>();
    const value = (values[name as keyof T] as unknown as C[] | undefined) ?? [];

    const onChange = (next: C[]) => {
        void setFieldValue(name, next);
    };

    return { value, onChange };
}