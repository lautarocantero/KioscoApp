import { useFormikContext } from "formik";
import type { UseFormikCategorySelectorMultiResult } from "@typings/presentation/presentationComponentTypes";

export function useFormikCategorySelectorMulti<T extends object, C extends string>(
    name: keyof T & string,
): UseFormikCategorySelectorMultiResult<C> {
    const { values, setFieldValue } = useFormikContext<T>();
    const value = (values[name as keyof T] as unknown as C[] | undefined) ?? [];

    const onChange = (next: C[]) => {
        void setFieldValue(name, next);
    };

    return { value, onChange };
}