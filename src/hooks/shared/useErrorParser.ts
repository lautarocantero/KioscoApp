import { useState, useCallback } from "react";
import { parseApiError } from "../../utils/errors/parseApiError";
import type { UseErrorParserReturn } from "@typings/shared/types/useErrorParser";


export function useErrorParser(defaultFallbackMessage?: string): UseErrorParserReturn {
    const [message, setMessage] = useState<string | null>(null);

    const parseError = useCallback(async (error: unknown, fallbackMessage?: string): Promise<string> => {
        const parsed = await parseApiError(error, fallbackMessage ?? defaultFallbackMessage);
        setMessage(parsed);
        return parsed;
    }, [defaultFallbackMessage]);

    const clearError = useCallback(() => setMessage(null), []);

    return { message, parseError, clearError };
}