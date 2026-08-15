import { describe, it, expect } from "vitest";
import { AuthRoleEnum } from "@typings/auth/authEnums";
import type { SellerWithRole } from "@typings/seller/sellerTypes";
import { getSellerEditInitialValues } from "../../schema/SellerFormSchema";

const buildSeller = (overrides: Partial<SellerWithRole> = {}): SellerWithRole => ({
    _id: "1",
    name: "Juan",
    profilePhoto: null,
    email: "juan@test.com",
    role: AuthRoleEnum.Admin,
    created_at: "2026-01-01T00:00:00.000Z",
    user_status: "offline" as SellerWithRole["user_status"],
    ...overrides,
});

describe("getSellerEditInitialValues", () => {
    it("toma el rol de seller.role (no seller.rol, que no existe en el back)", () => {
        const values = getSellerEditInitialValues(buildSeller({ role: AuthRoleEnum.Admin }));

        expect(values.rol).toBe(AuthRoleEnum.Admin);
    });

    it("usa AuthRoleEnum.Seller por defecto si no hay seller", () => {
        const values = getSellerEditInitialValues(null);

        expect(values).toEqual({ name: "", email: "", rol: AuthRoleEnum.Seller });
    });

    it("mapea name y email tal cual vienen del seller", () => {
        const values = getSellerEditInitialValues(buildSeller({ name: "Ana", email: "ana@test.com" }));

        expect(values.name).toBe("Ana");
        expect(values.email).toBe("ana@test.com");
    });
});
