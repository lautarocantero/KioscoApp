

export interface UseErrorParserReturn {
    message: string | null;
    parseError: (error: unknown, fallbackMessage?: string) => Promise<string>;
    clearError: () => void;
}