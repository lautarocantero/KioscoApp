import { describe, it, expect } from "vitest";
import { AxiosError, AxiosHeaders } from "axios";
import { z } from "zod";
import { parseApiError } from "../parseApiError";

const buildAxiosError = (status: number, data: unknown): AxiosError => {
    const config = { headers: new AxiosHeaders() };
    return new AxiosError(
        `Request failed with status code ${status}`,
        String(status),
        config,
        {},
        { status, statusText: "", headers: {}, config, data },
    );
};

describe("parseApiError", () => {
    it("extrae el message del backend de un error de axios (llamada directa sin thunk)", async () => {
        const error = buildAxiosError(400, { message: "This kiosco is already subscribed to this plan" });

        const message = await parseApiError(error);

        expect(message).toBe("This kiosco is already subscribed to this plan");
    });

    it("cae al mensaje genérico por status si el error de axios no trae message", async () => {
        const error = buildAxiosError(404, {});

        const message = await parseApiError(error);

        expect(message).toBe("No se encontró el recurso solicitado.");
    });

    it("detecta un error de axios sin response (sin conexión) como error de red", async () => {
        const error = new AxiosError("Network Error", "ERR_NETWORK");

        const message = await parseApiError(error);

        expect(message).toBe("No se pudo conectar con el servidor. Verificá tu conexión a internet.");
    });

    it("devuelve un mensaje legible (no el dump JSON crudo) cuando el error es un ZodError", async () => {
        const schema = z.object({ plan: z.enum(["standard", "deluxe"]) });
        const result = schema.safeParse({ plan: "unknown-plan" });
        if (result.success) throw new Error("expected safeParse to fail");

        const message = await parseApiError(result.error);

        expect(message).not.toContain("invalid_value");
        expect(message).not.toContain('"path"');
        expect(message.length).toBeGreaterThan(0);
    });

    it("devuelve el mensaje del backend para un Error estándar", async () => {
        const message = await parseApiError(new Error("This kiosco is already subscribed to this plan"));
        expect(message).toBe("This kiosco is already subscribed to this plan");
    });

    it("usa el fallback cuando el error no tiene mensaje utilizable", async () => {
        const message = await parseApiError({}, "Fallback personalizado");
        expect(message).toBe("Fallback personalizado");
    });
});
