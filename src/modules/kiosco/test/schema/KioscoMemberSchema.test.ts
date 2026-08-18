import { describe, it, expect } from "vitest";
import { RemoveKioscoMemberSchema, UpdateKioscoMemberRoleSchema } from "../../schema/KioscoMemberSchema";

const VALID_MEMBER = { kioscoId: "kiosco-1", userId: "user-1" };

describe("RemoveKioscoMemberSchema", () => {
    it("acepta un payload válido", () => {
        expect(RemoveKioscoMemberSchema.safeParse(VALID_MEMBER).success).toBe(true);
    });

    it("rechaza kioscoId vacío", () => {
        expect(RemoveKioscoMemberSchema.safeParse({ ...VALID_MEMBER, kioscoId: "" }).success).toBe(false);
    });

    it("rechaza userId vacío", () => {
        expect(RemoveKioscoMemberSchema.safeParse({ ...VALID_MEMBER, userId: "" }).success).toBe(false);
    });

    it("rechaza si falta userId", () => {
        expect(RemoveKioscoMemberSchema.safeParse({ kioscoId: "kiosco-1" }).success).toBe(false);
    });
});

describe("UpdateKioscoMemberRoleSchema", () => {
    const VALID_ROLE_PAYLOAD = { ...VALID_MEMBER, role: "admin" };

    it("acepta un payload válido", () => {
        expect(UpdateKioscoMemberRoleSchema.safeParse(VALID_ROLE_PAYLOAD).success).toBe(true);
    });

    it("rechaza role vacío", () => {
        expect(UpdateKioscoMemberRoleSchema.safeParse({ ...VALID_ROLE_PAYLOAD, role: "" }).success).toBe(false);
    });

    it("rechaza si falta role", () => {
        expect(UpdateKioscoMemberRoleSchema.safeParse(VALID_MEMBER).success).toBe(false);
    });
});
