import { describe, it, expect } from "vitest";
import { createKioscoFormSchema, getCreateKioscoInitialValues } from "../../schema/KioscoFormSchema";

describe("createKioscoFormSchema", () => {
    it("valida un payload completo y válido", async () => {
        await expect(
            createKioscoFormSchema.validate({ name: "Kiosco Centro", address: "Av. Corrientes 1234" })
        ).resolves.toBeTruthy();
    });

    it("rechaza name vacío", async () => {
        await expect(
            createKioscoFormSchema.validate({ name: "", address: "Av. Corrientes 1234" })
        ).rejects.toThrow();
    });

    it("rechaza address vacía", async () => {
        await expect(
            createKioscoFormSchema.validate({ name: "Kiosco Centro", address: "" })
        ).rejects.toThrow();
    });

    it("rechaza name compuesto solo de espacios", async () => {
        await expect(
            createKioscoFormSchema.validate({ name: "   ", address: "Av. Corrientes 1234" })
        ).rejects.toThrow();
    });
});

describe("getCreateKioscoInitialValues", () => {
    it("devuelve campos vacíos", () => {
        expect(getCreateKioscoInitialValues()).toEqual({ name: "", address: "" });
    });
});
