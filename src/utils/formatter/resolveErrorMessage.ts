import axios from "axios";

export const resolveErrorMessage = (err: unknown): string => {
  if (axios.isAxiosError(err)) {
    return (
      (err.response?.data as { message?: string })?.message ?? err.message
    );
  }
  return err instanceof Error ? err.message : "Error desconocido";
};
