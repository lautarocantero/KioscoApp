import type { FieldDisplayState } from "@typings/shared/types/formCard.types";
import { getIn, useFormikContext } from "formik";


export function useFieldDisplayState<T extends object>(
    fieldKey: keyof T,
    index: number,
    idPrefix: string,
): FieldDisplayState {
    const { values, errors, touched } = useFormikContext<T>();

    const isTouched = !!getIn(touched, fieldKey as string);
    const fieldError = isTouched
        ? (getIn(errors, fieldKey as string) as string | undefined)
        : undefined;
    const fieldValue = getIn(values, fieldKey as string);
    const helperId = `${idPrefix}-${String(fieldKey)}-helper`;
    const inputId = `${idPrefix}-${String(fieldKey)}`;
    const isFirstField = index === 0;

    return { fieldError, fieldValue, helperId, inputId, isFirstField };
}