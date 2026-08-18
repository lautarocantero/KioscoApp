import { describe, it, expect } from "vitest";
import { joinKioscoFormSchema, getJoinKioscoInitialValues } from "../../schema/JoinKioscoFormSchema";

describe("joinKioscoFormSchema", () => {
    it("valida un código de invitación válido", async () => {
        await expect(joinKioscoFormSchema.validate({ invite_code: "ABC123" })).resolves.toBeTruthy();
    });

    it("rechaza invite_code vacío", async () => {
        await expect(joinKioscoFormSchema.validate({ invite_code: "" })).rejects.toThrow();
    });

    it("rechaza invite_code compuesto solo de espacios", async () => {
        await expect(joinKioscoFormSchema.validate({ invite_code: "   " })).rejects.toThrow();
    });
});

describe("getJoinKioscoInitialValues", () => {
    it("devuelve invite_code vacío si no se pasa código de prefill", () => {
        expect(getJoinKioscoInitialValues()).toEqual({ invite_code: "" });
    });

    it("devuelve invite_code vacío si el prefill es null", () => {
        expect(getJoinKioscoInitialValues(null)).toEqual({ invite_code: "" });
    });

    it("prellena invite_code con el código recibido", () => {
        expect(getJoinKioscoInitialValues("ABC123")).toEqual({ invite_code: "ABC123" });
    });
});
