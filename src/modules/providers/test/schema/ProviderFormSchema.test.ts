import { describe, it, expect } from "vitest";
import type { Provider } from "@typings/provider/providerTypes";
import {
    providerFormSchema,
    getProviderFormInitialValues,
    getProviderEditInitialValues,
} from "../../schema/ProviderFormSchema";

const buildProvider = (overrides: Partial<Provider> = {}): Provider => ({
    _id: "provider-1",
    name: "Distribuidora QA",
    valoration: 4,
    contact_phone: "+54 11 4444-5555",
    contact_email: "contacto@distribuidoraqa.test",
    ...overrides,
});

describe("providerFormSchema", () => {
    it("valida un payload completo y válido", async () => {
        await expect(
            providerFormSchema.validate({
                name: "Distribuidora QA",
                valoration: 4,
                contact_phone: "123",
                contact_email: "a@a.com",
            })
        ).resolves.toBeTruthy();
    });

    it("rechaza name vacío", async () => {
        await expect(
            providerFormSchema.validate({ name: "", valoration: 4, contact_phone: "123", contact_email: "a@a.com" })
        ).rejects.toThrow();
    });

    it("rechaza valoration fuera de rango (0)", async () => {
        await expect(
            providerFormSchema.validate({ name: "X", valoration: 0, contact_phone: "123", contact_email: "a@a.com" })
        ).rejects.toThrow();
    });

    it("rechaza valoration fuera de rango (6)", async () => {
        await expect(
            providerFormSchema.validate({ name: "X", valoration: 6, contact_phone: "123", contact_email: "a@a.com" })
        ).rejects.toThrow();
    });

    it("rechaza contact_email inválido", async () => {
        await expect(
            providerFormSchema.validate({ name: "X", valoration: 4, contact_phone: "123", contact_email: "no-es-email" })
        ).rejects.toThrow();
    });

    it("rechaza contact_phone vacío", async () => {
        await expect(
            providerFormSchema.validate({ name: "X", valoration: 4, contact_phone: "", contact_email: "a@a.com" })
        ).rejects.toThrow();
    });
});

describe("getProviderFormInitialValues", () => {
    it("devuelve campos vacíos y valoration en 5 por defecto", () => {
        expect(getProviderFormInitialValues()).toEqual({
            name: "",
            valoration: 5,
            contact_phone: "",
            contact_email: "",
        });
    });
});

describe("getProviderEditInitialValues", () => {
    it("mapea los campos del proveedor tal cual", () => {
        const values = getProviderEditInitialValues(buildProvider());

        expect(values).toEqual({
            name: "Distribuidora QA",
            valoration: 4,
            contact_phone: "+54 11 4444-5555",
            contact_email: "contacto@distribuidoraqa.test",
        });
    });

    it("usa valores por defecto (valoration 5, resto vacío) si no hay proveedor", () => {
        const values = getProviderEditInitialValues(null);

        expect(values).toEqual({ name: "", valoration: 5, contact_phone: "", contact_email: "" });
    });
});
