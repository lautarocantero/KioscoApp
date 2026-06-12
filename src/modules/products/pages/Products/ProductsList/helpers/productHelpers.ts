import axios from "axios";

export const formatDate = (iso: string): string =>
  new Date(iso).toLocaleDateString("es-AR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

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
