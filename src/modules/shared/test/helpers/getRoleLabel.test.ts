import { describe, it, expect } from "vitest";
import { AuthRoleEnum } from "@typings/auth/authEnums";
import { getRoleLabel } from "../../helpers/getRoleLabel";

describe("getRoleLabel", () => {
    it("traduce AuthRoleEnum.Admin a 'Administrador'", () => {
        expect(getRoleLabel(AuthRoleEnum.Admin)).toBe("Administrador");
    });

    it("traduce AuthRoleEnum.Seller a 'Vendedor'", () => {
        expect(getRoleLabel(AuthRoleEnum.Seller)).toBe("Vendedor");
    });

    it("devuelve el valor tal cual si no está en el mapa de labels", () => {
        expect(getRoleLabel("rol-desconocido")).toBe("rol-desconocido");
    });
});
