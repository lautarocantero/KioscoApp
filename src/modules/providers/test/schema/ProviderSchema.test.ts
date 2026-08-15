import { describe, it, expect } from "vitest";
import { CreateProviderSchema, EditProviderSchema, DeleteProviderSchema } from "../../schema/ProviderSchema";

const VALID_PROVIDER = {
    name: "Distribuidora QA",
    valoration: 4,
    contact_phone: "+54 11 4444-5555",
    contact_email: "contacto@distribuidoraqa.test",
};

describe("CreateProviderSchema", () => {
    it("acepta un payload válido", () => {
        expect(CreateProviderSchema.safeParse(VALID_PROVIDER).success).toBe(true);
    });

    it("rechaza name vacío", () => {
        expect(CreateProviderSchema.safeParse({ ...VALID_PROVIDER, name: "" }).success).toBe(false);
    });

    it("rechaza valoration menor a 1", () => {
        expect(CreateProviderSchema.safeParse({ ...VALID_PROVIDER, valoration: 0 }).success).toBe(false);
    });

    it("rechaza valoration mayor a 5", () => {
        expect(CreateProviderSchema.safeParse({ ...VALID_PROVIDER, valoration: 6 }).success).toBe(false);
    });

    it("rechaza contact_email inválido", () => {
        expect(CreateProviderSchema.safeParse({ ...VALID_PROVIDER, contact_email: "no-es-un-email" }).success).toBe(false);
    });

    it("rechaza contact_phone vacío", () => {
        expect(CreateProviderSchema.safeParse({ ...VALID_PROVIDER, contact_phone: "" }).success).toBe(false);
    });
});

describe("EditProviderSchema", () => {
    it("acepta solo _id, con el resto de campos opcionales", () => {
        expect(EditProviderSchema.safeParse({ _id: "provider-1" }).success).toBe(true);
    });

    it("rechaza si falta _id", () => {
        expect(EditProviderSchema.safeParse({ name: "Nuevo nombre" }).success).toBe(false);
    });

    it("rechaza valoration fuera de rango aunque el resto sea parcial", () => {
        expect(EditProviderSchema.safeParse({ _id: "provider-1", valoration: 9 }).success).toBe(false);
    });

    it("acepta una edición parcial válida", () => {
        expect(EditProviderSchema.safeParse({ _id: "provider-1", name: "Nuevo nombre" }).success).toBe(true);
    });
});

describe("DeleteProviderSchema", () => {
    it("acepta un _id válido", () => {
        expect(DeleteProviderSchema.safeParse({ _id: "provider-1" }).success).toBe(true);
    });

    it("rechaza un _id vacío", () => {
        expect(DeleteProviderSchema.safeParse({ _id: "" }).success).toBe(false);
    });

    it("rechaza si falta _id", () => {
        expect(DeleteProviderSchema.safeParse({}).success).toBe(false);
    });
});
