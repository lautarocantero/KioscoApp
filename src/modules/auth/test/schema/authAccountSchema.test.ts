import { describe, it, expect } from "vitest";
import { EditAuthRoleSchema, DeleteAuthAccountSchema } from "../../schema/authAccountSchema";

describe("EditAuthRoleSchema", () => {
    it("acepta un payload válido", () => {
        const result = EditAuthRoleSchema.safeParse({ _id: "seller-1", role: "admin" });

        expect(result.success).toBe(true);
    });

    it("rechaza si falta _id", () => {
        const result = EditAuthRoleSchema.safeParse({ role: "admin" });

        expect(result.success).toBe(false);
    });

    it("rechaza si falta role", () => {
        const result = EditAuthRoleSchema.safeParse({ _id: "seller-1" });

        expect(result.success).toBe(false);
    });

    it("rechaza _id vacío", () => {
        const result = EditAuthRoleSchema.safeParse({ _id: "", role: "admin" });

        expect(result.success).toBe(false);
    });
});

describe("DeleteAuthAccountSchema", () => {
    it("acepta un _id válido", () => {
        const result = DeleteAuthAccountSchema.safeParse({ _id: "seller-1" });

        expect(result.success).toBe(true);
    });

    it("rechaza un _id vacío", () => {
        const result = DeleteAuthAccountSchema.safeParse({ _id: "" });

        expect(result.success).toBe(false);
    });

    it("rechaza si falta _id", () => {
        const result = DeleteAuthAccountSchema.safeParse({});

        expect(result.success).toBe(false);
    });
});
