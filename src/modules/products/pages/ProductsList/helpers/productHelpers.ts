import axios from "axios";


export const truncate = (text: string, max = 50): string =>
  text.length <= max ? text : `${text.slice(0, max - 1)}…`;

export const resolveErrorMessage = (err: unknown): string => {
  if (axios.isAxiosError(err)) {
    return (
      (err.response?.data as { message?: string })?.message ?? err.message
    );
  }
  return err instanceof Error ? err.message : "Error desconocido";
};
