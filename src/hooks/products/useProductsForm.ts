// useProductsForm.ts
import type { UseFormStateReturn } from "@typings/product/productTypes";
import { useState } from "react";

export const useProductsForm = <T>(): UseFormStateReturn<T> => {
    const [createdEntity, setCreatedEntity] = useState<T | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState<string | null>(null);

    return {
        createdEntity,
        isSubmitting,
        submitError,
        setCreatedEntity,
        setIsSubmitting,
        setSubmitError,
    };
};